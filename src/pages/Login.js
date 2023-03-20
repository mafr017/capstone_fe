import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'
import { useFetcherGlobal } from '../hooks/fetcherGlobal';

function Login({ loginSet }) {
  // State

  // Hooks
  const { fetchDataAuth } = useFetcherGlobal();

  const { register, handleSubmit, reset, formState: { errors, touchedFields } } = useForm({ mode: 'onBlur' });

  // Func
  const handleLogin = async (dataa) => {

    console.log(dataa);
    let response = await fetchDataAuth(dataa, `/api/v1/auth/login`, `POST`);
    reset();
    if (response) {
      // Set Cookies Data User
      Cookies.set("id", response.data.id);
      Cookies.set("username", response.data.username);
      Cookies.set("email", response.data.email);
      Cookies.set("firstName", response.data.firstName);
      Cookies.set("lastName", response.data.lastName);
      Cookies.set("role", response.data.role);
      Cookies.set("token", response.data.accessToken);
      loginSet(true);
    } else {
      alert("Wrong Email or Password!")
    }
  }

  // Use Effect
  // console.log({ errors, touchedFields })

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
              <form onSubmit={
                handleSubmit(handleLogin)
              }>
                <div className='grid'>
                  {/* register your input into the hook by invoking the "register" function */}
                  <Label>
                    <span>Username</span>
                    <Input type="text" className="mt-2" placeholder="Your Username" {...register("username", { required: { value: true, message: "username is Required!" } })} />
                    {errors.username && <span className='text-red-600 mt-1'>{errors?.username?.message}</span>}
                  </Label>

                  <Label className="mt-5">
                    <span>Password</span>
                    <Input type="password" className="mt-2" placeholder="***********" {...register("password", { required: { value: true, message: "Password is Required!" } })} />
                    {errors.password && <span className='text-red-600 mt-1'>{errors?.password?.message}</span>}
                  </Label>

                  <Button className="mt-5" block type="submit">Submit</Button>
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
