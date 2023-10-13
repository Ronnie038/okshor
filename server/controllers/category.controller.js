const Category = require('../models/Category');
const {
	createCategoryService,
	getCategoriesService,
	getCategoryServiceById,
	// updateBrandService,
} = require('../services/category.service');

exports.createSubcategory = async (req, res, next) => {
	try {
		// Parse the request body to extract category information
		const { name, title } = JSON.parse(req.body.category);

		// Find the category by name
		const category = await Category.findOne({ name });

		if (!category) {
			// If the category does not exist, return a 404 error
			return res.status(404).json({
				status: 'fail',
				error: 'Category not found',
			});
		}

		// Construct the image URL using environment variables
		const imageUrl = `${process.env.APP_URL}/images/${req.file.filename}`;

		// Create a new subcategory object
		const newSubcategory = {
			id: Date.now(),
			image: imageUrl,
			title,
		};

		// Update the existing category by pushing the new subcategory into the subcategories array
		await category.subcategories.push(newSubcategory);
		await category.save();

		res.status(201).json({
			status: 'success',
			message: 'Subcategory added to the category',
			data: category,
		});
	} catch (error) {
		console.error(error.message);
		// Handle errors gracefully and provide a meaningful response
		res.status(500).json({
			status: 'fail',
			error: 'Unable to add the subcategory',
			message: error.message,
		});
	}
};

exports.getCategories = async (req, res, next) => {
	try {
		const categories = await getCategoriesService();

		res.status(200).json({
			success: true,
			data: categories,
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			error: "Couldn't create the brand",
			message: error.message,
		});
	}
};
exports.getCategoryById = async (req, res, next) => {
	const { id } = req.params;
	try {
		const category = await getCategoryServiceById(id);
		if (!category) {
			res.status(400).json({
				status: 'fail',
				error: "Couldn't find a category with this id",
			});
		}
		res.status(200).json({
			status: 'success',
			data: category,
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			error: "Couldn't create the brand",
			message: error.message,
		});
	}
};

exports.deleteCategoryById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedCategory = req.body;
		console.log(updatedCategory);
		const newUpdatedCategory = await Category.findByIdAndUpdate(
			id,
			updatedCategory,
			{ new: true }
		);

		res.status(200).json({
			success: true,
			message: 'category deleted',
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
