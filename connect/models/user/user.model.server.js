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
userModel.findUserByEmail = findUserByEmail;
userModel.addTaskToContractor = addTaskToContractor;
userModel.findAllTasksForUser = findAllTasksForUser;
userModel.makeAdmin = makeAdmin;


module.exports = userModel;

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id' : googleId});
}

function makeAdmin(userId) {
    return userModel.findById(userId)
        .then(function (user) {
            user.roles = user.roles.push('ADMIN');
            user.save();
        })
}
function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id' : facebookId});
}

function createUser(user) {
    return userModel.create(user)
}

function findAllTasksForUser(userId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            return user._tasks.populate('_tasks')
        })
}
function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}


function findUserByEmail(email) {
    return userModel.findOne({email:email});
}

function updateUser(userId, user) {
    return userModel.update({_id: userId}, {
        $set:{
            firstName : user.firstName,
            lastName: user.lastName,
            skill: user.skill
        }
    })
}

function addTaskToContractor(userId, taskId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user._tasks.push(taskId);
            return user.save();
        })
}

function findAllUsers() {
    return userModel.find();
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}
