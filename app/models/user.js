var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Link = require('./link.js');
var hashAsync = Promise.promisify(bcrypt.hash);

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  links: function() {
    return this.hasMany(Link);
  },
  initialize: function(){
    this.on('creating', function(model, attrs, options) {
      return hashAsync(model.get('password'), null, null)
      .then(function(hash){
        model.set('password', hash);
      });
    });
  }
});

module.exports = User;
