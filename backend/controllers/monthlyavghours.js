const {monthlyAvgHours,EveryWeekAvg, perDayinWeek} =require('../models/monthlyavgquires');
const EveryMonthAvg=async(req,res)=>{
    try{
        console.log('iam here')
        const id=req.params.id;
    let table,column;
    if(id.charAt(0)==='E'){
        table='emp_hours';
        column='emp_id';
    }else{
        table='stu_hours';
        column='stu_id';
    }
    const response=await monthlyAvgHours(table,column,id);
    res.send(response);

    }
    catch(err){
        console.log(err);
        res.send(err);
    }
    

}


const CurrentWeekAvg = async (req, res) => {
    const id = req.params.id;
    let table, column;
  
    if (id.charAt(0) === 'E') {
      table = 'emp_hours';
      column = 'emp_id';
    } else {
      table = 'stu_hours';
      column = 'stu_id';
    }
  
    const today = new Date();
    
    // Format today's date as YYYY-MM-DD
    const currentDate = today.toISOString().split('T')[0];
  
    // Calculate 7 days back
    const prevDate = new Date(today);
    prevDate.setDate(prevDate.getDate() - 6); // (today + 6 = 7 days including today)
    const prevCurrentDate = prevDate.toISOString().split('T')[0];
  
    try {
      const response = await EveryWeekAvg(table, column, id, currentDate, prevCurrentDate);
      res.json(response);
    } catch (error) {
      console.error('Error fetching weekly averages:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const CurrentWeekPerDay = async (req, res) => {
    const id = req.params.id;
    let table, column;
  
    if (id.charAt(0) === 'E') {
      table = 'emp_hours';
      column = 'emp_id';
    } else {
      table = 'stu_hours';
      column = 'stu_id';
    }
  
  
    try {
      const response = await perDayinWeek(table, id, column);
      res.json(response);
    } catch (error) {
      console.error('Error fetching weekly averages:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
module.exports={EveryMonthAvg,CurrentWeekAvg, CurrentWeekPerDay}