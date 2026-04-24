import Link from 'next/link'
import Image from 'next/image'
import CustomButton from './CustomButton'

const NavBar = () => {
  return (
    <header className="w-full absolute z-10">
      <nav className='max-w-[1440p] mx-auto
      flex justify-between items-center
      padding-x py-6 sm:px-16 px-6 py-4'>
        <Link href="/" className='flex items-center'>
          <Image src="/logo.svg" alt="Car hub logo" width={118} height={18} className='object-contain' />
        </Link>
        <CustomButton title="Sign In" btnType="button" containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]" />
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          <li className='text-black font-normal cursor-pointer text-lg'>Home</li>
          <li className='text-black font-normal cursor-pointer text-lg'>About</li>
          <li className='text-black font-normal cursor-pointer text-lg'>Contact</li>
        </ul>
      </nav>
      </header>
  )
}

export default NavBar