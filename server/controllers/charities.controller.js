import  charities from "../models/charities"
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import request from 'request'
import config from './../../config/config'

const newPayment= async (req, res) => {
    var data = req.body;
    let doc = await charities.findOne({name:data.name});
    let newTotalDonations = doc.total_Donations + data.donation;
    const update = {total_Donations:newTotalDonations,roundup_Donation:data.donation};
    const filter = {name:data.name};
    let newDoc = await charities.findOneAndUpdate(filter,update,{new:true});
    return res.status(200).json({
        message:newDoc.total_Donations
    })
}

export default {
    newPayment
}