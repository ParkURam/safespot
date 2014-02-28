var mysqlDbConnection = require('./mysqlConnection.js');
var async = require('async');

FoodModel = function(req) {
	this.food_id = req.body.food_id;
	this.food_name = req.body.food_name;
	this.food_image = req.body.food_image;
	this.food_ogarnization = req.body.food_ogarnization;
	this.food_location = req.body.food_location;
	this.food_radioactivity = req.body.food_radioactivity;
	this.food_like_count = req.body.food_like_count;
	this.content_date =  new Date();
}

FoodCommModel = function(req) {
	this.comment_id = req.body.comment_id;
	this.food_id = req.body.food_id;
	this.google_domain = req.body.google_domain;
	this.content = req.body.content;
	this.content_date =  new Date();
}


function sendQuery(query, options, res){
	options = chk(options);
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
		if(model[obj] == undefined){
			delete model[obj];
		}
	}
	return model;
}


function sendResult(result, res){
	if(result){ // 정상
		res.json({ result : "success", data : result});
	}else{ // 에러
		res.json({ result : "fail", data : result});
	}
}

exports.list = function(req, res){
	//var foodModel = new FoodModel(req);
	var query = 'SELECT * FROM food_info order by food_id desc limit ?, ?';
	var options = [(req.body.page-1)* 5 , 5];
	sendQuery(query, options, res);

}

exports.listAll = function(req, res){
	//var foodModel = new FoodModel(req);
	var query = 'SELECT * FROM food_info order by food_id desc';
	var options = [null];
	sendQuery(query, options, res);

}


exports.select = function(req, res){

	var foodModel = new FoodModel(req);
	var query = 'SELECT a.*, c.google_picture, c.facebook_domain, c.facebook_picture, b.food_name, b.food_image, b.food_ogarnization, b.food_location, b.food_radioactivity, b.food_like_count, food_date FROM food_comment a LEFT OUTER JOIN food_info b on a.food_id = b.food_id LEFT OUTER JOIN user_info c on a.google_domain = c.google_domain WHERE b.food_id = ?';
	var options = [foodModel.food_id];

	sendQuery(query, options, res);

}

exports.insert = function(req, res){

	var foodModel = new FoodModel(req);
	var query = 'insert into food_info set ? ';
	var options = foodModel;

	sendQuery(query, options, res);

}

exports.update = function(req, res){

	var foodModel = new FoodModel(req);
	var query = 'update food_info set ? where food_id = ?';
	var options = [chkf(oodModel), foodModel.food_id];
	
	sendQuery(query, options, res);

}

exports.deleted = function(req, res){

	var foodModel = new FoodModel(req);
	var query = 'delete from food_info where food_id = ?';
	var options = foodModel.food_id;

	sendQuery(query, options, res);

}

exports.like = function(req, res){

	var foodModel = new FoodModel(req);
	var query = 'update food_info set food_like_count = (food_like_count+1) where food_id = ?;';
	var options = foodModel.food_id;

	sendQuery(query, options, res);

}

exports.search = function(req, res){
	var query = '	SELECT * FROM food_info where food_name like ? order by food_id desc;';
	var options = ['%'+req.body.words+'%'];

	sendQuery(query, options, res);
}

exports.commList = function(req, res){
	var query = 'SELECT * FROM food_comment WHERE food_id = ? order by content_date desc limit ?, ?';
	var options = [req.body.food_id, (req.body.page-1)* 5 , 5];
	sendQuery(query, options, res);

}

exports.commInsert = function(req, res){
	var foodCommModel = new FoodCommModel(req);
	var query = 'insert into food_comment set ? ';
	var options = foodCommModel; 
	
	sendQuery(query, options, res);

}

exports.commUpdate = function(req, res){
	var foodCommModel = new FoodCommModel(req);
	var query = 'update food_comment set ? where comment_id = ? and food_id = ? and google_domain = ? ';
	var options = [foodCommModel, foodCommModel.comment_id, foodCommModel.food_id, foodCommModel.google_domain];
	
	sendQuery(query, options, res);

}

exports.commDelete = function(req, res){
	var foodCommModel = new FoodCommModel(req);
	var query = 'delete from food_comment where comment_id = ? and google_domain = ?';
	var options = [foodCommModel.comment_id, foodCommModel.google_domain];
	
	sendQuery(query, options, res);

}