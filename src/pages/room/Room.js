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
} from '@windmill/react-ui'

import { EditIcon, HeartIcon, MailIcon, Plus, TrashIcon } from '../../icons'
import { useHistory } from 'react-router-dom'

function Rooms() {
  const [pageTable2, setPageTable2] = useState(1)
  const [dataTable2, setDataTable2] = useState([])
  const navigate = useHistory();

  const goAddRoom = () => {
    navigate.push("/app/room/manage")
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

        <div className='mb-5 text-right mt-4'>
          <Button layout="outline" iconRight={Plus} onClick={goAddRoom}>
            <span>Add Room</span>
          </Button>
        </div>

        <TableContainer className="mb-8">
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
                    <div className="flex items-center space-x-4">
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      <Button layout="link" size="icon" aria-label="Delete">
                        <TrashIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
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

export default Rooms
