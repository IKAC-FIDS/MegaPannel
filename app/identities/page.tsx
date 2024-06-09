'use client'


import React, {useEffect, useMemo, useRef, useState} from 'react';
// Import Swiper React components

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import styles from './styles.module.css';

// import required modules
import {Pagination as SwiperPagination} from 'swiper/modules';
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';
import useSWR from "swr";
import axiosInstance from "@/app/configurations/api/axiosInstance";

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


import {
    Button,
    DateInput,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Radio,
    RadioGroup, Skeleton,
    useDisclosure
} from "@nextui-org/react";
import Input from "@/app/shard/components/Input";

import notFound from "./assets/loading-files.gif"

import {Pagination} from "@nextui-org/react";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {id} from "postcss-selector-parser";
import {getSession} from "next-auth/react";

interface Request {
    id: string
    operatorId: any
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
    name: any
    lastName: any
    fatherName: any
    gender: any
    nationalCode: string
    cardSerial: any
}

interface File {
    id: string
    link: string
    tag: string
}


const getRequests = async (currentPage: number) => {

    // `http://192.168.67.17:7003/api/v2/operators/identities?Page=${currentPage}&Size=${10}`
    const response = await axiosInstance.get(
        `http://192.168.67.17:7003/api/v2/operators/identities?Page=${currentPage}&Size=${100}&status=HumanVerificationRequired`
    );
    if (response.status === 200) {
        return response.data
    }

}


const data = {
    "id": "9574e3cd-9f24-4b7f-99d6-09f3e86ac28e",
    "operatorId": "0159347a-2307-4f9f-b617-2fbd7d701567",
    "trackingCode": "20522410",
    "verificationLevel": "Level4",
    "humanVerificationStatus": "Verified",
    "alivenessVerificationStatus": "Verified",
    "nationalCardVerificationStatus": "Verified",
    "identityCardVerificationStatus": "NotRequested",
    "signatureVerificationStatus": "Verified",
    "userInfo": {
        "birthDate": "1356-01-01",
        "name": "محمد",
        "lastName": "جانمحمدي يالقوزآقاجي",
        "fatherName": "علي حسين",
        "gender": "Male",
        "nationalCode": "0320388603",
        "cardSerial": "2M17749860"
    },
    "files": [
        {
            "id": "18504693-642a-4f53-b957-f80083a1f11e",
            "link": "https://digibanking.sbank.ir/files/-lHkMnqco0SA3vGr-3z7KA",
            "tag": "NationalCardBack"
        },
        {
            "id": "341e5c87-e213-4169-b8a2-3bcc39f08fa2",
            "link": "https://digibanking.sbank.ir/files/Qt8kXCFv-UaUXVUrHBJtHw",
            "tag": "Aliveness"
        },
        {
            "id": "753a764c-053b-4243-9715-12c1fdd94f1a",
            "link": "https://digibanking.sbank.ir/files/o95a6GVdXkWu4QTV_gaTPg",
            "tag": "NationalCardFront"
        },
        {
            "id": "befd4f7a-6cf8-4ef2-8a15-0b1c94494ad7",
            "link": "https://digibanking.sbank.ir/files/HNdZn6XNS0uPhHY8FFVAyA",
            "tag": "Signature"
        }
    ]
}

const rejectReasons = [
    {id: 1, reason: "تصویر روی کارت ملی واضح نیست"},
    {id: 2, reason: "تصویر ویدیو سلفی واضح نیست"},
    {id: 3, reason: "عکس دارنده کارت ملی با تصویر ویدیو سلفی مطابقت ندارد"},
    {id: 4, reason: "در فیلم سلفی باید متن خواسته شده با صدای واضح بیان شود"},
    {id: 5, reason: "تصویر اصل مدارک ارسال نشده است"},
    {id: 6, reason: "سریال پشت کارت ملی مشخص نیست"},
    {id: 7, reason: "کد رهگیری رسید کارت ملی ناخوانا است"},

];


