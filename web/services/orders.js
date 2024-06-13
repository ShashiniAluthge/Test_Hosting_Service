const pool = require("../../config/dbConfig.js");
module.exports={
    getOrderDetailsById: (id,callBack)=>{
        pool.query(`SELECT Emmergency,Total_Cost,Weight_Cost,branchLocation,Pickup_StreetNo,Pickup_Street,Pickup_City,Status,FirstName,LastName,mobile,StreetNo,Street,City
        FROM Orders,Reciever,RecieverMobile
        WHERE Reciever.recieverId=Orders.recieverId AND Reciever.recieverId=RecieverMobile.recieverId AND Orders.Order_id = ?`,
        [id],
        (error,results,feilds)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        })
    },

    CreateOrder: (data,callBack)=>{

        pool.query(`insert into Customer (FirstName,LastName,StreetNo,Street,City) values(?,?,?,?,?)`,
        [data],
        (error,results,feilds)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        }),

        pool.query(`insert into Orders (Pickup_District,Pickup_StreetNo,Pickup_Street,Pickup_City,Status,Emmergency,branchLocation,Distance_Cost,admin_Id,`,
        [Data],
        (error,results,feilds)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        }),

        pool.query(`insert into Reciever (FirstName,LastName,DiliveryProvince,DiliveryDistrict,StreetNo,Street,City, values(?,?,?,?,?,?,?)`,
        [data],
        (error,results,feilds)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        })
    },
}