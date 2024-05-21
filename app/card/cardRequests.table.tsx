import React, {useEffect, useMemo, useState} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    Tooltip,
    ChipProps,
    getKeyValue, Pagination,
    Select,
    SelectItem
} from "@nextui-org/react";
import {EditIcon} from "./EditIcon";
import {DeleteIcon} from "./DeleteIcon";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import {columns} from "./data";
import card from "@/app/card/sample.json"

import ExportToExcel from "@/app/shard/components/ExportToExcel";
import Button from "@/app/shard/components/Button";
import Modal from "@/app/shard/components/Modal";
import {utcToShamsi} from "@/app/shard/utils/utcToShamsi";
import Input from "@/app/shard/components/Input";
import axiosInstance from "@/app/configurations/api/axiosInstance";
import useSWR from "swr";

const statusColorMap: Record<string, ChipProps["color"]> = {
    1: "warning",
    2: "secondary",
    3: "danger",
    4: "primary",
    5: "success",
    7: "default"
};

interface Card {
    cardRequest: CardRequest;
    userInfo: UserInfo;
    cardInfo: CardInfo;
    cardTemplateInfo: CardTemplateInfo;
}

interface CardTemplateInfo {
    name: string;
    title: string;
    code: string;
    color: string;
    image: string;
    disabled: boolean;
    order: number;
    inventory: number;
}

