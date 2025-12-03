import axios from "axios";
import { useEffect, useState} from "react";

const Categories = () => {

    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] =useState(false);
    const [editCategory, setEditCategory] = useState(null);


    const fetchCategories = async () => {
       setLoading(true);
       try{

        const response = await axios.get("http://localhost:5000/api/category", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('pos-token')}`
          }
        });
        console.log("Fetched categories:", response.data.categories);
        setCategories(response.data.categories);
        setLoading(false);
       }
       catch (error)
       {
        console.error("Error fetching categories:", error);
       }
     
      }


    useEffect(() =>{
      fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(editCategory) 
        {
       const response = await axios.put(
        `http://localhost:5000/api/category/${editCategory}`, 
        {categoryName, categoryDescription},
        {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('pos-token')}`
            },
        }
      );
      if(response.data.success) {
            setEditCategory(null);
            alert('Category Updated successfully');
            fetchCategories(); // Refresh the category list

     } else {
        // Handle error (e.g., show an error message)
        alert('Failed to update category');
      }
      }
      else{
        const response = await axios.post(
         "http://localhost:5000/api/category/add", 
         {categoryName, categoryDescription},
         {
             headers: {
                Authorization: `Bearer ${localStorage.getItem('pos-token')}`
             },
           }
        );
      if(response.data.success) {
        //     // Handle success (e.g., show a success message, reset form, etc.)
            setCategoryName("");
            setCategoryDescription("");
            alert('Category added successfully');
            fetchCategories(); // Refresh the category list

       } else {
        // Handle error (e.g., show an error message)
        alert('Failed to add category');
      }

      }
    
    //   const response = await axios.post(
    //     "http://localhost:5000/api/category/add", 
    //     {categoryName, categoryDescription},
    //     {
    //         headers: {
    //            Authorization: `Bearer ${localStorage.getItem('pos-token')}`
    //         },
    //     }
    //   );
    //   if(response.data.success) {
    //     // Handle success (e.g., show a success message, reset form, etc.)
    //         setCategoryName("");
    //         setCategoryDescription("");
    //         alert('Category added successfully');
    //         fetchCategories(); // Refresh the category list

    //  } else {
    //     // Handle error (e.g., show an error message)
    //     alert('Failed to add category');
    //   }

    };


const handleEdit = async (category) => 
{
  setEditCategory(category._id);
  setCategoryName(category.categoryName);
  setCategoryDescription(category.categoryDescription);
}

const handleCancelEdit = () => {
  setEditCategory(null);
  setCategoryName("");
  setCategoryDescription("");
};

const handleDeleteEdit = async (categoryId) =>
{
  const confirmDelete = window.confirm("Are you sure you want to delete this category?");
  if(confirmDelete)
  {
    try{
      const response = await axios.delete(`http://localhost:5000/api/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('pos-token')}`
        }
      });
      if(response.data.success) {
        alert('Category deleted successfully');
        fetchCategories(); // Refresh the category list
      } else {
        alert('Failed to delete category');
      }
    }
    catch(error)  
    {
      console.error("Error deleting category:", error);
    }
  }

}

    if(loading) 
      {
      return <div>Loading...</div>;
    }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Category Management</h1>

      {/* Flex Layout: Form (left) + List (right) */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Add Category Form */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-center text-xl font-bold mb-4">{editCategory ? "Edit Category" : "Add Category"}</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Category Name"
                  value={categoryName}
                  className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Category Description"
                  value={categoryDescription}
                  className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setCategoryDescription(e.target.value)}
                />
              </div>
              <div>
                <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
               {editCategory? "Save Changes" : "Add Category"}
              </button>

              {
              editCategory && (
                <button
                  type="button"
                  className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )
            }
              </div>
            </form>
          </div>
        </div>

        {/* Category List */}
       <div className="w-full lg:w-2/3">
         <div className="bg-white shadow-md rounded-lg p-6">
           <h2 className="text-center text-xl font-bold mb-4">Category List</h2>
           <ul className="space-y-2">
             {
             categories.map((category) => (
               <li key={category._id} className="border-b py-2">
                 <h3 className="font-semibold">{category.categoryName}</h3>
                 <p className="text-sm text-gray-600">{category.categoryDescription}</p>


                 <button 
                 className="text-blue-600 hover:text-blue-800"
                 onClick={() => handleEdit(category)}>
                Edit
                </button>
                 <button 
                 className="text-red-600 hover:text-red-800"
                 onClick={() => handleDeleteEdit(category._id)}>
                Delete
                </button>


               </li>
             ))}
           </ul>
         </div>
       </div>
      </div>
    </div>
  );
};

export default Categories;
