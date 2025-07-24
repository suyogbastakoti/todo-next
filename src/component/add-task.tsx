"use client";
import React, { useState } from "react";

type Task = {
    taskName: string;
    subTitle: string;
    date: Date;
};

export default function AddTask({
                                    onSubmit,
                                }: {
    onSubmit: (task: Task) => void;
}) {
    const [taskName, setTaskName] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [date, setDate] = useState(new Date());

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!taskName.trim()) return;

        onSubmit({
            taskName,
            subTitle,
            date,
        });

        // Reset form
        setTaskName("");
        setSubTitle("");
        setDate(new Date());
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 hover:bg-gray-50">
                <div className="flex items-center gap-3 w-full">
                    <input type="checkbox" disabled className="cursor-not-allowed" />

                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Task name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            className="w-full text-gray-900 font-medium outline-none bg-transparent placeholder-gray-400"
                            required
                        />
                        <div className="flex items-center gap-2 mt-1">
                            <input
                                type="text"
                                placeholder="Subtitle (optional)"
                                value={subTitle}
                                onChange={(e) => setSubTitle(e.target.value)}
                                className="text-gray-500 text-sm bg-transparent outline-none placeholder-gray-400"
                            />
                            <span className="text-gray-400">•</span>
                            <input
                                type="date"
                                value={date.toISOString().split("T")[0]}
                                onChange={(e) => setDate(new Date(e.target.value))}
                                className="text-gray-500 text-sm bg-transparent outline-none"
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="cursor-pointer">
                    <svg
                        className="w-5 h-5 text-blue-500 hover:text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M3 10h14M10 3l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </form>
    );
}
