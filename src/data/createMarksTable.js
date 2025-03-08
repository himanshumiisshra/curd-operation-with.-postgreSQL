import pool from "../config/dbConnect.js";



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
}

export default createMarksTable;