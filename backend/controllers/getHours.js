
const {getHoursperDay} = require('../models/HoursPerDay')

const getHours = async(req, res) => {
    const user_id = req.params.id;
    const user = req.params.user;
    let table, column;
    if(user == "employee"|| user == "admin"){
        table = "emp_hours",
        column = "emp_id"
    }else {
        table = "stu_hours",
        column = "stu_id"
    }
    const date = req.body.date;
    const hours = await getHoursperDay(table, column, user_id, date);
    console.log(hours)
    res.send(hours[0])
    
}


module.exports = getHours