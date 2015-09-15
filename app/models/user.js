var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Link = require('./link.js');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  links: function() {
    return this.hasMany(Link);
  },
  initialize: function(params){
    this.set('username', params.username);
    bcrypt.hash(params.password, null, null, function(err, hash){
      if (err) throw err;
      this.set('password', hash);
    }.bind(this));
  }
});

module.exports = User;
