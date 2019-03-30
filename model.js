const uuidv4 = require('uuid/v4');

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

const ListPosts = {
    get : function(){
        return posts;
    }
}

module.exports = {ListPosts};
