import mongoose from "mongoose";

const resultSchema = newmongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: 'N/A',
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
      answers: [Number], 
      submittedAt: {
        type: Date,
        default: Date.now,
      },
    });

export default mongoose.model('Result', resultSchema);