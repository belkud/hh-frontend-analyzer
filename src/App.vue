<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const allFrontendTechnologies = [
    "HTML", "HTML5", "CSS", "CSS3", "JavaScript", "TypeScript", "JSX", "Dart", "React", "Vue.js", "Vue", "Angular", "Svelte", "SolidJS", "Qwik", "Preact", "Alpine.js", "Ember.js", "Backbone.js", "jQuery", "Lit", "Next.js", "Gatsby", "Remix", "React Native", "TanStack Start", "Nuxt.js", "SvelteKit",
    "Astro", "Eleventy", "Hugo", "Flutter", "Ionic", "NativeScript", "Tailwind CSS", "Bootstrap", "Material UI", "Chakra UI", "Ant Design", "Bulma", "Foundation", "Semantic UI", "UIKit", "PrimeNG",
    "styled-components", "Emotion", "CSS Modules", "Sass/SCSS", "Less", "PostCSS", "Redux", "Zustand", "Jotai", "Recoil", "MobX", "NgRx", "Vuex", "Pinia", "XState", "Effector", "React Query", "SWR", "Apollo Client", "Relay", "GraphQL", "REST API", "Axios", "fetch API", "React Router", "Vue Router", "TanStack Router", "wouter", "Framer Motion", "GSAP", "Anime.js", "Three.js", "D3.js", "React Spring",
    "Lottie", "p5.js", "GreenSock", "Vite", "Webpack", "Parcel", "esbuild", "Rollup", "Turbopack",
    "Babel", "SWC", "TSC", "ESLint", "Prettier", "Stylelint", "Biome", "Jest", "Vitest", "Cypress", "Playwright", "Testing Library", "Mocha", "Chai", "Storybook", "Loki",
    "Web3.js", "ethers.js", "wagmi", "viem", "Workbox", "PWABuilder", "Micro Frontends", "Monorepo", "Module Federation", "Hugo", "Hexo", "Jekyll", "HTMX", "Stimulus", "Mithril", "Inferno", "Riot.js", "Marko"
];

const totalFound = ref<number | null>(null);
const totalPages = ref<number | null>(null);
const currentPage = ref<number>(0);
const analysisResults = ref<{ tech: string; count: number; percent: number; bar: string }[]>([]);
const totalVacancies = ref<number>(0);
const mostPopular = ref<string>('');

async function analyzeFrontend(limitPerPage = 100) {
    const url = 'https://api.hh.ru/vacancies';
    const params = {
        text: 'Frontend',
        area: 113, // по России выборка, Москва вроде 1 
        per_page: limitPerPage,  // максимум 100
        period: 30
    };

    // console.log(`🔍 Ищем вакансии Frontend-разработчика...\n`);

    try {
        // Смотрю общее количество вакансий
        const firstResponse = await axios.get(url, { params });
        totalFound.value = firstResponse.data.found;
        totalPages.value = firstResponse.data.pages;  // сколько всего страниц

        // console.log(`✅ Всего найдено вакансий: ${totalFound.value}`);
        // console.log(`📄 Всего страниц: ${totalPages}`);
        // console.log(`🚀 Начинаем сбор ${Math.min(totalFound.value ?? 0, 2000)} вакансий...\n`);

        // Собираю все вакансии со всех страниц
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

        // анализирую все собранные вакансии
        const techCounter: Record<string, number> = {};
        allFrontendTechnologies.forEach(tech => {
            techCounter[tech] = 0;
        });

        for (const vac of allVacancies) {
            const title = (vac.name || '').toLowerCase();
            const requirement = (vac.snippet?.requirement || '').toLowerCase();
            const text = title + ' ' + requirement;

            for (const tech of allFrontendTechnologies) {
                if (text.includes(tech.toLowerCase())) {
                    techCounter[tech]++;
                }
            }
        }

        // вывожу результат
        const sorted = Object.entries(techCounter)
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

// ЗАПУСК

analyzeFrontend();

</script>

<template>
    <div id="app">
        <h1>HH Frontend Analyzer 2</h1>
    </div>
    <div>✅ Всего найдено вакансий: {{ totalFound }}</div>
    <div>📄 Всего страниц: {{ totalPages }}</div>
    <div>🔍 Ищем вакансии Frontend-разработчика...</div>
    <div>🚀 Загрузка страниц: {{ currentPage + 1 }} из {{ totalPages }}</div>
    <br>
    <div v-if="analysisResults.length > 0">
        <div class="results-header">📊 РЕЗУЛЬТАТЫ АНАЛИЗА:</div>
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
    font-family: Arial, sans-serif;
    text-align: center;
    margin-top: 40px;
}

.results-header {
    font-size: 20px;
    font-weight: 700;
    margin: 20px 0 15px;
    color: #333;
}

.results-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
}

.result-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    margin: 6px 0;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 8px;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 14px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.result-item:hover {
    transform: translateX(5px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tech-name {
    font-weight: 600;
    color: #667eea;
    min-width: 180px;
}

.tech-stats {
    color: #555;
    flex: 1;
    text-align: right;
}

.summary {
    margin-top: 20px;
    padding: 15px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    font-size: 16px;
}

.summary div {
    margin: 8px 0;
}

.summary strong {
    font-weight: 700;
}
</style>
