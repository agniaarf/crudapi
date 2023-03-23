const mongoose = require('mongoose');
// const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;
const kategoriSchema = 
    new Schema(
        {
            nama_barang: String,
            kode_barang: Number,  
        },
        {timestamps: true }
    );
// hash user password before saving into database
// kategoriSchema.pre('save', function(next){
//     this.password = bcrypt.hashSync(this.password, saltRounds);
//     next();
// });

module.exports = mongoose.model('kategori', kategoriSchema);