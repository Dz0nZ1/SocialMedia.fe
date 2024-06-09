"use client"

import {ReactNode} from "react";
import {SessionProvider, useSession} from "next-auth/react";
import SessionStatusWrapper from "./SessionStatusProvider";

interface Props {
    children: ReactNode
}

function SessionProviderWrapper ({children} : Props) {

    return (
        <SessionProvider>
            <SessionStatusWrapper>
                    {children}
            </SessionStatusWrapper>
        </SessionProvider>
    );
}
export default SessionProviderWrapper;