const {
  getOrderDetailsById,
  OrderTable,
  RecieverTable,
  SenderTable,
  GetsenderID,
  GetRecieverID,
  SenderTele,
  RecieverTele,
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
    //console.log(data)
   
    try {
        await SenderTable(data);
        await RecieverTable(data);
        const senderID = await GetsenderID();
        const recieverID = await GetRecieverID();
        //console.log(senderID,recieverID)
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
