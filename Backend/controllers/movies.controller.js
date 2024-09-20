import MoviesModel from "../models/movies.model.js";
import movieService from "../services/movie.service.js";
import { v2 as cloudinary } from 'cloudinary';
import { config } from "dotenv";

config();

cloudinary.config({
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.CLOUD_KEY}`,
    api_secret: `${process.env.CLOUD_SECRET}`
});

export const createController = async (req, res, next) => {
    const { ID, name, time, year, image, introduce } = req.body;
    const existingData = await MoviesModel.findOne({ ID });
    console.log(existingData)
    if (existingData) {
        return res.json({
            message: "ID movies already exist",
        });
    } else {
        await movieService.createData({ ID, name, time, year, image, introduce });
        return res.json({
            message: "Create Successfully",
        });
    }
};

export const updateController = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    const file = req.file;

    try {
        if (file) {
            const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            const fileName = file.originalname.split('.')[0];

            const uploadResult = await cloudinary.uploader.upload(dataUrl, {
                public_id: fileName + (new Date()).getTime(),
                resource_type: 'auto',
            });

            updateData.image = uploadResult.secure_url;
        }

        await movieService.updateData(id, updateData);
        res.json({ message: "Update Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating movie", error: error.message });
    }
};

export const deleteController = async (req, res, next) => {
    const { id } = req.params;
    await movieService.deleteData(id);
    return res.json({
        message: "Delete Successfully",
    });
};

export const getMeController = async (req, res, next) => {
    const { name } = req.params;
    const result = await movieService.getData(name);
    return res.json({
        message: "Get me successfully",
        result,
    });
};

export const getMeAllController = async (req, res, next) => {
    const result = await movieService.getAllData();
    return res.json({
        message: "Get me all successfully",
        result,
    });
};