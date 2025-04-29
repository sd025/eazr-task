import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  status:      { type: String, enum: ['To do', 'In Progress', 'Done'], default: 'To do' },
  dueDate:     { type: Date },
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Task', taskSchema);
