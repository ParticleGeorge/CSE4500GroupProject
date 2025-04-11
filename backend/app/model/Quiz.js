import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  options: {
    type: [String],
    required: true,
    validate: [array => array.length >= 2, 'At least 2 options are required.']
  },
  correctAnswer: {
    type: Number, //index of correct option
    required: true,
    min: 0,
    validate: {
      validator: function(value) {
        return this.options && value < this.options.length;
      },
      message: props => `correctAnswer index (${props.value}) must be within options array length.`
    }
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  totalQuestions: {
    type: Number,
    default: 0,
  },
  questions: {
    type: [questionSchema],
    required: true,
    validate: {
      validator: function (val) {
        return Array.isArray(val) && val.length >= 1;
      },
      message: 'A quiz must have at least one question.'
    }
  }
});

//calculate totalQuestions automatically from array
quizSchema.pre('save', function(next) {
  this.totalQuestions = this.questions.length;
  next();
});

export default mongoose.model('Quiz', quizSchema);