import express from "express";
import { createStudent, deleteStudent, getAllStudent, getStudentById, updateStudent, createStudentMarks, getStudentWithMarksByParentId } from "../controllers/studentController.js";
const router = express.Router();

router.post("/student", createStudent);
router.post("/marks", createStudentMarks);
router.get("/studentWithMarks", getStudentWithMarksByParentId)
router.get("/student", getAllStudent);
router.get("/student/:id", getStudentById);
router.put("/student/:id", updateStudent);
router.delete("/student/:id", deleteStudent);


export default router;

