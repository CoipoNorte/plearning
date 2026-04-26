import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'

export default function CodeBlock({ code, language = 'bash', title }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="nest-card overflow-hidden group hover:border-nest-red/30 transition-colors duration-500"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-nest-surface/50 border-b border-nest-border">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-nest-red/60 group-hover:bg-nest-red transition-colors" />
            <span className="w-2.5 h-2.5 rounded-full bg-nest-yellow/60 group-hover:bg-nest-yellow transition-colors" />
            <span className="w-2.5 h-2.5 rounded-full bg-nest-green/60 group-hover:bg-nest-green transition-colors" />
          </div>
          <span className="text-[11px] text-nest-muted font-code">{title || `file.${language}`}</span>
        </div>
        <button onClick={handleCopy}
          className="p-1.5 rounded-lg hover:bg-nest-hover text-nest-muted hover:text-nest-white transition-all">
          {copied ? <Check size={13} className="text-nest-green" /> : <Copy size={13} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto bg-nest-dark">
        <pre className="font-code text-[13px] leading-relaxed">
          <code className="text-nest-gray">{code.trim()}</code>
        </pre>
      </div>
    </motion.div>
  )
}
