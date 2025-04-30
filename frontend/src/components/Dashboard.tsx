import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { Task } from "@/lib/types/Task";
import toast from "react-hot-toast";
import { Pencil, PlusIcon, Trash2 } from "lucide-react";
import TaskItemSkeleton from "./TaskSkeleton";
import TaskForm from "./TaskForm";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Button } from "./ui/button";
import Header from "./Header";
import { deleteTask, getTasks } from "@/lib/task";
import dayjs from "dayjs";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    let filtered = [...tasks];
    if (statusFilter !== "all") {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (t: any) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }
    setFilteredTasks(filtered);
  }, [search, statusFilter, tasks]);

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      fetchTasks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete task.");
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleTaskSaved = () => {
    setEditingTask(null);
    fetchTasks();
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200},
    { field: "description", headerName: "Description", flex: 1 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "dueDate", headerName: "Due Date", width: 200,  
      valueFormatter: (params: any) => {
        const formatted = dayjs(params.value).format("MMM D, YYYY h:mm A");
        return formatted === "Invalid Date" ? "-" : formatted;
    },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Pencil color="orange" strokeWidth="1"/>}
          label="Edit"
          
          onClick={() => handleEdit(params.row as Task)}
        />,
        <GridActionsCellItem
          icon={<Trash2 color="red" strokeWidth="1"/>}
          label="Delete"
          onClick={() => handleDelete(params.id as string)}
        />,
      ],
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <Header />
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex gap-2 w-full sm:w-auto flex-wrap">
          <Input
            placeholder="Search title or description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select onValueChange={setStatusFilter} value={statusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="To do">To do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => { setEditingTask(null); setDialogOpen(true); }} className="ml-auto">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="w-full" style={{ height: 500 }}>
        {loading ? <TaskItemSkeleton /> : (
          <DataGrid
            rows={filteredTasks}
            columns={columns}
            getRowId={(row) => row._id}
            sx={{ width: "100%" }}
          />
        )}
      </div>

      <TaskForm
        editingTask={editingTask}
        onTaskSaved={handleTaskSaved}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
    </div>
  );
};

export default TaskList;
