const { User } = require('../models');

const userData = [{
        username: 'User 1',
        password: '1234'
    },
    {
        username: 'User 2',
        password: '1234'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;