const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Vote } = require('../../models');

router.post('/', (req, res) => {
    // expects {"title": "Check out this cool gear", "content":"I think it's worth adding to my collection", "user_id": 1}
    Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;