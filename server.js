const http = require('http');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const jsonParser = bodyParser.json()
const uuidv4 = require('uuid/v4');

const hostname = '127.0.0.1';
const port = 3000;

let post1 = {
    id: uuidv4(),
    title: "Post 1",
    content: "Hi",
    author: "Ali",
    date: new Date(1998, 3, 19)
};

let post2 = {
    id: uuidv4(),
    title: "Post 2",
    content: "Bye",
    author: "Ali",
    date: new Date(2019, 3, 19)
};

let posts = [post1, post2];

app.get('/blog-posts', (req,res) => {
    res.status(200).json({
        message: "Success, returned all posts",
        status: 200,
        posts: posts
    });
});

app.get('/blog-posts/:author', (req,res) => {
    const author = req.params.author;

    let found = false;
    let filteredPosts = [];

    posts.forEach(item => {
        if(author == item.author){
            found = true;
            filteredPosts.push(item);
        }
    });

    if(found){
        res.status(200).json({
            message: `Returned all ${author}'s posts.`,
            status: 200,
            posts: filteredPosts
        });
    } else {
        res.status(404).json({
            message : `${author} doesnt exist.`,
            status : 404
        });
    }

});

app.post('/blog-posts', jsonParser, (req,res) => {
    let requiredFields = ['title', 'content', 'author', 'date'];

    for (let i = 0; i < requiredFields.length; i++){
        let currentField = requiredFields[i];

        if(!(currentField in req.body)){
            res.status(406).json({
                message : `Missing field ${currentField} in body.`,
                status : 406
            });
            return;
        }
    }

    let objectToAdd = {
        id: uuidv4(),
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: new Date(req.body.date)
    };

    posts.push(objectToAdd);

    res.status(201).json({
        message : `${req.body.title} is created.`,
        status : 201,
        sport: objectToAdd
    });
});

app.delete('/blog-posts/:id*?', jsonParser, (req,res) => {
    if(!req.params.id){
        res.status(406).json({
            message: `Missing field id in params.`,
            status: 406
        });
        return;
    };
    if(!req.body.id){
        res.status(406).json({
            message: `Missing field id in body.`,
            status: 406
        });
        return;
    };
    const id = req.params.id;
    if(req.body.id != id){
        res.status(406).json({
            message: `Different ids in body and params.`,
            status: 406
        });
        return;
    }
    posts.forEach((item, index) => {
        if(id == item.id){
            posts.splice(index, 1);
            res.status(200).json({
                message: `Deleted post ${id}.`,
                status: 200
            });
            return;
        }
    });
    res.status(404).json({
        message: `Post '${id}' does not exist`,
        status: 404
    });
});

app.put('/blog-posts/:id*?', jsonParser, (req,res) => {

    if (!req.params.id) {
        res.status(406).json({
            message: `Missing field id in params.`,
            status: 406
        });
        return;
    }

    const id = req.params.id;

    if (req.body.length == 0) {
        res.status(404).json({
            message: `Empty body.`,
            status: 404
        });
        return;
    }

    posts.forEach(item => {
        if (item.id == id) {
            for (let key in req.body) {
                if (key == 'title' || key == 'content' || key == 'author') {
                    item[key] = req.body[key];
                }
                else if (key == 'date') {
                    item[key] = new Date(req.body[key]);
                }
            }
            res.status(200).json({
                message: `Post with id '${id}' successfully updated.`,
                status: 200
            });
            return;
        }
    });

    res.status(404).json({
        message: `Post '${id}' does not exist.`,
        status: 404
    });
})


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
