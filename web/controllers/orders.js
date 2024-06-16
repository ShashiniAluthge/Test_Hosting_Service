const {getOrderDetailsById,CreateOrder,getOrderCounts,getPendingOrdersList,getCompleteOrderList, getInprogressOrderList,getPendingorderdetailsById,getCompleteOrderdetailsById} = require("../services/orders")

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
    },
    getPendingOrdersList: (req,res) =>{
        getPendingOrdersList((error,results)=>{
            console.log(results)
            if(error){
                console.log("this is error")
                res.json({
                    success:0,
                    message:error
                })
            }
            if(results.length == 0){
                console.log("no pending orders yet")
                res.json({
                    success:101,
                    message: "no pending orders yet"
                })
            }
            else if(results){
                console.log(results)
                res.json({
                    success: 200,
                    message:results
                })
            }
        })
    },

    getCompleteOrderList: (req,res) =>{
        getCompleteOrderList((error,results)=>{
            if(error){
                res.json({
                    success:0,
                    message:error
                })
            }
            if(results.length==0){
                res.json({
                    success:101,
                    message: "no complete orders yet"
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
    getInprogressOrderList: (req,res) =>{
        getInprogressOrderList((error,results)=>{
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

    getPendingorderdetailsById: (req,res)=>{
        // console.log(req);
        const id = req.params.id;
        // console.log("id", id);
        getPendingorderdetailsById(id,(error,results)=>{
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

    getCompleteOrderdetailsById: (req,res)=>{
        const id = req.params.id;
        // console.log(id);
        getCompleteOrderdetailsById(id,(error,results)=>{
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