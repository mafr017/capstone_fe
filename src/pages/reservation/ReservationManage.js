import React, { useEffect, useState } from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import { Button, Label, Select, Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'

import { CalendarIcon, HomeIcon, Plus, BackIcon } from '../../icons'
import { useHistory, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useFetcherGlobal } from '../../hooks/fetcherGlobal'
import Cookies from 'js-cookie'

export default function ReservationManage() {
    const navigate = useHistory();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false)
    const [isSuccess, isSuccessSet] = useState(false)
    const [message, messageSet] = useState("")
    const [name, nameSet] = useState("")
    const [idRoom, idRoomSet] = useState(0)
    const [startTimee, startTimeeSet] = useState([])
    const [endTime, endTimeSet] = useState([])
    const [resTime, resTimeSet] = useState()
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onBlur' });
    const startTime = register("startTime", { required: { value: true, message: "Start Time is Required!" } })
    const { fetchData } = useFetcherGlobal();


    const id = useParams().id + ""

    const time = [
        { id: 1, name: "07:00" },
        { id: 2, name: "08:00" },
        { id: 3, name: "09:00" },
        { id: 4, name: "10:00" },
        { id: 5, name: "11:00" },
        { id: 6, name: "12:00" },
        { id: 7, name: "13:00" },
        { id: 8, name: "14:00" },
        { id: 9, name: "15:00" },
        { id: 10, name: "16:00" },
        { id: 11, name: "17:00" },
        { id: 12, name: "18:00" },
        { id: 13, name: "19:00" },
        { id: 14, name: "20:00" },
        { id: 15, name: "21:00" },
    ];

    const backToRoom = () => {
        navigate.push("/app/room-user")
    }

    const getData = async (page) => {
        const dataRoom = await fetchData(null, `/api/v1/rooms/${id}`, `GET`);
        if (dataRoom?.httpStatus) {
            nameSet(() => dataRoom?.data.nameRoom);
            idRoomSet(() => dataRoom?.data.id)
        } else {
            openModalError(() => "Get data Failed!")
        }
    }

    const getDataTime = async (idRoom, reservationDate) => {
        const dataTime = await fetchData(null, `/api/v1/time?idRoom=${idRoom}&reservationDate=${reservationDate}`, `GET`);
        if (dataTime?.httpStatus) {
            if (dataTime?.data != null) {
                resTimeSet(() => dataTime?.data)
                if (dataTime?.data.jam_07 != null) changeStartTime(1)
                if (dataTime?.data.jam_08 != null) changeStartTime(2)
                if (dataTime?.data.jam_09 != null) changeStartTime(3)
                if (dataTime?.data.jam_10 != null) changeStartTime(4)
                if (dataTime?.data.jam_11 != null) changeStartTime(5)
                if (dataTime?.data.jam_12 != null) changeStartTime(6)
                if (dataTime?.data.jam_13 != null) changeStartTime(7)
                if (dataTime?.data.jam_14 != null) changeStartTime(8)
                if (dataTime?.data.jam_15 != null) changeStartTime(9)
                if (dataTime?.data.jam_16 != null) changeStartTime(10)
                if (dataTime?.data.jam_17 != null) changeStartTime(11)
                if (dataTime?.data.jam_18 != null) changeStartTime(12)
                if (dataTime?.data.jam_19 != null) changeStartTime(13)
                if (dataTime?.data.jam_20 != null) changeStartTime(14)
                if (dataTime?.data.jam_21 != null) changeStartTime(15)
            } else {
                startTimeeSet(() => time)
            }
        } else {
            startTimeeSet(() => time)
        }
    }

    function openModal(param) {
        isSuccessSet(() => param)
        setIsModalOpen(true)
    }

    function openModalError(param) {
        messageSet(() => param)
        setIsModalErrorOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
        setIsModalErrorOpen(false)
    }

    const handleRegister = async (data) => {
        data.idUser = parseInt(Cookies.get("id"))
        data.idRoom = idRoom
        data.startTime = time.filter((x) => x.id.toString() === data.startTime)[0].name
        data.endTime = time.filter((x) => x.id.toString() === data.endTime)[0].name
        let response = await fetchData(data, `/api/v1/reservation`, `POST`);
        reset();
        if (response?.httpStatus) {
            openModal(true)
        } else {
            messageSet(() => response?.response?.data?.data)
            openModal(false)
        }
    }

    const onChangeDate = (data) => {
        getDataTime(idRoom, data.target.value)
    }

    const changeStartTime = (data) => {
        const sliceOn = data;
        startTimeeSet((prev) => [...prev].filter((e) => e.id !== data))
    }

    const onChangeStartTime = (data) => {
        const sliceOn = data.target.value;
        endTimeSet(() => time.slice(sliceOn))
    }

    useEffect(() => {
        startTimeeSet(() => time.slice(0, time.length - 1))
        endTimeSet(() => time.slice(1, time.length))
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
                    </button>/ Reservation
                </div>
            </PageTitle>

            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit(handleRegister)}>
                    <Label className="mt-4">
                        <span>Room Name</span>
                        <div className="relative text-gray-500 focus-within:text-purple-600 ">
                            <input
                                className="block w-full mt-1 text-sm text-black focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                placeholder="Please fill Room Name" disabled
                                value={name}
                            />
                        </div>
                        {errors.nameRoom && <span className='text-red-600 mt-1'>{errors?.nameRoom?.message}</span>}
                    </Label>
                    <div className='mt-4 max-w-xs'>
                        <Label>
                            <span>Date</span>
                            <div className="relative text-gray-500 focus-within:text-purple-600">
                                <input
                                    className="block w-full pr-20 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                    placeholder="YYYY-MM-DD"
                                    {...register("reservationDate", { required: { value: true, message: "Reservation Date is Required!" } })}
                                    onChange={(e) => {
                                        onChangeDate(e)
                                    }}
                                />
                                <button className="absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                    <CalendarIcon className="w-5 h-5" aria-hidden="true" />
                                </button>
                            </div>
                            {errors.reservationDate && <span className='text-red-600 mt-1'>{errors?.reservationDate?.message}</span>}
                        </Label>
                    </div>

                    <Label className="mt-4">
                        <span>Start Time</span>
                        <Select className="mt-1 max-w-xs" name="startTime" {...startTime}
                            onChange={(e) => {
                                startTime.onChange(e);
                                onChangeStartTime(e)
                            }}
                            onBlur={startTime.onBlur}
                            ref={startTime.ref}
                        >
                            <option value={""} disabled selected>Select Time</option>
                            {
                                startTimee.map((time, i) => (
                                    <option value={time.id} key={i}>{time.name}</option>
                                ))
                            }
                        </Select>
                        {errors.availableMonth && <span className='text-red-600 mt-1'>{errors?.availableMonth?.message}</span>}
                    </Label>

                    <Label className="mt-4">
                        <span>End Time</span>
                        <Select className="mt-1 max-w-xs" name="endTime" {...register("endTime", { required: { value: true, message: "Start Time is Required!" } })}
                        >
                            <option value={""} disabled selected>Select Time</option>
                            {endTime.map((time, i) => (
                                <option value={time.id} key={i}>{time.name}</option>
                            ))}
                        </Select>
                        {errors.availableMonth && <span className='text-red-600 mt-1'>{errors?.availableMonth?.message}</span>}
                    </Label>

                    <div className='flex justify-center gap-4 mb-5 mt-4'>
                        <div>
                            <Button iconLeft={BackIcon} onClick={backToRoom}>
                                <span>Back</span>
                            </Button>
                        </div>
                        <div>
                            <Button layout="outline" iconRight={Plus} type="submit">
                                <span>Reservation Room</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>Reservation Room {isSuccess ? "Success" : "Failed"} !</ModalHeader>
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

            <Modal isOpen={isModalErrorOpen} onClose={closeModal}>
                <ModalHeader>Something Happen with system!</ModalHeader>
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
