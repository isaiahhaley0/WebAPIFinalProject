let envPath = __dirname + "/../.env"
require('dotenv').config({path:envPath});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise= global.Promise;

try {
    mongoose.connect( process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
        //check for connection
        console.log("connected to charities"));
}catch (error) {
    console.log("could not connect to charities");
}
mongoose.set('useCreateIndex', true);

var CharitySchema = new Schema({

    //Name of the charity
    name:{type:String,required:true,index:{unique:true}},
    //Used to hold the amount donated in current transaction
    roundup_Donation:{type:Number, required:true},
    //Used to hold all donations
    total_Donations:{type:Number, required:true},
    websiteUrl: {type: String, required: false},

});


module.exports = mongoose.model('charities',CharitySchema);