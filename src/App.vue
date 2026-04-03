<template>
    <div id="app">
        <h1>HH Frontend Analyzer</h1>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
const allFrontendTechnologies = [
    "HTML", "HTML5", "CSS", "CSS3", "JavaScript", "TypeScript", "JSX", "Dart", "React", "Vue.js", "Vue", "Angular", "Svelte", "SolidJS", "Qwik", "Preact", "Alpine.js", "Ember.js", "Backbone.js", "jQuery", "Lit", "Next.js", "Gatsby", "Remix", "React Native", "TanStack Start", "Nuxt.js", "SvelteKit",
    "Astro", "Eleventy", "Hugo", "Flutter", "Ionic", "NativeScript", "Tailwind CSS", "Bootstrap", "Material UI", "Chakra UI", "Ant Design", "Bulma", "Foundation", "Semantic UI", "UIKit", "PrimeNG",
    "styled-components", "Emotion", "CSS Modules", "Sass/SCSS", "Less", "PostCSS", "Redux", "Zustand", "Jotai", "Recoil", "MobX", "NgRx", "Vuex", "Pinia", "XState", "Effector", "React Query", "SWR", "Apollo Client", "Relay", "GraphQL", "REST API", "Axios", "fetch API", "React Router", "Vue Router", "TanStack Router", "wouter", "Framer Motion", "GSAP", "Anime.js", "Three.js", "D3.js", "React Spring",
    "Lottie", "p5.js", "GreenSock", "Vite", "Webpack", "Parcel", "esbuild", "Rollup", "Turbopack",
    "Babel", "SWC", "TSC", "ESLint", "Prettier", "Stylelint", "Biome", "Jest", "Vitest", "Cypress", "Playwright", "Testing Library", "Mocha", "Chai", "Storybook", "Loki",
    "Web3.js", "ethers.js", "wagmi", "viem", "Workbox", "PWABuilder", "Micro Frontends", "Monorepo", "Module Federation", "Hugo", "Hexo", "Jekyll", "HTMX", "Stimulus", "Mithril", "Inferno", "Riot.js", "Marko"
];



async function analyzeFrontend(limitPerPage = 100) {
    const url = 'https://api.hh.ru/vacancies';
    const params = {
        text: 'Frontend',
        area: 113, // по России выборка, Москва вроде 1 
        per_page: limitPerPage,  // максимум 100
        period: 30
    };

    console.log(`🔍 Ищем вакансии Frontend-разработчика...\n`);

    try {
        // Смотрю общее количество страниц
        const firstResponse = await axios.get(url, { params });
        const totalFound = firstResponse.data.found;
        const totalPages = firstResponse.data.pages;  // сколько всего страниц

        console.log(`✅ Всего найдено вакансий: ${totalFound}`);
        console.log(`📄 Всего страниц: ${totalPages}`);
        console.log(`🚀 Начинаем сбор ${Math.min(totalFound, 2000)} вакансий...\n`);

        // Собираю все вакансии со всех страниц
        let allVacancies = [...firstResponse.data.items];


        for (let page = 1; page < totalPages; page++) {
            console.log(`   Загрузка страницы ${page + 1} из ${totalPages}...`);

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

        console.log('📊 РЕЗУЛЬТАТЫ АНАЛИЗА:\n');
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

<style scoped>
#app {
    font-family: Arial, sans-serif;
    text-align: center;
    margin-top: 40px;
}
</style>
