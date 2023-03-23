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

import { EditIcon, Plus, TrashIcon } from '../../icons'
import { useHistory } from 'react-router-dom'

function Rooms() {
  const navigate = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataTable2, setDataTable2] = useState([])
  const [resultsPerPage, setResultsPerPage] = useState(6)
  const [totalOfPages, setTotalOfPages] = useState(4)
  const [nameRoom, setNameRoom] = useState("")
  const [idRoom, setIdRoom] = useState(0)
  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false)
  const [message, messageSet] = useState("")
  const { fetchData } = useFetcherGlobal();

  const goAddRoom = () => {
    navigate.push("/app/room/add")
  }

  const goEditRoom = (id) => {
    navigate.push(`/app/room/edit/${id}`)
  }


  const getData = async (page) => {
    const dataRoom = await fetchData(null, `/api/v1/rooms/pagination?size=${5}&page=${page - 1}&sort=id,asc`, `GET`);
    if (dataRoom?.httpStatus) {
      setDataTable2(dataRoom?.data.data)
      setResultsPerPage(() => 5)
      setTotalOfPages(() => dataRoom?.data?.totalOfItems)
    } else {
      openModalError(() => "Get data Failed!")
    }
  }

  function openModal(nameRoom, idRoom) {
    setNameRoom(() => nameRoom)
    setIdRoom(() => idRoom)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setIsModalErrorOpen(false)
  }

  function openModalError(param) {
    messageSet(() => param)
    setIsModalErrorOpen(true)
  }

  async function deleteModal() {
    let response = await fetchData(null, `/api/v1/rooms/${idRoom}`, `DELETE`);
    console.log("DELETE");
    console.log(response);
    if (response?.httpStatus) {
      console.log("SUCCESS DELETE ID: " + idRoom);
    } else {
      openModalError(() => "Get data Failed!")
    }
    setIsModalOpen(false)
    onPageChangeTable2(1);
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
                    <span className="text-sm">{moment(user.availableFrom).format('LL')}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{moment(user.availableTo).format('LL')}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button layout="link" size="icon" aria-label="Edit" onClick={() => goEditRoom(user.id)}>
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
      </div>

    </>
  )
}

export default Rooms
