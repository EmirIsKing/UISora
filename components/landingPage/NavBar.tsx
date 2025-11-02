import React from 'react'
import { Navbar03 } from '../ui/shadcn-io/navbar-03'
import Logo from '../Logo'

const NavBar = () => {

  interface Navbar03NavItem {
    href?: string;
    label: string;
    active?: boolean;
  }
  
  const NavigationLinks: Navbar03NavItem[] = [
    { href: '/', label: 'Home', active: true },
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it Works' },
    { href: '#pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },

  ];

  return (
    /*
    <nav className='w-full top-0 z-50 h-14 bg-white border-b border-[#e5e7eb] flex items-center justify-between px-14
    backdrop-blur-sm bg-opacity-90 max-md:px-4'>
        <span>UISora</span>
        <div className='flex items-center gap-4'>
            <Link href='#feature'  className={`text-[#6b7280] hover:text-[#543cf3]`}>Features</Link>
            <Link href='#how-it-works' className={`text-[#6b7280] hover:text-[#543cf3]`}>How it works</Link>
            <Link href='#pricing' className={`text-[#6b7280] hover:text-[#543cf3]`}>Pricing</Link>
            <Link href='/sign-in' className={`text-[#6b7280] hover:text-[#543cf3]`}>Sign In</Link>
            <SignUp/>
        </div>
    </nav>
    */
   <Navbar03 signInHref='/sign-in' ctaHref='/sign-up' navigationLinks={NavigationLinks} logoHref='/' logo={<Logo variant='gradient'/>}/>
  )
}

export default NavBar