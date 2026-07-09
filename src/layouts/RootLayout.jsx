import { Outlet } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import TopBar from '../components/TopBar'
import Navbar from '../components/Navbar'
import GlobalNavigation from '../components/common/GlobalNavigation'

const Footer = lazy(() => import('../components/Footer'))

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main className="flex-grow relative">
        <GlobalNavigation />
        <Outlet />
      </main>
      <Suspense fallback={<div className="h-40" />}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default RootLayout
