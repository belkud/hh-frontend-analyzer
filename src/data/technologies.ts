// Группы связанных технологий (для объединения вариантов написания)
export const techGroups: Record<string, string[]> = {
    // ===== ФРОНТЕНД ФРЕЙМВОРКИ И БИБЛИОТЕКИ =====

    // Vue экосистема
    "Vue": ["Vue", "Vue.js", "Vue3", "Nuxt.js", "Nuxt 3", "Nuxt", "Vuex", "Pinia", "Vue Router"],

    // React экосистема
    "React": ["React", "React.js", "React Native", "React Query", "React Router", "React Spring", "Next.js", "Gatsby", "Remix", "TanStack Start"],

    // Angular
    "Angular": ["Angular", "AngularJS"],

    // Svelte
    "Svelte": ["Svelte", "SvelteKit"],

    // Другие фронтенд фреймворки
    "SolidJS": ["SolidJS"],
    "Qwik": ["Qwik"],
    "Preact": ["Preact"],
    "Alpine.js": ["Alpine.js"],
    "Ember.js": ["Ember.js"],
    "Backbone.js": ["Backbone.js"],
    "jQuery": ["jQuery"],
    "Lit": ["Lit"],
    "Astro": ["Astro"],
    "HTMX": ["HTMX"],
    "Stimulus": ["Stimulus"],
    "Mithril": ["Mithril"],
    "Inferno": ["Inferno"],
    "Riot.js": ["Riot.js"],
    "Marko": ["Marko"],

    // Статические генераторы
    "Eleventy": ["Eleventy"],
    "Hugo": ["Hugo"],
    "Jekyll": ["Jekyll"],
    "Hexo": ["Hexo"],

    // Мобильная разработка
    "Flutter": ["Flutter"],
    "Ionic": ["Ionic"],
    "NativeScript": ["NativeScript"],

    // ===== ЯЗЫКИ ПРОГРАММИРОВАНИЯ =====

    // JavaScript/TypeScript
    "JavaScript": ["JavaScript", "JSX", "ES6"],
    "TypeScript": ["TypeScript", "TSC"],
    "Dart": ["Dart"],

    // Backend языки
    "Python": ["Python"],
    "Java": ["Java"],
    "Go": ["Go", "Golang"],
    "PHP": ["PHP"],
    "C#": ["C#"],
    "Ruby": ["Ruby"],
    "Rust": ["Rust"],
    "Kotlin": ["Kotlin"],

    // ===== BACKEND ФРЕЙМВОРКИ =====

    // Node.js
    "Node.js": ["Node", "Node.js"],
    "Express": ["Express", "Express.js"],
    "Nest.js": ["Nest.js"],
    "Fastify": ["Fastify"],
    "Koa": ["Koa"],
    "AdonisJS": ["AdonisJS"],

    // Python фреймворки
    "Django": ["Django"],
    "Flask": ["Flask"],
    "FastAPI": ["FastAPI"],
    "Pyramid": ["Pyramid"],

    // Java фреймворки
    "Spring Boot": ["Spring", "Spring Boot", "Hibernate"],
    "Micronaut": ["Micronaut"],
    "Quarkus": ["Quarkus"],

    // PHP фреймворки
    "Laravel": ["Laravel"],
    "Symfony": ["Symfony"],
    "CodeIgniter": ["CodeIgniter"],
    "CakePHP": ["CakePHP"],

    // Go фреймворки
    "Gin": ["Gin"],
    "Echo": ["Echo"],
    "Fiber": ["Fiber"],

    // .NET
    "ASP.NET Core": ["ASP.NET Core", "Entity Framework", ".NET"],

    // Ruby
    "Ruby on Rails": ["Ruby on Rails", "Rails"],
    "Sinatra": ["Sinatra"],

    // ===== CSS И СТИЛИ =====

    // HTML/CSS
    "HTML": ["HTML", "HTML5"],
    "CSS": ["CSS", "CSS3"],

    // CSS препроцессоры
    "Sass": ["Sass/SCSS", "SCSS", "Sass"],
    "Less": ["Less"],
    "PostCSS": ["PostCSS"],
    "CSS Modules": ["CSS Modules"],
    "styled-components": ["styled-components"],
    "Emotion": ["Emotion"],

    // CSS фреймворки
    "Tailwind CSS": ["Tailwind CSS", "Tailwind"],
    "Bootstrap": ["Bootstrap"],
    "Material UI": ["Material UI", "MUI"],
    "Chakra UI": ["Chakra UI"],
    "Ant Design": ["Ant Design"],
    "Bulma": ["Bulma"],
    "Foundation": ["Foundation"],
    "Semantic UI": ["Semantic UI"],
    "UIKit": ["UIKit"],
    "PrimeNG": ["PrimeNG"],
    "Vuetify": ["Vuetify"],
    "Headless UI": ["Headless UI"],

    // ===== STATE MANAGEMENT =====

    "Redux": ["Redux"],
    "MobX": ["MobX"],
    "Zustand": ["Zustand"],
    "Jotai": ["Jotai"],
    "Recoil": ["Recoil"],
    "NgRx": ["NgRx"],
    "XState": ["XState"],
    "Effector": ["Effector"],
    "Composition API": ["Composition API"],

    // ===== API И РАБОТА С ДАННЫМИ =====

    // API подходы
    "GraphQL": ["GraphQL"],
    "REST API": ["REST API", "REST"],
    "gRPC": ["gRPC"],
    "SOAP": ["SOAP"],
    "Axios": ["Axios"],
    "Apollo Client": ["Apollo Client"],
    "Relay": ["Relay"],
    "SWR": ["SWR"],

    // HTTP
    "HTTP": ["HTTP", "HTTPS"],
    "WebSocket": ["WebSocket"],
    "fetch API": ["fetch API", "fetch"],

    // ===== БАЗЫ ДАННЫХ =====

    "PostgreSQL": ["PostgreSQL"],
    "MySQL": ["MySQL"],
    "SQLite": ["SQLite"],
    "MariaDB": ["MariaDB"],
    "Microsoft SQL Server": ["Microsoft SQL Server"],
    "Oracle": ["Oracle"],
    "MongoDB": ["MongoDB"],
    "Redis": ["Redis"],
    "Cassandra": ["Cassandra"],
    "Elasticsearch": ["Elasticsearch"],
    "DynamoDB": ["DynamoDB"],
    "CouchDB": ["CouchDB"],
    "Neo4j": ["Neo4j"],
    "ArangoDB": ["ArangoDB"],
    "InfluxDB": ["InfluxDB"],
    "ClickHouse": ["ClickHouse"],
    "Supabase": ["Supabase"],
    "Firebase": ["Firebase"],
    "DaData API": ["DaData API"],
    "Algolia": ["Algolia"],

    // ===== ОЧЕРЕДИ СООБЩЕНИЙ =====

    "Apache Kafka": ["Apache Kafka", "Kafka"],
    "RabbitMQ": ["RabbitMQ"],
    "Redis Pub/Sub": ["Redis Pub/Sub"],
    "NATS": ["NATS"],
    "ZeroMQ": ["ZeroMQ"],
    "ActiveMQ": ["ActiveMQ"],
    "AWS SQS": ["AWS SQS"],

    // ===== CI/CD И DEVOPS =====

    // Контейнеризация
    "Docker": ["Docker", "Docker Compose"],
    "Kubernetes": ["Kubernetes"],
    "Podman": ["Podman"],
    "OpenShift": ["OpenShift"],
    "Rancher": ["Rancher"],
    "Nomad": ["Nomad"],

    // CI/CD
    "GitHub Actions": ["GitHub Actions"],
    "GitLab CI/CD": ["GitLab CI/CD"],
    "Jenkins": ["Jenkins"],
    "CircleCI": ["CircleCI"],
    "Travis CI": ["Travis CI"],
    "TeamCity": ["TeamCity"],
    "ArgoCD": ["ArgoCD"],
    "Flux": ["Flux"],
    "CI/CD": ["CI/CD"],

    // Инфраструктура как код
    "Terraform": ["Terraform"],
    "Pulumi": ["Pulumi"],
    "Ansible": ["Ansible"],
    "Chef": ["Chef"],
    "Puppet": ["Puppet"],

    // ===== ОБЛАКА И ХОСТИНГ =====

    "AWS": ["AWS", "EC2", "S3", "Lambda", "API Gateway", "RDS", "CloudFront", "Route53"],
    "Google Cloud": ["Google Cloud", "GCP"],
    "Azure": ["Azure"],
    "Heroku": ["Heroku"],
    "DigitalOcean": ["DigitalOcean"],
    "Vercel": ["Vercel"],
    "Netlify": ["Netlify"],
    "Cloudflare": ["Cloudflare"],

    // ===== МОНИТОРИНГ И ЛОГИРОВАНИЕ =====

    "Prometheus": ["Prometheus"],
    "Grafana": ["Grafana"],
    "Datadog": ["Datadog"],
    "New Relic": ["New Relic"],
    "ELK Stack": ["ELK Stack", "Logstash", "Kibana"],
    "Splunk": ["Splunk"],
    "Loki": ["Loki"],
    "Jaeger": ["Jaeger"],
    "Zipkin": ["Zipkin"],
    "OpenTelemetry": ["OpenTelemetry"],

    // ===== СБОРЩИКИ И ТРАНСПАЙЛЕРЫ =====

    "Vite": ["Vite"],
    "Webpack": ["Webpack"],
    "Parcel": ["Parcel"],
    "esbuild": ["esbuild"],
    "Rollup": ["Rollup"],
    "Turbopack": ["Turbopack"],
    "Babel": ["Babel"],
    "SWC": ["SWC"],

    // ===== ЛИНТЕРЫ И ФОРМАТЕРЫ =====

    "ESLint": ["ESLint"],
    "Prettier": ["Prettier"],
    "Stylelint": ["Stylelint"],
    "Biome": ["Biome"],

    // ===== ТЕСТИРОВАНИЕ =====

    "Jest": ["Jest"],
    "Vitest": ["Vitest"],
    "Cypress": ["Cypress"],
    "Playwright": ["Playwright"],
    "Testing Library": ["Testing Library"],
    "Mocha": ["Mocha"],
    "Chai": ["Chai"],
    "Storybook": ["Storybook"],
    "Visual Testing": ["Loki"],
    "JUnit": ["JUnit"],
    "pytest": ["pytest"],
    "PHPUnit": ["PHPUnit"],
    "RSpec": ["RSpec"],
    "SuperTest": ["SuperTest"],
    "Mockito": ["Mockito"],
    "Cucumber": ["Cucumber"],
    "JMeter": ["JMeter"],
    "k6": ["k6"],

    // ===== АНИМАЦИИ И ВИЗУАЛИЗАЦИЯ =====

    "Framer Motion": ["Framer Motion"],
    "GSAP": ["GSAP", "GreenSock"],
    "Anime.js": ["Anime.js"],
    "Three.js": ["Three.js"],
    "D3.js": ["D3.js"],
    "Lottie": ["Lottie"],
    "p5.js": ["p5.js"],
    "ECharts": ["ECharts"],

    // ===== WEB3 =====

    "Web3.js": ["Web3.js"],
    "ethers.js": ["ethers.js"],
    "wagmi": ["wagmi"],
    "viem": ["viem"],

    // ===== PWA =====

    "Workbox": ["Workbox"],
    "PWABuilder": ["PWABuilder"],

    // ===== АРХИТЕКТУРА =====

    "Micro Frontends": ["Micro Frontends"],
    "Microservices": ["Microservices"],
    "Monorepo": ["Monorepo"],
    "Module Federation": ["Module Federation"],
    "Serverless": ["Serverless"],
    "CQRS": ["CQRS"],
    "DDD": ["DDD"],

    // ===== ВЕБ-СЕРВЕРЫ =====

    "Nginx": ["Nginx"],
    "Apache": ["Apache"],
    "Caddy": ["Caddy"],
    "Traefik": ["Traefik"],
    "HAProxy": ["HAProxy"],
    "Istio": ["Istio"],

    // ===== СЕТИ И ПРОТОКОЛЫ =====

    "TCP/IP": ["TCP/IP"],
    "DNS": ["DNS"],
    "SSH": ["SSH"],
    "FTP": ["FTP"],
    "SMTP": ["SMTP"],
    "MQTT": ["MQTT"],
    "AMQP": ["AMQP"],
    "WebRTC": ["WebRTC"],
    "CORS": ["CORS"],

    // ===== БЕЗОПАСНОСТЬ =====

    "JWT": ["JWT"],
    "OAuth2": ["OAuth2"],
    "OpenID Connect": ["OpenID Connect"],
    "Keycloak": ["Keycloak"],
    "Auth0": ["Auth0"],
    "BCrypt": ["BCrypt"],
    "Argon2": ["Argon2"],
    "Helmet.js": ["Helmet.js"],

    // ===== ОС И ОКРУЖЕНИЕ =====

    "Linux": ["Linux"],
    "Ubuntu": ["Ubuntu"],
    "CentOS": ["CentOS"],

    // ===== ГИТ И ИНСТРУМЕНТЫ =====

    "Git": ["Git"],
    "GitHub": ["GitHub"],
    "GitLab": ["GitLab"],
    "Bitbucket": ["Bitbucket"],

    // Управление проектами
    "Jira": ["Jira"],
    "Confluence": ["Confluence"],

    // Документация API
    "OpenAPI": ["OpenAPI"],
    "Swagger": ["Swagger"],
    "Postman": ["Postman"],

    // ===== ДИЗАЙН И UX =====

    "Figma": ["Figma"],
    "UI/UX": ["UI/UX"],

    // ===== ПРОЧЕЕ =====

    "Веб-программирование": ["Веб-программирование"],
    "Английский язык": ["Английский язык"],
};

// Уникальный список всех технологий (для обратной совместимости)
export const allTechnologies = [...new Set(Object.values(techGroups).flat())];
