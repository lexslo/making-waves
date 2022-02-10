const { User } = require('../models');

const userData = [{
        username: 'MusicWizz',
        password: 'pass123'
    },
    {
        username: 'TangledWires',
        password: 'password'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;