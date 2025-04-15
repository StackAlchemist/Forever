import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 

  const onSubmitHandler = async (event) =>{
    event.preventDefault();
    try {
      
      if(currentState === 'Sign Up'){

        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else{
          toast.error(response.data.message)
        }


      }else{
        const response = await axios.post(backendUrl + '/api/user/login', {email, password})

        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else{
          toast.error(response.data.message)
        }
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-500'>
        
        {/* Heading */}
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>
        
        {/* Sign Up / Login */}
        {
          currentState === 'Sign Up' ? (
            <input onChange={(e)=>setName(e.target.value)} value={name} type='text' placeholder='Name' className='border border-gray-800 w-full outline-none px-3 py-2' required />
          ) : ''
        }
        
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type='email' placeholder='Email Address' className='border border-gray-800 w-full outline-none px-3 py-2 mt-2' required />
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type='password' placeholder='Password' className='border border-gray-800 w-full outline-none px-3 py-2 mt-2' required />

        <div className='w-full flex justify-between text-sm mt-[-4px]'>
          <p className='cursor-pointer'>
            Forget your password?
          </p>
          {
            currentState === 'Sign Up'? (
              <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>
                Login Here
              </p>
            ) : (
              <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>
                Create Account
              </p>
            )
          }
        </div>
        <button className='cursor-pointer bg-black text-white px-4 py-2 border'>{currentState === 'Sign Up' ? 'Sign In' : 'Login'}</button>
    </form>
  )
}

export default Login