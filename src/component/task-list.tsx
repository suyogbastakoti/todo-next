"use client";
import React, { useEffect, useState } from "react";
import TaskItems from "@/component/task-ietm";

type Task = {
    id: number;
    task_name: string;
    description: string;
    due_date: string; // ISO string from DB
};

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch("/api/task");
                const data = await res.json();
                setTasks(data);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) return <div>Loading tasks...</div>;

    const mappedTasks = tasks.map(task => ({
        taskName: task.task_name,
        subTitle: task.description,
        date: new Date(task.due_date),
    }));

    return <TaskItems tasks={mappedTasks} />;
}
