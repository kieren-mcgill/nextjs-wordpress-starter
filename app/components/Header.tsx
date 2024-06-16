"use client";

import {usePathname} from "next/navigation";

const Header = () => {

    const pathname = usePathname()
    const currentPath = pathname === "/" ? "/homepage" : pathname;

    return (
        <div className={"h-10 bg-cyan-200 flex justify-around align-middle"}>
            <h1>{`Header for ${currentPath}`}</h1>
            <Link href={"/"}>Home</Link>
        </div>

    )
}

import React from "react";
import Link from "next/link";

export default Header;