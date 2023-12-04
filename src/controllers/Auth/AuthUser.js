import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../../models/userModels.js";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const register = async (req, res) => {
  const { lastName, email, password, firstName, role } =
    req.body;
  try {
    if (!email || !firstName || !password || !lastName) {
      return res.status(400).json({
        message: "Please fill all the required fields....",
      });
    }
    const users = await UserModel.findOne({ email });
    if (users) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "USER",
      email: req.body.email,
    });
    const accessToken = jwt.sign(
      { userID: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const refreshToken = jwt.sign(
      { userID: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    await user.validate();
    await user.save();

    const userDetails = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return res.status(200).json({
      userDetails,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const validatePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid Response!",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid User!",
      });
    }
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid Password!",
      });
    }
    const accessToken = jwt.sign(
      { userID: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { userID: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    await UserModel.findByIdAndUpdate(user._id);
    const userDetails = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return res.status(200).json({
      userDetails,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};


const getAllUser = async (req, res) => {
  try {
    const user = req.user_id
    const product = await UserModel.find({})
    return res.status(200).send({
      data: product
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const updatedUser = await UserModel.updateOne(
      { _id: id },
      { $set: { role } }
    );

    if (updatedUser.n === 0) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send({
      message: "User role updated successfully"
    });
  } catch (error) {
    console.error("Error while updating user role:", error);
    return res.status(500).send(error.message);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = req.user_id;
    const result = await UserModel.findById({ _id: user });

    if (!result) {
      return res.status(404).send('User not found');
    }
    const fullName = `${result?.firstName} ${result?.lastName}`;
    const modifiedUser = {
      ...result._doc,
      name: fullName,
    };

    return res.status(200).send({
      user: modifiedUser,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user_id; 
    const updateData = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
const deleteUser = async (req, res) => {
  try {
    if (!(await UserModel.findById(req.params.id))) {
      return res.status(400).send({
        message: "Invalid Id!",
      });
    }
    await UserModel.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

export { login, register, getAllUser, updateUserRole, getUserProfile, updateProfile, deleteUser };
