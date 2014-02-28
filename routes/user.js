var mysqlDbConnection = require('./mysqlConnection.js');
var async = require('async');

UserModel = function(req) {
	this.google_domain = req.body.google_domain;
	this.facebook_domain = req.body.facebook_domain;
	this.google_picture = req.body.google_picture;
	this.facebook_picture = req.body.facebook_picture;
}

function sendQuery(query, options, res){
	optionss = chk(options);
	mysqlDbConnection.getConnection(function(err, conn){
		if(err){	
			sendResult(err, res);
		}else{
			conn.beginTransaction(function(err) {
				if (err) { throw err; }
					conn.query(query, options, function(err, result) {
						if(err){
								conn.rollback(function() {
								sendResult(err, res);
								throw err;
							});	
						}else{
								conn.commit(function(err) {
									if (err) { 
										connection.rollback(function() {
											sendResult(err, res);
											throw err;
										});
									}
									sendResult(result, res);
								});	
						}
						conn.release();
					});	
			});
		}
	});
}

function chk(model){
	for(var obj in model){
		console.log('model[obj] : ',  model[obj]);
		if(model[obj] == undefined){
			delete model[obj];
		}
	}
	return model;
}

function sendResult(result, res){
	if(result){ // 정상
		res.json({ result : "success"});
	}else{ // 에러
		res.json({ result : "fail"});
	}
}

exports.signup = function(req, res){
	var userModel = new UserModel(req);
	var query = 'INSERT INTO user_info SET ?';
	var options = userModel;

	sendQuery(query, options, res);
	
}

exports.info = function(req, res){
	var query = 'select * from user_info where ?';
	var options = {
			google_domain : req.body.google_domain,
			facebook_domain : req.body.facebook_domain
		};

	sendQuery(query, options, res);
}

exports.select = function(req, res){
	var query = 'select * from user_info where ?';
	var options = [
		req.body.google_domain
	];
	
	sendQuery(query, options, res);
}

exports.update = function(req, res){
	var userModel = new UserModel(req);
	var query = 'update user_info SET ? where google_domain = ?';
	var options = [userModel, userModel.google_domain];

	sendQuery(query, options, res);
}

// exports.bookMarkInsert = function(req, res){
// 	var query = 'update user_info SET facebook_domain = ? where google_domain = ?';
// 	var options = {
// 			req.body.google_domain,
// 			req.body.facebook_domain
// 		};

// 	sendQuery(query, options, res);
// }

// exports.bookMarkDelete = function(req, res){
// 	var query = 'update user_info SET facebook_domain = ? where google_domain = ?';
// 	var options = {
// 			req.body.google_domain,
// 			req.body.facebook_domain
// 		};

// 	sendQuery(query, options, res);
// }



