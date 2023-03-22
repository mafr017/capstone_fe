import React, { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'

import PageTitle from '../../components/Typography/PageTitle'
import { useFetcherGlobal } from '../../hooks/fetcherGlobal'
import response from '../../utils/demo/tableData'
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

import { CalendarIcon, Check, Cross } from '../../icons'
import Cookies from 'js-cookie'

function Report() {
    const [pageTable2, setPageTable2] = useState(1)
    const [dataTable2, setDataTable2] = useState([])
    const [resultsPerPage, setResultsPerPage] = useState(6)
    const [totalOfPages, setTotalOfPages] = useState(4)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [message, messageSet] = useState("")

    function openModal(param) {
        messageSet(() => param)
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    // Hooks
    const { fetchData } = useFetcherGlobal();
    const getData = async (page) => {
        var paramUrl = ``
        if (Cookies.get("role") == "user") {
            paramUrl = `/${Cookies.get("id")}`
        }
        const dataRoom = await fetchData(null, `/api/v1/reservation${paramUrl}?size=${5}&page=${page - 1}&sort=id,asc`, `GET`);
        if (dataRoom?.httpStatus) {
            setDataTable2(dataRoom?.data.data)
            setResultsPerPage(() => 5)
            setTotalOfPages(() => dataRoom?.data?.totalOfItems)
        } else {
            openModal("Get data Failed!")
        }
    }

    // pagination change control
    function onPageChangeTable2(p) {
        getData(p)
    }

    useEffect(() => {
    }, [resultsPerPage, totalOfPages])

    return (
        <>
            <PageTitle>Report Reservations Meeting Room</PageTitle>

            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">

                {/* <div className='flex justify-start mb-5 mt-4'>
                    <div className='w-1/4 my-auto mr-5'>
                        <Label>
                            Start Date
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
                    <div className='w-1/4 my-auto'>
                        <Label>
                            End Date
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
                                        <Badge type={user.status == "Accepted" ? "success"
                                            : (user.status == "Pending" ? "primary"
                                                : (user.status == "Rejected" ? "danger" : "base"))}
                                        >{user.status}</Badge>
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
                <ModalHeader>Something Happen with system!</ModalHeader>
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

export default Report
