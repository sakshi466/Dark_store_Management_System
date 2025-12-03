import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    customer : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
    quantity:{type: Number, required: true},
    totalPrice:{type: Number, required: true},
    orderDate:{type: Date, default: Date.now },
    // phone:{type: String}
//
 }, { timestamps: true } 
)

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;

