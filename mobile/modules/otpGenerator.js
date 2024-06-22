const otpGenerator=require('otp-generator');

module.exports={
    generateOtp:()=>{
        const otp=otpGenerator.generate(4,{upperCaseAlphabets:false,specialChars:false}).toString();
        const expireTime=new Date(Date.now()+5*60*1000);
        return [expireTime,otp];
    }
}