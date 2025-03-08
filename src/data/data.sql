CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT NOT NULL,
    parnet_id INT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()    
)

CREATE TABLE IF NOT EXISTS marks (
    id SERIAL PRIMARY KEY,
    marks VARCHAR(100) NOT NULL,
    parent_id INT,
    created_at TIMESTAMP DEFAULT NOW(),
     CONSTRAINT fk_parent_id FOREIGN KEY (parent_id) 
        REFERENCES students(parent_id) ON DELETE CASCADE    
)
