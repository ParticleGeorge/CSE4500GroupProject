import mongoose from "mongoose";

const resultSchema = newmongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    attemptedQuestions: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            selectedAnswer: {
                type: String,
                required: true,
            },
            isCorrect: {
                type: Boolean,
                required: true,
            }
        }
    ],
    completedAt: {
        type: Date,
        default: Date.now,
    }
});

const Result = mongoose.model('Result', resultSchema);

export default Result;