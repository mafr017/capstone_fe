import React, { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'

import PageTitle from '../../components/Typography/PageTitle'
import { useFetcherGlobal } from '../../hooks/fetcherGlobal';
import {
    Button,
    TableBody,
    TableContainer,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    TableFooter,
    Pagination,
    Modal, ModalHeader, ModalBody, ModalFooter
} from '@windmill/react-ui'

import { useHistory } from 'react-router-dom'

function RoomsUser() {
    const navigate = useHistory();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [message, messageSet] = useState("")
    const [dataTable2, setDataTable2] = useState([])
    const [resultsPerPage, setResultsPerPage] = useState(6)
    const [totalOfPages, setTotalOfPages] = useState(4)
    const { fetchData } = useFetcherGlobal();

    const goAddRoom = (id) => {
        navigate.push(`/app/reservation/manage/${id}`)
    }

    function openModal(param) {
        messageSet(() => param)
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    const getData = async (page) => {
        const dataRoom = await fetchData(null, `/api/v1/rooms/pagination?size=${5}&page=${page - 1}&sort=id,asc`, `GET`);
        if (dataRoom?.httpStatus) {
            setDataTable2(dataRoom?.data.data)
            setResultsPerPage(() => 5)
            setTotalOfPages(() => dataRoom?.data?.totalOfItems)
        } else {
            openModal("Get data Failed!")
        }
    }

    function onPageChangeTable2(p) {
        getData(p)
    }

    useEffect(() => {
    }, [resultsPerPage, totalOfPages])

    return (
        <>
            <PageTitle>Rooms</PageTitle>

            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

                <TableContainer className="mb-8 mt-4">
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>ID</TableCell>
                                <TableCell>Room Name</TableCell>
                                <TableCell>Room Type</TableCell>
                                <TableCell>Capacity</TableCell>
                                <TableCell>Available From</TableCell>
                                <TableCell>Available To</TableCell>
                                <TableCell>Actions</TableCell>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {dataTable2.map((user, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <span className="text-sm">{user.id}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{user.nameRoom}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{user.typeRoom.name}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{user.capacity}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{moment(user.availableFrom).format('LL')}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{moment(user.availableTo).format('LL')}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Button layout="outline" aria-label="Edit" onClick={() => goAddRoom(user.id)}>
                                                Book
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TableFooter>
                        <Pagination
                            totalResults={resultsPerPage}
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

export default RoomsUser
