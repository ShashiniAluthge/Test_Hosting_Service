const {getOrderDetailsById,CreateOrder,getOrderCounts} = require("../services/orders")

module.exports ={
    getOrderDetailsById: (req ,res) =>{
        const id = req.params.orderId;
        getOrderDetailsById(id,(error,results)=>{
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
    },
    CreateOrder: (req ,res) =>{
        const data = req.body
        console.log(data)
        return
        // CreateOrder(data,(error,results)=>{
        //     if(error){
        //         res.json({
        //             success:0,
        //             message:error
        //         })
        //     }
        //     if(results.length==0){
        //         res.json({
        //             success:101,
        //             message: "invalid order id"
        //         })
        //     }
        //     else if(results){
        //         res.json({
        //             success: 200,
        //             message:results
        //         })
        //     }
        // })
    },
    getOrderCounts: (req ,res) =>{
        getOrderCounts((error,result) => {
            if(error){
                res.json({
                    success:0,
                    message:error,
                })
            }
            return res.json({
                success: 200,
                message: result,
            });
        })
    }

}