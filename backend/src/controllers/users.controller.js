const userCtrl = {}

const User = require('../models/User')

userCtrl.getUsers = async (req, res) => {
  const users = await User.find()
  res.json(users)
}

userCtrl.createUser = async (req, res) => {
  const { username } = req.body
  const newUser = new User({ username })
  await newUser.save()
  res.json('user created')
}

userCtrl.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.json("user deleted")
}

module.exports = userCtrl