const Identities = () => {
    const [page, setPage] = React.useState<number>(1);
    const [changeList, setChangeList] = React.useState<{id:string,approve:boolean}[]>([]);
    const [activePage, setActivePage] = React.useState(1);
    const swiperRef = useRef<SwiperRef>(null);
    const [rejectReason, setRejectReason] = useState<string | null>(null)
    const {isOpen, onOpen, onOpenChange, getDisclosureProps} = useDisclosure();
    const [approveDetail, setApproveDetail] = React.useState<{
        nationalCode: string | null | undefined,
        cardSerial: string | null | undefined
    }>({nationalCode: null, cardSerial: null});


    const {
        data: requests,
        isValidating,
        isLoading
    } = useSWR(`http://192.168.106.7:7040/api/card-requests?page=${page}`
        , async (): Promise<{
            data: Request[],
            totalPages: number,
            totalItems: number
        }> => await getRequests(1), {keepPreviousData: true,});


    const pages = useMemo(() => {
        return requests?.totalPages ? Math.ceil(requests.totalPages) : 0;
    }, [requests?.totalPages, requests]);


    const [date, setDate] = useState<string>('');
    const [formattedDate, setFormattedDate] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters

        let formattedInput = input;
        if (input.length > 4) {
            formattedInput = input.slice(0, 4) + '/' + input.slice(4);
        }
        if (input.length > 6) {
            formattedInput = formattedInput.slice(0, 7) + '/' + formattedInput.slice(7);
        }

        setDate(formattedInput);

        // Convert to desired output format yyyy-mm-dd
        const parts = formattedInput.split('/');
        if (parts.length === 3 && parts[0].length === 4 && parts[1].length === 2 && parts[2].length === 2) {
            setFormattedDate(`${parts[0]}-${parts[1]}-${parts[2]}`);
        } else {
            setFormattedDate('');
        }
    };


    const reject = async (identificationStatusId: string) => {
        const response = await axiosInstance.post(
            `https://digibanking.sbank.ir/detective/api/v1/operators/identities/${identificationStatusId}/reject`, {
                "reason": rejectReason
            }
        );
        if (response.status === 200) {
            toast.success("درخواست کاربر رد شد")
            setRejectReason(null)
        setChangeList([...changeList, {id:identificationStatusId,approve:false}])
        if (swiperRef.current) swiperRef.current.swiper.slideNext()
        }

    }

    const approve = async (identificationStatusId: string, data: {
        nationalCode: string | null | undefined,
        cardSerial: string | null | undefined,
        birthDate: string | null | undefined
    }) => {

        if (Object.values(data).every(value => value !== null && value !== undefined)) {
            const response = await axiosInstance.post(
                `https://digibanking.sbank.ir/detective/api/v1/operators/identities/${identificationStatusId}/verify`, data
            );
            if (response.status === 200) {
                toast.success("درخواست کاربر تایید شد")
                setApproveDetail({cardSerial: null, nationalCode: null})
                setChangeList([...changeList, {id:identificationStatusId,approve:true}])
                if (swiperRef.current) swiperRef.current.swiper.slideNext()
            }
        } else {
            toast.error("فیلد های خالی را پر کنید")
        }
    }







    if (isLoading) return <div className={` w-full h-[90%] flex flex-col justify-center items-center p-6`}
                               style={{direction: "ltr"}}>
        <p>loading</p></div>

    return (
        <div className={` w-full h-[90%] flex flex-col justify-center items-center p-6`} style={{direction: "ltr"}}>


            <Swiper
                ref={swiperRef}
                onActiveIndexChange={(e) => {
                    setActivePage(e.activeIndex + 1)
                    // setApproveDetail({cardSerial:requests?.data[e.activeIndex].userInfo.cardSerial,nationalCode:requests?.data[e.activeIndex].userInfo.nationalCode,birthDate:requests?.data[e.activeIndex].userInfo.birthDate})
                }}
                modules={[SwiperPagination]}
                className={"p-20"}

                onSlideChange={(swiper) => {
                    setActivePage(swiper.activeIndex + 1)
                }}
                mousewheel={
                    {releaseOnEdges: true}
                }


            >


                {requests && requests.data.length ?
                    requests.data.map((request: Request) => {
                        return (<SwiperSlide key={request.id}>
                            <div className={"flex items-center justify-center h-full w-full p-8"}>
                                <div
                                    className={"w-full h-3/4 flex items-center justify-center  p-4 gap-4 shadow rounded-lg border-0"}>

                                    <video className={"shadow rounded-lg h-full max-w-[380px]"}
                                           src={request.files.find((file: File) => file.tag === "Aliveness")?.link.replace("https://digibanking.sbank.ir","http://10.121.254.61:5161/orion/api/v1/internal")}
                                           controls/>
                                    <div className={"w-3/4 h-full flex flex-row gap-2"}>

                                        <div
                                            className={"w-1/2 h-full   flex flex-col gap-2 items-center justify-center"}>
                                            <div className={"max-w-[450px] max-h-[50%] overflow-hidden rounded-lg"}>
                                                <Zoom>
                                                    <Image
                                                        isZoomed
                                                        width={"450px"}
                                                        height={"450px"}
                                                        className={"h-1/2 w-full cursor-pointer"}
                                                        alt="NextUI Fruit Image with Zoom"
                                                        src={request.files.find((file: File) => file.tag === "NationalCardFront")?.link.replace("https://digibanking.sbank.ir","http://10.121.254.61:5161/orion/api/v1/internal")}
                                                    /></Zoom></div>
                                            <div className={"max-w-[450px] max-h-[50%] overflow-hidden rounded-lg"}>
                                                <Zoom><Image
                                                    isZoomed
                                                    width={"450px"}
                                                    height={"450px"}
                                                    className={"h-1/2 w-full cursor-pointer "}
                                                    alt="NextUI Fruit Image with Zoom"
                                                    src={request.files.find((file: File) => file.tag === "NationalCardBack")?.link.replace("https://digibanking.sbank.ir","http://10.121.254.61:5161/orion/api/v1/internal")}
                                                /> </Zoom>
                                            </div>

                                        </div>
                                        <div className={"w-1/2 h-full  flex flex-col justify-between items-end "}>


                                            <div
                                                className={"flex flex-col   gap-2 h-full w-3/4 items-end justify-center"}>
                                                <p className={"font-bold text-2xl mb-4"}>اطلاعات تکمیلی</p>
                                                <Input onChange={(e) => {
                                                    setApproveDetail({...approveDetail, nationalCode: e.target.value})
                                                }} label="کد ملی" placeholder={request.userInfo.nationalCode}
                                                       isDisabled={!!changeList.find((item) => item.id === request.id)}
                                                />
                                                <Input onChange={(e) => {
                                                    setApproveDetail({...approveDetail, cardSerial: e.target.value})
                                                }}
                                                       isDisabled={!!changeList.find((item) => item.id === request.id)}
                                                       label="سریال کارت ملی / شناسه رسید"
                                                       placeholder={request.userInfo?.cardSerial}/>
                                                <Input
                                                    isDisabled={!!changeList.find((item) => item.id === request.id)}
                                                    value={request.userInfo?.birthDate}
                                                    onChange={handleChange}
                                                    placeholder="روز/ماه/سال"
                                                    maxLength={10} label="تاریخ تولد"/>

                                                <div className={"flex flex-row  w-full gap-2 h-full  items-start mt-4"}>


                                                    <Button isDisabled={!!changeList.find((item) => item.id === request.id)}
                                                            className={"w-1/2"} color={"danger"} onClick={() => {
                                                        onOpen()
                                                    }}>
                                                        رد
                                                    </Button>
                                                    <Button isDisabled={!!changeList.find((item) => item.id === request.id)}
                                                            className={"w-1/2 text-white"} color={"success"}
                                                            onClick={() => approve(request.id, {
                                                                cardSerial: approveDetail?.cardSerial ?? request.userInfo.cardSerial,
                                                                nationalCode: approveDetail?.nationalCode ?? request.userInfo.nationalCode,
                                                                birthDate: request.userInfo.birthDate
                                                            })}>
                                                        تایید
                                                    </Button></div>
                                            </div>
                                            <p className={"font-bold"}> :امضا کاربر</p>
                                            <Image
                                                isZoomed
                                                isBlurred
                                                className={"w-1/4 h-2/3 cursor-pointer"}
                                                alt="NextUI Fruit Image with Zoom"
                                                src={request.files.find((file: File) => file.tag === "Signature")?.link.replace("https://digibanking.sbank.ir","http://10.121.254.61:5161/orion/api/v1/internal")}
                                            />


                                            { changeList.find((item)=>item.id===request.id)?.approve === false && <div
                                                className={`  "block border-red-600 text-red-600  w-[200px] h-[70px] border-4   rounded-lg -rotate-12 absolute bottom-56 right-60 z-20 flex items-center justify-center ${styles.rubber_stamp}`}>

                                                <p className={"font-black text-2xl"}>رد شده</p>
                                            </div>
                                            }
                                            { changeList.find((item)=>item.id===request.id)?.approve  && <div
                                                className={`  "block border-green-600 text-green-600  w-[200px] h-[70px] border-4   rounded-lg -rotate-12 absolute bottom-56 right-60 z-20 flex items-center justify-center ${styles.rubber_stamp}`}>

                                                <p className={"font-black text-2xl"}>تایید شده</p>
                                            </div>
                                            }
                                        </div>

                                    </div>


                                </div>
                            </div>

                        </SwiperSlide>)
                    }) : <SwiperSlide>
                        <div className={"w-full h-full flex flex-col gap-2 justify-center items-center"}>

                            <Image
                                width={500}
                                height={100}
                                className={"max-h-[400px]"}
                                alt="NextUI Fruit Image with Zoom"
                                src={notFound.src}
                            />
                            <p>
                                درخواستی یافت نشد
                            </p>

                        </div>
                    </SwiperSlide>}


            </Swiper>
            <div className={"bg-white fixed bottom-14 z-20"} style={{direction: "ltr"}}
            >
                {requests && <Pagination
                    isCompact
                    showControls
                    showShadow

                    color="primary"
                    page={activePage}
                    total={requests.totalItems}
                    onChange={(page) => {
                        setActivePage(page)
                        if (swiperRef.current && swiperRef.current.swiper) {
                            swiperRef.current.swiper.slideTo(page - 1);
                        }
                    }}
                />}
            </div>
            <Modal size={"lg"} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">رد درخواست کاربر</ModalHeader>
                            <ModalBody>
                                <p>
                                    آیا میخواهید درخواست کاربر را رد کنید؟
                                </p>

                                <RadioGroup

                                >
                                    {rejectReasons.map((reason) => {

                                        return <Radio onClick={() => setRejectReason(reason.reason)} className={"gap-2"}
                                                      key={reason.id} value={reason.reason}>{reason.reason}</Radio>

                                    })}

                                </RadioGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    انصراف
                                </Button>
                                <Button isDisabled={!rejectReason} color="primary" onPress={() => {
                                    requests && reject(requests.data[activePage - 1].id)
                                    onClose()
                                }}>
                                    تایید
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
export default Identities