const mongoose = require("mongoose")

const expSchema = new mongoose.Schema({
    purpose:{
        type:String,
        required: true
    },
    amount: {
        type:Number,
        required: true
    },
  
    user_id: {
        type: String,
        required:true
    }
    
}, { timestamps: true}
)


module.exports = mongoose.model("Exp", expSchema)