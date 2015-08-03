'use strict';

var bunyan = require('bunyan');

var logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

module.exports = bunyan.createLogger({
	name: 'school-portal',
	streams: [{
		level: logLevel,
		stream: process.stdout
	}, {
		type: 'rotating-file',
		level: logLevel,
		path: process.env.NODE_ENV === 'production' ? 'server.log' : 'server.log'
	}],
	serializers: {
		req: bunyan.stdSerializers.req,
		res: bunyan.stdSerializers.res,
		err: function(err) {
			var serializedErr = bunyan.stdSerializers.err(err);

			// Serialize the HTTP-specific properties, too
			if (serializedErr !== err) {
				serializedErr.statusCode = err.statusCode;
				serializedErr.headers = err.headers;
				serializedErr.body = err.body;
			}

			return serializedErr;
		}
	}
});
