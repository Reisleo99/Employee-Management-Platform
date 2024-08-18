import { Role } from '../models/role';
import { pool } from '../connection';


export const getAllRoles = async (): Promise<Role[]> => {
    const res = await pool.query('SELECT * FROM role');
    return res.rows;
};

export const addRole = async (title: string, salary: number, departmentId: number): Promise<void> => {
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
};