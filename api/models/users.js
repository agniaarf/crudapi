const mongoose = require('mongoose');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    email: String,
    userid: String,
    password: String,
    gender:String,
    telp:String,
    photo:String,
    role:String,
});
// hash user password before saving into database
// UserSchema.pre('save', function(next){
//     this.password = bcrypt.hashSync(this.password, saltRounds);
//     next();
// });

module.exports = mongoose.model('users', UserSchema);