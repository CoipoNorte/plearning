import { motion, AnimatePresence } from 'framer-motion'
import { deployTopics } from '../data/deployTopics'
import { cicdTopics } from '../data/cicdTopics'
import { nginxTopics } from '../data/nginxTopics'
import { linuxTopics } from '../data/linuxTopics'
import TopicNav from './ui/TopicNav'

const allTopics = { ...deployTopics, ...cicdTopics, ...nginxTopics, ...linuxTopics }

export default function ContentArea({ activeTab, activeTopic, setActiveTopic, setActiveTab, sidebarCollapsed }) {
  const TopicComponent = allTopics[activeTopic]
  const info = {
    deploy: { icon: '🚀', name: 'Deploy', desc: 'Pon tu app en internet', color: 'text-deploy-green' },
    cicd: { icon: '⚙️', name: 'CI/CD', desc: 'Automatiza todo', color: 'text-cicd-blue' },
    nginx: { icon: '🌐', name: 'Nginx', desc: 'Servidor web profesional', color: 'text-nginx-green' },
    linux: { icon: '🐧', name: 'Linux', desc: 'El OS de los servidores', color: 'text-linux-yellow' },
  }
  const t = info[activeTab]

  return (
    <div className={`pt-14 min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-12' : 'lg:pl-56'}`}>
      {/* Orbes decorativos */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-20 right-20 w-72 h-72 bg-nest-red/5 rounded-full blur-3xl" />
        <motion.div animate={{ x: [0, -20, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-nest-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        <AnimatePresence mode="wait">
          {TopicComponent ? (
            <motion.div key={activeTopic}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="nest-card p-6 nest-glow"
            >
              <TopicComponent />
              <TopicNav currentTopic={activeTopic} onNavigate={setActiveTopic} onTabChange={setActiveTab} />
            </motion.div>
          ) : (
            <motion.div key="welcome"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="nest-card p-16 text-center nest-glow relative overflow-hidden"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-20 -right-20 w-60 h-60 border border-nest-red/10 rounded-full" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-20 -left-20 w-80 h-80 border border-nest-cyan/10 rounded-full" />
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl mb-6 relative z-10">{t.icon}</motion.div>
              <h2 className={`text-3xl font-extrabold ${t.color} mb-2 relative z-10`}>{t.name}</h2>
              <p className="text-nest-gray mb-8 relative z-10">{t.desc}</p>
              <div className="nest-card p-4 max-w-sm mx-auto text-left text-sm text-nest-muted relative z-10">
                <p>👈 Selecciona un tema del sidebar</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
