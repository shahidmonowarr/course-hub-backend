import ProductsModel from "../../models/ProductModels.js";

const createProduct = async (req, res) => {
  try {
    const result = new ProductsModel({
      name: req.body.name,
      dis: req.body.dis,
      image: req.body.image,
      price: req.body.price,
      regPrice: req.body.regPrice,
      instructor: req.body.instructor,
      enrollmentStatus: req.body.enrollmentStatus,
      thumbnail: req.body.thumbnail,
      duration: req.body.duration,
      schedule: req.body.schedule,
      location: req.body.location,
    });
    await result.validate();
    await result.save();
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (!(await ProductsModel.findById(req.params.id))) {
      return res.status(400).send({
        message: "Invalid Id!",
      });
    }
    await ProductsModel.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
const UpdateProduct = async (req, res) => {
  try {
    const visitorBook = await ProductsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!visitorBook) {
      return res.status(404).send({ error: "Visitor book not found" });
    }
    return res.send(visitorBook);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getAllProduct = async (req, res) => {
  try {
    if (req.params.id) {
      const data = await ProductsModel.findById(req.params.id);
      return res.status(200).send(data);
    }
    const query = req.query.school;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 200;
    const startIndex = (page - 1) * limit;
    const data = await ProductsModel.find(query ? { school: query } : {})
      .sort({ created_at: -1 })
      .skip(startIndex)
      .limit(limit);

    const count = await ProductsModel.countDocuments(
      query ? { school: query } : {}
    );

    return res.status(200).send({
      data: data,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
      },
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getFeatherProducts = async (req, res) => {
  try {
    const query = req.query.school;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 200;
    const startIndex = (page - 1) * limit;
    const feather = req.query.feather;

    // Define your filter criteria
    const filter = query ? { school: query } : {};
    if (feather) {
      filter.feather = feather;
    }

    // Fetch products based on the filter criteria
    const data = await ProductsModel.find(filter)
      .sort({ created_at: -1 })
      .skip(startIndex)
      .limit(limit);

    // Count the total number of matching documents
    const count = await ProductsModel.countDocuments(filter);

    return res.status(200).send({
      data: data,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
      },
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export {
  UpdateProduct,
  createProduct,
  deleteProduct,
  getAllProduct,
  getFeatherProducts,
};
