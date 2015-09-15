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
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      var password = model.get('password');
      bcrypt.hash(password, 10, function(err, hash){
        if (err) throw err;
        model.set('password', hash);
      });
    });
  }
});

module.exports = User;
