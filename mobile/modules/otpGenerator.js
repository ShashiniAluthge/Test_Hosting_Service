const otpGenerator=require('otp-generator');

module.exports={
    generateOtp:()=>{
        const otp=otpGenerator.generate(4,{upperCaseAlphabets:false,specialChars:false})
        return otp;
    }
}