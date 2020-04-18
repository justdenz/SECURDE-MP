'use strict';

module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        isAlphanumeric: true,
        required: true,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        isAlphanumeric: true,
        required: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        isEmail: true
    },
    role_name: {
        type:DataTypes.STRING,
        required: true,
        allowNull: false,
    },
    question: {
        type:DataTypes.STRING,
        required: true,
        allowNull: false,
    },
    answer: {
        type:DataTypes.STRING,
        required: true,
        allowNull: false,
    }
    }, {
        underscored: true,
        paranoid: true,
    })
}

// User.getUsers = async function () {
//     return await User.findAll({
//         raw: true,
//         order: [
//             ['user_id', 'DESC']
//         ],
//     })
// }

// User.createUser = async function(first_name, last_name, username, password, email, security_question, security_answer, role_name) {
//     User.create({
//         first_name: first_name,
//         last_name: last_name,
//         username: username,
//         password: password,
//         email: email,
//         security_question: security_question,
//         security_answer: security_answer,
//         role_name: role_name
//     })
//     .then(() => {
//         console.log("User created successfully!")
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// }

