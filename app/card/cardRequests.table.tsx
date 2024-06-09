import React, {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import {
    Card,
    CardBody,
    Chip,
    ChipProps,
    Divider,
    Pagination,
    Select,
    SelectItem, Spinner,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tabs
} from "@nextui-org/react";
import {columns} from "./data";
import Modal from "@/app/shard/components/Modal";
import {utcToShamsi} from "@/app/shard/utils/utcToShamsi";
import Input from "@/app/shard/components/Input";
import axiosInstance from "@/app/configurations/api/axiosInstance";
import AxiosInstance from "@/app/configurations/api/axiosInstance";
import useSWR from "swr";
import Image from "next/image";
import SearchIcon from "@/app/shard/assets/icons/searchicon.svg"
import Print from "@/app/card/assets/icons/Print.svg"
import Excel from "@/app/card/assets/icons/excel.svg"
import Post from "@/app/card/assets/icons/post.svg"
import More from "@/app/card/assets/icons/more.svg"
import Button from "@/app/shard/components/Button";
import status from "@/app/shard/components/Status";
import Style from "@/app/shard/components/Input/styles.module.css"
import SearchInput from "@/app/shard/components/SearchInput";
import {toast} from "react-toastify";
import {checkAccess} from "@/app/auth/checkAccess";
import useAccessCheck from "@/app/shard/hooks/useAccessCheck";

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
    trakingCode: string | null;
}

interface unDoneRecords {
    cardNumber: string;
    trakingCode: string;
    status: number;
}

interface LoadingProps {
    cardRequestExcel?: boolean;
    updateExpectedCardRequests?: boolean;
    insertTrakingCode?: boolean;
    updateTrakingCode?: boolean;
    trakingCodeUploadFile?: boolean;
}

const getCardRequests = async (currentPage: number, status: number, filter: string) => {
    const statusCode = status ? `&status=${status}` : ""

    const response = await axiosInstance.get(
        `http://192.168.106.7:7040/api/card-requests?currentPage=${currentPage}&pageSize=${10}${statusCode}&filter=${filter ?? null}`
    );
    if (response.status === 200) {
        return response.data
    } else return []

}

const checkStatus = (status: number) => {
    if (status) return statusList.find(({id}) => id === status)?.label;

    else return []

}

const checkNull = (value: string) => {

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
    {
        id: 8,
        label: "درحال چاپ"
    },
    {
        id: 9,
        label: "اماده ارسال"
    }
]


const TableComponent = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedStatus, setSelectedStatus] = useState<number>(0)
    const [filter, setFilter] = useState<string>("")
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<LoadingProps>({
        cardRequestExcel: false,
        updateExpectedCardRequests: false,
        insertTrakingCode: false,
        updateTrakingCode: false,
        trakingCodeUploadFile: false
    })

    const hasAccess = true
    // const hasAccess = useAccessCheck("card_operation");
    const [loadingList, setLoadingList] = useState<string[]>(["627026f2-67f9-4101-9fd1-29fa47818fa1"])
    let typingTimeout: NodeJS.Timeout | null = null;
    const [trackLoading, setTrackLoading] = useState<boolean>(false);

    const {
        data: cardRequests,
        isValidating,
        isLoading
    } = useSWR(`http://192.168.106.7:7040/api/card-requests?page=${page}&status=${selectedStatus}&filter=${filter}`
        , async () => await getCardRequests(page, selectedStatus, filter), {keepPreviousData: true,});


    const rowsPerPage = 10;
    const pages = useMemo(() => {
        return cardRequests?.totalPageCount ? Math.ceil(cardRequests.totalPageCount) : 0;
    }, [cardRequests?.totalPageCount, rowsPerPage]);


    const updateTrakingCode = async (cardNumber: string, trakingCode: string) => {
        const response = await axiosInstance.post(`http://192.168.106.7:7040/api/update-traking-code`,
            {
                cardNumber: cardNumber,
                trakingCode: trakingCode
            })
        if (response.status === 200) {
            return response.data
        } else return []
    }


    const insertTrakingCode = async (cardNumber: string, trakingCode: string) => {
        setTrackLoading(true);
        console.log(trackLoading)
        try {
            const response = await axiosInstance.post(`http://192.168.106.7:7040/api/insert-traking-code`, {
                cardNumber: cardNumber,
                trakingCode: trakingCode
            });
            if (response.status === 200) {
                setTrackLoading(false);
                console.log(trackLoading)
                return response.data;
            } else {
                setTrackLoading(false);
                return [];
            }
        } catch (error) {
            setTrackLoading(false);
            console.error(error);
            return [];
        }
    };


    const handlePostNumber = async (e: any, trakingCode: string | null, cardNumber: string, id: string) => {
            if (e.key === "Enter") {
                setLoadingList([...loadingList, id]);
                if (trakingCode === null) {
                    await insertTrakingCode(cardNumber, e.target.value)
                } else {
                    console.log("ridife")
                    await updateTrakingCode(cardNumber, e.target.value)
                }

                setLoadingList(loadingList.filter(item =>
                    item !== id))


            }
        }
    ;


