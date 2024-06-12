"use client"

import { useState, useEffect } from 'react';
import {checkAccess} from "@/app/auth/checkAccess";
import {getCookie} from "cookies-next";

const useAccessCheck = (access: string): boolean | null => {
    const [hasAccess, setHasAccess] = useState<boolean | null>(null);
    const accessToken = getCookie("accessToken");
    useEffect(() => {
        const verifyAccess = async () => {

            if(accessToken) {
                const accessStatus = await checkAccess(access, accessToken);
                setHasAccess(accessStatus);
            }
        };

        verifyAccess();
    }, [access,accessToken]);

    return hasAccess;
};

export default useAccessCheck;
