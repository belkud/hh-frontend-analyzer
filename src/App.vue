<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const allTechnologies = [
    // Frontend Technologies
    "HTML", "HTML5", "CSS", "CSS3", "JavaScript", "TypeScript", "JSX", "Dart", "React", "Vue.js", "Vue", "Angular", "Svelte", "SolidJS", "Qwik", "Preact", "Alpine.js", "Ember.js", "Backbone.js", "jQuery", "Lit", "Next.js", "Gatsby", "Remix", "React Native", "TanStack Start", "Nuxt.js", "SvelteKit",
    "Astro", "Eleventy", "Hugo", "Flutter", "Ionic", "NativeScript", "Tailwind CSS", "Bootstrap", "Material UI", "Chakra UI", "Ant Design", "Bulma", "Foundation", "Semantic UI", "UIKit", "PrimeNG",
    "styled-components", "Emotion", "CSS Modules", "Sass/SCSS", "Less", "PostCSS", "Redux", "Zustand", "Jotai", "Recoil", "MobX", "NgRx", "Vuex", "Pinia", "XState", "Effector", "React Query", "SWR", "Apollo Client", "Relay", "GraphQL", "REST API", "Axios", "fetch API", "React Router", "Vue Router", "TanStack Router", "wouter", "Framer Motion", "GSAP", "Anime.js", "Three.js", "D3.js", "React Spring",
    "Lottie", "p5.js", "GreenSock", "Vite", "Webpack", "Parcel", "esbuild", "Rollup", "Turbopack",
    "Babel", "SWC", "TSC", "ESLint", "Prettier", "Stylelint", "Biome", "Jest", "Vitest", "Cypress", "Playwright", "Testing Library", "Mocha", "Chai", "Storybook", "Loki",
    "Web3.js", "ethers.js", "wagmi", "viem", "Workbox", "PWABuilder", "Micro Frontends", "Monorepo", "Module Federation", "Hugo", "Hexo", "Jekyll", "HTMX", "Stimulus", "Mithril", "Inferno", "Riot.js", "Marko", "Composition API", "Git", "UI/UX", "Node", "Node.js", "Express", "HTTP", "Vuetify", "CI/CD", "WebSocket", "Figma", "React.js", "AngularJS", "Docker", "MobX",



// Backend Technologies
    "JavaScript", "TypeScript", "Python", "Java", "Go", "PHP", "C#", "Ruby", "Rust", "Kotlin",
    "Node.js", "Express.js", "Nest.js", "Fastify", "Koa", "AdonisJS", "Django", "Flask", "FastAPI", "Pyramid", "Spring", "Spring Boot", "Hibernate", "Micronaut", "Quarkus", "Laravel", "Symfony", "CodeIgniter", "CakePHP", "Gin", "Echo", "Fiber", "ASP.NET Core", "Entity Framework", ".NET", "Ruby on Rails", "Sinatra",
    "PostgreSQL", "MySQL", "SQLite", "MariaDB", "Microsoft SQL Server", "Oracle", "MongoDB", "Redis", "Cassandra", "Elasticsearch", "DynamoDB", "CouchDB", "Neo4j", "ArangoDB", "InfluxDB", "ClickHouse", "RabbitMQ", "Apache Kafka",
    "Redis Pub/Sub", "NATS", "ZeroMQ", "ActiveMQ", "AWS SQS", "Docker", "Kubernetes", "Docker Compose", "Podman", "OpenShift", "Rancher", "Nomad", "GitHub Actions", "GitLab CI", "Jenkins", "CircleCI", "Travis CI", "TeamCity", "ArgoCD", "Flux", "AWS", "EC2", "S3", "Lambda", "API Gateway", "RDS", "DynamoDB", "CloudFront", "Route53", "Azure", "Google Cloud", "GCP", "Heroku", "DigitalOcean", "Vercel", "Netlify", "Cloudflare", "Firebase",
    "Supabase", "Terraform", "Pulumi", "Ansible", "Chef", "Puppet", "Prometheus", "Grafana", "Datadog", "New Relic", "ELK Stack", "Elasticsearch", "Logstash", "Kibana", "Splunk", "Loki", "Jaeger", "Zipkin", "OpenTelemetry",
    "REST", "GraphQL", "gRPC", "WebSocket", "SOAP", "MQTT", "AMQP", "OpenAPI", "Swagger", "Postman", "JWT", "OAuth2", "OpenID Connect", "Keycloak", "Auth0", "BCrypt", "Argon2", "Helmet.js", "CORS", "JUnit", "pytest", "PHPUnit", "RSpec", "Jest", "Mocha", "SuperTest", "Mockito", "Cucumber", "JMeter", "k6", "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Confluence", "Linux", "Ubuntu", "CentOS", "Nginx", "Apache", "Caddy", "Traefik", "HAProxy", "Istio", "Consul", "Vault", "Microservices", "Serverless", "CQRS", "DDD",
    "HTTP", "HTTPS", "TCP/IP", "DNS", "SSH", "FTP", "SMTP", "WebRTC"
];
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

        // анализирую все собранные вакансии
        const techCounter: Record<string, number> = {};
        allTechnologies.forEach(tech => {
            techCounter[tech] = 0;
        });

        for (const vac of allVacancies) {
            const title = (vac.name || '').toLowerCase();
            const requirement = (vac.snippet?.requirement || '').toLowerCase();
            const text = title + ' ' + requirement;

            for (const tech of allTechnologies) {
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


</script>

<template>
    <div id="app">
        <h1>HH Frontend(Backend) Analyzer 2</h1>
        <div class="search-input-wrapper">
            <!-- "(frontend, backend, fullstack)" -->
            <input v-model="searchText" type="text" placeholder="(Введите запрос для поиска вакансий...)"
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
