import React, { useState, useRef, useEffect } from 'react'
import LOGO from '../assets/logo.png'
import { IoRocketSharp } from 'react-icons/io5'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)
const Header = () => {
  const logoRef = useRef(null)
  const headerRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useGSAP(() => {
    const animation = gsap.to(logoRef.current, {
      rotate: 720,
      repeat: -1,
      duration: 8,
      ease: 'linear',
      delay: 1,
    })

    // Stop animation after 15 seconds
    setTimeout(() => {
      animation.kill()
    }, 20000)
  }, [])

  const HandleNav = () => {
    alert(
      'Currently this feature is not available.Click on GET STARTED to use Thynk',
    )
  }

  return (
    <header
      ref={headerRef}
      className={` ${isScrolled ? 'hdr_cntnt  flex scrollActive ' : 'hdr_cntnt  flex '
        }`}
    >
      <div className="img_cntr flex">
        <img ref={logoRef} src={LOGO} className=""></img>
        <p className="font_type_lght">Thynk </p>
      </div>
      <nav className="">
        <ul className="">
          <li>
            <a href="#about" onClick={HandleNav}>
              About
            </a>
          </li>
          <li>
            <a href="#features" onClick={HandleNav}>
              Features
            </a>
          </li>
          <li>
            <a href="#pricing" onClick={HandleNav}>
              Pricing
            </a>
          </li>
          <li>
            <a href="#contact" onClick={HandleNav}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <div style={{ paddingTop: '20px' }}>
        <Link
          to="/playground"
          className={` ${isScrolled ? 'btn_scrolled' : 'button-52'}`}
        >
          {' '}
          Get Started
          <span style={{ paddingLeft: '3px' }}>
            {' '}
            <IoRocketSharp />{' '}
          </span>{' '}
        </Link>
      </div>
    </header>
  )
}

export default Header
