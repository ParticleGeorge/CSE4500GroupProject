import Quiz from '../model/Quiz.js';

const createQuiz = async (req,res) => {
    try {
        const { title, questions, category, totalQuestions } = req.body;
        if(!title || !questions || !question || !options || !correctAnswer || !category || !totalQuestions) {
            return res.status(400).json({ error:'Please complete all fields.'});
        }

        if(typeof category !== 'string' || category.trim() === '') {
            return res.status(400).json({ error: 'Please enter a valid category.'})
        }

        for (const q of questions) {
            if (!q.question || !Array.isArray(q.options) || q.options.length < 2 || typeof q.correctAnswer === 'undefined') {
                return res.status(400).json({ error: 'Each question must include a question, at least two options, and a correctAnswer.' });
            }
        }

        const newQuiz = await Quiz.create({
            title,
            questions,
            category,
            totalQuestions
        });

        res.status(201).json({ message: 'Quiz created successfully!', quiz: newQuiz });

    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'An error occured while creating quiz. Please try again.' })
    }
};

const getAllQuizzes = async (req,res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quizzes. Please try again.' });
      }
};

const getQuiz = async (req,res) => {
    try {
        const { id } = req.params;
        const quiz = await Quiz.findById(id);
        if (!quiz) {
          return res.status(404).json({ error: 'Quiz not found.' });
        }
        res.status(200).json(quiz);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the quiz. Please try again' });
      }
};


const updateQuiz = async (req,res) => {
    try {
        const { id } = req.params;
        const updatedQuiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedQuiz) {
          return res.status(404).json({ error: 'Quiz not found.' });
        }
        res.status(200).json({ message: 'Quiz updated successfully', quiz: updatedQuiz });
      } catch (error) {
        res.status(500).json({ error: 'Failed to update quiz. Please try again.' });
      }
};

const deleteQuiz = async (req,res) => {
    try {
        const { id } = req.params;
        const deletedQuiz = await Quiz.findByIdAndDelete(id);
        if (!deletedQuiz) {
          return res.status(404).json({ error: 'Quiz not found.' });
        }
        res.status(200).json({ message: 'Quiz deleted successfully!' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete quiz. Please try again.' });
      }
};

//scores user answers
const submitQuiz = async (req,res) => {
    try {
        const { quizId, answers } = req.body;
    
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
          return res.status(404).json({ error: 'Quiz not found.' });
        }
    
        let score = 0;
        quiz.questions.forEach((q, index) => {
          if (answers[index] === q.correctAnswer) {
            score++;
          }
        });
    
        res.status(200).json({ message: 'Quiz submitted.', score, total: quiz.questions.length });
      } catch (error) {
        res.status(500).json({ error: 'Failed to submit quiz. Please try again.' });
      }
};

const validateQuizSubmission = async (req, res) => {
    const { answers } = req.body;
    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: 'Answers must be an array.' });
    }
    res.status(200).json({ message: 'Submission is valid.' });
  };
  

export const quizController = {createQuiz, getAllQuizzes, getQuiz, updateQuiz, deleteQuiz, submitQuiz, validateQuizSubmission};

