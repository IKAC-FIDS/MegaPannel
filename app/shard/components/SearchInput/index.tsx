import {InputVariantProps} from "@nextui-org/react";
import Style from "./styles.module.css";
import React, {useRef} from "react";

interface InputProps extends InputVariantProps {
    onChange: (e: any) => void;
}

const SearchInputComponents: React.FC<InputProps> = ({onChange}: InputProps) => {
    const searchRef = useRef<HTMLInputElement>(null);

    return (
        <div className={Style.searchBox}>
            <button
                onClick={() => {
                    if (searchRef.current) searchRef.current.focus();
                }}
                className={Style.btnSearch}
            >
                <i className={"flex justify-center items-center"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </i>
            </button>
            <input
                ref={searchRef}
                type="text"
                className={Style.inputSearch}
                placeholder="جست و جو ..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange && onChange(e);
                }}
            />
        </div>
    );
};

export default SearchInputComponents;
