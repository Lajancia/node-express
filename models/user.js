const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({ //이대로 테이블이 만들어짐, 시퀄라이즈에서는 아이디가 생략
      email: {
        type: Sequelize.STRING(40), //이메일은 40글자까지
        allowNull: true,
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100), //해시화되면 너무 길어짐
        allowNull: true, //sns로 로그인할경우
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local', //로그인한 장소. 카카오 네이버 등등
      },
      snsId: {
        type: Sequelize.STRING(30),//sns 중 특정 플렛폼 아이디 비번으로 로그인할 경우
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true, //생성 수정 삭제일 기록
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true, //휴면계정을 위한 것
      charset: 'utf8', //한글 지원
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};