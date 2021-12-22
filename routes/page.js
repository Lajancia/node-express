const express = require('express');

const router = express.Router();

router.use((req, res, next) => { //follwer 구현
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

router.get('/profile', (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird' });
});

router.get('/join', (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
});

router.get('/', (req, res, next) => {
  const twits = [];//게시글들
  res.render('main', {
    title: 'NodeBird',
    twits,
  });
});

module.exports = router;