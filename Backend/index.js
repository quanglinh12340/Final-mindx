import express, { json } from "express";
import databaseService from "./services/database.service.js";
import movieRoute from "./routes/movies.route.js";
import cors from 'cors';

const app = express();
const PORT = 1007;

app.use(cors());

app.use(express.json());

databaseService.connect();

app.use("/movies", movieRoute);

app.use((err, req, res, next) => {
    if (err.message) {
        return res.json({ error: err.message });
    } else {
        return res.json({ err });
    }
});

app.listen(PORT, (err) => {
    console.log(`Your app is listening on ${PORT}`);
});