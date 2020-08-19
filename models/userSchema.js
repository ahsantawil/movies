const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');

const UserSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    Date : {
        type : Date,
        default : Date.now
    }
});

userSchema.pre('save', function(next){
    const user = this;
    user.password = bcrypt.hashSync(user.password, 10);
    next();
});

module.exports = mongoose.model('User', UserSchema);