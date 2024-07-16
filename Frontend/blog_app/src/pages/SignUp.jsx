import React from 'react'
import {Link} from 'react-router-dom'
import{Button, Label, TextInput} from 'flowbite-react'
export default function SignUp() {
  return (
    <div className=" min-h-screen mt-20">

      <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row  md:items-center gap-5">


        <div className="flex-1">
        <Link to='/' className='whitespace-nowrap text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500   hover:from-pink-500 hover:to-yellow-500 rounded-lg text-white px-2 py-2' >
           Info Blogs
           </Link>
           <p className=' text-sm mt-5'>
           <Link to='/sign-in'className='text-blue-500'>
          Sign In
          </Link>  below to explore our latest articles, engage with our community, and stay updated with the latest insights.

</p>
        </div>

        <div className="flex-1">
        <form className='flex flex-col gap-4'>
        <div>
        <Label value='your username'/>
        <TextInput 
        type='text'
        placeholder='Username'
        id='username'/>
        </div>
          
        <div>
        <Label value='your email'/>
        <TextInput 
        type='text'
        placeholder='email'
        id='username'/>
        </div>

        <div>
        <Label value='your password'/>
        <TextInput 
        type='text'
        placeholder='password'
        id='username'/>
        </div>

        <Button gradientMonochrome="lime" outline type='submit'>
          Sign UP
        </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Have an account?</span>
          <Link to='/sign-in'className='text-blue-500'>
          Sign In
          </Link>
        </div>
        
        

      </div>
      

      </div>



      

    </div>
  )
}

