var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.updateUser = updateUser;
userModel.findAllUsers = findAllUsers;
userModel.deleteUser = deleteUser;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;


module.exports = userModel;

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id' : googleId});
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id' : facebookId});
}

function createUser(user) {
    user.roles = ['CLIENT'];
    return userModel
        .create(user)
}

function findUserById(userId) {
    return userModel.findOne({_id: userId});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function updateUser(userId, user) {
    return userModel.update({_id: userId}, {
        $set:{
            firstName : user.firstName,
            lastName: user.lastName
        }
    })
}

function findAllUsers() {
    return userModel.find();
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}
