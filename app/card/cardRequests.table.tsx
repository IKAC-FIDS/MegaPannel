import React, {useState} from "react";
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
    getKeyValue
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

const statusColorMap: Record<string, ChipProps["color"]> = {
    1: "success",
    2: "danger",
    4: "warning",
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


const TableComponent = () => {


    const renderCell = React.useCallback((card: Card, columnKey: React.Key) => {
        const cellValue = card[columnKey as keyof Card];

        switch (columnKey) {
            case "date":
                return (
                    <div>{utcToShamsi(card.cardInfo.expireDateUtc)}</div>
                )
            case "name":
                return (
                    <div className={'flex gap-1'}>
                        <p>{card.userInfo.name}</p>
                        <p>{card.userInfo.lastName}</p>
                    </div>
                );
            case "nationalCode":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{card.userInfo.nationalCode}</p>
                    </div>
                );
            case "phoneNumber":
                return (
                    <div>
                        {card.userInfo.phoneNumber}
                    </div>
                )
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[card.cardRequest.status]} size="sm"
                          variant="flat">
                        {card.cardRequest.status}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
              <span onClick={() => {


              }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <Modal>
                <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="photos" title="مشخصات کاربر">
          <Card>
            <CardBody>
                <div className={"flex gap-5 mb-3"}>

             <Input labelPlacement={"outside"} label="نام و نام خانوادگی" isDisabled
                    defaultValue={card.userInfo.name + " " + card.userInfo.lastName} labelPlacement="outside"/>

             <Input labelPlacement={"outside"} label="کد ملی" isDisabled
                    defaultValue={card.userInfo.nationalCode}/>

                </div>

                <div className={"flex gap-5"}>

             <Input labelPlacement={"outside"} label="تاریخ تولد" isDisabled
                    defaultValue={card.userInfo.birthdate}/>

             <Input labelPlacement={"outside"} label="تلفن همراه" isDisabled
                    defaultValue={card.userInfo.phoneNumber}/>

                </div>

            </CardBody>
          </Card>
        </Tab>
        <Tab key="music" title="Music">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="videos" title="Videos">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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

    const [test, setTest] = useState<boolean>(false)

    // const FilteredColumn=(array:[],options:{})=>{
    //     const FilteredColumn = array.map(item => {
    //         const { options, ...rest } = item; // Using object destructuring to exclude 'avatar' property
    //         return rest;
    //     });
    // }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // const FilteredColumn = card.map(item => {
    //     const { gender, ...rest } = item.userInfo.gender; // Using object destructuring to exclude 'avatar' property
    //     return rest;
    // });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //     this is for obtional key
    // let obj = {foo: 1, bar: 2, baz: 3}
    // function removeProperty(obj, propertyName) {
    //     let { [propertyName]: _, ...result } = obj
    //     return result
    // }
    // console.log(removeProperty(obj, 'foo'));
    // {
    //     "bar": 2,
    //     "baz": 3
    // }

    //////////////////////////////////////////////////
    const [cardInfo, setCardInfo] = useState<boolean | undefined>(true);
// const getCardInfo=()=>{
//     card.map((item)=>{
//         setCardInfo(item)
//     })
// }
    return (
        <>
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} className={"text-start"} align={"center"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={card}>
                    {(card: Card) => (
                        <TableRow key={card.userInfo.name}>
                            {(columnKey) => <TableCell>{renderCell(card, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>

            </Table>

            {/*<ExportToExcel apiData={FilteredColumn} fileName={'filtershode'}/>*/}

        </>


    );
}
export default TableComponent