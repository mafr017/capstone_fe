import React, { useEffect, useState } from 'react'

import PageTitle from '../../components/Typography/PageTitle'
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
    Pagination,
    Badge
} from '@windmill/react-ui'

import { EditIcon, HeartIcon, MailIcon, Plus, TrashIcon } from '../../icons'
import { useHistory } from 'react-router-dom'

function RoomsUser() {
    const [pageTable2, setPageTable2] = useState(1)
    const [dataTable2, setDataTable2] = useState([])
    const navigate = useHistory();

    const goAddRoom = () => {
        navigate.push("/app/reservation/manage")
    }

    // pagination setup
    const resultsPerPage = 10
    const totalResults = response.length

    // pagination change control
    function onPageChangeTable2(p) {
        setPageTable2(p)
    }

    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        setDataTable2(response.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
    }, [pageTable2])

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
                                        <span className="text-sm">{user.name}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{user.job}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{user.amount}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge type={user.status}>{user.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Button layout="outline" aria-label="Edit" onClick={goAddRoom}>
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
                            totalResults={totalResults}
                            resultsPerPage={resultsPerPage}
                            onChange={onPageChangeTable2}
                            label="Table navigation"
                        />
                    </TableFooter>
                </TableContainer>
            </div>

        </>
    )
}

export default RoomsUser
