import React, { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'

import PageTitle from '../../components/Typography/PageTitle'
import { useFetcherGlobal } from '../../hooks/fetcherGlobal'
import {
    Button,
    TableBody,
    TableContainer,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    TableFooter,
    Badge,
    Pagination,
    Modal, ModalHeader, ModalBody, ModalFooter
} from '@windmill/react-ui'

import { Check, Cross } from '../../icons'
import Cookies from 'js-cookie'

function Reservation() {
    const [dataTable2, setDataTable2] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false)
    const [isAccepted, isAcceptedSet] = useState(false)
    const [message, messageSet] = useState("")
    const [resultsPerPage, setResultsPerPage] = useState(6)
    const [totalOfPages, setTotalOfPages] = useState(4)
    const [idReservation, idReservationSet] = useState(0)
    const { fetchData } = useFetcherGlobal()

    const getData = async (page) => {
        var paramUrl = ``
        if (Cookies.get("role") === "user") {
            paramUrl = `/${Cookies.get("id")}`
        }
        const dataRoom = await fetchData(null, `/api/v1/reservation${paramUrl}?size=${5}&page=${page - 1}&sort=id,asc`, `GET`)
        if (dataRoom?.httpStatus) {
            setDataTable2(dataRoom?.data.data)
            setResultsPerPage(() => 5)
            setTotalOfPages(() => dataRoom?.data?.totalOfItems)
        } else {
            openModalError(() => "Get data Failed!")
        }
    }

    function openModal(param, isAccepted) {
        isAcceptedSet(() => isAccepted)
        messageSet(() => "{ id: " + param.id + ", room: " + param.nameRoom + ", date: " + param.reservationDate + " }")
        idReservationSet(() => param.id)
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

    const handleAccept = async () => {
        let response = await fetchData(null, `/api/v1/reservation/${isAccepted ? `accept` : `reject`}/${idReservation}`, `GET`)
        if (response?.httpStatus) {
            openModal(true)
        } else {
            openModalError(() => response?.response?.data?.data)
        }
        setIsModalOpen(false)
        onPageChangeTable2(1)
    }

    function onPageChangeTable2(p) {
        getData(p)
    }

    useEffect(() => {
    }, [resultsPerPage, totalOfPages])

    return (
        <>
            <PageTitle>Reservation</PageTitle>

            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">

                {/* <div className='flex justify-between'>
                    <div className='w-1/4 mb-5 my-auto'>
                        <Label className="mt-4">
                            <div className="relative text-gray-500 focus-within:text-purple-600">
                                <input
                                    className="block w-full pr-20 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                    placeholder="Search..."
                                />
                                <button className="absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                    <SearchIcon className="w-5 h-5" aria-hidden="true" />
                                </button>
                            </div>
                        </Label>
                    </div>
                </div> */}

                <TableContainer className="mt-4 mb-8">
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>No</TableCell>
                                <TableCell>ID Booking</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>Room</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {dataTable2.map((user, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <span className="text-sm">{i + 1}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{user.id}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{moment(user.reservationDate).format('LL')}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{user.startTime} WIB</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{user.endTime} WIB</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{user.nameUser}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{user.nameRoom}</span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge type={user.status === "Accepted" ? "success"
                                            : (user.status === "Rejected" ? "danger" : "base")}
                                        >{user.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            {
                                                user.status === "Accepted" ?
                                                    <Button layout="link" size="icon" aria-label="reject" onClick={() => openModal(user, false)}>
                                                        <Cross className="w-5 h-5 text-red-500" aria-hidden="true" />
                                                    </Button>
                                                    :
                                                    <Button layout="link" size="icon" aria-label="accept" onClick={() => openModal(user, true)}>
                                                        <Check className="w-5 h-5 text-green-500" aria-hidden="true" />
                                                    </Button>
                                            }
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TableFooter>
                        <Pagination
                            totalResults={totalOfPages}
                            resultsPerPage={5}
                            onChange={onPageChangeTable2}
                            label="Table navigation"
                        />
                    </TableFooter>
                </TableContainer>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>Are you sure to {isAccepted ? "accept" : "reject"} reservation?</ModalHeader>
                <ModalBody>{message}</ModalBody>
                <ModalFooter>
                    <div className="sm:block text-center">
                        <Button layout="primary" onClick={closeModal}>
                            No
                        </Button>
                    </div>
                    <div className="sm:block text-center">
                        <Button layout="outline" onClick={handleAccept}>
                            Yes
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

export default Reservation
