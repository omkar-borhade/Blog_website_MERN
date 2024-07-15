import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import{AiOutlineSearch} from 'react-icons/ai';
import {FaMoon} from 'react-icons/fa';

function Header() {
    const  path=useLocation().pathname;
  return (
    <div>
        <Navbar className=' border-b-2'>
           <Link to='#' className='whitespace-nowrap, text-sm sm:text-xl font-semibold  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white px-2' >
           Info Blogs
           </Link>
           <form >
            <TextInput 
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            />
           </form>
           <Button color='gray' className='w-10 h-9 lg:hidden' pill 
           ><AiOutlineSearch /></Button>
           <div className="flex gap-2 md:order-2">
            <Button  className=' w-12 h-10 hidden sm:inline' color='gray' pill>
                <FaMoon/>
            </Button>
            <Link to='#' >
            <Button gradientDuoTone='purpleToBlue'>   Sign In</Button>
         
            </Link>
            <Navbar.Toggle/>
            
           </div>
           <Navbar.Collapse> 
                <Navbar.Link active={path =="/"} as={'div'}>
                    <Link to='#'>Home</Link>
                   
                  
                </Navbar.Link >
                <Navbar.Link  active={path =="#"}as={'div'}>
                 
                    <Link to='#'>About</Link>
                   
                  
                </Navbar.Link>
                <Navbar.Link active={path =="#"} as={'div'}>
                    
                    <Link to='#'>Project</Link>
                  
                </Navbar.Link>
            </Navbar.Collapse>

        </Navbar>
    </div>
  )
}

export default Header