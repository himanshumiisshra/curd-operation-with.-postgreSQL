import pool from "../config/dbConnect.js";

const createStudentTable = async () => {
    const queryText = `CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT NOT NULL,
    parent_id INT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()    
)`;

    try {
        await pool.query(queryText);
        console.log("Student table created if not exist");
    } catch (error) {
        console.log("Error creating student table", error);
    }
};

const createMarksTable = async () => {
    const queryText = `CREATE TABLE IF NOT EXISTS marks (
        id SERIAL PRIMARY KEY,
        marks VARCHAR(100) NOT NULL,
        parent_id INT,
        created_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_parent_id FOREIGN KEY (parent_id) 
            REFERENCES students(parent_id) ON DELETE CASCADE
    )`;

    try {
        await pool.query(queryText);
        console.log("Marks table created if not exist");
    } catch (error) {
        console.log("Error creating marks table", error);
    }
};

const initializeDatabase = async () => {
    await createStudentTable();
    await createMarksTable();  
};

export { createStudentTable, createMarksTable, initializeDatabase };

