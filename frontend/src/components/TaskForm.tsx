import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";
import { Task } from "@/lib/types/Task";
import { createTask, updateTask } from "@/lib/task";

type Props = {
  editingTask?: Task | null;
  onTaskSaved: () => void;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const TaskFormDialog: React.FC<Props> = ({ editingTask, onTaskSaved, open, setOpen }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("To do");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (open && !editingTask) {
      setTitle("");
      setDescription("");
      setStatus("To do");
      setDueDate("");
    }
  
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setStatus(editingTask.status);
      setDueDate(editingTask.dueDate.slice(0, 10));
    }
  }, [editingTask, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, description, status, dueDate };

    try {
      const promise = editingTask
      ? updateTask(editingTask._id, payload)
      : createTask(payload);

      toast.promise(promise, {
        loading: editingTask ? "Updating task..." : "Adding task...",
        success: editingTask ? "Task updated!" : "Task added!",
        error: editingTask ? "Failed to update task." : "Failed to add task.",
      });

      await promise;
      onTaskSaved();
      setOpen(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editingTask ? "Edit Task" : "Add Task"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <Select onValueChange={(val) => setStatus(val as Task["status"])} value={status}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To do">To do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
          </div>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{editingTask ? "Update Task" : "Add Task"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
