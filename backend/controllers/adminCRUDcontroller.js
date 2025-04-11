const {getAllUsers, updateAUser: update, deleteaUser} = require('../models/adminCRUDmodel')

const getUser = (req, res) => {
    console.log("entered controller")
    const table = req.params.users;
    getAllUsers(table, (err, data) => {
        console.log("Enter controller again..")
        if(err){
           // console.log(err)
            return res.send(err)
        }if(!data) {
            return res.json("no Employee found")
        }
        
        res.json({data})
    })
}

const updateUser = (req, res) => {
    const id = req.params.id;
    const table = req.params.user
    for(let key in req.body){
        console.log(req.body[key]);
        update(id, key, req.body[key], table, (err, data) => {
        if(err){
            console.log(err)
            return res.json(err)
        }
        if(!data){
            return res.json("Data not available")
        }
        console.log(data)
    })
    }
    res.json("Updated Succesfully")
    
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    const table = req.params.user;
    deleteaUser(id, table,  (err, data) => {
        if(err){
            console.log(err)
            return res.json({err})
        }
        if(!data){
            return res.send(" User doesn't exist")
        }
        return res.json("Deleted Successfully")
    })
}

module.exports =  {
    getUser,
    updateUser, 
    deleteUser
};
