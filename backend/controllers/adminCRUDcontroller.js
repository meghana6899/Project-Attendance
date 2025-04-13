const {getAllUsers, updateAUser: update, deleteaUser} = require('../models/adminCRUDmodel')

const getUser = async(req, res) => {
    console.log("entered controller")
    const table = req.params.users;
    await getAllUsers(table, (err, data) => {
        console.log(data)
        console.log("Enter controller again..")
        if(err){
           // console.log(err)
            return res.send({
                success: false,
                err: err
            })
        }if(!data[0]) {
            
            return res.json("No Employee found")
        }
        
        res.json({
            success: true,
            data
        })
    })
}

const updateUser = async(req, res) => {
    const id = req.params.id;
    const table = req.params.user
    res.setHeader("Content-Type", "application/json")
    for(let key in req.body){
        console.log(req.body[key]);
        await update(id, key, req.body[key], table, (err, data) => {
        if(err){
            console.log(err)
            return res.json({
                success: false,
                err: err
            })
        }
        if(data[0].affectedRows == 0){
            return res.json({
                success: false,
                msg: "User doesn't exist"
            })
        }
        console.log(data)
    })
    }
    res.json({
        success: true,
        msg: "Updated Successfully"
    })
    
}

const deleteUser = async(req, res) => {
    const id = req.params.id;
    const table = req.params.user;
    await deleteaUser(id, table,  (err, data) => {
        console.log("Data",data)
        if(err){
            console.log(err)
            return res.json({
                success: false,
                err
            })
        }
        if(data[0].affectedRows == 0){
            return res.send(" User doesn't exist")
        }
        return res.json({
            success: true,
            msg: "Deleted Successfully"
        })
    })
}

module.exports =  {
    getUser,
    updateUser, 
    deleteUser
};
