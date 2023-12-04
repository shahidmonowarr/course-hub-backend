import jwt from 'jsonwebtoken'
import UserModel from '../models/userModels.js'

const checkAuthUser = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]
      const { userID } = jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET)
      const user = await UserModel.findById(userID)
      req.user_id = userID
      next()
    } catch (error) {
      res.status(403).send({ status: 'failed', message: 'Unauthorized User' })
    }
  }
  if (!token) {
    res
      .status(401)
      .send({ status: 'failed', message: 'Unauthorized User, No Token' })
  }
}
const checkSuperAdmin = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]

      // Verify Token
      const { userID } = jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET)
      const user = await UserModel.findById(userID)
      if (user.role === 'SUPER-ADMIN') {
        req.user_id = userID
        next()
      } else {
        res.status(400).json({
          message: 'You are not alow in the route'
        })
      }
    } catch (error) {
      res.status(403).send({ status: 'failed', message: 'Unauthorized User' })
    }
  }
  if (!token) {
    res
      .status(401)
      .send({ status: 'failed', message: 'Unauthorized User, No Token' })
  }
}
const checkAdmin = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]

      // Verify Token
      const { userID } = jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET)
      const user = await UserModel.findById(userID)
      if (user.role === 'ADMIN' || user.role === 'SUPER-ADMIN') {
        req.user_id = userID
        next()
      } else {
        res.status(400).json({
          message: 'You are not alow in the route'
        })
      }
    } catch (error) {
      res.status(403).send({ status: 'failed', message: 'Unauthorized User' })
    }
  }
  if (!token) {
    res
      .status(401)
      .send({ status: 'failed', message: 'Unauthorized User, No Token' })
  }
}
export { checkAuthUser, checkSuperAdmin, checkAdmin }
