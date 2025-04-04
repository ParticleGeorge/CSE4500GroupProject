// Quiz.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number, //index of correct option
});

const quizSchema = new mongoose.Schema({
  title: String,
  category: String,
  totalQuestions: Number,
  questions: [questionSchema],
});

export default mongoose.model('Quiz', quizSchema);