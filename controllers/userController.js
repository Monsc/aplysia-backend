const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: '用户名已存在' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });
    res.status(201).json({ message: '注册成功', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: '注册失败', details: err.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: '用户不存在' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: '密码错误' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ message: '登录成功', token });
  } catch (err) {
    res.status(500).json({ error: '登录失败', details: err.message });
  }
};

module.exports = { registerUser, loginUser };
