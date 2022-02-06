const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// get all posts
router.get('/', (req, res) => {
    Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at',
                'updated_at'
            ],
            // display all posts in descending order by date created
            order: [
                ['created_at', 'DESC']
            ],
            // show comments for each post and the users who wrote the comments
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                // include the user who made the post
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        // .then(dbPostData => {
        //     const posts = dbPostData.map(post => post.get({ plain: true }));

    //     res.render('homepage', posts);
    // })
    .then(dbPostData => {
            res.json(dbPostData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a new post
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

// update an existing post title and/or content
router.put('/:id', (req, res) => {
    Post.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Post.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;