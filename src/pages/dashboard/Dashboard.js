import React, { useEffect, useState } from 'react'
import { useFetcherGlobal } from '../../hooks/fetcherGlobal'

import InfoCard from '../../components/Cards/InfoCard'
import ChartCard from '../../components/Chart/ChartCard'
import { Doughnut } from 'react-chartjs-2'
import ChartLegend from '../../components/Chart/ChartLegend'
import PageTitle from '../../components/Typography/PageTitle'
import { PeopleIcon, PeopleRoof, ChalkBoardUserIcon } from '../../icons'
import RoundIcon from '../../components/RoundIcon'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from '@windmill/react-ui'

import {
    // doughnutOptions,
    // lineOptions,
    doughnutLegends,
    // lineLegends,
} from '../../utils/demo/chartsData'

function Dashboard() {
    const { fetchData } = useFetcherGlobal()
    const [totalClients, totalClientsSet] = useState(0)
    const [totalRooms, totalRoomsSet] = useState(0)
    const [totalReservation, totalReservationSet] = useState(0)
    const [listStatusD, listStatusDSet] = useState([1, 1])
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false)
    const [message, messageSet] = useState("")

    var doughnutOptions = {
        data: {
            datasets: [
                {
                    data: listStatusD,
                    backgroundColor: ['#4CAF50', '#B71C1C'],
                    label: 'Dataset 1',
                },
            ],
            labels: ['Accepted', 'Rejected'],
        },
        options: {
            responsive: true,
            cutoutPercentage: 80,
        },
        legend: {
            display: false,
        },
    }


    const getCountClients = async (page) => {
        const dataRes = await fetchData(null, `/api/v1/auth/count-users`, `GET`);
        if (dataRes?.response) {
            console.log("ERRRRROR1");
            openModalError(() => "Get data Failed!")
        } else {
            console.log(dataRes)
            totalClientsSet(dataRes)
        }
    }

    const getCountRooms = async (page) => {
        const dataRes = await fetchData(null, `/api/v1/rooms/count-room`, `GET`);
        if (dataRes?.response) {
            console.log("ERRRRROR2");
            openModalError(() => "Get data Failed!")
        } else {
            console.log(dataRes);
            totalRoomsSet(dataRes)
        }
    }

    const getCountReservation = async (page) => {
        const dataRes = await fetchData(null, `/api/v1/reservation/count-reservation`, `GET`);
        if (dataRes?.response) {
            console.log("ERRRRROR3");
            openModalError(() => "Get data Failed!")
        } else {
            console.log(dataRes);
            totalReservationSet(dataRes.totalReservation)
            listStatusDSet(() => dataRes.listStatus)
        }
    }

    function closeModal() {
        setIsModalErrorOpen(false)
    }

    function openModalError(param) {
        messageSet(() => param)
        setIsModalErrorOpen(true)
    }

    useEffect(() => {
        getCountClients()
        getCountRooms()
        getCountReservation()
    }, [])

    return (
        <>
            <PageTitle>Dashboard</PageTitle>

            {/* <!-- Cards --> */}
            <div className="grid gap-6 mb-8 md:grid-cols-3">
                <InfoCard title="Total clients" value={totalClients}>
                    <RoundIcon
                        icon={PeopleIcon}
                        iconColorClass="text-orange-500 dark:text-orange-100"
                        bgColorClass="bg-orange-100 dark:bg-orange-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="Total Room" value={totalRooms}>
                    <RoundIcon
                        icon={PeopleRoof}
                        iconColorClass="text-green-500 dark:text-green-100"
                        bgColorClass="bg-green-100 dark:bg-green-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="Total Reservation" value={totalReservation}>
                    <RoundIcon
                        icon={ChalkBoardUserIcon}
                        iconColorClass="text-blue-500 dark:text-blue-100"
                        bgColorClass="bg-blue-100 dark:bg-blue-500"
                        className="mr-4"
                    />
                </InfoCard>
            </div>

            <PageTitle>Charts</PageTitle>
            <div className="grid gap-1 mb-8 md:grid-cols-2">
                <ChartCard title="Status">
                    <Doughnut {...doughnutOptions} />
                    <ChartLegend legends={doughnutLegends} />
                </ChartCard>

                {/* <ChartCard title="Reservation">
                    <Line {...lineOptions} />
                    <ChartLegend legends={lineLegends} />
                </ChartCard> */}
            </div>

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

export default Dashboard
