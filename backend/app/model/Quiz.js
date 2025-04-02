import mongoose from "mongoose";

let quizSchema = newmongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    questions: [
        {
            question: {
                type: String,
                required: true,
                trim: true,
            },
            options: {
                type: [String],
                required: true,
            },
            correctAnswer: {
                type: String, 
                required: true,
                trim: true,
            },   
        },
    ],
    category: {
        type: String,
        trim: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;