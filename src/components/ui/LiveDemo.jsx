import { motion } from 'framer-motion'

export default function LiveDemo({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="nest-card overflow-hidden hover:border-nest-cyan/20 transition-colors duration-500"
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-nest-surface/50 border-b border-nest-border">
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-nest-green"
        />
        <span className="text-[11px] text-nest-muted">{title || 'Preview'}</span>
      </div>
      <div className="p-5">{children}</div>
    </motion.div>
  )
}
