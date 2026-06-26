import CompanyMarquee from '../components/Service/common/CompanyMarquee'
import ServicesKeyboard from '../components/Service/services/ServicesKeyboard'
import { motion } from 'framer-motion'
import PageHeader from '../components/AboutUs/common/PageHeader'

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        <PageHeader 
          title="Cyber Security & Software Solutions" 
          description="We provide a powerful combination of cyber security services and software solutions designed to address modern digital challenges. Our goal is to create secure, efficient, and future-ready digital environments."
        />
        <CompanyMarquee direction="right" />

        <div className="py-12">
          <ServicesKeyboard />
        </div>

        <CompanyMarquee direction="left" />

      </main>
    </div>
  )
}

export default ServicesPage
