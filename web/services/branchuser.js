const pool = require("../../config/dbConfig.js");
module.exports={
     getRegisterdpersonDetailsList: (callBack)=>{
        pool.query(`SELECT BranchUser_id,FirstName,City,Email,branchLocation
                    FROM BranchUser`,
                (error,results)=>{
                    if(error){
                        return callBack(error);
                    }
                    return callBack(null,results);
                }
            )
     },

     getRegisterdpersonDetailsById: (id,callBack)=>{
        pool.query(`SELECT b.BranchUser_id,b.FirstName,b.LastName,b.StreetNo,b.Street,b.City,b.Email,b.NewUser,b.branchLocation,bm.Mobile
                    FROM BranchUser b,BranchUserMobile bm
                     WHERE b.BranchUser_id=? AND b.BranchUser_id=bm.BranchUser_id`,[id],
                (error,results)=>{
                    if(error){
                        return callBack(error);
                    }
                    return callBack(null,results);
                }
            )
     }
}