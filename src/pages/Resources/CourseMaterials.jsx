import { motion, useInView } from 'framer-motion'
import { BookOpen, ChevronLeft, GraduationCap, BrainCircuit, Target, ShieldCheck, Rocket } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import InteractiveBackground from '../../components/InteractiveBackground'

const CourseMaterials = () => {
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
      title: "Core Philosophy",
      text: "At the core of CR Cyber Crime Foundation, we believe that quality education, practical knowledge, and industry-oriented learning are essential for building future-ready professionals in today’s rapidly evolving digital world. Our comprehensive course materials are carefully designed to provide students with a strong academic foundation combined with real-world industry understanding across cybersecurity, software development, digital technologies, Artificial Intelligence, and advanced IT domains.",
      icon: <GraduationCap className="text-blue-500" />
    },
    {
      title: "Beyond Theory",
      text: "At CRCCF, the learning resources are not limited to basic theoretical concepts. We provide structured, research-driven, and professionally organized study materials that simplify complex technologies and help learners understand modern digital systems with clarity and confidence. Every module is developed with a balanced approach that combines theoretical learning, practical implementation, real-time examples, case studies, and project-based exposure to create a complete and engaging learning experience for every participant.",
      icon: <BrainCircuit className="text-indigo-500" />
    },
    {
      title: "Industry Standards",
      text: "Our course materials are continuously updated according to current industry standards, emerging technologies, evolving cybersecurity trends, and modern digital practices to ensure that students remain aligned with real-world industry requirements. From cybersecurity awareness and ethical practices to software development, digital investigation concepts, cloud technologies, and advanced IT solutions, our content covers multiple domains in a professional, accessible, and future-focused manner.",
      icon: <Target className="text-blue-600" />
    },
    {
      title: "Learning Ecosystem",
      text: "Through the learning ecosystem of CR Cyber Crime Foundation (Cyber Revolution), students gain access to well-organized educational resources, practical references, technical guidance, and career-oriented knowledge that support skill enhancement, innovation, analytical thinking, and problem-solving abilities. We focus on creating an environment where learners can strengthen both technical expertise and professional confidence through continuous learning and practical exposure.",
      icon: <ShieldCheck className="text-green-500" />
    },
    {
      title: "Future Empowerment",
      text: "By combining research-driven content, modern technologies, real-world exposure, and continuous mentorship support, CRCCF aims to empower students and professionals with the knowledge and skills required to succeed in today’s competitive digital landscape. Our goal is not only to educate learners but also to prepare them for real-world challenges, professional environments, and future career opportunities while contributing towards building a secure, innovative, and future-ready digital ecosystem for all.",
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
              <BookOpen size={14} /> KNOWLEDGE HUB
            </div>

            <div className="flex flex-col items-center overflow-hidden mb-6">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex flex-wrap justify-center items-center gap-x-4">
                <motion.span
                  initial={{ x: '-150%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  Comprehensive
                </motion.span>
                <motion.span
                  initial={{ x: '150%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  Course Materials 📚
                </motion.span>
              </h1>
            </div>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Empowering the next generation of digital professionals with research-driven, industry-aligned educational resources.
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
            className="mt-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white shadow-xl relative overflow-hidden max-w-3xl mx-auto"
          >
            {/* Abstract shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Ready to start your journey?</h3>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto relative z-10">
              Join our internship programs and gain access to these comprehensive materials along with hands-on training and mentorship.
            </p>
            <button 
              onClick={() => navigate('/recruitment')}
              className="relative z-10 px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg active:scale-95"
            >
              Explore Opportunities
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default CourseMaterials
