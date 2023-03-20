import React, { useEffect, useState } from 'react'

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
    Pagination
} from '@windmill/react-ui'

import { useHistory } from 'react-router-dom'

function RoomsUser() {
    // State
    const navigate = useHistory();
    const [dataTable2, setDataTable2] = useState([])
    const [resultsPerPage, setResultsPerPage] = useState(6)
    const [totalOfPages, setTotalOfPages] = useState(4)

    const goAddRoom = () => {
        navigate.push("/app/reservation/manage")
    }


    // Hooks
    const { fetchData } = useFetcherGlobal();
    const getData = async (page) => {
        const dataRoom = await fetchData(null, `/api/v1/rooms/pagination?size=${5}&page=${page - 1}&sort=id,asc`, `GET`);
        if (dataRoom) {
            setDataTable2(dataRoom?.data.data)
            setResultsPerPage(() => 5)
            setTotalOfPages(() => dataRoom?.data?.totalOfItems)
        } else {
            alert("Get data Failed!")
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
                                        <span className="text-sm">{i + 1}</span>
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
                                        <span className="text-sm">{user.availableFrom}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{user.availableTo}</span>
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
                            totalResults={resultsPerPage}
                            resultsPerPage={5}
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
