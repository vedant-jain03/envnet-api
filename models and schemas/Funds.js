const mongoose = require('mongoose')
const Funds = new mongoose.Schema({
    blogid : {type: String},
    title: {type: String},
    images: [String]
})
const Fundmodel = mongoose.model("FUND", Funds)
module.exports = Fundmodel