import ProductsModel from "../../models/ProductModels.js";
import addToCartModel from "../../models/addToCartModel .js";


const createAddToCart = async (req, res) => {
  try {
    const product = req.params.id;
    const productsDetails = await ProductsModel.findById(product);
    const user = req.user_id;
    const result = new addToCartModel({
      name: productsDetails.name,
      price: productsDetails.price,
      img: productsDetails.image,
      quantity: req.body.quantity,
      paymentConfirm: false,
      user,
      product,
    });
    await result.validate();
    await result.save();
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteAddToCart = async (req, res) => {
  try {
    if (!(await addToCartModel.findById(req.params.id))) {
      return res.status(400).send({
        message: "Invalid Id!",
      });
    }
    await addToCartModel.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
const UpdateAddToCart = async (req, res) => {
  try {
    const visitorBook = await addToCartModel.findByIdAndUpdate(
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

const getAllAddToCart = async (req, res) => {
  try {
    const user = req.user_id;

    if (req.params.id) {
      const product = await addToCartModel.findById(req.params.id);
      return res.status(200).send(product);
    }

    const product = await addToCartModel.find({
      user,
      paymentConfirm: false,
    });

    return res.status(200).send({
      data: product,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getAllOrderProduct = async (req, res) => {
  try {
    const user = req.user_id;

    if (req.params.id) {
      const product = await addToCartModel.findById(req.params.id);
      return res.status(200).send(product);
    }

    const product = await addToCartModel.find({
      user,
      paymentConfirm: true,
    });

    return res.status(200).send({
      data: product,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllPay = async (req, res) => {
  try {
    const user = req.user_id;

    const filter = {
      user,
      paymentConfirm: false, 
    };

    const update = {
      $set: { paymentConfirm: true },
    };

    const result = await addToCartModel.updateMany(filter, update);

    return res.status(200).send({
      message: `Updated ${result.nModified} documents.`,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const confirmOrder = async (req, res) => {
  try {
    const  product = req.body
    console.log(product);
    // const visitorBook = await addToCartModel.findByIdAndUpdate(  );
    // if (!visitorBook) {
    //   return res.status(404).send({ error: "Visitor book not found" });
    // }
    // return res.send(visitorBook);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export {
  createAddToCart,
  deleteAddToCart,
  UpdateAddToCart,
  getAllAddToCart,
  getAllPay,
  confirmOrder,
  getAllOrderProduct
};
