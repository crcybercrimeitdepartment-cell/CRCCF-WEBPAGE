import { motion, useInView } from 'framer-motion'
import { BrainCircuit, ChevronLeft, Users, Award, LineChart, MessageSquare, Lightbulb } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import InteractiveBackground from '../../components/InteractiveBackground'

const MentorshipEvaluation = () => {
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
          {/* Animated Glow Border */}
          <motion.div 
            animate={{ opacity: isInView ? 1 : 0 }}
            className="absolute inset-0 border-4 border-blue-500/20 rounded-3xl md:rounded-[40px] pointer-events-none"
          />

          <div className="flex flex-col items-center text-center relative z-10">
            {/* Step 1 & 3: Icon Animation */}
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

            {/* Step 2: Title centering & scaling */}
            <motion.h2
              animate={{
                scale: isInView ? 1.1 : 1,
                color: isInView ? "#1e3a8a" : "#334155",
              }}
              className="text-xl md:text-3xl font-black mb-4 md:mb-6 transition-colors duration-500"
            >
              {section.title}
            </motion.h2>

            {/* Step 4: Content Fade In */}
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

          {/* Decorative Corner Accents */}
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
      title: "Consistent Guidance",
      text: "At CR Cyber Crime Foundation, we believe that continuous growth and professional development require consistent guidance, performance evaluation, and mentorship throughout the learning journey. Our continuous evaluation and mentorship system is designed to help learners identify their strengths, improve their technical capabilities, and develop the confidence needed to succeed in today’s competitive digital environment. We focus on creating a supportive and growth-oriented ecosystem where every participant receives personalized attention, constructive feedback, and career-focused guidance.",
      icon: <MessageSquare className="text-blue-500" />
    },
    {
      title: "Structured Evaluation",
      text: "At CRCCF, evaluation is not limited to traditional assessments alone. We follow a structured and practical approach that includes regular progress tracking, skill assessments, project reviews, technical discussions, practical task analysis, and performance-based activities to monitor individual learning development effectively. This process allows students to understand their improvement areas, strengthen their technical understanding, and continuously enhance their practical and professional abilities through guided learning methods.",
      icon: <LineChart className="text-indigo-500" />
    },
    {
      title: "Expert Mentorship",
      text: "Our mentorship approach is centered around providing learners with direct access to experienced mentors, industry professionals, and technical experts who actively support students throughout their training and internship journey. Mentors provide technical guidance, practical insights, project assistance, career advice, and industry-oriented knowledge that help participants gain clarity, motivation, and professional direction. Through interactive communication and continuous support, learners are encouraged to ask questions, explore new technologies, and improve their understanding without hesitation.",
      icon: <Users className="text-blue-600" />
    },
    {
      title: "Mindset & Confidence",
      text: "We also emphasize the importance of professional discipline, teamwork, communication skills, analytical thinking, and problem-solving abilities as part of the mentorship process. Our goal is to help learners not only build technical expertise but also develop the mindset, confidence, and professional behavior required in real-world working environments. By maintaining a collaborative and learner-friendly atmosphere, we ensure that students receive continuous encouragement and guidance at every stage of their development.",
      icon: <Lightbulb className="text-green-500" />
    },
    {
      title: "Long-Term Empowerment",
      text: "Through its structured mentorship and evaluation ecosystem, CR Cyber Crime Foundation is committed to empowering students and professionals with the knowledge, confidence, and practical understanding required for long-term growth and career success. By combining continuous assessment, expert mentorship, and industry-oriented learning support, CRCCF aims to nurture future-ready individuals who are capable of adapting to evolving technologies, professional challenges, and modern digital opportunities with competence and confidence.",
      icon: <Award className="text-orange-500" />
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
              <BrainCircuit size={14} /> CONTINUOUS GROWTH
            </div>

            <div className="flex flex-col items-center overflow-hidden mb-6">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex flex-wrap justify-center items-center gap-x-4">
                <motion.span
                  initial={{ x: '-150%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  Continuous Evaluation &
                </motion.span>
                <motion.span
                  initial={{ x: '150%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  Mentorship 🧠👨‍🏫
                </motion.span>
              </h1>
            </div>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Empowering learners through personalized guidance, expert mentorship, and a structured system for continuous professional development.
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
            className="mt-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 text-center text-white shadow-xl relative overflow-hidden max-w-3xl mx-auto"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Get Expert Guidance</h3>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto relative z-10">
              Join our mentorship program and accelerate your career with direct support from industry veterans.
            </p>
            <button 
              onClick={() => navigate('/recruitment')}
              className="relative z-10 px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg active:scale-95"
            >
              Apply Now
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default MentorshipEvaluation
