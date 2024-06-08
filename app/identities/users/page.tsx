'use client'

import {Image} from "@nextui-org/react";
import BgImage from "./images/403.png"
import React from "react";
import UsersTable from "@/app/identities/users/users.table";
import axiosInstance from "@/app/configurations/api/axiosInstance";
import useSWR from "swr";


export interface User {
    id: string
    operatorId: string
    trackingCode: string
    verificationLevel: string
    humanVerificationStatus: string
    alivenessVerificationStatus: string
    nationalCardVerificationStatus: string
    identityCardVerificationStatus: string
    signatureVerificationStatus: string
    userInfo: UserInfo
    files: File[]
}

interface UserInfo {
    birthDate: string
    name: string
    lastName: string | null
    fatherName: string
    gender: string
    nationalCode: string
    cardSerial: string
}

interface File {
    id: string
    link: string
    tag: string
}


const getRequests = async (currentPage: number) => {

    // `http://192.168.67.17:7003/api/v2/operators/identities?Page=${currentPage}&Size=${10}`
    const response = await axiosInstance.get(
        `http://192.168.67.17:7003/api/v2/operators/identities?Page=${currentPage}&Size=${10}`
    );
    if (response.status === 200) {
        return response.data
    }

}

export default function Forbidden() {

    const [page, setPage] = React.useState<number>(1);
    const {
        data: users,
        isValidating,
        isLoading
    } = useSWR(`http://192.168.106.7:7040/api/card-requests/users?page=${page}`
        , async (): Promise<{
            data: User[],
            totalPages: number,
            totalItems: number
        }> => await getRequests(page), {keepPreviousData: true,});


    return (
        <div className={` w-full h-full flex flex-col justify-center items-center p-12`}>
            {isLoading ? <p>loading</p> :<> <div className={"font-black text-3xl mb-7 w-full"}>وضعیت کاربران</div>
            {users && <UsersTable data={users.data} pagination={{
            page,
            totalPages: users.totalPages,
            totalItems: users.totalItems,
            setPage: (page) => {
                setPage(page)
            }
        }}/>
}</>}
        </div>)
}