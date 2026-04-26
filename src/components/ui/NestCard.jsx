import { motion } from 'framer-motion'

export default function NestCard({ title, icon, variant = 'default', children, delay = 0 }) {
  const variants = {
    default: 'border-nest-border hover:border-nest-gray-dark',
    red: 'border-nest-red/20 bg-nest-red/5 hover:border-nest-red/40',
    cyan: 'border-nest-cyan/20 bg-nest-cyan/5 hover:border-nest-cyan/40',
    green: 'border-nest-green/20 bg-nest-green/5 hover:border-nest-green/40',
    yellow: 'border-nest-yellow/20 bg-nest-yellow/5 hover:border-nest-yellow/40',
    purple: 'border-nest-purple/20 bg-nest-purple/5 hover:border-nest-purple/40',
    blue: 'border-nest-blue/20 bg-nest-blue/5 hover:border-nest-blue/40',
    orange: 'border-nest-orange/20 bg-nest-orange/5 hover:border-nest-orange/40',
  }
  const titleColors = {
    default: 'text-nest-white', red: 'text-nest-red-light', cyan: 'text-nest-cyan',
    green: 'text-nest-green', yellow: 'text-nest-yellow', purple: 'text-nest-purple',
    blue: 'text-nest-blue', orange: 'text-nest-orange',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`nest-card p-5 transition-all duration-500 cursor-default ${variants[variant]}`}
    >
      {title && (
        <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-nest-border/50">
          {icon && <motion.span whileHover={{ rotate: 15, scale: 1.2 }} className="text-lg">{icon}</motion.span>}
          <h4 className={`text-sm font-bold ${titleColors[variant]}`}>{title}</h4>
        </div>
      )}
      <div className="text-sm text-nest-gray leading-relaxed">{children}</div>
    </motion.div>
  )
}
