import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const topicsByTab = {
  deploy: [
    { id: 'dp-intro', label: 'Qué es Deploy', icon: '📖' },
    { id: 'dp-hosting', label: 'Plataformas', icon: '☁️' },
    { id: 'dp-frontend', label: 'Deploy Frontend', icon: '🎨' },
    { id: 'dp-backend', label: 'Deploy Backend', icon: '⚙️' },
    { id: 'dp-domains', label: 'Dominios y DNS', icon: '🌍' },
    { id: 'dp-ssl', label: 'SSL/HTTPS', icon: '🔒' },
    { id: 'dp-env', label: 'Variables entorno', icon: '🔐' },
    { id: 'dp-monitor', label: 'Monitoreo', icon: '📊' },
  ],
  cicd: [
    { id: 'ci-intro', label: 'Qué es CI/CD', icon: '📖' },
    { id: 'ci-github', label: 'GitHub Actions', icon: '🐙' },
    { id: 'ci-pipeline', label: 'Pipeline completo', icon: '🔄' },
    { id: 'ci-testing', label: 'Testing automático', icon: '🧪' },
    { id: 'ci-docker', label: 'CI/CD + Docker', icon: '🐳' },
    { id: 'ci-tips', label: 'Tips', icon: '💡' },
  ],
  nginx: [
    { id: 'nx-intro', label: 'Qué es Nginx', icon: '📖' },
    { id: 'nx-config', label: 'Configuración', icon: '⚙️' },
    { id: 'nx-proxy', label: 'Reverse Proxy', icon: '🔄' },
    { id: 'nx-ssl', label: 'SSL Certbot', icon: '🔒' },
  ],
  linux: [
    { id: 'lx-intro', label: 'Linux esencial', icon: '📖' },
    { id: 'lx-server', label: 'Server setup', icon: '🖥️' },
    { id: 'lx-security', label: 'Seguridad', icon: '🛡️' },
    { id: 'lx-full', label: 'Deploy completo', icon: '🏆' },
  ],
}

const tabActive = {
  deploy: 'text-deploy-green border-deploy-green bg-deploy-green/10',
  cicd: 'text-cicd-blue border-cicd-blue bg-cicd-blue/10',
  nginx: 'text-nginx-green border-nginx-green bg-nginx-green/10',
  linux: 'text-linux-yellow border-linux-yellow bg-linux-yellow/10',
}
const tabHover = {
  deploy: 'hover:text-deploy-green hover:bg-deploy-green/5',
  cicd: 'hover:text-cicd-blue hover:bg-cicd-blue/5',
  nginx: 'hover:text-nginx-green hover:bg-nginx-green/5',
  linux: 'hover:text-linux-yellow hover:bg-linux-yellow/5',
}
const tabLabel = { deploy: '🚀 Deploy', cicd: '⚙️ CI/CD', nginx: '🌐 Nginx', linux: '🐧 Linux' }

export default function Sidebar({ activeTab, activeTopic, setActiveTopic, collapsed, setCollapsed }) {
  const topics = topicsByTab[activeTab] || []
  const isMobile = () => window.innerWidth < 1024
  const handleSelect = (id) => { setActiveTopic(id); if (isMobile()) setCollapsed(true) }

  return (
    <>
      <AnimatePresence>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setCollapsed(true)} />
        )}
      </AnimatePresence>
      <motion.aside
        animate={{ width: collapsed ? (window.innerWidth >= 1024 ? 48 : 0) : 224 }}
        transition={{ duration: 0.3 }}
        className="fixed top-14 left-0 bottom-0 z-40 glass-dark border-r border-nest-border overflow-hidden flex flex-col"
      >
        {!collapsed && (
          <div className="px-4 py-3 border-b border-nest-border/50">
            <p className="text-[11px] text-nest-muted font-bold uppercase tracking-widest">{tabLabel[activeTab]}</p>
          </div>
        )}
        <div className="flex-1 overflow-y-auto py-1">
          {!collapsed && topics.map((topic, i) => (
            <motion.button key={topic.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleSelect(topic.id)}
              className={`w-full text-left px-4 py-2.5 flex items-center gap-2.5 text-[12px] font-semibold transition-all border-l-2 ${
                activeTopic === topic.id ? tabActive[activeTab] : `text-nest-gray border-transparent ${tabHover[activeTab]}`
              }`}>
              <span className="text-sm w-5 text-center">{topic.icon}</span>
              <span className="truncate">{topic.label}</span>
            </motion.button>
          ))}
          {collapsed && topics.map(topic => (
            <button key={topic.id}
              onClick={() => { setActiveTopic(topic.id); if (!isMobile()) setCollapsed(false) }}
              className={`hidden lg:block w-full py-2.5 text-center text-xs transition-all ${
                activeTopic === topic.id ? tabActive[activeTab] : `text-nest-muted ${tabHover[activeTab]}`
              }`} title={topic.label}>{topic.icon}</button>
          ))}
        </div>
        <button onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center py-3 border-t border-nest-border/50 text-nest-muted hover:text-nest-red transition-colors">
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </motion.aside>
    </>
  )
}
