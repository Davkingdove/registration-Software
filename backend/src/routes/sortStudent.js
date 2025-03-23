import { Router } from "express";
import { createStudent,renderStudent,registerPage } from "../controllers/student.contoller";
const router= Router();


router.get("/", registerPage);
router.post("/save", createStudent);
router.get("/student/sort", renderStudent);


export default router;
