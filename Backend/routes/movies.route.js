import { Router } from "express";
import { createController, deleteController, getMeAllController, getMeController, updateController } from "../controllers/movies.controller.js";
import multer from 'multer';


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const movieRoute = Router();

movieRoute.post("/", createController);
movieRoute.put("/:id", upload.single('file'), updateController);
movieRoute.delete("/:id", deleteController);
movieRoute.get("/getMe/:name", getMeController);
movieRoute.get("/getAll", getMeAllController);

export default movieRoute;