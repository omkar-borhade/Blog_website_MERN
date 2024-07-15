

function Login() {
  return (
    <>
    
    <form className="flex flex-col ">

      <label className=''>Your Email</label>
      <input   type="email" name='email' placeholder='enter youer email' />
      <label className=''>Your Password</label>
      <input type="password" name='password'placeholder="*****" />
      <button >Sign In</button>
    </form>
    </>
  )
}

export default Login