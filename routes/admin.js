var mysqlDbConnection = require('./mysqlConnection.js');
var async = require('async');

function sendQuery(query, options, res){
	mysqlDbConnection.getConnection(function(err, conn){
		if(err){	
			console.log('err : ', err);
			return err;
		}else{
			console.log('options : ' , options);
			if(options){
					conn.query(query, options, function(err, result) {
							conn.release();
							console.log('result : ', result);
				    	if(err){
				    		sendResult(err, res);
				    	}else{
				  			sendResult(result, res);
				    	}
					});	
			}else{
					conn.query(query, function(err, result) {
							conn.release();
				    	if(err){
				    		sendResult(err, res);
				    	}else{
				  			sendResult(result, res);
				    	}
					});
			}
		}
	});
}

FoodModel = function(req) {
 		 this.food_id = req.body.food_id;
     this.food_name = req.body.food_name;
     this.food_image = req.body.food_image;
     this.food_ogarnization = req.body.food_ogarnization;
     this.food_location = req.body.food_location;
     this.food_radioactivity = req.body.food_radioactivity;
     this.food_like_count = req.body.food_like_count;
     this.food_date =  new Date(req.body.food_date);
}

FoodCommModel = function(req) {
 		 this.comment_id = req.body.comment_id;
     this.food_id = req.body.food_id;
     this.google_domain = req.body.google_domain;
     this.content = req.body.content;
     this.content_date =  new Date();
}



function sendResult(result, res){
	if(result){ // 정상
		res.json({ result : "success", data : result});
	}else{ // 에러
		res.json({ result : "fail", data : result});
	}
}

exports.signin = function(req, res){
	console.log('req : ', req.body);

	res.render('main'); 
}

exports.map = function(req, res){
  res.render('map'); 
};

exports.user = function(req, res){
  res.render('user'); 
};

exports.food = function(req, res){
  res.render('food'); 
};

exports.megazine = function(req, res){
  res.render('megazine'); 
};
