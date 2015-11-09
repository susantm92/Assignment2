
if(!Array.indexOf){
  Array.prototype.indexOf = function(obj){
   for(var i=0; i<this.length; i++){
    if(this[i]==obj){
     return i;
    }
   }
   return -1;
  }
}


(function($) {
  
  var initData = '';
  var initOpts = {}
  
  var methods = {
    
      init : function(options) {

        initData = $(this).html();
        initOpts = options;
        var opts = $.extend({}, $.fn.quizyMemoryGame.defaults, options);
        var itemsNum = $(this).children('ul').children('li').length;
        var correctItems = new Array();
        var matches = new Array();
        var inHtml = new Array();
        var itemsClass = 'quizy-mg-item';
        var selItemClass = '';
        var selItemId = -1;
        var numClicks = 0;
        var numTotalClicks = 0;
        var numMatches = 0;
        var numSeconds = 0;
        var gameTimer;
        var delayShow = opts.openDelay;
        var w = opts.itemWidth;
        var h = opts.itemHeight;
        var m = opts.itemsMargin;
        var rowNum = Math.ceil(itemsNum/opts.colCount);
        var random = opts.randomised;
        
  
        var handleClick = function()
		{
          if(numTotalClicks==0) gameTimer = setInterval(incTime,1000);
          numTotalClicks ++;
          var tId = $(this).attr('id');
          var tdIdNum = parseInt(tId.substring(itemsClass.length,tId.length));
          var tClass = matches[tdIdNum];
          unbindClick($(this));
          showItem($(this),tdIdNum);
          if(numClicks==0)
		  {
            numClicks ++ ;
            selItemClass = tClass;
            selItemId = tId;
          }
		  else if(numClicks == 1)
		  {
            numClicks = 0;
            if(tClass == selItemClass){
              showResIcon('correct');
              unbindClick($('.'+tClass));
              correctItems.push(tId);
              correctItems.push(selItemId);
              numMatches ++ ;
              if(numMatches == itemsNum/2)
			  {
                clearInterval(gameTimer);
                if(opts.gameSummary)
				{
                  $('div#quizy-game-summary').
                      children('div#gs-column2').
                      html(numSeconds+'<br>'+opts.textSummaryTime);
                  $('div#quizy-game-summary').
                      children('div#gs-column3').
                      html(numTotalClicks+'<br>'+opts.textSummaryClicks);
                  $('div#quizy-game-summary').delay(2000).fadeIn(1000);
                }
                if(opts.onFinishCall!=''){
                  opts.onFinishCall({ clicks: numTotalClicks, time: numSeconds } );
                }
              }
            }
			else
			{
              showResIcon('wrong');
              unbindClick($('div.'+itemsClass));
              hideItem($('div#'+selItemId));
              hideItem($(this));
              setTimeout( function()
			  {
                $('.'+itemsClass).each(function(){
                  var myId = $(this).attr('id');
                  if(correctItems.indexOf(myId) == -1){
                    bindClick($(this));
                  }
                });
              }, delayShow+opts.animSpeed+250);
            }
          }
        }

        var unbindClick = function(el){
          el.unbind('click');
          el.css('cursor','default');
        }

        var bindClick = function(el){
          el.bind('click',handleClick);
          el.css('cursor','pointer');
        }

        var showItem = function(el,id){
          var topId = el.children('div.top').attr('id');
          switch(opts.animType){
            default:
            case 'fade':
              addInFullHTML(el,id);
              $('#'+topId).fadeOut(opts.animSpeed);
            break;
            case 'flip':
              el.flip({
                direction:opts.flipAnim,
                speed: opts.animSpeed,
                content: el.children('div.quizy-mg-item-bottom'),
                color:'#777',
                onEnd: function(){
                  addInHTML(el,id);
                }
              });
            break;
            case 'scroll':
              addInFullHTML(el,id);
              $('#'+topId).animate({height: 'toggle', opacity:0.3},opts.animSpeed);
            break;
          }
        }
        var hideItem = function(el){
          var topId = el.children('div.top').attr('id');
          switch(opts.animType){
            default:
            case 'fade':
              $('#'+topId).delay(delayShow).fadeIn(opts.animSpeed, function(){
                removeInHTML(el);
              });
            break;
            case 'flip':
              setTimeout( function(){
               el.revertFlip();
              }, delayShow);
              setTimeout( function(){
               removeInHTML(el);
              }, delayShow+opts.animSpeed*4);
            break;
            case 'scroll':
              $('#'+topId).delay(delayShow).
                          animate({height: 'toggle', opacity:1},opts.animSpeed, 
                          function(){
                            removeInHTML(el);
                          });
            break;
          }      
        }

        var showResIcon = function(type){
          if(opts.resultIcons){
            var el;
            var time = Math.round(delayShow/3);
            if(type=='wrong'){
              el = $('div#quizy-mg-msgwrong');
            }else if(type=='correct'){
              el = $('div#quizy-mg-msgcorrect');
            }
            el.delay(time).fadeIn(time/2).delay(time/2).hide("explode", time/2);
          }
        }

        var incTime = function(){
          numSeconds ++;
        }

        var addInFullHTML = function(el,id){
          el.children('.quizy-mg-item-bottom')
            .children('.mgcard-show')
            .html(inHtml[id]);
        }

        var addInHTML = function(el,id){
          el.children('.mgcard-show')
            .html(inHtml[id]);
        }

        var removeInHTML = function(el){
          el.children('.quizy-mg-item-bottom').children('.mgcard-show').html('');
        }
 
        $(this).children('ul').hide();
        $(this).css({height:rowNum*(h+m)+'px'});

       if(random)
	   {
			var ranArr = Array();
	        for(var j=0; j< itemsNum; j++)
			{
	          inHtml[j] = '';
	          ranArr.push(j);
	        }
	   }

		var j=0;
        var i=0;
        while(i<itemsNum)
		{
             if(random)
			 {
          	   var pick = Math.floor(Math.random()*ranArr.length);
          	   j = ranArr[pick];
          	   ranArr.splice(pick,1);
			}else
			{
				j = i;
			}
          var inEl = $(this).children('ul').children('li').eq(j);
          var xRatio = (i+opts.colCount)%opts.colCount;
          var yRatio = Math.floor(i/opts.colCount);
          var l = xRatio*(w+m);
          var t = yRatio*(h+m);
          inHtml[j] = inEl.html();
          $(this).append('<div id="'+itemsClass+j+'" class="'+itemsClass+
          '" style="width:'+
          w+'px; height:'+h+'px; left:'+l+'px; top:'+t+'px">' +
          '<div class="quizy-mg-item-bottom"><div class="mgcard-show">'+
          '</div></div><div id="top'+j+
          '" class="top" style="width:'+
          w+'px; height:'+h+'px;"></div></div>');
          i++;
          matches[j] = inEl.attr('class');

        }
        $(this).children('ul').remove();
        if(opts.resultIcons){
          $(this).append('<div id="quizy-mg-msgwrong"'+
          ' class="quizy-mg-notification-fly quizy-mg-notification-fly-neg"></div>'+
          '<div id="quizy-mg-msgcorrect" class="quizy-mg-notification-fly '+
          ' quizy-mg-notification-fly-pos"></div>');
          var xMid = $(this).width()/2 - 
                      $('div.quizy-mg-notification-fly').width()/2;
          var yMid = $(this).height()/2 - 
                      $('div.quizy-mg-notification-fly').height()/2 -
                      opts.itemsMargin/2;
          $('div.quizy-mg-notification-fly').css({top:yMid+'px',left:xMid+'px'});
        }
        
        if(opts.gameSummary){
          
          var gameEl = $(this);
          
          gameEl.append('<div id="quizy-game-summary"><div class="gs-column" id="gs-column1">'+
                          opts.textSummaryTitle+
                          '</div><div class="gs-column" id="gs-column2"></div>'+
                          '<div class="gs-column" id="gs-column3"></div>'+
                          '<div class="quizy-game-clear"></div></div>');
     
          var xMid = gameEl.width()/2 - 
                      $('div#quizy-game-summary').width()/2;
          var yMid = gameEl.height()/2 - 
                      $('div#quizy-game-summary').height()/2 -
                      opts.itemsMargin/2;
          $('div#quizy-game-summary').css({top:yMid+'px',left:xMid+'px'});
          
          if(opts.replayButton){
            $('#quizy-game-summary').append('<div id="gs-replaybut">'+
                                            opts.replayButtonText+'</div>');
          }
          
          $('#quizy-game-summary').append('<div id="gs-closebut">'+
                                          opts.closeButtonText+'</div>');
          
          $('div#gs-closebut').click(function(){
            $(this).parent().fadeOut();
          });
          
          $('div#gs-replaybut').click(function(){
            gameEl.quizyMemoryGame('restart');
          });
          
        }
        
        $('.quizy-mg-item').click(handleClick);
        

      },
      
      destroy : function( ) {
        $(this).empty();
      },
      
      restart: function( ){
        methods.destroy.apply( this );
        $(this).append(initData);
        methods.init.call( this, initOpts );
      }
      
  };
  
  
  $.fn.quizyMemoryGame = function(optionsMethods) {
    
    if ( methods[optionsMethods] ) {
        return methods[ optionsMethods ].apply( this, arguments);
    } else if ( typeof optionsMethods === 'object' || ! optionsMethods ) {
        return methods.init.apply( this, arguments );
    } else {
        $.error( 'Method ' +  optionsMethods + ' does not exist on jQuery.tooltip' );
    }
    
  }
  
  
  $.fn.quizyMemoryGame.defaults = {itemWidth: 156, itemHeight: 156, itemsMargin:10, colCount:4, animType:'scroll', animSpeed:250, openDelay:2500, flipAnim:'rl', resultIcons:true, gameSummary:true, randomised:true, textSummaryTitle:'Game Finished', replayButton:true, replayButtonText:'Replay', closeButtonText:'Close', textSummaryClicks:'clicks', textSummaryTime:'seconds', onFinishCall:''}
  
  
})(jQuery);