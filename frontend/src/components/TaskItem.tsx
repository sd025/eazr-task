"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@/lib/types/Task";
import axios from "axios";
import toast from "react-hot-toast";

interface TaskItemProps {
  task: Task
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onTaskUpdated,
  onTaskDeleted,
}) => {
    const [status, setStatus] = useState<"To do" | "In Progress" | "Done">(task.status);

    const handleStatusChange = async (newStatus: Task['status']) => {
        setStatus(newStatus);
        const token = localStorage.getItem('token');
        try {
          const promise = axios.put(
            `/api/tasks/${task._id}`,
            { status: newStatus },
            { headers: token ? { Authorization: `Bearer ${token}` } : {} }
          );
          toast.promise(promise, {
            loading: 'Updating status...',
            success: 'Status updated',
            error: 'Failed to update status.'
          });
          await promise;
          onTaskUpdated();
        } catch (err) {
          console.error(err);
        }
      };
    
      const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
          const promise = axios.delete(
            `/api/tasks/${task._id}`,
            { headers: token ? { Authorization: `Bearer ${token}` } : {} }
          );
          toast.promise(promise, {
            loading: 'Deleting task...',
            success: 'Task deleted',
            error: 'Failed to delete task.'
          });
          await promise;
          onTaskDeleted();
        } catch (err) {
          console.error(err);
        }
      };
  return (
    <li className="p-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <h5 className="text-lg font-semibold">{task.title}</h5>
          <p className="text-gray-600">{task.description}</p>
        </div>
        <div className="flex items-center space-x-4">
        <Select onValueChange={handleStatusChange} value={status}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>{status}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="To do">To do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;