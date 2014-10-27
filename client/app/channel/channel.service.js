'use strict';

angular.module('lsaApp')
  .factory('channel', function(){
      return function () {
        var callbacks = [];
        this.add = function (cb) {
          callbacks.push(cb);
        };
        this.invoke = function () {
          callbacks.forEach(function (cb) {
            cb();
          });
        };
        return this;
      };
    });
