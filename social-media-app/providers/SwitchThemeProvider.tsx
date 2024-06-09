"use client"

import {ReactNode} from "react";
import {ThemeProvider} from "next-themes"
interface Props {
    children: ReactNode
}

function SessionProviderWrapper ({children} : Props) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    );
}
export default SessionProviderWrapper;