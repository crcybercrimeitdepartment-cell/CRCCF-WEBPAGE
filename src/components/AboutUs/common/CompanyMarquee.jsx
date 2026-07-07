import Cloudinary from '../../../constants/Cloudinary';
import { motion } from 'framer-motion'
const logo = Cloudinary.logoIile24;

const marqueeItems = [
  'CR Cyber Crime Foundation',
  'CR Cyber Crime Foundation',
  'CR Cyber Crime Foundation',
  'CR Cyber Crime Foundation',
]

const MarqueeContent = () => {
  return (
    <div className="flex items-center shrink-0">
      {marqueeItems.map((item, index) => (
        <div key={index} className="flex items-center mx-8 shrink-0">
          <img loading="lazy" decoding="async"
            src={logo}
            alt="CRCCF logo"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0"
          />

          <span className="mx-4 text-[#0F172A] font-bold text-xl sm:text-2xl tracking-wide uppercase whitespace-nowrap">
            {item}
          </span>

          <img loading="lazy" decoding="async"
            src={logo}
            alt="CRCCF logo"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0"
          />
        </div>
      ))}
    </div>
  )
}

const CompanyMarquee = ({ direction = 'left' }) => {
  const isRight = direction === 'right'

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex w-max"
        animate={{
          x: isRight ? ['-50%', '0%'] : ['0%', '-50%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: 'linear',
        }}
      >
        <MarqueeContent />
        <MarqueeContent />
      </motion.div>
    </div>
  )
}

export default CompanyMarquee