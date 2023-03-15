import React from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import { Input, Button, Label, Select, Textarea } from '@windmill/react-ui'

import { CalendarIcon, HomeIcon, MailIcon, Plus } from '../../icons'
import { useHistory } from 'react-router-dom'

function ReservationManage() {
    const navigate = useHistory();

    const backToRoom = () => {
        navigate.push("/app/reservation")
    }

    return (
        <>
            <PageTitle>
                <div className='flex'>
                    <button className='font-bold mr-1' onClick={backToRoom}>
                        <div className='flex'>
                            <HomeIcon className="w-5 h-auto mr-1" />
                            <span>Rooms</span>
                        </div>
                    </button>/ Reservation
                </div>
            </PageTitle>

            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">
                <Label className="mt-4">
                    <span>Room Name</span>
                    <div className="relative text-gray-500 focus-within:text-purple-600 ">
                        <input
                            className="block w-full mt-1 text-sm text-black focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Please fill Room Name" value={"Chandler Jacobi"} disabled
                        />
                    </div>
                </Label>
                <div className='mt-4'>
                    <Label>
                        <span>Date</span>
                        <div className="relative text-gray-500 focus-within:text-purple-600">
                            <input
                                className="block w-full pr-20 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                placeholder="YYYY-MM-DD"
                            />
                            <button className="absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                <CalendarIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                    </Label>
                </div>

                <Label className="mt-4">
                    <span>Start Time</span>
                    <Select className="mt-1">
                        <option>07:00</option>
                        <option>08:00</option>
                        <option>09:00</option>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>13:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                        <option>17:00</option>
                        <option>18:00</option>
                        <option>19:00</option>
                        <option>20:00</option>
                        <option>21:00</option>
                    </Select>
                </Label>

                <Label className="mt-4">
                    <span>Start Time</span>
                    <Select className="mt-1">
                        <option>08:00</option>
                        <option>09:00</option>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>13:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                        <option>17:00</option>
                        <option>18:00</option>
                        <option>19:00</option>
                        <option>20:00</option>
                        <option>21:00</option>
                    </Select>
                </Label>

                <div className='flex justify-center gap-4 mb-5 mt-4'>
                    <div>
                        <Button iconRight={Plus} onClick={backToRoom}>
                            <span>Back</span>
                        </Button>
                    </div>
                    <div>
                        <Button layout="outline" iconRight={Plus} onClick={backToRoom}>
                            <span>Save Room</span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReservationManage
