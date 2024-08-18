CREATE TABLE department (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) UNIQUE NOT NULL,
);
CREATE TABLE role (
    role_id SERIAL PRIMARY KEY,
    role_title VARCHAR(30) UNIQUE NOT NULL,
    salary_id DECIMAL NOT NULL,
    department_id INTEGER NOT NULL REFERENCES department(department_id),
);
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
)