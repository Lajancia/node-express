const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => { //여기서는 안쓰지만 실무에서는 씀 oauth2 공부 필요
    console.log('kakao profile', profile); //우리는 이것만 씀
    try {
      const exUser = await User.findOne({ //이 아이디로 가입한 사람 있나 체크
        where: { snsId: profile.id, provider: 'kakao' },
      });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({ //가입 안했으면 회원가입으로 넘어감
          email: profile._json && profile._json.kakao_account_email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'kakao',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};