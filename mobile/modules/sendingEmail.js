const nodeMailer = require("nodemailer");
const { generateOtp } = require("./otpGenerator");

module.exports = {
  SendMail: (email, callback) => {
    let otp = generateOtp();
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "ssshashini21@gmail.com",
        pass: "nxtbmpobvwhkzwdj",
      },
    });

    let mailOptions = {
      from: "ssshashini21@gmial.com",
      to: email,
      subject: "YOUR OTP NUMBER",
      text: `Your OTP NUMBER IS ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return callback(error);
      } else {
        //console.log(info.response);
        return callback(null, otp);
      }
    });
  },

  sendOrderPickUpMail:(values,callback)=>{

    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "ssshashini21@gmail.com",
        pass: "nxtbmpobvwhkzwdj",
      },
    });

    let customerMailOptions = {
      from: "ssshashini21@gmial.com",
      to: values.CustomerEmail,
      subject: "Your Order has been picked up",
      text: `Your Order ID: ${values.Order_id}
             Your order Carried By: ${values.BranchUserName}
             Courier Person Mobile: ${values.Mobile}
             Order Recieved BY: ${values.RecieverName}
             Order Sent BY: ${values.CustomerName}
             Weight of the Order: ${values.weight}
             Distance in km: ${values.distance}
             Weight Cost (Rs): ${values.Distance_Cost}
             Distance Cost (Rs): ${values.Weight_Cost}
             Total Cost (Rs): ${values.Total_Cost}
             PickUp Date : ${values.pickup_Date}
             PickUp Time : ${values.pickup_Time}`,
    };

    let recieverMailOptions = {
      from: "ssshashini21@gmial.com",
      to: values.RecieverEmail,
      subject: "Your Order has been picked up",
      text: `Your Order ID: ${values.Order_id}
             Your order Carried By: ${values.BranchUserName}
             Courier Person Mobile: ${values.Mobile}
             Order Recieved BY: ${values.RecieverName}
             Order Sent BY: ${values.CustomerName}
             Weight of the Order: ${values.weight}
             Distance in km: ${values.distance}
             Weight Cost (Rs): ${values.Distance_Cost}
             Distance Cost (Rs): ${values.Weight_Cost}
             Total Cost (Rs): ${values.Total_Cost}
             PickUp Date : ${values.pickup_Date}
             PickUp Time : ${values.pickup_Time}`,
    };

    transporter.sendMail(customerMailOptions,(error, info) => {
      if (error) {
        return callback(error);
      } else {
        transporter.sendMail(recieverMailOptions,(error,info)=>{
          if(error){
            return callback(error);
          }else{
            return callback(null,info);
          }
        })
      }
    });
  },

  sendDiliveryMail:(values,callback)=>{
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "ssshashini21@gmail.com",
        pass: "nxtbmpobvwhkzwdj",
      },
    });

    let customerMailOptions = {
      from: "ssshashini21@gmial.com",
      to: values.CustomerEmail,
      subject: "Your Order has been Diliverd!",
      text: `Your Order ID: ${values.Order_id}
             Your order Carried By: ${values.BranchUserName}
             Order Recieved BY: ${values.RecieverName}
             Order Sent BY: ${values.CustomerName}
             Weight of the Order: ${values.weight}
             Distance in km: ${values.distance}
             Weight Cost (Rs): ${values.Distance_Cost}
             Distance Cost (Rs): ${values.Weight_Cost}
             Total Cost (Rs): ${values.Total_Cost}
             PickUp Date : ${values.pickup_Date}
             PickUp Time : ${values.pickup_Time}
             Dilivery Date: ${values.dilivery_Date},
             Dilivery Time: ${values.dilivery_Time}`,
    };

    let recieverMailOptions = {
      from: "ssshashini21@gmial.com",
      to: values.RecieverEmail,
      subject: "Your Order has been Diliverd!",
      text: `Your Order ID: ${values.Order_id}
             Your order Carried By: ${values.BranchUserName}
             Order Recieved BY: ${values.RecieverName}
             Order Sent BY: ${values.CustomerName}
             Weight of the Order: ${values.weight}
             Distance in km: ${values.distance}
             Weight Cost (Rs): ${values.Distance_Cost}
             Distance Cost (Rs): ${values.Weight_Cost}
             Total Cost (Rs): ${values.Total_Cost}
             PickUp Date : ${values.pickup_Date}
             PickUp Time : ${values.pickup_Time}
             Dilivery Date: ${values.dilivery_Date},
             Dilivery Time: ${values.dilivery_Time}`,
    };

    transporter.sendMail(customerMailOptions,(error, info) => {
      if (error) {
        return callback(error);
      } else {
        transporter.sendMail(recieverMailOptions,(error,info)=>{
          if(error){
            return callback(error);
          }else{
            return callback(null,info);
          }
        })
      }
    });
  }
};
