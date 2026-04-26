import CodeBlock from '../components/ui/CodeBlock'
import NestCard from '../components/ui/NestCard'

function CiIntro() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">⚙️ ¿Qué es CI/CD?</h2>
      <p className="text-sm text-nest-gray">Automatizar tests, builds y deploys cada vez que haces push.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <NestCard title="CI vs CD" icon="🔄" variant="blue">
          <ul className="space-y-2 text-xs">
            <li><span className="text-cicd-blue font-bold">CI (Continuous Integration)</span> — Cada push: lint + test + build automático. Detecta errores temprano.</li>
            <li><span className="text-deploy-green font-bold">CD (Continuous Deployment)</span> — Si CI pasa, deploy automático a producción. Sin intervención manual.</li>
            <li><span className="text-nest-yellow font-bold">CD (Continuous Delivery)</span> — Como Deployment pero requiere aprobación manual para producción.</li>
          </ul>
        </NestCard>
        <NestCard title="Flujo típico" icon="🔄" variant="cyan">
          <ol className="space-y-1.5 text-xs list-decimal pl-4">
            <li>Developer hace push a GitHub</li>
            <li>CI se activa automáticamente</li>
            <li>Ejecuta linting (ESLint)</li>
            <li>Ejecuta tests (Jest/Vitest)</li>
            <li>Build de producción</li>
            <li>Si todo pasa → deploy automático</li>
            <li>Si algo falla → notificación al dev</li>
          </ol>
        </NestCard>
      </div>
    </div>
  )
}

function CiGithub() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">🐙 GitHub Actions</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title=".github/workflows/ci.yml" language="bash" code={`name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'`} />
        <NestCard title="Conceptos de Actions" icon="📋" variant="blue">
          <ul className="space-y-1.5 text-xs">
            <li><span className="text-cicd-blue font-bold">Workflow</span> — El archivo .yml completo</li>
            <li><span className="text-cicd-blue font-bold">Job</span> — Grupo de steps (test, deploy)</li>
            <li><span className="text-cicd-blue font-bold">Step</span> — Un comando individual</li>
            <li><span className="text-cicd-blue font-bold">Action</span> — Step reutilizable (checkout, setup-node)</li>
            <li><span className="text-cicd-blue font-bold">Secrets</span> — Variables secretas en Settings</li>
            <li><span className="text-cicd-blue font-bold">needs</span> — Dependencia entre jobs</li>
          </ul>
        </NestCard>
      </div>
    </div>
  )
}

function CiPipeline() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">🔄 Pipeline Completo</h2>
      <CodeBlock title="Pipeline profesional" language="bash" code={`name: Full Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: 20

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci
      - run: npm test -- --coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  deploy-staging:
    needs: build
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - run: echo "Deploy to staging..."

  deploy-production:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - run: echo "Deploy to production..."`} />
    </div>
  )
}

function CiTesting() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">🧪 Testing Automático</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Vitest config" language="js" code={`// vite.config.js
import { defineConfig } from 'vite'
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: { reporter: ['text', 'lcov'] },
  },
})

// package.json scripts
// "test": "vitest",
// "test:ci": "vitest run --coverage",
// "lint": "eslint src/"`} />
        <NestCard title="Qué testear en CI" icon="📋" variant="green">
          <ul className="space-y-1.5 text-xs">
            <li>✅ Unit tests — funciones puras, utils</li>
            <li>✅ Integration tests — API endpoints</li>
            <li>✅ Linting — ESLint, formato consistente</li>
            <li>✅ Type checking — tsc --noEmit (si usas TS)</li>
            <li>✅ Build — que compile sin errores</li>
            <li>⭐ E2E — Playwright/Cypress (opcional)</li>
          </ul>
        </NestCard>
      </div>
    </div>
  )
}

function CiDocker() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">🐳 CI/CD + Docker</h2>
      <CodeBlock title="Build y push Docker en CI" language="bash" code={`name: Docker CI/CD

on:
  push:
    branches: [main]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKER_USER }}
          password: \${{ secrets.DOCKER_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: usuario/mi-app:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max`} />
    </div>
  )
}

function CiTips() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">💡 Tips CI/CD</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <NestCard title="Buenas prácticas" icon="✅" variant="green">
          <ul className="space-y-1.5 text-xs">
            <li>✅ CI en CADA pull request</li>
            <li>✅ Deploy solo desde main</li>
            <li>✅ Cache de node_modules</li>
            <li>✅ Secrets en GitHub Settings</li>
            <li>✅ Status checks requeridos</li>
            <li>✅ Environments (staging/production)</li>
            <li>✅ Notificaciones en Slack/Discord</li>
            <li>❌ Nunca hardcodear secrets en .yml</li>
          </ul>
        </NestCard>
        <NestCard title="🚀 CI/CD completado" icon="🎉" variant="red">
          <p className="text-xs">Ahora tus deploys son automáticos, testeados y confiables.</p>
        </NestCard>
      </div>
    </div>
  )
}

export const cicdTopics = {
  'ci-intro': CiIntro, 'ci-github': CiGithub, 'ci-pipeline': CiPipeline,
  'ci-testing': CiTesting, 'ci-docker': CiDocker, 'ci-tips': CiTips,
}
