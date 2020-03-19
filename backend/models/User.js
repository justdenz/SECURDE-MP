const Sequelize = require("sequelize");
const db = require("../db.js")

const User = db.define('users', {
    user_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    last_name: {
        type: Sequelize.TEXT('TINY'),
        allowNull: false
    },
    first_name: {
        type: Sequelize.TEXT('TINY'),
        allowNull: false
    },
    username: {
        type: Sequelize.TEXT('TINY'),
        allowNull: false
    },
    password: {
        type:Sequelize.TEXT('TINY'),
        allowNull: false
    },
    email: {
        type: Sequelize.TEXT('TINY'),
        allowNull: false
    },
    security_question: {
        type: Sequelize.TEXT('TINY'),
        allowNull: false
    },
    security_answer: {
        type: Sequelize.TEXT('TINY'),
        allowNull: false
    }

}, {
    timestamps: false,
    freezeTableName: true
})

User.getUsers = async function () {
    return await User.findAll({
        raw: true,
        attributes: ['user_id', 'name'],
        order: [
            ['user_id', 'DESC']
        ],
    })
}

User.createUser = async function(last_name, first_name, username, password, email, security_question, security_answer) {
    User.create({
        last_name: last_name,
        first_name: first_name,
        username: username,
        password: password,
        email: email,
        security_question: security_question,
        security_answer: security_answer
    })
    .then(() => {
        console.log("User created successfully!")
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = User