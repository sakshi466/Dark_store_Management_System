import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address: {

        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const SupplierModel = mongoose.model('Supplier', supplierSchema);
export default SupplierModel; 

