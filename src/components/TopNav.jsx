import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'

const tabs = [
  { id: 'deploy', label: 'Deploy', icon: '🚀', color: 'text-deploy-green border-deploy-green/30 bg-deploy-green/10' },
  { id: 'cicd', label: 'CI/CD', icon: '⚙️', color: 'text-cicd-blue border-cicd-blue/30 bg-cicd-blue/10' },
  { id: 'nginx', label: 'Nginx', icon: '🌐', color: 'text-nginx-green border-nginx-green/30 bg-nginx-green/10' },
  { id: 'linux', label: 'Linux', icon: '🐧', color: 'text-linux-yellow border-linux-yellow/30 bg-linux-yellow/10' },
]

export default function TopNav({ activeTab, setActiveTab, onToggleSidebar }) {
  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 h-14 glass-dark"
    >
      <div className="flex items-center h-full px-4">
        <button onClick={onToggleSidebar} className="lg:hidden p-1.5 mr-3 text-nest-muted hover:text-nest-red transition-colors">
          <Menu size={20} />
        </button>
        <motion.div className="flex items-center gap-2.5 mr-6" whileHover={{ scale: 1.05 }}>
          <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-2xl">🚀</motion.span>
          <span className="font-extrabold text-lg gradient-text-nest hidden sm:inline">plearning</span>
        </motion.div>
        <div className="h-6 w-px bg-nest-border mr-4" />
        <div className="flex items-center gap-1.5">
          {tabs.map((tab, i) => (
            <motion.button key={tab.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                activeTab === tab.id ? tab.color : 'text-nest-muted border-transparent hover:text-nest-white hover:bg-nest-hover'
              }`}>
              <span className="text-sm">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
