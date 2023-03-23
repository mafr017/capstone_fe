import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useFetcherGlobal } from '../hooks/fetcherGlobal'

import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'

function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccess, isSuccessSet] = useState(false)
  const [message, messageSet] = useState("")
  const { fetchDataAuth } = useFetcherGlobal()
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ mode: 'onBlur' })
  const password = useRef({})

  password.current = watch("password", "")

  function openModal(param) {
    isSuccessSet(() => param)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const handleRegister = async (data) => {
    let response = await fetchDataAuth(data, `/api/v1/auth/register`, `POST`)
    reset()
    if (response?.httpStatus) {
      openModal(true)
    } else {
      if (response?.response?.data?.data?.includes("constraint")) {
        messageSet(() => "User already exist!")
        openModal(false)
      } else {
        openModal(false)
      }
    }
  }

  return (
    <>
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
                <form onSubmit={handleSubmit(handleRegister)}>
                  <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Create account
                  </h1>
                  <Label>
                    <span>First Name *</span>
                    <Input className="mt-1" type="text" placeholder="Enter your First Name" {...register("firstName", { required: { value: true, message: "First Name is Required!" } })} />
                    {errors.firstName && <span className='text-red-600 mt-1'>{errors?.firstName?.message}</span>}
                  </Label>

                  <Label className="mt-4">
                    <span>Last Name</span>
                    <Input className="mt-1" type="text" placeholder="Enter your Last Name"  {...register("lastName")} />
                  </Label>

                  <Label className="mt-4">
                    <span>Username *</span>
                    <Input className="mt-1" type="text" placeholder="Enter your username" {...register("username", {
                      required: { value: true, message: "username is Required!" },
                      minLength: { value: 4, message: 'At least 4 characters' }
                    })} />
                    {errors.username && <span className='text-red-600 mt-1'>{errors?.username?.message}</span>}
                  </Label>

                  <Label className="mt-4">
                    <span>Email *</span>
                    <Input className="mt-1" type="email" placeholder="Enter your name@server.domain" {...register("email", { required: { value: true, message: "email is Required!" } })} />
                    {errors.email && <span className='text-red-600 mt-1'>{errors?.email?.message}</span>}
                  </Label>

                  <Label className="mt-4">
                    <span>Password *</span>
                    <Input className="mt-1" placeholder="***************" type="password" {...register("password", {
                      required: { value: true, message: "Password is Required!" },
                      minLength: { value: 8, message: 'At least 8 characters' },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: "At least 1 lowercase, 1 uppercase, 1 number, 1 special character '@$!%*?&'"
                      }
                    })} />
                    {errors.password && <span className='text-red-600 mt-1'>{errors?.password?.message}</span>}
                  </Label>

                  <Label className="mt-4">
                    <span>Confirm password *</span>
                    <Input className="mt-1" placeholder="***************" type="password" {...register("rePassword", {
                      required: { value: true, message: "Password is Required!" },
                      validate: value => value === password.current || "The passwords do not match"
                    })} />
                    {errors.rePassword && <span className='text-red-600 mt-1'>{errors?.rePassword?.message}</span>}
                  </Label>

                  <Button type="submit" block className="mt-4">
                    Create account
                  </Button>

                  <hr className="my-8" />

                  <p className="mt-4 text-center">
                    <Link
                      className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                      to="/login"
                    >
                      Already have an account? Login
                    </Link>
                  </p>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Create User {isSuccess ? "Success" : "Failed"} !</ModalHeader>
        {
          message !== "" ?
            <ModalBody>
              {message}
            </ModalBody>
            : null
        }
        <ModalFooter>
          <div className="sm:block text-center">
            <Button layout="outline" onClick={closeModal}>
              OK
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default Login
