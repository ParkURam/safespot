var mysqlDbConnection = require('./mysqlConnection.js');
var async = require('async');

MegazineModel = function(req) {
 		 this.megazine_id = req.body.megazine_id;
     this.megazine_title = req.body.megazine_title;
     this.megazine_contents = req.body.megazine_contents;
     this.megazine_source = req.body.megazine_source;
     this.megazine_like_count = req.body.megazine_like_count;
     this.megazine_image = req.body.megazine_image;
     this.megazine_movie = req.body.megazine_movie;
}

MegazineCommModel = function(req) {
 		 this.comment_id = req.body.comment_id;
     this.megazine_id = req.body.megazine_id;
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
	var megazineModel = new MegazineModel(req);

	var query = 'select * from megazine order by megazine_id desc limit ?, ?';
	var options = [(req.body.page-1)* 5 , 5];
	sendQuery(query, options, res);

}

exports.listAll = function(req, res){
	var megazineModel = new MegazineModel(req);

	var query = 'select * from megazine order by megazine_id desc';
	var options = [null];
	sendQuery(query, options, res);

}


exports.select = function(req, res){
	var megazineModel = new MegazineModel(req);

	var query = 'SELECT a.*, c.google_picture, c.facebook_domain, c.facebook_picture, b.megazine_title, b.megazine_image, b.megazine_movie, b.megazine_source, b.megazine_contents, b.megazine_like_count FROM megazine_comment a LEFT OUTER JOIN megazine b on a.megazine_id = b.megazine_id LEFT OUTER JOIN user_info c on a.google_domain = c.google_domain WHERE b.megazine_id = ?';
	var options = [megazineModel.megazine_id]

	sendQuery(query, options, res);

}

exports.insert = function(req, res){
	var megazineModel = new MegazineModel(req);

	var query = 'insert into megazine set ?';
	var options = megazineModel;

	sendQuery(query, options, res);

}

exports.update = function(req, res){

	var megazineModel = new MegazineModel(req);

	var query = 'update megazine set ? where megazine_id = ?';
	var options = [chk(megazineModel), megazineModel.megazine_id];
	
	sendQuery(query, options, res);

}


exports.deleted = function(req, res){

	var megazineModel = new MegazineModel(req);

	var query = 'delete from megazine where megazine_id = ?';
	var options = megazineModel.megazine_id;

	sendQuery(query, options, res);

}

exports.like = function(req, res){

	var megazineModel = new MegazineModel(req);
	var query = 'update megazine set megazine_like_count = (megazine_like_count+1) where megazine_id = ?;';
	var options = megazineModel.megazine_id;

	sendQuery(query, options, res);

}


exports.search = function(req, res){

	var query = '	SELECT * FROM megazine where megazine_title like ? order by food_id desc;';
	var options = ['%'+req.body.words+'%'];

	sendQuery(query, options, res);
}

exports.commList = function(req, res){

	var query = 'SELECT * FROM megazine_comment WHERE megazine_id = ? order by content_date desc limit ?, ?';
	var options = [req.body.megazine_id, (req.body.page-1)* 5 , 5];
	sendQuery(query, options, res);

}

exports.commInsert = function(req, res){

	var megazineCommModel = new MegazineCommModel(req);
	var query = 'insert into megazine_comment set ?';
	var options = megazineCommModel; 
	
	sendQuery(query, options, res);

}

exports.commUpdate = function(req, res){
	var megazineCommModel = new MegazineCommModel(req);
	var query = 'update megazine_comment set ? where comment_id = ? and megazine_id = ? and google_domain = ?';
	var options = [megazineCommModel, megazineCommModel.comment_id, megazineCommModel.megazine_id, megazineCommModel.google_domain];
	
	sendQuery(query, options, res);

}

exports.commDelete = function(req, res){
	var megazineCommModel = new MegazineCommModel(req);
	var query = 'delete from megazine_comment where comment_id = ? and google_domain = ?';
	var options = [megazineCommModel.comment_id, megazineCommModel.google_domain];
	sendQuery(query, options, res);

}