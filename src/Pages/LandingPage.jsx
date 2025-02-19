import { useGSAP } from '@gsap/react'
import React from 'react'
import { useRef } from 'react'
import { useState, useEffect } from 'react'

import { gsap } from 'gsap'
import hrElm from '../assets/hrElm.gif'
import Loader from '../assets/loader.gif'

import Header from '../components/Header'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  const [isActive, setIsActive] = useState(false)
  const infoRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  useGSAP(() => {
    // First animation (height) then opacity
    gsap.fromTo(
      infoRef.current,
      {
        // Starting heigh
        opacity: 0, // Starting opacity
      },
      {
        delay: 1.5,
        duration: 3,

        opacity: 1,

        ease: 'linear',
      },
    )
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  return (
    <>
      {isLoading ? (
        <div className="loading_screen">
          {' '}
          <img src={Loader}></img>
        </div>
      ) : (
        <div className="">
          <Header />
          <div className="main_container ">
            <main>
              <section className="sctn_hero  grid ">
                <div className="left_sctn ">
                  <p>WHAT IS MIND MAPPING ?</p>
                  <h3>The Evolution Of Creative Journaling Starts Here.</h3>
                  <div className="info_sctn">
                    <p>
                      Discover clarity with AI-enhanced mind mapping. Organize
                      your ideas, connect insights, and explore relationships
                      visually through an interactive concept graph, empowering
                      you to brainstorm, reflect, and evolve your creative
                      process.
                      <span
                        ref={infoRef}
                        className={` ${isActive ? '' : 'inactive'}`}
                      >
                        {' '}
                        Elevate your thinking with dynamic visual maps,
                        seamlessly integrating AI-driven analysis for
                        streamlined organization, deep reflection, and enhanced
                        creative growth.
                      </span>{' '}
                    </p>

                    <div className="btn_cntnr flex">
                      <button
                        className="btn_seeMore"
                        onClick={() => setIsActive(true)}
                      >
                        See more
                      </button>

                      <Link to="/playground" className="btn">
                        Try now{' '}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="right_sctn ">
                  <img src={hrElm}></img>
                </div>
              </section>
            </main>
          </div>
        </div>
      )}
    </>
  )
}

export default LandingPage
