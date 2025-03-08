import { createStudentService, getAllStudentService, getStudentByIdService, updateStudentService, deleteStudentService, createStudentMarksService, getStudentWithMarksByParentID } from "../models/studentModel.js"


const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    })
}

export const createStudent = async (req, res, next) => {
    const { name, email, age, parent_id } = req.body;
    try {
        const newStudent = await createStudentService(name, email, age, parent_id);
        handleResponse(res, 201, "Student created Succesfully", newStudent)
    } catch (error) {
        next(error)
    }
}

export const getAllStudent = async (req, res, next) => {
    try {
        const studentList = await getAllStudentService();
        handleResponse(res, 200, "Student fetched Succesfully", studentList)
    } catch (error) {
        next(error)
    }
}

export const getStudentWithMarksByParentId = async (req, res, next) => {
    console.log("cehcking for params", req.query)
    const studentId = parseInt(req.query.id, 10);
    console.log("student ID",studentId)
    try {
        const studentWithMarks = await getStudentWithMarksByParentID(studentId);
        if (!studentWithMarks) return handleResponse(res, 404, "Student not found")
        handleResponse(res, 200, "Student with marks fetched Succesfully", studentWithMarks)
    } catch (error) {
        next(error)
    }
}

export const getStudentById = async (req, res, next) => {
    try {
        const studentById = await getStudentByIdService(req.params.id);
        if (!studentById) return handleResponse(res, 404, "Student not found")
        handleResponse(res, 200, "Student fetched Succesfully", studentById)
    } catch (error) {
        next(error)
    }
}


export const updateStudent = async (req, res, next) => {
    const { name, email, age, parnet_id } = req.body;
    try {
        const updatedStudent = await updateStudentService(req.params.id, name, email, age, parnet_id);
        if (!updatedStudent) return handleResponse(res, 404, "Student not found")
        handleResponse(res, 200, "Student updated Succesfully", updatedStudent)
    } catch (error) {
        next(error)
    }
}


export const deleteStudent = async (req, res, next) => {
    try {
        const deleteStudent = await deleteStudentService(req.params.id);
        if (!deleteStudent) return handleResponse(res, 404, "Student not found")
        handleResponse(res, 200, "Student updated Succesfully", deleteStudent)
    } catch (error) {
        next(error)
    }
}

export const createStudentMarks = async (req, res, next) => {
    const { marks, parent_id } = req.body;
    try {
        const createStudentMark = await createStudentMarksService(marks, parent_id);
        handleResponse(res, 201, "Marks created Succesfully", createStudentMark)

    } catch (error) {
        next(error)
    }

}