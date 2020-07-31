const {Schema, model} = require('mongoose'); 

const AdapPlanSchema = new Schema({

    creationDate: {
        type:Date
    },
    stage: {
        type: String,
        enum: ['1', '2', '3', '4', '5'],
        default:'1',
        required: true
    },
    employee:{
        type:String,
        required: true
    },
    hr:{
        type:String,
        required: true
    },
    supervisior:{
        type:String,
        required: true
    },
    startDate:{
        type:Date,

        required: true
    },
    expirationDate:{
        type:String,

        required: true
    },
    complitionStatus: {
        type:Boolean,
        default:0
    },
    tasks:
    [{
        thashID: {
        type:String,
        required: true
    },
    title:{

    },
    description:{
        type:String,
        required: true
    },
    owner,
    //asmnt:{
    //taskResult:{}
    //comments:{}}]    
            
    },

);

module.exports = mongoose.model('Plan', AdapPlanSchema);