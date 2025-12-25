
import "dotenv/config"
import categoryModel from "../models/categoryModel.js"

// ADDCategory
export const addCategory = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(404).json({ message: "Name is required!" })
        }
        else if (!req.body.description) {
            return res.status(404).json({ message: "Description is required!" })
        }
        else {
            const existingCategory = await categoryModel.findOne({ name: req.body.name })
            if (existingCategory) {
                return res.status(200).json({ message: "Category already added!" })
            }
            else {
                const category = new categoryModel({
                    name: req.body.name,
                    description: req.body.description
                })
                await category.save()
                res.status(201).json({
                    status: true,
                    message: "Category Added Successfully!",
                    category
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error while adding a category...",
            error

        })
    }
}

// ALL Categories
export const getAllCategories = async (req, res) => {
    try {

        const categories = await categoryModel.find()
        res.status(200).json({
            status: true,
            categories
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error while getting  categories...",
            error

        })
    }
}

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
    try {
        const category = await categoryModel.findByIdAndDelete({ _id: req.params._id })
        res.status(200).json({
            status: true,
            message: `${category.name} deleted!`
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error while deleting a category...",
            error

        })
    }
}

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
    try {
        {
          const category =   await categoryModel.findByIdAndUpdate({ _id: req.params._id },
                {
                    $set: {
                        name: req.body.name,
                        description: req.body.description
                    }
                },
                {
                    new: true
                }
            )
            await category.save()
            res.status(201).json({
                status: true,
                message: "Category Updated Successfully!",
                category
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error while updating a category...",
            error

        })
    }
}
