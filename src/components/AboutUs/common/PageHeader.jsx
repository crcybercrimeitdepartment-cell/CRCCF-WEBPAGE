import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"

const PageHeader = ({ 
  title = "About Us — Fighting Cyber Threats with Innovation", 
  description = "We empower individuals and organizations by combating cybercrime through awareness, research, and advanced technological solutions — ensuring a secure and trustworthy digital environment.",
  Icon = ShieldCheck
}) => {
  return (
    <div className="relative mb-10">
      {/* Background Gradient */}
      <div className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-3xl shadow-xl px-6 py-10 text-center overflow-hidden">

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

        {/* Animated Icon */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md shadow-lg"
        >
          <Icon className="w-10 h-10 text-white" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative mt-4 text-sm sm:text-base md:text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Decorative Light Circle */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}

export default PageHeader