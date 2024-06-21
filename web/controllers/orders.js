
const {
  getOrderDetailsById,
  OrderTable,
  RecieverTable,
  SenderTable,
  GetsenderID,
  GetRecieverID,
  SenderTele,
  RecieverTele,
  CreateOrder,
  getOrderCounts,
  getPendingOrdersList,
  getCompleteOrderList, 
  getInprogressOrderList,
  getPendingorderdetailsById,
  getCompleteOrderdetailsById,
  getinprogressOrderdetailsById
} = require("../services/orders");


module.exports = {
  getOrderDetailsById: (req, res) => {
    const id = req.params.orderId;
    getOrderDetailsById(id, (error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        res.json({
          success: 101,
          message: "invalid order id",
        });
      } else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },

  CreateOrder: async (req, res) => {
    const data = req.body;
    console.log(data)
    try {
        await SenderTable(data);
        await RecieverTable(data);
        const senderID = await GetsenderID();
        const recieverID = await GetRecieverID();
        console.log(senderID,recieverID)
        await SenderTele(senderID,data.stelephone)
        await RecieverTele(recieverID,data.rtelephone)
        await OrderTable(data,recieverID,senderID)
        
        return res.json({
            success:1,
            message: "order placed successfully",
        })


    } catch (error) {
      return res.json({
        success: 0,
        message: error,
      });
    }
  },
};

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
    },

    getinprogressOrderdetailsById: (req,res)=>{
        const id = req.params.id;
        // console.log(id);
        getinprogressOrderdetailsById(id,(error,results)=>{
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

