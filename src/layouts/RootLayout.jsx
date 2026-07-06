
import { Outlet } from 'react-router-dom'
import TopBar from '../components/TopBar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GlobalNavigation from '../components/common/GlobalNavigation'

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main className="flex-grow relative">
        <GlobalNavigation />
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