interface CardInfo {
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

interface UserInfo {
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

interface CardRequest {
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
}


const getCardRequests = async (currentPage: number, status: number, filter: string) => {
    const statusCode = status ? `&status=${status}` : ""

    const response = await axiosInstance.get(
        `http://192.168.106.7:7040/api/card-requests?currentPage=${currentPage}&pageSize=${10}${statusCode}&filter=${filter ?? null}`
    );
    if (response.status === 200) {
        return response.data
    }

}
const checkStatus = (status: number) => {
    return statusList.find(({id}) => id === status)?.label;
}

const checkNull = (value: string | number) => {

    if (value) return value

    return "نامشخص"

}

const statusList = [
    {
        id: 0,
        label: "همه"

    }
    , {
        id: 1,
        label: "در انتظار صدور"
    },
    {
        id: 2,
        label: "صادر شده"
    },
    {
        id: 3,
        label: "ناموفق"
    }, {
        id: 4,
        label: "چاپ شده"
    }, {
        id: 5,
        label: "فعال"
    },
    {
        id: 6,
        label: "نامشخص"
    },
    {
        id: 7,
        label: "خطا در عملیات"
    },

]


const TableComponent = () => {

    const [selectedStatus, setSelectedStatus] = useState<number>(0)
    const [filter, setFilter] = useState<string>("")
    const [page, setPage] = React.useState(1);
    let typingTimeout: NodeJS.Timeout | null = null;

    const {
        data: cardRequests,
        isValidating,
        isLoading
    } = useSWR(`http://192.168.106.7:7040/api/card-requests?page=${page}&status=${selectedStatus}&filter=${filter}`
        , async () => await getCardRequests(page, selectedStatus, filter), {keepPreviousData: true,});

    const rowsPerPage = 10;


    console.log(cardRequests)

    const pages = useMemo(() => {
        return cardRequests?.totalPageCount ? Math.ceil(cardRequests.totalPageCount) : 0;
    }, [cardRequests?.totalPageCount, rowsPerPage]);


    const renderCell = React.useCallback((card: Card, columnKey: React.Key) => {

        const cellValue = card[columnKey as keyof Card];

        switch (columnKey) {

            case "date":
                return (
                    <div>{utcToShamsi(card.cardRequest?.createdDateUtc)}</div>
                )
            case "name":
                return (
                    <div className={'flex gap-1'}>

                        <p>{checkNull(card.userInfo?.name)}</p>
                        <p>{checkNull(card.userInfo?.lastName)}</p>
                    </div>
                );
            case "nationalCode":
                return (
                    <div className="flex flex-col">
                        <p>{checkNull(card.userInfo?.nationalCode)}</p>
                    </div>
                );
            case "phoneNumber":
                return (
                    <div>
                        {checkNull(card.userInfo?.phoneNumber)}
                    </div>
                )
            case "status":
                return (
                    <Chip
                        className={`capitalize ${card.cardRequest?.status && card.cardRequest?.status === 6 ? `bg-red-600 text-red-200` : ""}`}
                        color={statusColorMap[card.cardRequest.status]} size="sm"
                        variant="flat">
                        {
                            checkStatus(card.cardRequest?.status)
                        }

                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="مشخصات">
              <span onClick={() => {
              }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <Modal>
                <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="photos" title="مشخصات کاربر">
          <Card className={" min-h-80"}>
            <CardBody>
                <div className={"flex gap-5 mb-3"}>

             <Input size={"lg"} labelPlacement={"outside"} label="نام و نام خانوادگی" isDisabled
                    defaultValue={
                        checkNull(card.userInfo?.name + " " + card.userInfo?.lastName)

                    } labelPlacement="outside" placeholder={""}/>

             <Input labelPlacement={"outside"} label="کد ملی" isDisabled
                    defaultValue={checkNull(card.userInfo?.nationalCode)}/>

                </div>

                <div className={"flex gap-5"}>

             <Input labelPlacement={"outside"} label="تاریخ تولد" isDisabled
                    defaultValue={checkNull(card.userInfo?.birthdate)}/>

             <Input isDisabled
                    type="text"
                    label="تلفن همراه"
                    placeholder="you@example.com"
                    labelPlacement="outside" defaultValue={checkNull(card.userInfo?.phoneNumber)}/>

                </div>

            </CardBody>
          </Card>
        </Tab>
        <Tab key="cardInfo" title="اطلاعات کارت">
          <Card className={"min-h-80"}>
            <CardBody>
              <div className={"flex gap-5 mb-3"}>

             <Input labelPlacement={"outside"} label="شماره کارت" isDisabled
                    defaultValue={checkNull(card.cardRequest?.cardNumber)} labelPlacement="outside"/>

             <Input labelPlacement={"outside"} label="شماره حساب" isDisabled
                    defaultValue={checkNull(card.cardInfo?.accountNumber)}/>

                </div>

                <div className={"flex gap-5 mb-3"}>

                 <Input labelPlacement={"outside"} label="تاریخ افتتاح حساب" isDisabled
                        defaultValue={utcToShamsi(card.cardRequest?.createdDateUtc)}/>

                  <Input labelPlacement={"outside"} label="تاریخ انقضا" isDisabled
                         defaultValue={utcToShamsi(card.cardInfo?.bankTypeExpireDate)}/>
                </div>
                   <div>
                        <div className={"text-Indigo-600 w-full text-start mb-3"}>آدرس</div>
                        <div
                            className={"bg-Indigo-700 text-Indigo-600 p-6 rounded-xl text-start"}>{checkNull(card.cardRequest?.address)}</div>
                    </div>
            </CardBody>
          </Card>
        </Tab>

      </Tabs>
    </div>
            </Modal>
              </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon/>
              </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon/>
              </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        typingTimeout = setTimeout(() => {
            if (value.length >= 3 || !value.length) setFilter(value)
        }, 500);
    };

    const topContent = React.useMemo(() => {
        return (
            <div className={"rounded-full w-64 h-12 hidden lg:flex items-center justify-center"}>
                <Input onChange={handleInputChange} className={"rounded-full"} size={"lg"}
                       labelPlacement={"outside-left"} placeholder="جستو وجو"/>
            </div>
        )
    })


    if (!cardRequests) return (<p>loading</p>)

    return (
        <>

            <Table
                topContent={topContent}
                bottomContent={
                    pages > 0 ? (
                        <div className="flex w-full justify-center" style={{direction: "ltr"}}>
                            <Pagination
                                isCompact
                                showControls
                                showShadow

                                color="primary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    ) : null
                }

                aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (


                        <TableColumn key={column.uid} className={"text-start"} align={"center"}>
                            <div className={"flex items-center"}>
                                {column.uid === "status" ?
                                    <>وضعیت: <Select

                                        className="w-40"
                                        defaultSelectedKeys={[0]}

                                    >
                                        {statusList.map((item) => (
                                            <SelectItem key={item.id} value={selectedStatus}
                                                        onClick={() => {
                                                            setSelectedStatus(item.id)
                                                            setPage(1)
                                                        }}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </Select> </> : column.name}
                            </div>
                        </TableColumn>

                    )}
                </TableHeader>

                <TableBody items={cardRequests.data}>
                    {(card: Card) => (
                        <TableRow key={card.cardRequest.id}>
                            {(columnKey) => <TableCell>{renderCell(card, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>

            </Table>


        </>


    );
}
export default TableComponent