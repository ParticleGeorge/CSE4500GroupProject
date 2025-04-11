import express from 'express';
import { quizController } from '../app/controller/quizController.js';
import { userController } from '../app/controller/userController.js';
import { resultController } from '../app/controller/resultController.js';

const router = express.Router();

//quiz routes
router.post('/quizzes', quizController.createQuiz);
router.get('/quizzes', quizController.getAllQuizzes);
router.get('/quizzes/:id', quizController.getQuiz);
router.put('/quizzes/:id', quizController.updateQuiz);
router.delete('/quizzes/:id', quizController.deleteQuiz);
router.post('/quizzes/submit', quizController.submitQuiz);

//result routes
router.post('/results', resultController.submitResult);
router.get('/results/quiz/:quizId', resultController.getResultsByQuiz);
router.get('/results/user/:userId', resultController.getResultsByUser);
router.get('/results/:id', resultController.getResult);

//user routes
router.post('/users/register', userController.register);
router.post('/users/login', userController.login);
router.get('/users/:id', userController.getUserById);


export default router;