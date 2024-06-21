const {getRegisterdpersonDetailsList,getRegisterdpersonDetailsById} = require("../services/branchuser.js")

module.exports ={
    getRegisterdpersonDetailsList: (req,res) =>{
        getRegisterdpersonDetailsList((error,results)=>{
            if(error){
                res.json({
                    success:0,
                    message:error
                })
            }
            if(results.length==0){
                res.json({
                    success:101,
                    message: "no inprogress orders yet"
                })
            }
            else if(results){
                res.json({
                    success:200,
                    message:results
                })
            }
        })
    },

    getRegisterdpersonDetailsById: (req,res)=>{
        const id = req.params.id;
        // console.log(id);
        getRegisterdpersonDetailsById(id,(error,results)=>{
            if(error){
                res.json({
                    success:0,
                    message:error
                })
            }
            if(results.length==0){
                res.json({
                    success:101,
                    message: "invalid order id"
                })
            }
            else if(results){
                res.json({
                    success: 200,
                    message:results
                   
                })
            }
        })
    }
    

}