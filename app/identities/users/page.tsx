'use client'

import {Image} from "@nextui-org/react";
import BgImage from "./images/403.png"
import React, {useState} from "react";
import UsersTable from "@/app/identities/users/users.table";
import axiosInstance from "@/app/configurations/api/axiosInstance";
import useSWR from "swr";
import {Input} from "@nextui-org/input";


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


const getRequests = async (currentPage: number,status:string,search:string) => {

    // `http://192.168.67.17:7003/api/v2/operators/identities?Page=${currentPage}&Size=${10}`
    const response = await axiosInstance.get(
        `http://192.168.67.17:7003/api/v2/operators/identities?Page=${currentPage}&Size=${10}&status=${status}&Search=${search}`
    );
    if (response.status === 200) {
        return response.data
    }

}

export default function Forbidden() {
    const [status, setStatus] = useState<{value:string,label:string,id:number}>({label:"همه",value:"all",id:0})
    const [page, setPage] = useState<number>(1);
    const [search,setSearch]=useState<string>("")
    const {
        data: users,
        isValidating,
        isLoading
    } = useSWR(`http://192.168.106.7:7040/api/card-requests/users?page=${page}&status=${status.value}&Search=${search}`
        , async (): Promise<{
            data: User[],
            totalPages: number,
            totalItems: number
        }> => await getRequests(page,status.value,search), {keepPreviousData: true,});

    let typingTimeout: NodeJS.Timeout | null = null;
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        typingTimeout = setTimeout(() => {
            if (value.length >= 3 || !value.length) {
                setPage(1)
                setSearch(value)
            }
        }, 500);
    };

    return (
        <div className={` w-full h-full flex flex-col justify-center items-center gap-10 p-12`}>
            {!users && isLoading ? <p>loading</p> :<>

                <div
                    className="flex flex-row justify-between items-center space-x-4 text-small  bg-white w-full h-20 rounded-xl drop-shadow-lg p-4 ">
                    <div className={"font-black text-3xl  h-full justify-center items-center flex"}>وضعیت کاربران</div>

<Input onChange={(e)=>{handleInputChange(e)}} size={"sm"} width={"20%"} label={"جستجو"} className={"w-1/4"} />
                </div>

                {users && <UsersTable data={users.data} pagination={{
                    page,
            totalPages: users.totalPages,
            totalItems: users.totalItems,
            setPage: (page) => {
                setPage(page)
            },status,
                setFilter: (filter) => {
                    setStatus(filter)
                },
                setSearch: (search) => {
                    setSearch(search)
                }
        }}/>
}
</>}
        </div>)
}