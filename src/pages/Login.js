import React from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { setUserData } from "../store/reducer-me";
import { useForm } from "react-hook-form";

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'

function Login({ loginSet }) {
  // State

  // Hooks
  const { register, handleSubmit, formState: { errors, touchedFields } } = useForm({ mode: 'onBlur' });
  const dispatch = useDispatch();
  // Func
  const handleLogin = (data) => {
    console.log(data);
    dispatch(setUserData({ name: 'ilham', email: 'ilham@gmail.com' }))
    loginSet(true);
  }
  // Use Effect
  console.log({ errors, touchedFields })

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className='grid'>
                  {/* register your input into the hook by invoking the "register" function */}
                  <Label>
                    <span>Email</span>
                    <Input type="email" className="mt-2" placeholder="your@email.com" {...register("email", { required: { value: true, message: "Email is Required!" } })} />
                    {errors.email && <span className='text-red-600 mt-1'>{errors?.email?.message}</span>}
                  </Label>

                  <Label className="mt-5">
                    <span>Password</span>
                    <Input type="password" className="mt-2" placeholder="***********" {...register("password", { required: { value: true, message: "Password is Required!" } })} />
                    {errors.password && <span className='text-red-600 mt-1'>{errors?.password?.message}</span>}
                  </Label>

                  <Button className="mt-5" block type="submit">submit</Button>
                </div>
              </form>


              <hr className="mt-5" />

              <p className="mt-1 text-center">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
