import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const allTopicsOrdered = [
  { id: 'dp-intro', label: 'Qué es Deploy', tab: 'deploy' },
  { id: 'dp-hosting', label: 'Plataformas', tab: 'deploy' },
  { id: 'dp-frontend', label: 'Deploy Frontend', tab: 'deploy' },
  { id: 'dp-backend', label: 'Deploy Backend', tab: 'deploy' },
  { id: 'dp-domains', label: 'Dominios y DNS', tab: 'deploy' },
  { id: 'dp-ssl', label: 'SSL/HTTPS', tab: 'deploy' },
  { id: 'dp-env', label: 'Variables de entorno', tab: 'deploy' },
  { id: 'dp-monitor', label: 'Monitoreo', tab: 'deploy' },
  { id: 'ci-intro', label: 'Qué es CI/CD', tab: 'cicd' },
  { id: 'ci-github', label: 'GitHub Actions', tab: 'cicd' },
  { id: 'ci-pipeline', label: 'Pipeline completo', tab: 'cicd' },
  { id: 'ci-testing', label: 'Testing automático', tab: 'cicd' },
  { id: 'ci-docker', label: 'CI/CD + Docker', tab: 'cicd' },
  { id: 'ci-tips', label: 'Tips', tab: 'cicd' },
  { id: 'nx-intro', label: 'Qué es Nginx', tab: 'nginx' },
  { id: 'nx-config', label: 'Configuración', tab: 'nginx' },
  { id: 'nx-proxy', label: 'Reverse Proxy', tab: 'nginx' },
  { id: 'nx-ssl', label: 'SSL con Certbot', tab: 'nginx' },
  { id: 'lx-intro', label: 'Linux esencial', tab: 'linux' },
  { id: 'lx-server', label: 'Server setup', tab: 'linux' },
  { id: 'lx-security', label: 'Seguridad', tab: 'linux' },
  { id: 'lx-full', label: 'Deploy completo', tab: 'linux' },
]

const tabColors = {
  deploy: 'border-deploy-green/30 text-deploy-green hover:bg-deploy-green/10',
  cicd: 'border-cicd-blue/30 text-cicd-blue hover:bg-cicd-blue/10',
  nginx: 'border-nginx-green/30 text-nginx-green hover:bg-nginx-green/10',
  linux: 'border-linux-yellow/30 text-linux-yellow hover:bg-linux-yellow/10',
}

export default function TopicNav({ currentTopic, onNavigate, onTabChange }) {
  const idx = allTopicsOrdered.findIndex(t => t.id === currentTopic)
  if (idx === -1) return null
  const prev = idx > 0 ? allTopicsOrdered[idx - 1] : null
  const next = idx < allTopicsOrdered.length - 1 ? allTopicsOrdered[idx + 1] : null
  const progress = Math.round(((idx + 1) / allTopicsOrdered.length) * 100)

  const handleNav = (topic) => {
    if (topic.tab !== allTopicsOrdered[idx].tab) onTabChange(topic.tab)
    onNavigate(topic.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mt-10 pt-6 border-t border-nest-border">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xs text-nest-muted font-code">{idx + 1}/{allTopicsOrdered.length}</span>
        <div className="flex-1 h-1.5 bg-nest-surface rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #ea2845, #ff6b9d, #00d4ff)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <span className="text-xs gradient-text-nest font-bold">{progress}%</span>
      </div>
      <div className="flex justify-between gap-3">
        {prev ? (
          <motion.button whileHover={{ x: -3 }} onClick={() => handleNav(prev)}
            className={`flex items-center gap-2 flex-1 text-left px-4 py-3 rounded-xl nest-card border ${tabColors[prev.tab]} text-xs transition-all`}>
            <ChevronLeft size={14} />
            <div><div className="text-[10px] text-nest-muted">← anterior</div><div className="font-semibold">{prev.label}</div></div>
          </motion.button>
        ) : <div className="flex-1" />}
        {next ? (
          <motion.button whileHover={{ x: 3 }} onClick={() => handleNav(next)}
            className={`flex items-center justify-end gap-2 flex-1 text-right px-4 py-3 rounded-xl nest-card border ${tabColors[next.tab]} text-xs transition-all`}>
            <div><div className="text-[10px] text-nest-muted">siguiente →</div><div className="font-semibold">{next.label}</div></div>
            <ChevronRight size={14} />
          </motion.button>
        ) : (
          <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2, repeat: Infinity }}
            className="flex-1 nest-card rounded-xl p-3 text-center border border-nest-green/30">
            <span className="gradient-text-nest text-xs font-bold">🚀 ¡Curso completado!</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
