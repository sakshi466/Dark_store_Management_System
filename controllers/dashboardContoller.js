import OrderModel from "../models/Order.js";
import ProductModel from "../models/Product.js";
import CategoryModel from "../models/Category.js";  

const getData = async (req,res) =>
{
 try {
 const totalProducts = await ProductModel.countDocuments();

 const stockResult= await ProductModel.aggregate([

    {
        $group: {_id : null, totalStock: {$sum : "$stock"}}
    }
 ])

 const totalStock = stockResult[0]?.totalStock || 0;

 const startOfDay = new Date();
 startOfDay.setHours(0, 0, 0, 0);
 
 const endOfDay = new Date();
 endOfDay.setHours(23, 59, 59,999);

 const ordersToday = await OrderModel.countDocuments(
    {
        ordersDate: 
        {
            $gte: startOfDay, $lte : endOfDay
        }
    }
 )

 const revenueResult = await OrderModel.aggregate(
 [
    {
        $group: {_id: null, totolRevenue: {$sum: "$totalPrice"}}
    }
 ]
 )

 const revenue = revenueResult[0]?.totolRevenue || 0;

 const outOfStock = await ProductModel.find({stock : 0})
 .select("name stock")
 .populate('categoryId', 'categoryName')

 //higest sale
 const highestSaleResult = await OrderModel.aggregate([
    {
        $group: {_id: "$product", totalQuantity: {$sum: "$quantity"}}
    },
    {
        $sort: {totalQuantity: -1}
    },
    {
        $limit: 1
    },
    {
        $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product"
        }
    },
    {
        $unwind: "$product"
    },
    {
        $lookup: {
            from: "categories",
            localField: "product.categoryId",
            foreignField: "_id",
            as: "product.categoryId"
        }
    },
    {
        $unwind: "$product.categoryId"
    },
    {
        $project: {
            
            name: "$product.name",
            categoryName: "$product.categoryId.categoryName",
            totalQuantity: 1,
    
        }
    }
 ])
 const highestSaleProduct = highestSaleResult[0] || {message: "No sales yet"};

 //low stock
 const lowStock = await ProductModel.find({stock : {$gt: 0, $lt: 5}})
    .select("name stock")
    .populate('categoryId', 'categoryName')
    
 const dashboardData = {
    totalProducts,
    totalStock,
    ordersToday,
    revenue,
    outOfStock,
    highestSaleProduct,
    lowStock
}
return res.status(200).json({success: true, dashboardData});
}
catch (error) {
    console.error("Error in getData:", error);
    return res.status(500).json({success: false, message: "Server Error", error: error.message});
}
}

export {getData};