import { motion, useInView } from 'framer-motion'
import { Laptop, ChevronLeft, Rocket, Cpu, Globe,  Terminal, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import InteractiveBackground from '../../components/InteractiveBackground'

const PracticalTraining = () => {
  const navigate = useNavigate()

  const ScrollActiveCard = ({ section }) => {
    const cardRef = useRef(null)
    const isInView = useInView(cardRef, { 
      margin: "-30% 0px -30% 0px", 
      once: false 
    })

    return (
      <div className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center">
        <motion.div
          ref={cardRef}
          animate={{
            scale: isInView ? 1.05 : 0.95,
            opacity: isInView ? 1 : 0.4,
            boxShadow: isInView 
              ? "0 25px 50px -12px rgba(37, 99, 235, 0.25)" 
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            borderColor: isInView ? "#bfdbfe" : "#f1f5f9"
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full max-w-4xl bg-white rounded-3xl md:rounded-[40px] p-6 md:p-12 border-2 transition-all duration-700 relative overflow-hidden`}
        >
          <motion.div 
            animate={{ opacity: isInView ? 1 : 0 }}
            className="absolute inset-0 border-4 border-blue-500/20 rounded-3xl md:rounded-[40px] pointer-events-none"
          />

          <div className="flex flex-col items-center text-center relative z-10">
            <motion.div
              animate={{
                y: isInView ? 0 : 20,
                scale: isInView ? 1.2 : 1,
                marginBottom: isInView ? "24px" : "12px",
                backgroundColor: isInView ? "#eff6ff" : "#f8fafc"
              }}
              transition={{ duration: 0.7, ease: "circOut" }}
              className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-inner border border-slate-100"
            >
              {section.icon}
            </motion.div>

            <motion.h2
              animate={{
                scale: isInView ? 1.1 : 1,
                color: isInView ? "#1e3a8a" : "#334155",
              }}
              className="text-xl md:text-3xl font-black mb-4 md:mb-6 transition-colors duration-500"
            >
              {section.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl"
            >
              <p className="text-slate-600 leading-relaxed text-sm md:text-lg font-medium italic">
                "{section.text}"
              </p>
            </motion.div>
          </div>

          <motion.div 
            animate={{ rotate: isInView ? 90 : 0, opacity: isInView ? 0.3 : 0 }}
            className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-blue-400 rounded-tr-xl"
          />
          <motion.div 
            animate={{ rotate: isInView ? -90 : 0, opacity: isInView ? 0.3 : 0 }}
            className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-blue-400 rounded-bl-xl"
          />
        </motion.div>
      </div>
    )
  }

  const content = [

    {
      title: "Real-Time Exposure",
      text: "At CR Cyber Crime Foundation, we strongly believe that practical experience is one of the most important aspects of professional learning and skill development. Our hands-on training and practical sessions are designed to provide learners with real-time exposure, technical understanding, and industry-relevant experience that goes beyond traditional classroom-based education. We focus on helping participants transform theoretical concepts into practical implementation through interactive learning methodologies and technology-driven training environments.",
      icon: <Terminal className="text-blue-500" />
    },
    {
      title: "Active Participation",
      text: "At CRCCF, students are encouraged to actively participate in live projects, practical exercises, technical workshops, simulations, and real-world problem-solving activities that enhance their confidence and strengthen their technical capabilities. Our practical sessions are carefully structured to provide direct exposure to modern tools, frameworks, software systems, cybersecurity practices, and advanced technologies used in today’s professional ecosystem. This approach helps learners understand how technologies are applied in real industry scenarios while improving their analytical thinking and decision-making abilities.",
      icon: <Cpu className="text-indigo-500" />
    },
    {
      title: "Multi-Domain Expertise",
      text: "We provide training across multiple domains including cybersecurity, software development, digital investigation concepts, Artificial Intelligence, cloud technologies, web development, mobile applications, testing practices, and modern IT solutions. Every session is guided by experienced mentors and industry-oriented professionals who focus on building practical understanding, innovation, teamwork, and technical efficiency among learners. Through continuous interaction and guided implementation, students gain valuable insights into professional workflows, project execution methods, and technology integration processes.",
      icon: <Globe className="text-blue-600" />
    },
    {
      title: "Problem Solving & Creativity",
      text: "Our practical learning environment is designed to encourage creativity, experimentation, and continuous improvement while helping participants develop problem-solving skills and professional confidence. We focus on creating an engaging and supportive ecosystem where learners can explore technologies, work on practical assignments, and strengthen their real-world technical expertise through consistent practice and hands-on exposure.",
      icon: <Settings className="text-green-500" />
    },
    {
      title: "Bridging the Gap",
      text: "By integrating practical learning with modern technologies and industry-oriented approaches, CR Cyber Crime Foundation aims to prepare students and professionals for real-world challenges, evolving digital environments, and future career opportunities. Our goal is to bridge the gap between academic learning and industry expectations by delivering meaningful practical exposure, technical excellence, and professional readiness that empower individuals to grow successfully in the modern digital era.",
      icon: <Rocket className="text-orange-500" />
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <InteractiveBackground />
      
      <main className="pt-32 pb-24 px-4 relative">
        <div className="max-w-5xl mx-auto relative z-10">

          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white text-blue-600 rounded-full text-xs font-black mb-6 border border-blue-100 shadow-sm animate-float">
              <Laptop size={14} /> PRACTICAL SESSIONS
            </div>

            <div className="flex flex-col items-center overflow-hidden mb-6">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex flex-wrap justify-center items-center gap-x-4">
                <motion.span
                  initial={{ x: '-150%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  Hands-on Training &
                </motion.span>
                <motion.span
                  initial={{ x: '150%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  Practical Sessions 💻⚙️
                </motion.span>
              </h1>
            </div>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Transforming theoretical knowledge into real-world technical expertise through immersive, industry-driven practical sessions.
            </p>
          </motion.div>

          {/* Scroll Animation Flow Grid */}
          <div className="flex flex-col gap-32 py-20">
            {content.map((section, index) => (
              <ScrollActiveCard key={index} section={section} />
            ))}
          </div>


          {/* Bottom Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 text-center text-white shadow-xl relative overflow-hidden max-w-3xl mx-auto"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Gain Practical Mastery</h3>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto relative z-10">
              Work on live projects and industry-standard tools under the guidance of expert technical mentors.
            </p>
            <button 
              onClick={() => navigate('/recruitment')}
              className="relative z-10 px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg active:scale-95"
            >
              Start Training
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default PracticalTraining
