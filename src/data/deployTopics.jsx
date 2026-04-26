import CodeBlock from '../components/ui/CodeBlock'
import NestCard from '../components/ui/NestCard'
import LiveDemo from '../components/ui/LiveDemo'
import { motion } from 'framer-motion'

function DpIntro() {
  return (
    <div className="space-y-6">
      <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-xl font-extrabold gradient-text-nest">🚀 ¿Qué es Deploy?</motion.h2>
      <p className="text-sm text-nest-gray">Deploy = poner tu app en internet para que el mundo la use.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <NestCard title="El camino del código" icon="🛤️" variant="green" delay={0.1}>
          <ol className="space-y-1.5 text-xs list-decimal pl-4">
            <li>Escribes código en tu PC (desarrollo local)</li>
            <li>Push a GitHub (control de versiones)</li>
            <li>CI/CD ejecuta tests automáticos</li>
            <li>Build: compilar/optimizar para producción</li>
            <li>Deploy: subir a un servidor</li>
            <li>El mundo accede con un dominio (tusitio.com)</li>
          </ol>
        </NestCard>
        <NestCard title="Tipos de deploy" icon="📋" variant="cyan" delay={0.2}>
          <ul className="space-y-1.5 text-xs">
            <li><span className="text-deploy-green font-bold">Frontend</span> — HTML/CSS/JS estático. Vercel, Netlify, GitHub Pages.</li>
            <li><span className="text-cicd-blue font-bold">Backend</span> — Servidor Node.js/Python. Railway, Render, VPS.</li>
            <li><span className="text-nest-purple font-bold">Full-stack</span> — Frontend + Backend + DB. Docker, VPS completo.</li>
            <li><span className="text-nest-yellow font-bold">Serverless</span> — Funciones que escalan solas. AWS Lambda, Vercel Functions.</li>
          </ul>
        </NestCard>
      </div>
    </div>
  )
}

function DpHosting() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">☁️ Plataformas de Hosting</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <NestCard title="Frontend (estático)" icon="🎨" variant="green" delay={0.1}>
          <ul className="space-y-2 text-xs">
            <li><span className="text-deploy-green font-bold">Vercel</span> — El mejor para React/Next.js. Git push = deploy. Gratis.</li>
            <li><span className="text-nest-cyan font-bold">Netlify</span> — Similar a Vercel. Forms, Functions. Gratis.</li>
            <li><span className="text-nest-gray font-bold">GitHub Pages</span> — Gratis para sitios estáticos. Solo HTML/CSS/JS.</li>
            <li><span className="text-nest-orange font-bold">Cloudflare Pages</span> — CDN global. Muy rápido. Gratis.</li>
          </ul>
        </NestCard>
        <NestCard title="Backend / Full-stack" icon="⚙️" variant="blue" delay={0.2}>
          <ul className="space-y-2 text-xs">
            <li><span className="text-cicd-blue font-bold">Railway</span> — El más fácil. DB incluida. Desde $5/mes.</li>
            <li><span className="text-nest-purple font-bold">Render</span> — Gratis con cold starts. PostgreSQL gratis.</li>
            <li><span className="text-nest-cyan font-bold">Fly.io</span> — Docker nativo. 3 VMs gratis. Global.</li>
            <li><span className="text-nest-orange font-bold">DigitalOcean</span> — VPS desde $4/mes. App Platform.</li>
            <li><span className="text-nest-yellow font-bold">AWS / GCP / Azure</span> — Enterprise. Complejo pero potente.</li>
          </ul>
        </NestCard>
      </div>
    </div>
  )
}

function DpFrontend() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">🎨 Deploy Frontend</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Vercel (recomendado)" language="bash" code={`# Opción 1: Conectar GitHub
# 1. Ir a vercel.com → New Project
# 2. Importar repo de GitHub
# 3. Vercel detecta React/Vite automáticamente
# 4. Deploy automático en cada push

# Opción 2: CLI
npm i -g vercel
vercel          # primer deploy
vercel --prod   # deploy a producción

# Variables de entorno en Vercel Dashboard:
# Settings → Environment Variables`} />
        <CodeBlock title="Netlify" language="bash" code={`# Conectar GitHub en netlify.com
# Build command: npm run build
# Publish directory: dist

# O con CLI
npm i -g netlify-cli
netlify deploy          # preview
netlify deploy --prod   # producción

# netlify.toml (en la raíz)
# [build]
#   command = "npm run build"
#   publish = "dist"

# Redirects para SPA (en public/_redirects)
# /*    /index.html   200`} />
      </div>
    </div>
  )
}

function DpBackend() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">⚙️ Deploy Backend</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Railway (más fácil)" language="bash" code={`# 1. railway.app → New Project
# 2. Conectar repo de GitHub
# 3. Railway detecta Node.js
# 4. Agregar variables de entorno:
#    PORT (Railway lo asigna)
#    DATABASE_URL
#    JWT_SECRET
#    NODE_ENV=production

# package.json necesita:
# "scripts": { "start": "node server.js" }
# "engines": { "node": ">=18" }

# Railway también ofrece PostgreSQL:
# New → Database → PostgreSQL
# Copia la DATABASE_URL`} />
        <CodeBlock title="Render" language="bash" code={`# 1. render.com → New Web Service
# 2. Conectar GitHub
# 3. Build: npm install
# 4. Start: node server.js
# 5. Variables de entorno en dashboard

# render.yaml (opcional, Infrastructure as Code)
services:
  - type: web
    name: mi-api
    runtime: node
    buildCommand: npm install
    startCommand: node server.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: mi-db
          property: connectionString

databases:
  - name: mi-db
    plan: free`} />
      </div>
    </div>
  )
}

