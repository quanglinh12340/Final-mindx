import mongoose from "mongoose";
import Collections from "../constants/collections.js";
const movieSchema = new mongoose.Schema(
  {
    ID: String,
    name: String,
    time: String,
    year: String,
    image: String,
    introduce: String,
  },
  { versionKey: false }
);
const MoviesModel = mongoose.model(Collections.MOVIES, movieSchema);
export default MoviesModel;
