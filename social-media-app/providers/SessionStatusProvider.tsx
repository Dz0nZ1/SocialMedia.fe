"use client"
import {signOut, useSession} from "next-auth/react";
import React from "react";
import {useRouter} from "next/navigation";
import Spinner from "@/components/ui/spinner";

export default function SessionStatusWrapper({
                                                 children,
                                             }: {
    children: React.ReactNode
}) {
    const {data: session, status} = useSession();
    const router = useRouter();


    const authProblem = async () => {
        //@ts-ignore
        const error : string = session?.user?.defaultMessage
        const data = await signOut({redirect: false })
        router.push(`http://localhost:3000/auth/login?message=${error}`);
    }

    // //@ts-ignore
    // if(session?.user?.defaultMessage === AuthProblems.USER_NOT_FOUND){
    //     authProblem();
    // }


    // //@ts-ignore
    // if(session?.user?.defaultMessage === AuthProblems.WRONG_PASSWORD){
    //     authProblem();
    // }


    return (
        <>
            {status === "loading" ?
                <Spinner/> :
                <>
                    {children}
                </>
            }
        </>
    );
}