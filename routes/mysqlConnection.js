var mysql = require('mysql');
var async = require('async');

// var pool = mysql.createPool({
// 	host	: '127.0.0.1',
// 	port	: 3306,
// 	user	: 'root',
// 	password : '1234',
// 	database : 'safespot'
// });


var pool = mysql.createPool({
	host	: '192.168.3.242',
	port	: 3306,
	user	: 'uGab6nQ5iNilc',
	password : 'p8NmGVGQh8Hu9',
	database : 'd37a2f89bb8e84053ad5056b8ecb5cc29'
});

module.exports = pool;
	
// /**
// * 유저 가입 메서드
// * @param
// * @result 
// * @exception
// *
// */


// /**
// * 유저 정보 메서드
// * @param
// * @result 
// * @exception
// *
// */
// pool.userInfo = function(req) {
// 	// body...
// 	var googleDomain = req.body.google_domain;
// 	var columns = ['google_domain', 'facebook_domain'];

// 	var query = this.query('SELECT ?? FROM ?? WHERE google_domain = ?',
// 		 [columns, 'user_info', googleDomain], function(err, results) {
	  	
// 	  	if(err){
// 	  		return result;  		
// 	  	}else{
// 				return result;  		
// 	  	}

// 	});
	
// };

// /**
// * 유저 정보 메서드
// * @param
// * @result 
// * @exception
// *
// */
// pool.userSelect = function(req) {
// 	// body...
// 	var googleDomain = req.body.google_domain;
// 		var columns = ['google_domain', 'facebook_domain'];

// 		var query = this.query('SELECT ?? FROM ?? WHERE google_domain = ?',
// 			 [columns, 'user_info', googleDomain], function(err, results) {
		  	
// 		  	if(err){
// 		  		return result;  		
// 		  	}else{
// 					return result;  		
// 		  	}

// 		});
// };

// /**
// * 유저 정보 수정 메서드
// * @param
// * @result 
// * @exception
// *
// */
// pool.userUpdate = function(req) {
// 	// body...
// 	return result;
// };
// /**
// * 맵 lv 1 메서드
// * @param
// * @result 
// * @exception
// *
// */
// pool.mapLevel1 = function(first_argument) {
// 	// body...
// 	return result;
// };
// /**
// * 맵 lv 2 메서드
// * @param
// * @result 
// * @exception
// *
// */
// pool.mapLevel2 = function(first_argument) {
// 	// body...
// 	return result;
// };
// /**
// * 맵 lv 3 메서드
// * @param
// * @result 
// * @exception
// *
// */
// pool.mapLevel3 = function(first_argument) {
// 	// body...
// 	return result;
// };
// /**
// * 맵 lv 4 메서드
// * @param
// * @result 
// * @exception
// *
// */
// pool.mapLevel4 = function(first_argument) {
// 	// body...
// 	return result;
// };
// /**
// * 음식 리스트 정보 보여주기
// * @param
// * @result 
// * @exception
// *
// */
// pool.foodList = function(first_argument) {
// 	// body...
// 	return result;
// };

// /**
// * 음식 정보 보여주기
// * @param
// * @result 
// * @exception
// *
// */
// pool.foodSelect = function(first_argument) {
// 	// body...
// 	return result;
// };

// /**
// * 음식 정보 글쓰기
// * @param
// * @result 
// * @exception
// *
// */
// pool.foodInsert = function(first_argument) {
// 	// body...
// 	return result;
// };

// /**
// * 음식 정보 수정
// * @param
// * @result 
// * @exception
// *
// */
// pool.foodUpdate = function(first_argument) {
// 	// body...
// 	return result;
// };

// /**
// * 음식 정보 지우기
// * @param
// * @result 
// * @exception
// *
// */
// pool.foodDelete = function(first_argument) {
// 	// body...
// 	return result;
// };

// /**
// * 음식 정보 댓글 보여주기
// * @param
// * @result 
// * @exception
// *
// */
// pool.foodCommList = function(first_argument) {
// 	// body...
// 	return result;
// };

// /**
// * 음식 정보 댓글 보여주기
// * @param
// * @result 
// * @exception
// *
// */
// pool.foodCommSelect = function(first_argument) {
// 	// body...
// 	return result;
// };

// /**
// * @param
// * @result 
// * @exception
// *
// */
// pool.foodCommInsert = function(first_argument) {
// 	// body...
// 	return result;
// };

// /**
// * @param
// * @result 
// * @exception
// *
// */
// pool.foodCommUpdate = function(first_argument) {
// 	// body...
// 	return result;
// };

// /**
// * @param
// * @result 
// * @exception
// *
// */
// pool.foodCommDelete = function(first_argument) {
// 	// body...
// 	return result;
// };

// /**
// * @param
// * @result 
// * @exception
// *
// */
// pool.megazineSelect = function(first_argument) {
// 	// body...
// 	return result;
// };

// /**
// * @param
// * @result 
// * @exception
// *
// */
// pool.megazineInsert = function(first_argument) {
// 	// body...
// 	return result;
// };

// /**
// * @param
// * @result 
// * @exception
// *
// */
// pool.megazineUpdate = function(first_argument) {
// 	// body...
// 	return result;
// };

// /**
// * @param
// * @result 
// * @exception
// *
// */
// pool.megazineDelete = function(first_argument) {
// 	// body...
// 	return result;
// };
// /**
// * @param
// * @result 
// * @exception
// *
// */
// pool.megazineCommSelect = function(first_argument) {
// 	// body...
// 	return result;
// };
// /**
// * @param
// * @result 
// * @exception
// *
// */
// pool.megazineCommInsert = function(first_argument) {
// 	// body...
// 	return result;
// };

// /**
// * @param
// * @result 
// * @exception
// *
// */
// pool.megazineCommUpdate = function(first_argument) {
// 	// body...
// 	return result;
// };

// /**
// * @param
// * @result 
// * @exception
// *
// */
// pool.megazineCommDelete = function(first_argument) {
// 	// body...
// 	return result;
// };