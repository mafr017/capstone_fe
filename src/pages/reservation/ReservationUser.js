import React, { useEffect, useState } from 'react'

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
    Label,
    Modal, ModalHeader, ModalBody, ModalFooter
} from '@windmill/react-ui'

import { Cross, SearchIcon } from '../../icons'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie';

function ReservationUser() {

    const navigate = useHistory();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSuccess, isSuccessSet] = useState(false)
    const [message, messageSet] = useState("")

    const [pageTable2, setPageTable2] = useState(1)
    const [dataTable2, setDataTable2] = useState([])
    const [resultsPerPage, setResultsPerPage] = useState(6)
    const [totalOfPages, setTotalOfPages] = useState(4)

    // Hooks
    const { fetchData } = useFetcherGlobal();
    const getData = async (page) => {
        const dataRoom = await fetchData(null, `/api/v1/reservation/${Cookies.get("id")}?size=${5}&page=${page - 1}&sort=id,asc`, `GET`);
        if (dataRoom?.httpStatus) {
            setDataTable2(dataRoom?.data.data)
            setResultsPerPage(() => 5)
            setTotalOfPages(() => dataRoom?.data?.totalOfItems)
        } else {
            alert("Get data Failed!")
        }
    }

    // pagination change control
    function openModal(param) {
        messageSet(() => "{ id: " + param.id + ", room: " + param.room + ", date: " + new Date(param.date).toLocaleDateString() + " }")
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    // pagination change control
    function onPageChangeTable2(p) {
        getData(p)
    }

    useEffect(() => {
    }, [resultsPerPage, totalOfPages])

    return (
        <>
            <PageTitle>Rooms</PageTitle>

            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">

                <div className='flex justify-between'>
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
                </div>

                <TableContainer className="mb-8">
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
                                        <span className="text-sm">{user.reservationDate}</span>
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
                                        <Badge type={user.status == "Accepted" ? "success"
                                            : (user.status == "Pending" ? "primary"
                                                : (user.status == "Refused" ? "danger" : "base"))}
                                        >{user.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center">
                                            {
                                                user.status != "Refused" ?
                                                    <Button layout="link" size="icon" aria-label="Cancel" onClick={() => openModal(user)}>
                                                        <Cross className="w-5 h-5 text-red-500" aria-hidden="true" />
                                                    </Button>
                                                    :
                                                    <Button layout="link" size="icon" aria-label="Cancel" disabled>
                                                        <Cross className="w-5 h-5 text-gray-500" aria-hidden="true" />
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
                <ModalHeader>Are you sure to refuse reservation?</ModalHeader>
                <ModalBody>{message}</ModalBody>
                <ModalFooter>
                    <div className="sm:block text-center">
                        <Button layout="primary" onClick={closeModal}>
                            No
                        </Button>
                    </div>
                    <div className="sm:block text-center">
                        <Button layout="outline" onClick={closeModal}>
                            Yes
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>

        </>
    )
}

export default ReservationUser
