import React, {ReactNode, useMemo, useState} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Tooltip,
    ChipProps,
    getKeyValue, Divider, Pagination, Button, Tabs, Tab, CardBody,
    Card, Image, Select, SelectItem
} from "@nextui-org/react";
import {User} from "@/app/identities/users/page"
import {EyeIcon} from "@/app/card/EyeIcon";
import Modal from "@/app/shard/components/Modal";
import Input from "@/app/shard/components/Input";
import {utcToShamsi} from "@/app/shard/utils/utcToShamsi";
import Zoom from "react-medium-image-zoom";
import styles from "@/app/identities/styles.module.css";

const statusColorMap: Record<string, ChipProps["color"]> = {
    Verified: "success",
    Failed: "danger",
    HumanVerificationRequired: "warning",
};


const statusList = [
    {
        value: "all",
        label: "همه",
        id:0

    },
    {
        value: "Verified",
        label: "تایید شده",
        id:1

    }
    , {
        value: "Failed",
        label: "رد شده",
        id:2
    },
    {
        value: "HumanVerificationRequired",
        label: "در انتظار",
        id:3
    },
]


const columns = [
    {name: "وضعیت", uid: "status"},
    {name: "نام", uid: "name"},
    {name: "کد ملی", uid: "nationalCode"},
    {name: "ACTIONS", uid: "actions"},
];





interface Props {
    data: User[],
    pagination:{
        page:number,
        totalPages :number,
        totalItems:number,
        setPage:(page:number)=>void,
        status:{value:string,label:string,id:number},
        setFilter:(status:{value:string,label:string,id:number})=>void,
        setSearch:(search:string)=>void,
    }
}



const checkNull = (value: string ) => {
    if (value) return value
    return "نامشخص"

}




const UsersTable = ({data,pagination}: Props) => {



    const bottomContent = useMemo(() => {
        return (
            <div className={'flex justify-between items-center mb-20'}>
                <div className="flex w-full" style={{direction: "ltr"}}>
                    <Pagination
                        isCompact
                        showControls
                        showShadow

                        color="primary"
                        page={pagination.page}
                        total={pagination.totalPages}
                        onChange={(page) => pagination.setPage(page)}
                    />
                </div>


            </div>
        );
    }, [pagination.page,pagination.totalPages]);



    const renderCell = React.useCallback((user: User, columnKey: React.Key) : ReactNode => {
        const cellValue = user[columnKey as keyof User];
        switch (columnKey) {

            case "status":
                return (
                    <Chip className="capitalize min-w-[70px] text-center" color={statusColorMap[user.alivenessVerificationStatus]} size="sm" variant="flat">
                        {user.alivenessVerificationStatus === "Verified" ?"تایید شده" : user.alivenessVerificationStatus === "Failed" ? "رد شده" : "در انتظار"}
                    </Chip>

                );
            case "name":
                return (<div className={"flex flex-row gap-1"}>
                    <p>{checkNull(user.userInfo.name)  }</p> <p>{ user.userInfo.lastName !== null ? user.userInfo.lastName : ""}</p></div>
                );
            case "nationalCode":
                return (

                        <p className={" text-start"} style={{direction:"ltr"}}>{user.userInfo.nationalCode}</p>

                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Modal size={"5xl"}>

                            <div className={"flex flex-row w-full h-full justify-between gap-2"}>
                                <div className={"flex flex-col w-[30%] gap-10 mt-3"}>

                                    <p>مشخصات کاربر</p>
                                    <Input size={"md"}
                                           label="نام و نام خانوادگی" isDisabled
                                           defaultValue={
                                               user.userInfo.name ? user.userInfo.name + " " + user.userInfo?.lastName : "نامشخص"

                                           } labelPlacement="outside" placeholder={""}/>

                                    <Input size={"md"} labelPlacement={"outside"} label="کد ملی"
                                           isDisabled
                                           defaultValue={checkNull(user.userInfo?.nationalCode)}/>
                                    <Input size={"md"} labelPlacement={"outside"} label="تاریخ تولد"
                                           isDisabled
                                           defaultValue={checkNull(user.userInfo?.birthDate)}/>


                                </div>
                                <div className={"flex flex-col gap-2"}>
                                    <div
                                        className={"max-w-[450px] max-h-[50%] overflow-hidden rounded-lg"}>

                                        <Image
                                            isZoomed
                                            width={"300px"}
                                            height={"300px"}
                                            className={"h-1/2 w-full cursor-pointer"}
                                            alt="NextUI Fruit Image with Zoom"
                                            src={user.files.find((file) => file.tag === "NationalCardFront")?.link}
                                        /></div>
                                    <div
                                        className={"max-w-[450px] max-h-[50%] overflow-hidden rounded-lg"}>
                                        <Image
                                            isZoomed
                                            width={"300px"}
                                            height={"300px"}
                                            className={"h-1/2 w-full cursor-pointer "}
                                            alt="NextUI Fruit Image with Zoom"
                                            src={user.files.find((file) => file.tag === "NationalCardBack")?.link}
                                        />
                                    </div>

                                </div>
                                <video className={"shadow rounded-lg h-[380px]  max-w-[380px]"}
                                       src={user.files.find((file) => file.tag === "Aliveness")?.link}
                                       controls/>
                            </div>

                        </Modal>
                    </div>
                );
            default:
                return <></>;
        }
    }, []);

    return (
        <Table aria-label="Example table with custom cells" className={"h-full"} bottomContent={bottomContent} >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        <div className={"flex items-center"}>
                            {column.uid === "status" ?
                                <>وضعیت:
                                    <Select

                                        className="w-40"
                                        defaultSelectedKeys={[0]}

                                    >
                                        {statusList.map((item) => (
                                            <SelectItem key={item.id} value={pagination.status.id}
                                                        onClick={() => {
                                                            pagination.setFilter(item)
                                                            pagination.setPage(1)
                                                        }}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </Select> </> : column.name}</div>
                    </TableColumn>
                    )}
            </TableHeader>
            <TableBody items={data} className={"h-full"}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell className={`w-1/4 `}>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}


export default UsersTable