import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({

    categoryName: {
        type: String,
        required: true
    },
    categoryDescription: {
        type: String,
        required: true
    }
});

const CategoryModel = mongoose.model('Category', categorySchema);
export default CategoryModel; 

//Now CategoryModel is a JavaScript class (constructor)
// that you can use to interact with that MongoDB collection.
