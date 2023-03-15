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
    Badge,
    Pagination,
    Label,
} from '@windmill/react-ui'

import { Check, Cross, Plus, SearchIcon } from '../../icons'
import { useHistory } from 'react-router-dom'

function Reservation() {
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
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
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
                                        <span className="text-sm">{user.amount}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{user.name}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{user.amount}</span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge type={user.status}>{user.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Button layout="link" size="icon" aria-label="Edit">
                                                <Check className="w-5 h-5 text-green-500" aria-hidden="true" />
                                            </Button>
                                            <Button layout="link" size="icon" aria-label="Delete">
                                                <Cross className="w-5 h-5 text-red-500" aria-hidden="true" />
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

export default Reservation
