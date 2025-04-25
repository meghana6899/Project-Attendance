const {avgLoginTime, avgLogoutTime, avgWorkingHours, avgLogoutTimestd, avgWorkingHoursstd, avgLoginTimestd} = require('../models/reportModels')


const calculateAvg = async(req, res) => {
   
    try {
           const avglt =  await avgLoginTime();
           if(!avglt){
            return res.status(400).send({
                success: false,
                message: "avglt is returning nothing"
            })
           }
           const avgLoT = await avgLogoutTime();
           if(!avgLoT){
            return res.status(400).send({
                success: false,
                message: "avgLot is returning nothing"
            })
           }
           const avgTh = await avgWorkingHours();
           if(!avgTh){
            return res.status(400).send({
                success: false,
                message: "avgTh is returning nothing"
            })
           }
           console.log(avgTh)
           return res.status(200).json({
            success: true,
            data: {avglt, avgLoT, avgTh}
           })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })
    }
    
}

const calculateAvgstd = async(req, res) => {
   
    try {
           const avglt =  await avgLoginTimestd();
           if(!avglt){
            return res.status(400).send({
                success: false,
                message: "avglt is returning nothing"
            })
           }
           const avgLoT = await avgLogoutTimestd();
           if(!avgLoT){
            return res.status(400).send({
                success: false,
                message: "avgLot is returning nothing"
            })
           }
           const avgTh = await avgWorkingHoursstd();
           if(!avgTh){
            return res.status(400).send({
                success: false,
                message: "avgTh is returning nothing"
            })
           }
           console.log(avgTh)
           return res.status(200).json({
            success: true,
            data: {avglt, avgLoT, avgTh}
           })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })
    }
    
}



module.exports = {
    calculateAvg,
    calculateAvgstd
};