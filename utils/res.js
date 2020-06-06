'use strict';

exports.ok = function(values, res) {
  var data = {
      'code': 200,
      'message' : "Success",
      'data': values
  };
  res.json(data);
  res.end();
};

exports.empty = function(values, res) {
  var data = {
      'code': 201,
      'message' : "Result is empty"      
  };
  res.json(data);
  res.end();
};

exports.error = function(values, res) {
  var data = {
      'code': 400,
      'message' : values      
  };
  res.json(data);
  res.end();
};

exports.systemError = function(values, res) {
  var data = {
      'code': 500,
      'message' : values      
  };
  res.json(data);
  res.end();
};