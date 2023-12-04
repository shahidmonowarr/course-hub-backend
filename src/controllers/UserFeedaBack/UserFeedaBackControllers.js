import UserFeedBacktModel from "../../models/userFeedBack.js";



const createUserFeedaBack = async (req, res) => {
  try {
    const result = new UserFeedBacktModel({
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
      suggestions: req.body.suggestions,
    });
    await result.validate();
    await result.save();
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteUserFeedaBack = async (req, res) => {
  try {
    if (!(await UserFeedBacktModel.findById(req.params.id))) {
      return res.status(400).send({
        message: "Invalid Id!",
      });
    }
    await UserFeedBacktModel.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const getAllUserFeedaBack = async (req, res) => {
  try {
    if (req.params.id) {
      const data = await UserFeedBacktModel.findById(req.params.id);
      return res.status(200).send(data);
    }
    const query = req.query.school;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 200;
    const startIndex = (page - 1) * limit;
    const data = await UserFeedBacktModel.find(query ? { school: query } : {})
      .sort({ created_at: -1 })
      .skip(startIndex)
      .limit(limit);

    const count = await UserFeedBacktModel.countDocuments(
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

export {
  createUserFeedaBack,
  deleteUserFeedaBack,
  getAllUserFeedaBack,
};
