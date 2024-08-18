import { Employee } from '../models/employee';
import { pool } from '../connection';

export const getAllEmployees = async (): Promise<Employee[]> => {
    const res = await pool.query('SELECT * FROM employee');
    return res.rows;
};

export const addEmployee = async (firstName: string, lastName: string, roleId: number, managerId: number | null): Promise<void> => {
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
};

export const updateEmployeeRole = async (employeeId: number, roleId: number): Promise<void> => {
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
};