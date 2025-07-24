"use client";
import React, { useState } from "react";

type Task = {
    taskName: string;
    subTitle: string;
    date: Date;
};

function TaskItem({ taskName, subTitle, date }: Task) {
    const [completed, setCompleted] = useState(false);

    return (
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 hover:bg-gray-50">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => setCompleted(!completed)}
                />
                <div>
                    <h3 className="text-gray-900 font-medium">{taskName}</h3>
                    <p className="text-gray-500 text-sm">
                        {subTitle} • {date.toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function TaskItems({ tasks }: { tasks: Task[] }) {
    return (
        <div className="w-full space-y-2">
            {tasks.map((task, index) => (
                <TaskItem
                    key={index}
                    taskName={task.taskName}
                    subTitle={task.subTitle}
                    date={new Date(task.date)}
                />
            ))}
        </div>
    );
}
