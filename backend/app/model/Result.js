import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
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
    total: {
        type: Number,
        required: true,
    },
    answers: [{
        questionIndex: Number,
        selectedOption: Number
    }],
    submittedAt: {
        type: Date,
        default: Date.now,
    },
    });

export default mongoose.model('Result', resultSchema);