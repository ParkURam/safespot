var mysqlDbConnection = require('./mysqlConnection.js');
var async = require('async');

function sendQuery(query, options, res){
	mysqlDbConnection.getConnection(function(err, conn){
		if(err){	
			console.log('err : ', err);
			return err;
		}else{
			conn.query(query, options, function(err, result) {
					conn.release();
		    	if(err){
		    		sendResult(result, res);
		    	}else{
		  			sendResult(result, res);
		    	}
			});
		}
	});
}

exports.level1 = function(req, res){
	var list = req.body;
  res = resSetting(res);

  var user_id = list.user_id;

  async.waterfall([
    function(callback){
      mysqlDbConnection.getConnection(function(err, conn){
        if(err) setErrLog('admin', err, req.path);

        conn.query('select notice.NOTICE_COURT_ID notice_court_id, COURT_NAME court_name, addr.GUGUN gugun from NOTICE_COURT notice left outer join NOTICE_COURT_ADDR addr on(notice.NOTICE_COURT_ID = addr.NOTICE_COURT_ID) order by GUGUN;',
          function(err, row){
            conn.release();
            if(err) {
              setErrLog('admin', err, req.path);
            };
            courtList = row;
            callback(err, row);

          });
      });
    },
    function(list, callback){
      var noticeCourtList = new Array();
      for(var i=0; i < list.length; i++){
        noticeCourtList.push(list[i].notice_court_id);
      }
      CourtNoticeModel.find({notice_court_id:{$in:noticeCourtList}}, '-_id notice_court_id contents').sort('-updated_at').exec(function(err, findList) {
        if(err) setErrLog('admin', err, req.path);
        callback(err, findList);
      });
    }
    ], function(err, mogoList){

      if(err){
        setErrLog('admin', err, req.path);
      }

      if(mogoList.length != 0){
        for(var i=0; i < mogoList.length;i++){
          var tempList = mogoList[i];
          for(var j=0; j < courtList.length; j++){
            if(courtList[j].notice_court_id == tempList.notice_court_id){
              courtList[j].count = tempList.contents.length
            }
          }
        }
      }
      var resultList = {
        result:"success",
        court_list: courtList,
      }
      res.json(resultList);
    });

}

exports.level2 = function(req, res){
	var list = req.body;
	  res = resSetting(res);

	  var user_id = list.user_id;

	  async.waterfall([
	    function(callback){
	      mysqlDbConnection.getConnection(function(err, conn){
	        if(err) setErrLog('admin', err, req.path);

	        conn.query('select notice.NOTICE_COURT_ID notice_court_id, COURT_NAME court_name, addr.GUGUN gugun from NOTICE_COURT notice left outer join NOTICE_COURT_ADDR addr on(notice.NOTICE_COURT_ID = addr.NOTICE_COURT_ID) order by GUGUN;',
	          function(err, row){
	            conn.release();
	            if(err) {
	              setErrLog('admin', err, req.path);
	            };
	            courtList = row;
	            callback(err, row);

	          });
	      });
	    },
	    function(list, callback){
	      var noticeCourtList = new Array();
	      for(var i=0; i < list.length; i++){
	        noticeCourtList.push(list[i].notice_court_id);
	      }
	      CourtNoticeModel.find({notice_court_id:{$in:noticeCourtList}}, '-_id notice_court_id contents').sort('-updated_at').exec(function(err, findList) {
	        if(err) setErrLog('admin', err, req.path);
	        callback(err, findList);
	      });
	    }
	    ], function(err, mogoList){

	      if(err){
	        setErrLog('admin', err, req.path);
	      }

	      if(mogoList.length != 0){
	        for(var i=0; i < mogoList.length;i++){
	          var tempList = mogoList[i];
	          for(var j=0; j < courtList.length; j++){
	            if(courtList[j].notice_court_id == tempList.notice_court_id){
	              courtList[j].count = tempList.contents.length
	            }
	          }
	        }
	      }
	      var resultList = {
	        result:"success",
	        court_list: courtList,
	      }
	      res.json(resultList);
	    });


}

exports.level3 = function(req, res){
	var list = req.body;
	  res = resSetting(res);
	  var courtNotice = new CourtNoticeModel();
	  var content = new ContentModel();

	  var notice_court_id = list.notice_court_id;
	  var user_id = list.user_id;

	  content.user_id = user_id;
	  content.content =  list.content;
	  content.date = Date.now();
	  content.like_user_id = new Array();

	  courtNotice.notice_court_id = notice_court_id;
	  courtNotice.contents = content;

	  async.waterfall([
	    function(callback){
	      CourtNoticeModel.find({notice_court_id:notice_court_id}).sort('-updated_at').exec(function(err, findList){
	        if(err) setErrLog(user_id, err, req.path);

	        if(findList.length != 0){
	          findList[0].contents.push(courtNotice.contents[0]);
	          CourtNoticeModel.update({notice_court_id:notice_court_id}, {contents: findList[0].contents}, {upsert : true},
	            function (err, doc) {
	              if(err) setErrLog(user_id, err, req.path);

	              callback(err, doc);
	            });
	        }else{
	          courtNotice.save(function(err, courtNotice, count) {
	            if(err) setErrLog(user_id, err, req.path);

	            callback(err, count);
	          });
	        }
	      });
	    },
	    function(count, callback){
	      CourtNoticeModel.find({notice_court_id : notice_court_id},function(err, noticeList){
	        if(err) setErrLog(user_id, err, req.path);

	        callback(err, noticeList);
	      });
	    }
	    ], function(err, result){
	      if(err){
	        setErrLog(user_id, err, req.path);
	        res.json({result : 'fail', err : err});
	      } else{
	        res.json({result : 'success', list : result});
	      }
	    });


}


exports.level4 = function(req, res){
	var list = req.body;
	  res = resSetting(res);

	  var user_id = list.user_id;

	  async.waterfall([
	    function(callback){
	      mysqlDbConnection.getConnection(function(err, conn){
	        if(err) setErrLog('admin', err, req.path);

	        conn.query('select notice.NOTICE_COURT_ID notice_court_id, COURT_NAME court_name, addr.GUGUN gugun from NOTICE_COURT notice left outer join NOTICE_COURT_ADDR addr on(notice.NOTICE_COURT_ID = addr.NOTICE_COURT_ID) order by GUGUN;',
	          function(err, row){
	            conn.release();
	            if(err) {
	              setErrLog('admin', err, req.path);
	            };
	            courtList = row;
	            callback(err, row);

	          });
	      });
	    },
	    function(list, callback){
	      var noticeCourtList = new Array();
	      for(var i=0; i < list.length; i++){
	        noticeCourtList.push(list[i].notice_court_id);
	      }
	      CourtNoticeModel.find({notice_court_id:{$in:noticeCourtList}}, '-_id notice_court_id contents').sort('-updated_at').exec(function(err, findList) {
	        if(err) setErrLog('admin', err, req.path);
	        callback(err, findList);
	      });
	    }
	    ], function(err, mogoList){

	      if(err){
	        setErrLog('admin', err, req.path);
	      }

	      if(mogoList.length != 0){
	        for(var i=0; i < mogoList.length;i++){
	          var tempList = mogoList[i];
	          for(var j=0; j < courtList.length; j++){
	            if(courtList[j].notice_court_id == tempList.notice_court_id){
	              courtList[j].count = tempList.contents.length
	            }
	          }
	        }
	      }
	      var resultList = {
	        result:"success",
	        court_list: courtList,
	      }
	      res.json(resultList);
	    });


}