import UserModel from '../models/User.js';
import bcrypt from 'bcrypt'

const addUser = async (req, res) => {

try{
    
    const {name, email, address, role, password} = req.body;

    const existingUser = await UserModel.findOne({ email});

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel({
        name,
        email,
        address,
        role,
        password:hashedPassword
    });

    await newUser.save();
    return res.status(201).json({ success: true, message: "User added successfully", user: newUser });

} catch (error) {
    console.error("Error adding User:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
}
}

const getUser = async (req, res) => {

    try{

        const users = await UserModel.find();
        return res.status(200).json({ success: true, users});
    }
    catch (error)
    {
        console.error("Error fetching users:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is stored in req.user after authentication

    // Fetch the user from the database
    const user = await UserModel.findById(userId).select("-password"); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ success: false, message: 'Server error in getting user profile' });
  }
};



const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const existingUser = await UserModel.findById(id);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await UserModel.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "User deleted successfully" });
        
    } catch (error) {
        console.error("Error deleting User:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export {addUser, getUser, deleteUser, getUserProfile }
