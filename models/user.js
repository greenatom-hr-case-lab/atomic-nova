const mongoose = require('mongoose'); 
//const hashPassword = require('../help/crypt')
const bcrypt = require('bcrypt');
const { hashPassword } = require('../help/crypt');
mongoose.connect('mongodb://127.0.0.1:27017/Endo-Skill_DB');

// Позволим Mongoose использовать глобальную библиотеку промисов
mongoose.Promise = global.Promise;
 //Получение подключения по умолчанию 
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:')); 

let UserSchema = new mongoose.Schema({
    username: {
        type:String,
        unique: true,
        required: true
    },
    hashStr: {
        type:String,
        required: true
    },
    email: {
        type:String,
        lowercase: true,
        unique: true,
        required: true
    },
    name:{
        last:{
            type:String,
            required: true
        },
        first:{
            type:String,
            required: true
        },
        midle: String
    },
    role:{
        type:String,
        enum:['EMPL', 'HR', 'SUPV'],
        required: true
    },
    position:String
}
);
/*
UserSchema.pre('save', (next) => {

} )
*/
UserSchema.methods.cmpPassword = function(candPasswd, hashedPasswd, cb){
    bcrypt.compare(candPasswd,hashedPasswd).then((result)=>{
        console.log(result);
        return cb(null, result);
    })
    //const isMatched = bcrypt.compare(candPasswd, hashPassword);
}

let User = mongoose.model('User', UserSchema);

module.exports = mongoose.model('User', UserSchema);




