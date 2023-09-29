import { Router, Request, Response } from 'express';
import multer from "multer";
import path from "path";

// Multer config
export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (req : Request, file : any , cb :any ) => {
    let ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".webp") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});