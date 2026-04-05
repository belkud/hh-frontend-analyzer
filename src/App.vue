<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { techGroups } from "./data/technologies";

// Уникальный список всех технологий (для обратной совместимости)
const allTechnologies = [...new Set(Object.values(techGroups).flat())];
// console.log(allTechnologies.length);

const totalFound = ref<number | null>(null);
const totalPages = ref<number | null>(null);
const currentPage = ref<number>(0);
const analysisResults = ref<{ tech: string; count: number; percent: number; bar: string }[]>([]);
const totalVacancies = ref<number>(0);
const mostPopular = ref<string>('');
const loadPage = ref(false)
const today = new Date
const searchText = ref<string>('Frontend');

async function analyzeFrontend(limitPerPage = 100) {
    loadPage.value = true
    const url = 'https://api.hh.ru/vacancies';
    const params = {
        text: searchText.value,
        area: 113, // по России выборка 113, Москва вроде 1
        per_page: limitPerPage,  // максимум 100
        period: 30
    };

    // console.log(`🔍 Ищем вакансии Frontend-разработчика...\n`);

    try {
        // Смотрю общее количество вакансий
        const firstResponse = await axios.get(url, { params });
        console.log(firstResponse);

        totalFound.value = firstResponse.data.found;
        console.log(totalFound.value);

        totalPages.value = firstResponse.data.pages;  // сколько всего страниц
        let allVacancies = [...firstResponse.data.items];

        const pagesCount = totalPages.value ?? 1;
        for (let page = 1; page < pagesCount; page++) {
            currentPage.value = page;
            console.log(`   Загрузка страницы ${page + 1} из ${pagesCount}...`);

            const response = await axios.get(url, {
                params: { ...params, page: page }
            });

            allVacancies = [...allVacancies, ...response.data.items];

            // Небольшая задержка, чтобы не перегружать API
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        console.log(`\n📊 Собрано вакансий: ${allVacancies.length}\n`);

        // Функция для экранирования спецсимволов в regex
        function escapeRegex(str: string): string {
            return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        // Анализирую вакансии по группам технологий
        const groupCounter: Record<string, number> = {};

        // Инициализируем счётчики для всех групп
        Object.keys(techGroups).forEach(group => {
            groupCounter[group] = 0;
        });

        for (const vac of allVacancies) {
            // Собираем весь доступный текст из вакансии
            const title = (vac.name || '').toLowerCase();
            const requirement = (vac.snippet?.requirement || '').toLowerCase();
            const responsibility = (vac.snippet?.responsibility || '').toLowerCase();
            const description = (vac.description || '').toLowerCase();
            const text = `${title} ${requirement} ${responsibility} ${description}`;

            // Проверяем каждую группу технологий
            for (const [groupName, techVariants] of Object.entries(techGroups)) {
                let found = false;

                // Ищем любой из вариантов написания в группе
                for (const tech of techVariants) {
                    // Создаём regex с границами слов для точного поиска
                    const escapedTech = escapeRegex(tech.toLowerCase());
                    const regex = new RegExp(`\\b${escapedTech}\\b`, 'i');

                    if (regex.test(text)) {
                        found = true;
                        break; // Если нашли один вариант, прекращаем поиск в этой группе
                    }
                }

                if (found) {
                    groupCounter[groupName]++;
                }
            }
        }

        // Вывожу результат
        const sorted = Object.entries(groupCounter)
            .sort((a, b) => b[1] - a[1])
            .filter(([_tech, count]) => count > 0);

        // Сохраняю результаты для отображения в UI
        analysisResults.value = sorted.slice(0, 20).map(([tech, count]) => {
            const percent = Math.round((count / allVacancies.length) * 100);
            const bar = '█'.repeat(Math.floor(percent / 2));
            return { tech, count, percent, bar };
        });

        totalVacancies.value = allVacancies.length;
        mostPopular.value = sorted[0]?.[0] || 'нет данных';

        console.log('─'.repeat(45));

        for (const [tech, count] of sorted.slice(0, 20)) {  // топ-20 технологий
            const percent = Math.round((count / allVacancies.length) * 100);
            const bar = '█'.repeat(Math.floor(percent / 2));
            console.log(`${tech.padEnd(18)} → ${count} вакансий (${percent}%) ${bar}`);
        }

        console.log('─'.repeat(45));
        console.log(`\n✨ Самые популярные: ${sorted[0]?.[0] || 'нет данных'}`);
        console.log(`📈 Всего проанализировано вакансий: ${allVacancies.length}`);

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
        console.error('❌ Ошибка:', message);
        if (error instanceof Error && 'response' in error) {
            console.error('Статус:', (error as any).response?.status);
        }
    }
}


</script>

<template>
    <div id="app">
        <h1 class="app-title">HH Frontend(Backend) Analyzer 2</h1>
        <p class="app-subtitle">Анализатор спроса технологий на рынке труда</p>
        <div class="search-input-wrapper">
            <input v-model="searchText" type="text" placeholder="Введите запрос для поиска вакансий..."
                class="search-input" />
            <span class="input-icon">🔎</span>
        </div>
    </div>
    <div>✅ Всего найдено вакансий: {{ totalFound }}</div>
    <div>📄 Всего страниц: {{ totalPages }}</div>
    <div v-if="!loadPage">🔍 Ищем вакансию: {{ searchText }}</div>
    <div v-if="loadPage">🚀 Загрузка страниц: {{ currentPage + 1 }} из {{ totalPages }}</div>
    <button @click="analyzeFrontend()" class="search-btn">
        Поиск популярных технологий
    </button>
    <br>
    <div v-if="analysisResults.length > 0">
        <div class="results-header">📊 РЕЗУЛЬТАТЫ АНАЛИЗА НА {{ today.toLocaleDateString() }}:</div>
        <div class="results-container">
            <div v-for="item in analysisResults" :key="item.tech" class="result-item">
                <span class="tech-name">{{ item.tech }}</span>
                <span class="tech-stats">
                    → {{ item.count }} вакансий ({{ item.percent }}%) {{ item.bar }}
                </span>
            </div>
        </div>
        <div class="summary">
            <div>✨ Самые популярные: <strong>{{ mostPopular }}</strong></div>
            <div>📈 Всего проанализировано вакансий: <strong>{{ totalVacancies }}</strong></div>
        </div>
    </div>
</template>

<style scoped>
#app {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2.5rem 2rem;
    border-radius: 16px;
    margin: 2rem auto;
    max-width: 700px;
    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
    text-align: center;
}

.app-title {
    font-size: 2rem;
    font-weight: 800;
    color: #fff;
    margin: 0 0 0.5rem;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    letter-spacing: -0.5px;
}

.app-subtitle {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.85);
    margin: 0 0 1.8rem;
    font-weight: 400;
}

.search-input-wrapper {
    position: relative;
    max-width: 500px;
    margin: 0 auto;
}

.search-input {
    width: 100%;
    padding: 0.9rem 3rem 0.9rem 1.3rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.95);
    font-size: 1rem;
    color: #333;
    outline: none;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

.search-input::placeholder {
    color: #999;
}

.search-input:focus {
    border-color: #fff;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
}

.input-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.3rem;
    pointer-events: none;
    opacity: 0.6;
}
</style>
