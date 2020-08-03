import { Router } from "express";

import { createPhoto, getPhotos } from "./../controllers/photo.controller";

import multer from "./../libs/multer";

const router = Router();

router
  .route("/photos")
  .post(multer.single("image"), createPhoto)
  .get(getPhotos);

export default router;
