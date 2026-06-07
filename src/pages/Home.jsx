import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import DashboardPreview from '../components/DashBoardPreview'
import AICapabilities from '../components/AICapabilities'
import Testimonials from '../components/Testimonial'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Features/>
      <HowItWorks/>
      <DashboardPreview/>
      <AICapabilities/>
      <Testimonials/>
      <Pricing/>
      <FAQ/>
      <CTA/>
    </div>
  )
}

export default Home
