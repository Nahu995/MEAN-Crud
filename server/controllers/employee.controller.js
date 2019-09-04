const Employee = require('../models/employee');

const employeeCtrl = {};

employeeCtrl.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees)
};

employeeCtrl.createEmployee = async (req, res) => {
  // const employee = new Employee(req.body)
  const employee = new Employee({
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary
  });
  await employee.save();
  console.log(employee);
  res.json({ status: "Employee Created"})
};

employeeCtrl.getEmployee = async (req, res) => {
  const { id } = req.params
  const employee = await Employee.findById(id)
  res.json(employee)
};

employeeCtrl.editEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, position, office, salary } = req.body 
  const employee = {
    name,
    position,
    office,
    salary
  }
  await Employee.findByIdAndUpdate(id,  {$set: employee}, { new: true })
  res.json({ status: "Updated"})
};
employeeCtrl.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  await Employee.findByIdAndRemove(id)
  res.json({
    status: 'Employee delete' 
  })
  
};


module.exports = employeeCtrl;