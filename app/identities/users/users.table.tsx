import React, {useMemo} from "react";
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
    getKeyValue, Divider, Pagination, Button
} from "@nextui-org/react";
import {User} from "@/app/identities/users/page"
import {EyeIcon} from "@/app/card/EyeIcon";

const statusColorMap: Record<string, ChipProps["color"]> = {
    Verified: "success",
    Failed: "danger",
    HumanVerificationRequired: "warning",
};


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
        setPage:(page:number)=>void
    }
}



const checkNull = (value: string | number) => {
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
    }, [pagination.page]);



    const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
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

                            <Button variant={"light"}  className={"text-blue-700"}>
                        مشاهده جزئیات
                            </Button>


                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table aria-label="Example table with custom cells" className={"h-full"} bottomContent={bottomContent}>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
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