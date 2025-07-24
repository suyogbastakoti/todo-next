"use client";

import {ReactNode} from "react";

type button = {
    label: string;
    onClick: () => void;
    children: ReactNode;
}

export default function Button({label, onClick, children,}: button) {
    return (
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                onClick={onClick}> {children} {label}
        </button>
    )
};
