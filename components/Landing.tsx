import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import OptionsSection from './OptionsSection'
// import Footer from './Footer'
import ContentSection from './ContentSection'

const Landing = () => {
  return (
    <div>
      <div className='bg-[url(https://images.pexels.com/photos/1655166/pexels-photo-1655166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-no-repeat bg-cover bg-center'>
        <Navbar />
        <HeroSection />
      </div>
      <OptionsSection />
      <ContentSection />
      {/* <Footer /> */}
    </div>
  )
}

export default Landing