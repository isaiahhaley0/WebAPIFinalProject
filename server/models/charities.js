import mongoose from 'mongoose'
import crypto from 'crypto'
const CharitySchema = new mongoose.Schema({

    //Name of the charity
    name:{type:String,required:true,index:{unique:true}},
    //Used to hold the amount donated in current transaction
    roundup_Donation:{type:Number, required:true},
    //Used to hold all donations
    total_Donation:{type:Number, required:true},
    websiteUrl: {type: String, required: false},

});


export default mongoose.model('charities',CharitySchema);