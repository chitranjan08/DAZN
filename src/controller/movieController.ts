import { Request, Response } from 'express';
import Movie from "../models/movies";
import {AuthenticatedRequest}  from '../middleware/authMiddleware';

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchMovies = async (req: Request, res: Response) => {
    try {
      const query = req.query.q;
  
      if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required.' });
      }
  
      
      const regex = new RegExp(query.toString(), 'i');
  
      const movies = await Movie.find({
        $or: [{ title: regex }, { genre: regex }],
      });
  
      res.json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const addMovie = async (req: AuthenticatedRequest, res: Response) => {
    try {
      
      console.log(req.body)
      const { title, genre, rating, streamingLink } = req.body;
      
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Permission denied. Requires "admin" role.' });
      }
  
      
      if (!title || !genre || !rating || !streamingLink) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
     
      const newMovie = new Movie({
        title,
        genre,
        rating,
        streamingLink,
      });
  
      
      const savedMovie = await newMovie.save();
  
      
      res.status(201).json(savedMovie);
    } catch (error) {
      
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


export const updateMovie = async (req: AuthenticatedRequest, res: Response) => {
    try {
      
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Permission denied. Requires "admin" role.' });
      }
  
      const movieId = req.params.id;
      const { title, genre, rating, streamingLink } = req.body;
  
      //
      if (!title && !genre && !rating && !streamingLink) {
        return res.status(400).json({ error: 'At least one field (title, genre, rating, streamingLink) is required for update.' });
      }
  
      const updatedMovie = await Movie.findByIdAndUpdate(
        movieId,
        {
          title: title || undefined,
          genre: genre || undefined,
          rating: rating || undefined,
          streamingLink: streamingLink || undefined,
        },
        { new: true }
      );
  
      if (!updatedMovie) {
        return res.status(404).json({ error: 'Movie not found.' });
      }
  
      res.json(updatedMovie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  


export const deleteMovie = async (req: AuthenticatedRequest, res: Response) => {
    try {
      
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Permission denied. Requires "admin" role.' });
      }
  
      const movieId = req.params.id;
  
      const deletedMovie = await Movie.findByIdAndDelete(movieId);
  
      if (!deletedMovie) {
        return res.status(404).json({ error: 'Movie not found.' });
      }
  
      res.json({ message: 'Movie deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
