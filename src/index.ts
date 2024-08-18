import inquirer from 'inquirer';
import { getAllDepartments, addDepartment } from './services/departmentService';
import { getAllRoles, addRole } from './services/roleService';
import { getAllEmployees, addEmployee, updateEmployeeRole } from './services/employeeService';
import { connectToDb } from './connection';

const main = async () => {
    await connectToDb();
    const answers = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Exit'
        ],
    });

    switch (answers.action) {
        case 'View All Departments':
            const departments = await getAllDepartments();
            console.table(departments);
            break;

        case 'View All Roles':
            const roles = await getAllRoles();
            console.table(roles);
            break;

        case 'View All Employees':
            const employees = await getAllEmployees();
            console.table(employees);
            break;

        case 'Add Department':
            const { name } = await inquirer.prompt({
                type: 'input',
                name: 'name',
                message: 'Enter the name of the department:',
            });
            await addDepartment(name);
            console.log('Department added successfully.');
            break;

        case 'Add Role':
            const { title, salary, departmentId } = await inquirer.prompt([
                { type: 'input', name: 'title', message: 'Enter the role title:' },
                { type: 'input', name: 'salary', message: 'Enter the role salary:' },
                { type: 'input', name: 'departmentId', message: 'Enter the department ID for this role:' },
            ]);
            await addRole(title, salary, parseInt(departmentId));
            console.log('Role added successfully.');
            break;

        case 'Add Employee':
            const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                { type: 'input', name: 'firstName', message: 'Enter the employee\'s first name:' },
                { type: 'input', name: 'lastName', message: 'Enter the employee\'s last name:' },
                { type: 'input', name: 'roleId', message: 'Enter the role ID for this employee:' },
                { type: 'input', name: 'managerId', message: 'Enter the manager ID for this employee (if any):' },
            ]);
            await addEmployee(firstName, lastName, parseInt(roleId), managerId ? parseInt(managerId) : null);
            console.log('Employee added successfully.');
            break;

        case 'Update Employee Role':
            const { employeeId, newRoleId } = await inquirer.prompt([
                { type: 'input', name: 'employeeId', message: 'Enter the employee ID:' },
                { type: 'input', name: 'newRoleId', message: 'Enter the new role ID:' },
            ]);
            await updateEmployeeRole(parseInt(employeeId), parseInt(newRoleId));
            console.log('Employee role updated successfully.');
            break;

        case 'Exit':
            console.log('Goodbye!');
            process.exit(0);
    }
    await main();
};

main();