import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name : {type: String, required: true},
    email: {type: String, unique:true, required: true},
    password:{type: String, required: true},
    address:{type: String},
    role:{type: String, enum: ["customer", "admin"], default: "admin"},
    // phone:{type: String}
//
 })

const UserModel = mongoose.model("User", userSchema);
export default UserModel;

