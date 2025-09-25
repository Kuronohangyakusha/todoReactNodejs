import multer from "multer";
import path from "path";

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/audio/"); // dossier spécifique pour audio
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

// Filtre pour accepter uniquement les fichiers audio
const fileFilter = (_req: any, file: Express.Multer.File, cb: Function) => {
  if (file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers audio sont autorisés"), false);
  }
};

export const uploadAudio = multer({ storage, fileFilter });
