const Users = require('../models/user'); // for User model

module.exports = {
    show,
    register,
    deleteUser,
    create: createUser
}

async function show(req, res) {
    res.render('register');
}

async function register(req, res) {
    try {
        const newUser = await Users.create(req.body)
        console.log(newUser)
        res.redirect('/posts')
    } catch (error) {
        console.log(error);
        res.redirect('/register');
    }
}
async function createUser(req, res) {
    const user = await Users.create(req.body);
    res.redirect('/posts');
}


async function deleteUser(req, res) {
    await Users.findByIdAndDelete(req.params.id)
    res.redirect('/posts')
}