-- Department
INSERT INTO department (name) VALUES ('Engineering'), ('Manager'), ('HR');

-- Role
INSERT INTO role (title, salary, department_id) VALUES 
('Engineer', 100000, 1), 
('Manager', 80000, 2), 
('HR Specialist', 70000, 3);

-- Employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Eduardo', 'Siman', 1, NULL), 
('Marcelo', 'Grossi', 2, 1), 
('Lucas', 'Reis', 3, 2);
