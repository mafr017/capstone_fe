import React, { useEffect, useState, useRef } from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import { get, useForm } from 'react-hook-form'
import { useFetcherGlobal } from '../../hooks/fetcherGlobal';
import response from '../../utils/demo/tableDataEmpty'
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

import { EditIcon, HeartIcon, MailIcon, Plus, TrashIcon } from '../../icons'
import { useHistory } from 'react-router-dom'

function Rooms() {
  // State
  const navigate = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [roomName, roomNameSet] = useState(false)
  const [pageTable2, setPageTable2] = useState(1)
  const [dataTable2, setDataTable2] = useState([])
  const [resultsPerPage, setResultsPerPage] = useState(6)
  const [totalOfPages, setTotalOfPages] = useState(4)
  const [nameRoom, setNameRoom] = useState("")
  const [idRoom, setIdRoom] = useState(0)

  const goAddRoom = () => {
    navigate.push("/app/room/manage")
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

  // Func
  function openModal(nameRoom, idRoom) {
    setNameRoom(() => nameRoom)
    setIdRoom(() => idRoom)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function deleteModal() {
    let response = fetchData(null, `/api/v1/rooms/${idRoom}`, `DELETE`);
    if (response) {
      console.log("SUCCESS DELETE ID: " + idRoom);
    } else {
      alert("Get data Failed!")
    }
    setIsModalOpen(false)
    onPageChangeTable2(1);
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
                    <span className="text-sm">{user.availableFrom}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.availableTo}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      <Button layout="link" size="icon" aria-label="Delete" onClick={() => openModal(user.nameRoom, user.id)}>
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
              totalResults={totalOfPages}
              resultsPerPage={5}
              onChange={onPageChangeTable2}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Are you sure to delete data?</ModalHeader>
          <ModalBody>
            Delete Room Data : {nameRoom}
          </ModalBody>
          <ModalFooter>
            <div className="sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="sm:block">
              <Button block onClick={deleteModal}>
                Accept
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>

    </>
  )
}

export default Rooms
