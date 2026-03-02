'use client'

import React from 'react'
import style from './style.module.css'
import Link from 'next/link'
import Button from '../Button'
import { Menu } from 'lucide-react'

const Navbar = () => {

    const [resNav, setResNav] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    const handleNav = () => {
        setResNav(!resNav)
    }

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

  return (
    <div className={`${style.navbar} ${scrolled ? style.scrolled : ""}`}>
        <div className={`${style.wrapper} ${scrolled ? style.wrapperScrolled : ""}`}>
            <div className={style.logo}>
                <Link href="/">JayOne</Link>
            </div>

            <div className={style.navLinks}>
                <Link href="/">Home</Link>
                <Link href="/about-us">About Us</Link>
                <Link href="/our-programs">Programs</Link>
                <Link href="/contact-us">Contact us</Link>
            </div>

            <div className={style.navBtn}>
                <Button variant='primary' href='/apply-now'>Apply Now</Button>
            </div>

            <div onClick={handleNav} className={style.resIcon}>
                <Menu />
            </div>
        </div>

        <div className={`${style.resNavLinks} ${resNav ? style.activeResNav : ""}`}>
            <div className={style.links}>
                <Link href="/">Home</Link>
                <Link href="/about-us">About Us</Link>
                <Link href="/our-programs">Programs</Link>
                <Link href="/contact-us">Contact us</Link>
            </div>
            <Button variant='primary' fullWidth href='/apply-now'>
                Apply Now
            </Button>
        </div>
    </div>
  )
}

export default Navbar
