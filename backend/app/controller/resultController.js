import Result from '../model/Result.js';
import Quiz from '../model/Quiz.js';

const submitResult = async (req, res) => {
  try {
    const { quizId, answers, userId = 'anonymous' } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found.' });

    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        score++;
      }
    });

    const resultData = {
      quizId,
      score,
      total: quiz.questions.length, answers,
    };
    if (userId) resultData.userId = userId;
    const result = await Result.create(resultData);

    res.status(201).json({ message: 'Result saved', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving result.' });
  }
};

const getResultsByQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const results = await Result.find({ quizId }).sort({ submittedAt: -1 });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results.' });
  }
};

const getResultsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await Result.find({ userId }).sort({ submittedAt: -1 });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user results.' });
  }
};

const getResult = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Result.findById(id).populate('quizId');
    if (!result) return res.status(404).json({ error: 'Result not found.' });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch result.' });
  }
};

export const resultController = {submitResult, getResultsByQuiz, getResultsByUser, getResult};