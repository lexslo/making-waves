const { Post } = require('../models');

const postData = [{
        title: 'Here is a Post',
        content: 'Lorem ipsum dolor',
        user_id: 1
    },
    {
        title: 'This is Another Post',
        content: 'The lazy brown fox jumped over the hollow log',
        user_id: 1
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;