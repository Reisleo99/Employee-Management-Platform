import { Department } from '../models/department';
import { pool } from '../connection';

export const getAllDepartments = async (): Promise<Department[]> => {
    const res = await pool.query('SELECT * FROM department');
    console.log(res);
    return res.rows;
};

export const addDepartment = async (name: string): Promise<void> => {
    try {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
    } catch (error: any) {
        if (error.code === '23505') { // Unique violation error code in PostgreSQL
            throw new Error('Department name must be unique.');
        }
        throw error;
    }
};

export const getDepartmentById = async (id: number): Promise<Department | null> => {
    const res = await pool.query('SELECT * FROM department WHERE id = $1', [id]);
    return res.rows[0] || null;
};

export const deleteDepartment = async (id: number): Promise<void> => {
    await pool.query('DELETE FROM department WHERE id = $1', [id]);
};