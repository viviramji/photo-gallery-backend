import { Request, Response } from "express";

export function getPhotos(req: Request, res: Response) {}

export function createPhoto(req: Request, res: Response): Response {

  console.log(req.file);
  const { title, description } = req.body;
  
  return res.json({
    msg: "Photo successfully saved",
  });
}
