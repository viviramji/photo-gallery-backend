import { Request, Response, json } from "express";
import Photo from "../models/Photo";
import path from "path";
import fs from "fs-extra";

export async function createPhoto(
  req: Request,
  res: Response
): Promise<Response> {
  /*   console.log(req.file); */
  const { title, description } = req.body;
  const newPhoto = {
    title: title,
    description: description,
    img: req.file.path,
    size: req.file.size,
    createdDate: new Date(),
    lastModified: new Date(),
  };

  const photo = new Photo(newPhoto);
  await photo.save();

  return res.json({
    msg: "Photo successfully saved",
    photo,
  });
}

export async function getPhotos(
  req: Request,
  res: Response
): Promise<Response> {
  const photos = await Photo.find();
  return res.json(photos);
}

export async function getPhoto(req: Request, res: Response): Promise<Response> {
  const id = req.params.id;
  const photo = await Photo.findById(id);
  return res.json(photo);
}

export async function deletePhoto(
  req: Request,
  res: Response
): Promise<Response> {
  const id = req.params.id;
  const photo = await Photo.findByIdAndRemove(id);
  if (photo) {
    await fs.unlink(path.resolve(photo.img));
  }
  return res.json({
    message: "Ok",
    photo: photo,
  });
}

export async function updatePhoto(
  req: Request,
  res: Response
): Promise<Response> {
  console.log(req.body);

  const { id } = req.params;
  const { title, description } = req.body;
  const updated = await Photo.findByIdAndUpdate(
    id,
    {
      title,
      description,
      lastModified: new Date(),
    },
    { new: true }
  );

  return res.json({
    msg: "Photo successfully updated",
    updated,
  });
}
