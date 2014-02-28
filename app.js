
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
// var map = require('./routes/map');
var food = require('./routes/food');
var megazine = require('./routes/megazine');
var admin = require('./routes/admin');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.engine('.html', require('ejs').__express);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.post('/admin/signin', admin.signin); // 사용자 가입
app.get('/admin/map', admin.map); // 사용자 가입
app.get('/admin/user', admin.user); // 사용자 가입
app.get('/admin/food', admin.food); // 사용자 가입
app.get('/admin/megazine', admin.megazine); // 사용자 가입



// 사용자 관련
app.post('/user/signup', user.signup); // 사용자 가입
app.post('/user/info', user.info); // 사용자 정보
app.post('/user/select', user.select); // 특정 사용자 정보
app.post('/user/update', user.update); // 특정 사용자 정보
// app.post('/user/bookmark/insert', user.bookMarkInsert); // 특정 사용자 정보
// app.post('/user/bookmark/delete', user.bookMarkDelete); // 특정 사용자 정보

// 방사능 수치
// app.post('/map/level1', map.level1); // 방사능 1단계
// app.post('/map/level2', map.level2); // 방사능 2단계
// app.post('/map/level3', map.level3); // 방사능 3단계
// app.post('/map/level4', map.lilevel4st); // 방사능 4단계

// // 음식 관련
app.post('/food/list', food.list); // 음식 리스트
app.post('/food/listAll', food.listAll);
app.post('/food/select', food.select); // 음식 상세정보
app.post('/food/insert', food.insert); // 음식 게시글 입력
app.post('/food/update', food.update); // 음식 게시글 수정
app.post('/food/delete', food.deleted); // 음식 게시글 삭
app.post('/food/search', food.search); // 음식 검색
app.post('/food/like', food.like); // 음식 검색

// // 음식 댓글 관련
app.post('/food/comment/list', food.commList);
//app.post('/food/comment/select', food.commSelect);
app.post('/food/comment/insert', food.commInsert);
app.post('/food/comment/update', food.commUpdate);
app.post('/food/comment/delete', food.commDelete);

// // 매거진 관련
app.post('/megazine/listAll', megazine.listAll);
app.post('/megazine/list', megazine.list);
app.post('/megazine/select', megazine.select);
app.post('/megazine/insert', megazine.insert);
app.post('/megazine/update', megazine.update);
app.post('/megazine/delete', megazine.deleted);
app.post('/megazine/search', megazine.search); 

// // 매거진 댓글 관련
app.post('/megazine/comment/list', megazine.commList);
//app.post('/megazine/comment/select', megazine.commSelect);
app.post('/megazine/comment/insert', megazine.commInsert);
app.post('/megazine/comment/update', megazine.commUpdate);
app.post('/megazine/comment/delete', megazine.commDelete);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
