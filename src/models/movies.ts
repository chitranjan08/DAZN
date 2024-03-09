import mongoose, { Document } from 'mongoose';

interface MovieModel extends Document {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  streamingLink: { type: String, required: true },
});

const Movie = mongoose.model<MovieModel>('Movie', MovieSchema);

export default Movie;