/////////////////////////////////////////////////////////////////////////////////////////////


    const updateExpectedCardRequests = async () => {
        setLoading({...loading, updateExpectedCardRequests: true})
        const response = await axiosInstance.post(`http://192.168.106.7:7040/api/update-expected-card-requests`)
        if (response.status === 200) {
            toast.success("تایید چاپ با موفقیت انجام شد")
        } else {
            toast.error("خطا")
        }
        setLoading({...loading, updateExpectedCardRequests: false})

    }


    const cardRequestExcel = async (): Promise<void> => {
        setLoading({...loading, cardRequestExcel: true})
        const response = await axiosInstance.get<Blob>(`http://192.168.106.7:7040/api/card-request-excel`, {responseType: 'arraybuffer'})

        // if (!response.data || response.data.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        //     throw new Error('The downloaded file is not a valid Excel file.');
        // }

        if (response.status === 200) {
            setLoading({...loading, cardRequestExcel: false})
            const fileBlob = new Blob([response.data], {type: response.data.type});

            const defaultFileName = `${Date.now()}.xlsx`;

            const link = document.createElement('a');
            link.href = URL.createObjectURL(fileBlob);
            link.download = defaultFileName;
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);

        }
        setLoading({...loading, cardRequestExcel: false})
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const renderCell = React.useCallback((card: Card, columnKey: React.Key): ReactNode => {

        const cellValue = card[columnKey as keyof Card];

        switch (columnKey) {
            case "status":
                return (
                    <div className={'w-full'}>
                        <Chip
                            className={`capitalize  ${card.cardRequest?.status && card.cardRequest?.status === 6 ? `bg-red-600 text-red-200` : ""}`}
                            color={statusColorMap[card.cardRequest.status]} size="sm"
                            variant="flat">
                            {
                                <div className={'max-w-32 max-h-7'}>{checkStatus(card.cardRequest?.status)}</div>
                            }

                        </Chip>
                    </div>
                );

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
            case "cardNumber":
                return (
                    <div>
                        {checkNull(card.cardRequest.cardNumber)}
                    </div>
                )
            case "postNumber":
                return (
                    <div>
                        {

                            // loadingList.includes(card.cardRequest.id) ? <Spinner/> :


                            (
                                <Input isDisabled={ !hasAccess ||
                                    !(card.cardRequest.status === 4 || card.cardRequest.status === 9)}
                                       type={"number"}
                                       className={"text-center w-36 h-9 rounded-none"}
                                       placeholder={card.cardRequest.trakingCode ?? ""}
                                       onKeyDown={(e: any) => {
                                           handlePostNumber(e, card.cardRequest.trakingCode, card.cardRequest.cardNumber, card.cardRequest.id)
                                       }}

                                />)
                        }

                    </div>
                )
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">

                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
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

                    } placeholder={""}/>

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
                    defaultValue={checkNull(card.cardRequest?.cardNumber)}/>

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
                    </div>
                );
            default:
                return <></>;
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


    const bottomContent = React.useMemo(() => {
        return (
            <div className={'flex justify-between items-center mb-20 flex-col md:flex-row '}>
                <div className="flex gap-2 w-full h-10 mb-28 md:mb-0 flex-wrap md:flex-nowrap">
                    {cardRequests?.statusStatistics && Object.entries(cardRequests.statusStatistics).map(([key, value]) => (

                        <>
                            <div key={key} className={"flex justify-between gap-1 items-center"}>
                                <div
                                    className={'font-normal text-zinc-500'}> {checkStatus(Number(key)) + " " + ':'}</div>
                                <div>{" " + value}</div>
                            </div>
                            <Divider orientation="vertical"/></>

                    ))}

                </div>
                <div className="flex w-full " style={{direction: "ltr"}}>
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


            </div>
        );
    }, [cardRequests?.statusStatistics]);

    ////////////////////////////
    // const topContent = React.useMemo(() => {
    //     return (
    //         <>
    //             <div className={"rounded-full w-64 h-12 hidden md:flex items-center justify-center"}>
    //                 <Input onChange={handleInputChange} className={"rounded-full"} size={"lg"}
    //                        labelPlacement={"outside-left"} placeholder="جستو وجو"/>
    //             </div>
    //             <div>
    //                 { Object.entries(cardRequests.statusStatistics).forEach(([key, value]) => {
    //                             return(<>       <Chip
    //
    //                                 variant="flat">
    //                                 {
    //                                     checkStatus(key)
    //                                 }
    //
    //                             </Chip></>)
    //
    //                 });}
    //             </div>
    //         </>
    //
    //
    //     )
    // })
    ///////////////////////////


    const TrakingCodeUploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {


        if (event.target.files) {
            // setTrackLoading(true)


            const formData = new FormData();
            formData.append('file', event.target.files[0]);


            const response = await AxiosInstance.post("http://192.168.106.7:7040/api/traking-code-upload-file", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('File uploaded successfully:', response.data);
            if (response.status === 200) {
                // setTrackLoading(false)

                // console.log(loading.trakingCodeUploadFile)
                if (response.data.hasFailedRecords) {
                    response.data.unDoneRecords.map((items: unDoneRecords, index: number) => {
                        if (items.status === 0) {
                            console.log(index + " " + "CardNumberNotFound")
                        } else if (items.status === 1) {
                            console.log(index + " " + "WrongTrakingCodePattern")
                        } else if (items.status === 2) {
                            console.log(index + " " + "OneElementsIsEmpty")
                        } else if (items.status === 3) {
                            console.log(index + " " + "InistalStatusIsNotCorrect")
                        }
                    })
                }
            }
        }


    };


    const handleButtonClick = () => {
        // setLoading({...loading, trakingCodeUploadFile: true})
        fileInputRef.current?.click();
    };

    useEffect(() => {

    }, [trackLoading]);


    if (!cardRequests) return (<p>loading</p>)


    return (
        <>
            <div className={'overflow-y-auto'}>


                {/*///////////*/}
                <div
                    className="md:flex hidden items-center space-x-4 text-small mb-8 bg-white h-20 rounded-xl drop-shadow-lg px-8 justify-between">

                    <div className={"font-black text-3xl md:text-justify text-center"}>لیست کارت های نقدی</div>
                    <div className={'flex items-center flex-row-reverse'}>
                        <div><Input onChange={(e) => {
                            handleInputChange(e)
                        }} size={"lg"} placeholder={"جستجو"} className={"w-full"} startContent={
                            <svg
                                viewBox="0 0 512 512"
                                fill="currentColor"
                                height="1.5em"
                                width="1.5em"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeMiterlimit={10}
                                    strokeWidth={32}
                                    d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                                />
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={32}
                                    d="M338.29 338.29L448 448"
                                />
                            </svg>}/></div>

                        {hasAccess && <><div className={'h-10 border mx-6'}></div>

                            <div className={'flex'}>
                        <Image src={Excel.src} alt={"search"} width={30} height={30}/>
                        <Button variant={'light'} isLoading={loading?.cardRequestExcel} onClick={() => {
                            cardRequestExcel()
                        }}>دریافت فایل اکسل</Button>
                    </div>

                    <div className={'h-10 border'}></div>

                    <div className={'flex gap-3'}>
                        <Image src={Print.src} alt={"search"} width={24} height={24}/>
                        <Button variant={'light'} isLoading={loading?.updateExpectedCardRequests} onClick={() => {
                            updateExpectedCardRequests()
                        }}>تایید چاپ</Button>
                    </div></>
                    }
                        {/*<div className={'h-10 border'}></div>*/}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={TrakingCodeUploadFile}
                        />

                    </div>
                </div>
                {/*///////////*/}
                <Table

                    bottomContent={
                        pages > 0 ? bottomContent : null
                    }

                    aria-label="Example table with custom cells"

                >
                    <TableHeader columns={columns}>
                        {(column) => (


                            <TableColumn key={column.uid} className={"text-start"} align={"center"}>
                                <div className={"flex items-center"}>
                                    {
                                        column.uid === "status" ?
                                            <>وضعیت:
                                                <Select

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
                                                </Select> </> :
                                            column.uid === "postNumber" && hasAccess ?

                                                <div className={"flex items-center"}>

                                                    <Image src={Post.src} alt={"post img"} width={14} height={14}/>
                                                    {trackLoading ? (<p>HI</p>) : <Button
                                                        onClick={handleButtonClick}
                                                        variant={'light'}
                                                        // isLoading={trackLoading}
                                                        // className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                                    >
                                                        {column.name}
                                                    </Button>}

                                                </div>
                                                :
                                                column.uid === "actions" ?
                                                    (<Image src={More.src} alt={"more icon for action"} width={26}
                                                            height={6}/>)

                                                    : column.name
                                    }
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
            </div>
        </>


    );
}
export default TableComponent