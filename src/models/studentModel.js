import pool from "../config/dbConnect.js";

export const getAllStudentService = async () => {
    const result = await pool.query("SELECT * FROM students")
    return result.rows;
}

export const getStudentByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM students where id = $1", [id])
    return result.rows[0]
}

export const getStudentWithMarksByParentID = async (id) => {
    console.log("chceiing for ID", id)
    const result = await pool.query(`
        SELECT students.*, marks.marks 
        FROM students
        LEFT JOIN marks ON students.parent_id = marks.parent_id
        WHERE students.parent_id = $1`, [id]);
    return result.rows[0]
}

export const createStudentService = async (name, email, age, parent_id) => {
    const result = await pool.query("INSERT INTO students (name, email, age, parent_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, email, age, parent_id]
    )
    return result.rows[0];
}

export const createStudentMarksService = async (marks, parent_id) => {
    const result = await pool.query("INSERT INTO marks (marks, parent_id) VALUES ($1, $2) RETURNING *",
        [marks, parent_id]
    )
    return result.rows[0];
}

export const updateStudentService = async (id, name, email, age, parent_id) => {
    const result = await pool.query("UPDATE students SET name=$1, email=$2, age=$3, parent_id=$4 WHERE id=$5 RETURNING *",
        [name, email, age, parent_id, id]
    )
    return result.rows[0]

}

export const deleteStudentService = async (id) => {
    const result = await pool.query("DELETE FROM students WHERE id=$1 RETURNING *",
        [id]
    )
    return result.rows[0]
}
