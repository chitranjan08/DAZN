import express from 'express';
import {
  getAllMovies,
  searchMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from '../controller/movieController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/getAllMovies', getAllMovies);
router.get('/search', searchMovies);
router.post('/addMovie', addMovie);
router.put('/:id',authenticate, updateMovie);
router.delete('/:id', authenticate,deleteMovie);

export default router;
