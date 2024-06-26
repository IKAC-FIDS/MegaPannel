import {Image} from "@nextui-org/react";
import BgImage from "./images/403.png"
import React from "react";

export default function Forbidden() {
    return <div className={"flex flex-col gap-10 items-center justify-center h-full w-full"}>

        <Image
            isBlurred
            width={"800px"}
            height={"800px"}
            className={" w-full cursor-pointer"}
            alt="NextUI Fruit Image with Zoom"
            src={BgImage.src}
        />

    <p className={"font-bold text-2xl mt-4"}>امکان دسترسی به این صفحه نمیباشد!</p>
    </div>
}