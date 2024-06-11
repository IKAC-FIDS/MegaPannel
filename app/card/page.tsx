'use client'
// import TableComponent from "";

import TableComponent, {statusList} from "@/app/card/cardRequests.table";
import useSWR from "swr";
import React, {useMemo, useState} from "react";
import axiosInstance from "@/app/configurations/api/axiosInstance";
import Button from "@/app/shard/components/Button";


export interface StatusStatistics {
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
    '7': number;
    '8': number;
}

export interface CardTemplateInfo {
    name: string;
    title: string;
    code: string;
    color: string;
    image: string;
    disabled: boolean;
    order: number;
    inventory: number;
}

export interface CardInfo {
    number: string;
    cvv2: string;
    track1: string;
    track2: string;
    track3: string;
    bankTypeExpireDate: string;
    expireDateUtc: string;
    disabled: boolean;
    disabledDateUtc?: any;
    terminated: boolean;
    terminatedDateUtc?: any;
    createdDateUtc: string;
    templateId: string;
    userId: string;
    accountNumber: string;
}

export interface UserInfo {
    nationalCode: string;
    phoneNumber: string;
    birthdate: string;
    bookNumber: number;
    name: string;
    lastName: string;
    fatherName: string;
    gender: string;
    officeCode: string;
    officeName: string;
    nationalNumber: string;
    nationalSeri: string;
    nationalSerial: string;
    cardSerial: string;
}

export interface CardRequest {
    id: string;
    cardTemplateId: string;
    userId: string;
    status: number;
    message?: any;
    createdDateUtc: string;
    address: string;
    sameCardNumber: boolean;
    accountNumber: string;
    cardNumber: string;
    trakingCode: string | null;
}

export interface unDoneRecords {
    cardNumber: string;
    trakingCode: string;
    status: number;
}

export interface LoadingProps {
    cardRequestExcel?: boolean;
    updateExpectedCardRequests?: boolean;
    insertTrakingCode?: boolean;
    updateTrakingCode?: boolean;
    trakingCodeUploadFile?: boolean;
}

const CardPanel = () => {
    const [page, setPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState<number>(0)
    const [filter, setFilter] = useState<string>("")

    const getCardRequests = async (currentPage: number, status: number, filter: string) => {
        const statusCode = status ? `&status=${status}` : ""

        const response = await axiosInstance.get(
            `http://192.168.106.6:4500/api/card-requests?currentPage=${currentPage ? currentPage : ""}&pageSize=${10}${statusCode}&filter=${filter ?? null}`
        );
        if (response.status === 200) {
            return response.data
        } else return []

    }

    // http://192.168.67.17:4500
    // http://192.168.106.6:4500
    const {
        data: cardRequests,
        isValidating,
        isLoading
    } = useSWR(`http://192.168.106.6:4500/api/card-requests?page=${page}&status=${selectedStatus}&filter=${filter}`
        , async () => await getCardRequests(page, selectedStatus, filter), {keepPreviousData: true,});


    const rowsPerPage = 10;
    const pages = useMemo(() => {
        return cardRequests && cardRequests.totalPageCount ? Math.ceil(cardRequests.totalPageCount) : 0;
    }, [cardRequests?.totalPageCount, rowsPerPage]);


    if (!cardRequests) return (<p>loading</p>)
    return (
        <>
            <div className={"p-3 h-screen"}>

                <TableComponent
                    cardRequest={cardRequests.data}
                    pagination={{
                        totalPageCount: cardRequests.totalPageCount,
                        currentPage: cardRequests.currentPage,
                        total: pages,
                        setPage: (page: number) => {
                            setPage(page)
                        },
                        setFilter: (filter) => {
                            setFilter(filter)
                        },
                        setSelectedStatus: (status: number) => {
                            setSelectedStatus(status)
                        },
                        page,
                        selectedStatus,
                        StatusStatistics: cardRequests?.statusStatistics
                    }}
                />

            </div>

        </>
    )
}
export default CardPanel

