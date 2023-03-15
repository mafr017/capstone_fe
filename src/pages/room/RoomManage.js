import React from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import { Input, Button, Label, Select, Textarea } from '@windmill/react-ui'

import { HomeIcon, MailIcon, Plus } from '../../icons'
import { useHistory } from 'react-router-dom'

function RoomManage() {
    const navigate = useHistory();

    const backToRoom = () => {
        navigate.push("/app/room")
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
                    </button>/ Manage
                </div>
            </PageTitle>

            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">
                <Label className="mt-4">
                    <span>Room Name</span>
                    <div className="relative text-gray-500 focus-within:text-purple-600 ">
                        <input
                            className="block w-full mt-1 text-sm text-black focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Please fill Room Name"
                        />
                    </div>
                </Label>

                <Label className="mt-4">
                    <span>Capacity</span>
                    <div className="relative text-gray-500 focus-within:text-purple-600 ">
                        <input type='number'
                            className="block w-full mt-1 text-sm text-black focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Please fill Room Capacity"
                        />
                    </div>
                </Label>

                <div className="mt-4">
                    {/* TODO: Check if this label is accessible, or fallback */}
                    {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
                    <Label>Type</Label>
                    <div className="mt-2">
                        <Label radio>
                            <Input type="radio" value="01" name="roomType" />
                            <span className="ml-2">Conference</span>
                        </Label>
                        <Label className="ml-6" radio>
                            <Input type="radio" value="02" name="roomType" />
                            <span className="ml-2">Classroom</span>
                        </Label>
                        <Label className="ml-6" radio>
                            <Input type="radio" value="03" name="roomType" />
                            <span className="ml-2">Theater</span>
                        </Label>
                    </div>
                </div>

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

export default RoomManage
