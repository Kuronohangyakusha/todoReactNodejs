import { Router } from "express";
import { TacheController } from "../controllers/TacheController.js"; 
import { permisMiddlware } from "../middleware/PermisMiddlware.js";
import { PermissionMiddleware } from "../middleware/PermissionMiddleware.js";
import { Droit } from "@prisma/client";
import { upload } from "../middleware/UploadMiddleware.js";

const router = Router();
router.patch(
  "/:id/audio",
  upload.single("audio"),
  PermissionMiddleware.verifierDroit(Droit.MODIFIER),
  TacheController.uploadAudio
);

router.get("/", TacheController.getAll);           
router.post("/", upload.fields([{ name: "image" }, { name: "audio" }]), TacheController.create);        
router.patch("/:id/status", permisMiddlware.VerifyPermission.bind(permisMiddlware), TacheController.up);  
router.get("/:id", PermissionMiddleware.verifierDroit(Droit.LIRE), TacheController.findById);    
router.put("/:id", upload.fields([{ name: "image" }, { name: "audio" }]), PermissionMiddleware.verifierDroit(Droit.MODIFIER), TacheController.update);       
router.delete("/:id", TacheController.delete); 
router.post("/:id/permission", TacheController.assignerPermission);
router.get("/:id/historique", TacheController.getHistorique);

export default router;
