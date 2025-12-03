import SupplierModel from '../models/Supplier.js';


const addSupplier = async (req, res) => {

try{

    const {name, email, address, phone} = req.body;

    const existingSupplier = await SupplierModel.findOne({ name });
    if (existingSupplier) {
        return res.status(400).json({ success: false, message: "Supplier already exists" });
    }

    const newSupplier = new SupplierModel({
        name,
        email,
        address,
        phone
    });

    await newSupplier.save();
    return res.status(201).json({ success: true, message: "Supplier added successfully", supplier: newSupplier });
} catch (error) {
    console.error("Error adding supplier:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
}
}

const getSuppliers = async (req, res) => {

    try{

        const suppliers = await SupplierModel.find();
        return res.status(200).json({ success: true, suppliers });
    }
    catch (error)
    {
        console.error("Error fetching suppliers:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const updateSupplier = async (req, res) => 
{
 try{
    const { id } = req.params;
    const { name, email, address, phone } = req.body;

    const existingSupplier = await SupplierModel.findById(id);
    if (!existingSupplier) {
        return res.status(404).json({ success: false, message: "Supplier not found" });
    }

    const updatedSupplier = await SupplierModel.findByIdAndUpdate(
        id, 
        {
            name,
            email,
            address,
            phone
        },
        {
            new: true
        }
    );

    return res.status(200).json({ success: true, message: "Supplier updated successfully", supplier: updatedSupplier });

 } 
 catch (error) {
    console.error("Error updating supplier:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
 }
}

const deleteSupplier= async (req, res) => {
    try {
        const { id } = req.params;
        const existingSupplier = await SupplierModel.findById(id);
        if (!existingSupplier) {
            return res.status(404).json({ success: false, message: "Supplier not found" });
        }

        await SupplierModel.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Supplier deleted successfully" });

    } catch (error) {
        console.error("Error deleting supplier:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export { addSupplier, getSuppliers, updateSupplier, deleteSupplier }