function DpDomains() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">🌍 Dominios y DNS</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <NestCard title="¿Cómo funciona?" icon="🌍" variant="cyan">
          <ol className="space-y-1.5 text-xs list-decimal pl-4">
            <li>Compras un dominio (tusitio.com) en Namecheap, GoDaddy, Cloudflare</li>
            <li>Configuras DNS para apuntar a tu servidor</li>
            <li>Registro A: dominio → IP del servidor</li>
            <li>Registro CNAME: subdominio → otro dominio</li>
            <li>Propagación DNS: 5min a 48h</li>
          </ol>
        </NestCard>
        <CodeBlock title="Registros DNS" language="bash" code={`# Registro A (dominio → IP)
tusitio.com    A    123.45.67.89

# Registro CNAME (subdominio → dominio)
www            CNAME  tusitio.com
api            CNAME  mi-api.railway.app

# Para Vercel
tusitio.com    A      76.76.21.21
www            CNAME  cname.vercel-dns.com

# Para Netlify
tusitio.com    A      75.2.60.5
www            CNAME  tu-sitio.netlify.app`} />
      </div>
    </div>
  )
}

function DpSsl() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">🔒 SSL / HTTPS</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <NestCard title="¿Qué es SSL?" icon="🔒" variant="green">
          <ul className="space-y-1.5 text-xs">
            <li>✅ <strong>Encripta</strong> la comunicación entre cliente y servidor</li>
            <li>✅ <strong>https://</strong> en vez de http://</li>
            <li>✅ <strong>Candado</strong> en el navegador</li>
            <li>✅ <strong>Obligatorio</strong> para SEO, confianza, y APIs</li>
            <li>✅ <strong>Gratis</strong> con Let's Encrypt / Cloudflare</li>
          </ul>
        </NestCard>
        <NestCard title="¿Dónde se configura?" icon="⚙️" variant="cyan">
          <ul className="space-y-1.5 text-xs">
            <li><span className="text-deploy-green font-bold">Vercel/Netlify</span> — Automático. No hacer nada.</li>
            <li><span className="text-cicd-blue font-bold">Railway/Render</span> — Automático con dominio custom.</li>
            <li><span className="text-nest-yellow font-bold">VPS propio</span> — Certbot + Nginx (ver sección Nginx).</li>
            <li><span className="text-nest-orange font-bold">Cloudflare</span> — Proxy SSL gratis para cualquier sitio.</li>
          </ul>
        </NestCard>
      </div>
    </div>
  )
}

function DpEnv() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">🔐 Variables de Entorno en Producción</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Configurar por plataforma" language="bash" code={`# Vercel
# Dashboard → Settings → Environment Variables
# O con CLI:
vercel env add JWT_SECRET

# Railway
# Dashboard → Variables tab
# O railway.toml

# Render
# Dashboard → Environment → Environment Variables

# Docker
docker run -e JWT_SECRET=valor mi-app
# O en docker-compose.yml:
# environment:
#   - JWT_SECRET=valor

# NUNCA commitear .env a Git
# SIEMPRE .env en .gitignore
# SIEMPRE .env.example con las keys sin valores`} />
        <NestCard title="Variables comunes" icon="📋" variant="red">
          <ul className="space-y-1 text-xs font-code">
            <li>NODE_ENV=production</li>
            <li>PORT=3000</li>
            <li>DATABASE_URL=postgresql://...</li>
            <li>JWT_SECRET=super-secreto</li>
            <li>CORS_ORIGIN=https://tusitio.com</li>
            <li>SMTP_HOST=smtp.gmail.com</li>
            <li>AWS_ACCESS_KEY=...</li>
            <li>REDIS_URL=redis://...</li>
          </ul>
        </NestCard>
      </div>
    </div>
  )
}

function DpMonitor() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">📊 Monitoreo</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <NestCard title="¿Qué monitorear?" icon="📊" variant="cyan">
          <ul className="space-y-1.5 text-xs">
            <li>📈 <strong>Uptime</strong> — ¿Está online? UptimeRobot (gratis)</li>
            <li>⚡ <strong>Performance</strong> — Tiempo de respuesta</li>
            <li>🐛 <strong>Errores</strong> — Sentry (gratis), LogRocket</li>
            <li>📊 <strong>Analytics</strong> — Plausible, Umami (privacy-friendly)</li>
            <li>💾 <strong>Recursos</strong> — CPU, RAM, disco</li>
            <li>📝 <strong>Logs</strong> — Structured logging, Logtail</li>
          </ul>
        </NestCard>
        <NestCard title="Herramientas gratuitas" icon="🧰" variant="green">
          <ul className="space-y-1.5 text-xs">
            <li><span className="text-deploy-green font-bold">UptimeRobot</span> — Ping cada 5min. Alertas email/Slack.</li>
            <li><span className="text-nest-purple font-bold">Sentry</span> — Tracking de errores en frontend y backend.</li>
            <li><span className="text-nest-cyan font-bold">Better Stack</span> — Logs + uptime + status page.</li>
            <li><span className="text-nest-yellow font-bold">Grafana Cloud</span> — Dashboards de métricas. Free tier.</li>
          </ul>
        </NestCard>
      </div>
    </div>
  )
}

export const deployTopics = {
  'dp-intro': DpIntro, 'dp-hosting': DpHosting, 'dp-frontend': DpFrontend,
  'dp-backend': DpBackend, 'dp-domains': DpDomains, 'dp-ssl': DpSsl,
  'dp-env': DpEnv, 'dp-monitor': DpMonitor,
}
