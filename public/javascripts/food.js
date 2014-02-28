$(document).ready(function() {

	 $ . fn . copyCSS = function ( source ){
	    var dom = $ ( source ). get ( 0 );
	    var style ;
	    var dest = {};
	    if ( window . getComputedStyle ){
	        var camelize = function ( a , b ){
	            return b . toUpperCase ();
	        };
	        style = window . getComputedStyle ( dom , null );
	        for ( var i = 0 , l = style . length ; i < l ; i ++ ){
	            var prop = style [ i ];
	            var camel = prop . replace ( /\-([az])/g , camelize );
	            var val = style . getPropertyValue ( prop );
	            dest [ camel ] = val ;
	        };
	        return this . css ( dest );
	    };
	    if ( style = dom . currentStyle ){
	        for ( var prop in style ){
	            dest [ prop ] = style [ prop ];
	        };
	        return this . css ( dest );
	   };
	   if ( style = dom . style ){
	      for ( var prop in style ){
	        if ( typeof style [ prop ] != 'function' ){
	          dest [ prop ] = style [ prop ];
	        };
	      };
	    };
	    return this . css ( dest );
	};



   $('[data-toggle=offcanvas]').click(function() {
     $('.row-offcanvas').toggleClass('active');
   });

   $('#foodTab a').click(function (e) {
     e.preventDefault();
     $(this).tab('show');
   });

   $.ajax({
     type: "POST",
     url: '../food/listAll',
     data: {page : 1},
     success: function(result){
     	console.log('data : ', result);

     	var foodList = result.data;

     	$.each( foodList, function( key, food ) {
     		var foodTr = $("<tr>");
     	  $.each(food, function(key, list){
     	  	//console.log( key + ": " + list );
     	  	var foodTd = $("<td>");
     	  	
     	  	if(key == "food_id"){
     	  		foodTd.prepend("<label class='checkbox'><input type='checkbox'>" + list + "</label>");	
     	  	}else{
     	  		foodTd.text(list);
     	  	}
     	  	
     	  	foodTr.append(foodTd);
     	  	$('#foodTable').append(foodTr);
     	  	$('#foodTable > tr').copyCSS(foodTr);
     	  });
     	});

     },
     dataType: "json"
   });



   $.ajax({
     type: "POST",
     url: '../megazine/listAll',
     data: [null],
     success: function(result){
     	console.log('data : ', result);

     	var megazineList = result.data;

     	$.each( megazineList, function( key, megazine ) {
     		var megazineTr = $("<tr>");
     	  $.each(megazine, function(key, list){
     	  	//console.log( key + ": " + list );
     	  	var megazineTd = $("<td>");
     	  	
     	  	if(key == "megazine_id"){
     	  		megazineTd.prepend("<label class='checkbox'><input type='checkbox'>" + list + "</label>");	
     	  	}else{
     	  		megazineTd.text(list);
     	  	}
     	  	
     	  	megazineTr.append(megazineTd);
     	  	$('#megazineTable').append(megazineTr);
     	  	$('#megazineTable > tr').copyCSS(megazineTr);
     	  });
     	});

     },
     dataType: "json"
   });


   $.ajax({
     type: "POST",
     url: '../food/listAll',
     data: {page : 1},
     success: function(result){
     	console.log('data : ', result);

     	var foodList = result.data;

     	$.each( foodList, function( key, food ) {
     		var foodTr = $("<tr>");
     	  $.each(food, function(key, list){
     	  	//console.log( key + ": " + list );
     	  	var foodTd = $("<td>");
     	  	
     	  	if(key == "food_id"){
     	  		foodTd.prepend("<label class='checkbox'><input type='checkbox'>" + list + "</label>");	
     	  	}else{
     	  		foodTd.text(list);
     	  	}
     	  	
     	  	foodTr.append(foodTd);
     	  	$('#foodTable').append(foodTr);
     	  	$('#foodTable > tr').copyCSS(foodTr);
     	  });
     	});

     },
     dataType: "json"
   });
});