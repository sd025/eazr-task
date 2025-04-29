export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: 'To do' | 'In Progress' | 'Done';
    dueDate: string;
    userId: string;
  }
  