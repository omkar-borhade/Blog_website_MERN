import{ useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import{Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
import axios from 'axios'
export default function SignIn() {
  const[formData,setFormData]=useState({});
  const [errorMessage,setErrorMessage]=useState(null);
  const [loading ,setLoading]=useState(false);
  const navigate =useNavigate();
  const handleChange =(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()});
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!formData.email ||!formData.password){
      return setErrorMessage('Please fill out all fields.');
    }
    setLoading(true)
    setErrorMessage(null);
    axios.post('/api/auth/signin',formData,{
      headers: {
        'Content-Type': 'application/json',
        
      }
    })
    .then(response => {
    
      const data = response.data
     
      if (data.success=== false)
      {
        return setErrorMessage(data.message)

      }
     
      setLoading(false)
      
      if (response.status >= 200 && response.status < 300) {
        navigate('/');
      }
    })
    .catch(error => {
      
      setErrorMessage(error.response.data.message)
     setLoading(false)
    });
  }
  return (
    <div className=" min-h-screen mt-20">

      <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row  md:items-center gap-5">


        <div className="flex-1">
        <Link to='/' className='whitespace-nowrap text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500   hover:from-pink-500 hover:to-yellow-500 rounded-lg text-white px-2 py-2' >
           Info Blogs
           </Link>
           <p className=' text-sm mt-5'>
            sign in below to explore our latest articles, engage with our community, and stay updated with the latest insights.

</p>
        </div>

        <div className="flex-1">
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>    
        <div>
        <Label value='your email'/>
        <TextInput 
        type='email'
        placeholder='user@gmail.com'
        id='email'
        onChange={handleChange} />
        </div>

        <div>
        <Label value='your password'/>
        <TextInput 
        type='password'
        placeholder='****'
        id='password'
        onChange={handleChange} />
        </div>

        <Button gradientMonochrome="lime" outline type='submit' disabled={loading}>
        {
          loading?(
            <>
            <Spinner size='sm'/>
            <span className='pl-3'>Loading...</span>
            </>
          ):'Sign In'
        }
        </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Don't have an account?</span>
          <Link to='/sign-up'className='text-blue-500'>
          Sign UP
          </Link>
        </div>
        {
          errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>)
          

        }
        
        

      </div>
      

      </div>



      

    </div>
  )
}

