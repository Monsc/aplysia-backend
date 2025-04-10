const express = require('express');
const router = express.Router();

// 假数据接口（MVP测试用）
router.get('/', (req, res) => {
  res.json([
    {
      _id: '1',
      user: '匿名用户',
      content: '欢迎来到海兔 Aplysia！🎉',
      imageUrl: '',
      createdAt: new Date(),
    },
  ]);
});

module.exports = router;
