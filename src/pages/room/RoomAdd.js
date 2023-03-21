import React, { useEffect, useState } from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import { Button, Label, Select, Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'

import { BackIcon, HomeIcon, Plus } from '../../icons'
import { useHistory } from 'react-router-dom'
import { useFetcherGlobal } from '../../hooks/fetcherGlobal'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'

function RoomAdd() {
    const navigate = useHistory();
    const [dataTypeRoom, dataTypeRoomSet] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSuccess, isSuccessSet] = useState(false)
    const [message, messageSet] = useState("")

    const month = [
        { id: "01", name: "January" },
        { id: "02", name: "February" },
        { id: "03", name: "March" },
        { id: "04", name: "April" },
        { id: "05", name: "May" },
        { id: "06", name: "June" },
        { id: "07", name: "July" },
        { id: "08", name: "August" },
        { id: "09", name: "September" },
        { id: "10", name: "October" },
        { id: "11", name: "November" },
        { id: "12", name: "December" }
    ];
    const d = new Date();
    let months = month.slice(d.getMonth());

    const backToRoom = () => {
        navigate.push("/app/room")
    }

    // Hooks
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onBlur' });
    const { fetchData } = useFetcherGlobal();
    const getData = async (page) => {
        const dataRoom = await fetchData(null, `/api/v1/type-room`, `GET`);
        if (dataRoom) {
            dataTypeRoomSet(() => dataRoom?.data)
        } else {
            alert("Get data Failed!")
        }
    }

    // Func
    function openModal(param) {
        isSuccessSet(() => param)
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    const handleRegister = async (data) => {
        data.availableYear = d.getFullYear()
        data.byAdmin = Cookies.get("id")
        let response = await fetchData(data, `/api/v1/rooms`, `POST`);
        reset();
        if (response?.httpStatus) {
            openModal(true)
        } else {
            messageSet(() => response?.response?.data?.data)
            openModal(false)
        }
    }

    useEffect(() => {
        getData();
    }, [])

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
                <form onSubmit={handleSubmit(handleRegister)}>
                    <Label className="mt-4">
                        <span>Room Name</span>
                        <div className="relative text-gray-500 focus-within:text-purple-600 ">
                            <input
                                className="block w-full mt-1 text-sm text-black focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                placeholder="Please fill Room Name"
                                {...register("nameRoom", { required: { value: true, message: "Room Name is Required!" } })}
                            />
                        </div>
                        {errors.nameRoom && <span className='text-red-600 mt-1'>{errors?.nameRoom?.message}</span>}
                    </Label>

                    <Label className="mt-4">
                        <span>Capacity</span>
                        <div className="relative text-gray-500 focus-within:text-purple-600 ">
                            <input type='number'
                                className="block w-full mt-1 text-sm text-black focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                placeholder="Please fill Room Capacity"
                                {...register("capacity", { required: { value: true, message: "Capacity is Required and should number!" } })}
                            />
                        </div>
                        {errors.capacity && <span className='text-red-600 mt-1'>{errors?.capacity?.message}</span>}
                    </Label>

                    <Label className="mt-4">
                        <span>Type Room</span>

                        <Select className="mt-1" name="idType" {...register("idType", {
                            required: { value: true, message: "Type Room is Required!" }
                        })}>
                            <option value={""} disabled selected>Select Type Room</option>
                            {dataTypeRoom.map((typeRoom, i) => (
                                <option value={typeRoom.id} key={i}>{typeRoom.name}</option>
                            ))}
                        </Select>
                        {errors.idType && <span className='text-red-600 mt-1'>{errors?.idType?.message}</span>}
                    </Label>

                    <Label className="mt-4">
                        <span>Available For Month</span>
                        <Select className="mt-1" name="availableMonth" {...register("availableMonth", {
                            required: { value: true, message: "Available Month is Required!" }
                        })}>
                            <option value={""} disabled selected>Select Month</option>
                            {months.map((month, i) => (
                                <option value={month.id} key={i}>{month.name}</option>
                            ))}
                        </Select>
                        {errors.availableMonth && <span className='text-red-600 mt-1'>{errors?.availableMonth?.message}</span>}
                    </Label>

                    <div className='flex justify-center gap-4 mb-5 mt-4'>
                        <div>
                            <Button iconRight={BackIcon} onClick={backToRoom}>
                                <span>Back</span>
                            </Button>
                        </div>
                        <div>
                            <Button layout="outline" iconRight={Plus} type="submit">
                                <span>Save Room</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>Create Room {isSuccess ? "Success" : "Failed"} !</ModalHeader>
                {
                    message != "" ?
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

export default RoomAdd
