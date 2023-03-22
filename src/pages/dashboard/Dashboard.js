import React, { useState, useEffect } from 'react'

import InfoCard from '../../components/Cards/InfoCard'
import ChartCard from '../../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../../components/Chart/ChartLegend'
import PageTitle from '../../components/Typography/PageTitle'
import { PeopleIcon, FormsIcon, PeopleRoof, ChalkBoardUserIcon } from '../../icons'
import RoundIcon from '../../components/RoundIcon'
import response from '../../utils/demo/tableData'

import {
    doughnutOptions,
    lineOptions,
    doughnutLegends,
    lineLegends,
} from '../../utils/demo/chartsData'

function Dashboard() {

    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
    }, [])

    return (
        <>
            <PageTitle>Dashboard</PageTitle>

            {/* <!-- Cards --> */}
            <div className="grid gap-6 mb-8 md:grid-cols-3">
                <InfoCard title="Total clients" value="102">
                    <RoundIcon
                        icon={PeopleIcon}
                        iconColorClass="text-orange-500 dark:text-orange-100"
                        bgColorClass="bg-orange-100 dark:bg-orange-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="Total Room" value="100">
                    <RoundIcon
                        icon={PeopleRoof}
                        iconColorClass="text-green-500 dark:text-green-100"
                        bgColorClass="bg-green-100 dark:bg-green-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="Total Reservation" value="72">
                    <RoundIcon
                        icon={ChalkBoardUserIcon}
                        iconColorClass="text-blue-500 dark:text-blue-100"
                        bgColorClass="bg-blue-100 dark:bg-blue-500"
                        className="mr-4"
                    />
                </InfoCard>
            </div>

            <PageTitle>Charts</PageTitle>
            <div className="grid gap-6 mb-8 md:grid-cols-2">
                <ChartCard title="Status">
                    <Doughnut {...doughnutOptions} />
                    <ChartLegend legends={doughnutLegends} />
                </ChartCard>

                <ChartCard title="Reservation">
                    <Line {...lineOptions} />
                    <ChartLegend legends={lineLegends} />
                </ChartCard>
            </div>
        </>
    )
}

export default Dashboard
