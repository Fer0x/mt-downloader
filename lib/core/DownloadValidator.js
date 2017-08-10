var fs = require('fs');
var _ = require('underscore');
var e = require('../Exceptions');
var DownloadValidator = function(threads, fd) {
	this.threads = threads;
	this.fd = fd;
};

DownloadValidator.prototype.execute = function(callback) {
	var isCompleted = _.some(this.threads, function(item) {
		return item.position >= item.end;
	});
	if (isCompleted === true) callback(null, true);
	else {
		fs.close(this.fd, function() {
			callback(e(1013));
  	});
  }

};

module.exports = DownloadValidator;