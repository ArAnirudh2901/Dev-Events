'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import posthog from 'posthog-js'

const Navbar = () => {
  const handleLogoClick = () => {
    posthog.capture('logo_clicked', {
      nav_location: 'header',
    });
  };

  const handleNavClick = (linkName) => {
    posthog.capture(`nav_${linkName}_clicked`, {
      nav_location: 'header',
    });
  };

  return (
    <header>
      <nav>
        <Link href='/' className='logo' onClick={handleLogoClick}>
          <Image src='/icons/logo.png' alt='Logo Image' width={24} height={24} />
          <p>DevEvents</p>
        </Link>

        <ul>
          <Link href='/' onClick={() => handleNavClick('home')}>Home</Link>
          <Link href='/events' onClick={() => handleNavClick('events')}>Events</Link>
          <Link href='/create' onClick={() => handleNavClick('create_event')}>Create Event</Link>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar