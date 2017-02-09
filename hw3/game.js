var getEle=function(id){
	return document.getElementById(id)
};
var mouseButton=leftMouse=0;
var flagImg=new Image();
var happyImg=new Image();
var mineImg=new Image();
var sadImg=new Image();
var successImg=new Image();
var timeInterval;
document.cookie = "Easy=0";
document.cookie = "Medium=0";
document.cookie = "Hard=0";


btn=function(evt){
    evt = evt || window.event;
    var b = selectSys();
    if(b!=2){ 
      switch(evt.button){
        case 2:
          return 0;
        case 0:
          return b==1?0:1; //b==1,IE
        default:
          return 1;
      }
    }else{ //FF
      return evt.which==3?0:1;
    }
},

OMine = {
  MaxX:9,MaxY:9,//max x and y
  mineNum:10,//the number of mines
  FlagCount:0, //cur flag numbers
  openedNum:0, //number of open areas
  maxOpenNum:0,//number of open areas expected
  //when openedNum=maxOpenNum&&FlagCount=mineNum, game is finished
  Mine:[],
  gameOver:false, //true means you fail
  success:false, //true means you success
  aClear:[],
  time:0,
  gameLevel:"Easy",

  
  //Initialization
  fInit:function(){
    var T=this,MaxX=T.MaxX,MaxY=T.MaxY,nX,nY=MaxY,mineNum=T.mineNum,
      AStr=['<table bordercolor="#000000" border="0" cellpadding="0" cellspacing="0" height="'+35*MaxY+'px" width="'+35*MaxX+'px" style="border: 10px inset #a0a0a0">'],
      i=0,TAr,TMine=T.Mine;
    T.maxOpenNum=MaxX*MaxY-mineNum;
    time = 0;
    window.clearInterval(timeInterval);
    timeInterval = setInterval(OMine.gameTime, 1000);
    while(nY--){
      AStr[++i]='<tr>';
      TAr=TMine[nY]=[];
      nX=MaxX;
      while(nX--){
        AStr[++i]='<td class="Normal" onmousedown="OMine.fMouseDown('+nX+','+nY+',event);" onmouseup="OMine.fMouseUp('+nX+','+nY+',event);" onmouseover="OMine.fButtonMouseOver('+nX+','+nY+')" onmouseout="OMine.fButtonMouseOut('+nX+','+nY+')" id="Img'+nX+'_'+nY+'">　</td>';
        TAr[nX]={
          Mine:0, //0 means 'no mine'
          State:0,//0 : not opne 1 : open 2 : flag
          mineNum:0//number of mines surrounded
        }
      }
       AStr[++i]='</tr>';
    }
    AStr[++i]='</table>';
    getEle('dMap').innerHTML=T.InitStr=AStr.join('');
    getEle('txtFlagCount').value=mineNum;
    T.fInitMine();
    getEle('btnRefreshMap').src='images/happy.gif';
    T.gameOver=T.success=false;
    T.openedNum=T.FlagCount=T.aClear.lenght=0;
  },

  gameTime:function() {
    time++;
  },

  fGetMine:function(X,Y){
	return this.Mine[Y][X]
  },

  //refresh
  fRefreshMap:function(){
    var T=this;
    getEle('dMap').innerHTML=T.InitStr;
    T.fResetOMine();
    T.fInitMine();
    T.gameOver=T.success=false;
    getEle('btnRefreshMap').src='images/happy.gif';
    getEle('txtFlagCount').value=T.mineNum;
    T.openedNum=T.FlagCount=T.aClear.lenght=0;
  },

  //reset array
  fResetOMine:function(){
    var T=this,MaxY=T.MaxY,MaxX=T.MaxX,X,Y=MaxY,M,Mine=T.Mine,TAr;
    while(Y--){
      X=MaxX;
      TAr=Mine[Y];
      while(X--)(M=TAr[X]).Mine=M.State=M.mineNum=0;
    }
  },

  //inti array
  fInitMine:function(){
    var T=this,MaxX=T.MaxX,MaxY=T.MaxY,a,fGetMine=T.fGetMine,
      aOld=[],x,y=MaxY,n=0,l=T.mineNum,xRand; 
    while(y--){
      x=MaxX;
      while(x--)aOld[n++]=[x,y];
    }
    while(l--){
      a=aOld[xRand=Math.floor(Math.random()*(n-1))];
      T.fGetMine(a[0],a[1]).Mine=1;
      aOld.splice(xRand,1);
      --n;
    }
  },

  
  fButtonMouseOver:function(X,Y){
    var T=this;
    switch(mouseButton){
      case 2:
        var arr=T.fGetAround(X,Y),i=arr.length,TAr;
        while(i--)T.fButtonDown((TAr=arr[i])[0],TAr[1]);
      case 1:
        leftMouse==1&&T.fButtonDown(X,Y); 
    }
  },

  
  fButtonMouseOut:function(X,Y){
    var T=this;
    switch(mouseButton){
      case 2:
        var arr=T.fGetAround(X,Y),i=arr.length,TAr;
        while(i--)T.fButtonUp((TAr=arr[i])[0],TAr[1]);
      case 1:
        leftMouse==1&&T.fButtonUp(X,Y); 
    }
  },


  fButtonDown:function(X,Y){
    var srcEle=getEle('Img'+X+'_'+Y);
    srcEle.className=='Normal'&&(srcEle.className='M0');
  },
  
  fButtonUp:function(X,Y){
    var srcEle=getEle('Img'+X+'_'+Y);
    srcEle.className=='M0'&&!this.fGetMine(X,Y).State&&(srcEle.className='Normal');
  },

  //get directions
  fGetAround:function(X,Y){
    var TX,TY,i=8,MX=this.MaxX-1,MY=this.MaxY-1,
      Arr=[[-1,0],[-1,-1],[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1]],
      newArr=[],TAr;
    while(i--){
      TX=X+(TAr=Arr[i])[0];
      TY=Y+TAr[1];
      !(TX<0||TX>MX||TY<0||TY>MY)&&newArr.push([TX,TY]);
    }
    return newArr;
  },

  fMouseDown:function(X,Y,evt){
    var T=this;
    if(T.gameOver){
      window.clearInterval(OMine.gameTime);
      alert('Game Over! You failed');
      return;
    }
    if(T.success){
      window.clearInterval(OMine.gameTime);
      alert('Congratulations! You won!');
      dealCookie(gameLevel, time);
      return;
    }
    var srcEle=getEle('Img'+X+'_'+Y),ObXY=T.fGetMine(X,Y),arr,i,TAr;
    ++mouseButton;
    evt=evt||window.event;
    switch(mouseButton){
      case 2:
        arr=T.fGetAround(X,Y);i=arr.length;
        while(i--)T.fButtonDown((TAr=arr[i])[0],TAr[1]);
        break;
      case 1:
        if(btn(evt)){
          leftMouse=1;
          T.fButtonDown(X,Y);
        }else{
          switch(ObXY.State){
            case 0:
              ObXY.State=2;
              srcEle.className='Flag';
              --getEle('txtFlagCount').value;
              ++T.FlagCount;
              break;
            case 2:
              ObXY.State=0;
              srcEle.className='Normal';
              ++getEle('txtFlagCount').value;
              --T.FlagCount;
          }
        }
      }
  },

  getCookie:function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  },

  dealCookie:function(gameLevel, time) {
    var score = OMine.getCookie(gameLevel);
    if (score > time) {
      document.cookie = gameLevel + "=" + time;
      alert("Congratulations! You got the highest score on " + OMine.gameLevel + " mode!" + "Score: " + time + "seconds");
    } else {
      alert("Try again! The current highest score is" + score + ". Your score is" + time);
    }

  },

  fMouseUp:function(X,Y,evt){
    var T=this;
    evt=evt||window.event;
    var srcEle=getEle('Img'+X+'_'+Y),ObXY=T.fGetMine(X,Y),arr,i,TAr;
    switch(mouseButton){
      case 2:
        leftMouse=0;
        arr=T.fGetAround(X,Y);i=arr.length;
        while(i--)T.fButtonUp((TAr=arr[i])[0],TAr[1]);
        !ObXY.State&&T.fButtonUp(X,Y);
        ObXY.State==1&&ObXY.mineNum&&T.fOpenFlagMine(X,Y);
        break;
      case 1: 
        if(btn(evt)){
            leftMouse=0;
            if(ObXY.State){break;}
            ObXY.Mine?(
              T.fFail(),
              srcEle.className='Boom'
            ):(
              ObXY.State=1, 
              T.aClear.push([X,Y]),
              T.fClearMine()
            )
        }
    }
    mouseButton=0;
    if(T.openedNum==T.maxOpenNum&&T.FlagCount==T.mineNum){
      T.fSuccess();
      window.clearInterval(OMine.gameTime);
      alert('Congratulations! You won!');
      OMine.dealCookie(OMine.gameLevel, time);
      return;
    }

    T.maxOpenNum+T.mineNum-T.openedNum-T.FlagCount==getEle('txtFlagCount').value&&(
      T.fSuccess(),
      T.fAutoFlag(),
      window.clearInterval(OMine.gameTime),
      alert('Congratulations! You won!'),
      OMine.dealCookie(OMine.gameLevel, time)
    )
  },

  fAutoFlag:function(){
    var T=this,nX,nY=T.MaxY,MaxX=T.MaxX,Mine=T.Mine,TAr;
    while(nY--){
      nX=MaxX;
      TAr=Mine[nY];
      while(nX--)!TAr[nX].State&&(getEle('Img'+nX+'_'+nY).className='Flag');
    }
    getEle('txtFlagCount').value=0;
  },


  fClearMine:function(){
    var T=this;
    if(T.aClear.length==0){return}
    ++T.openedNum;
    var aXY=T.aClear.pop(),X=aXY[0],Y=aXY[1],TX,TY,
      aTmpClear=[], 
      srcEle=getEle('Img'+X+'_'+Y),
      ObXY,ObTXTY,
      countMine=0, 
    
      arr=T.fGetAround(X,Y),i=arr.length,TAr;
    while(i--){
    
      (ObTXTY=T.fGetMine(TX=(TAr=arr[i])[0],TY=TAr[1])).Mine==1&&++countMine;
      !ObTXTY.State&&aTmpClear.push([TX,TY]);
    }
    ObXY=T.fGetMine(X,Y);
    ObXY.mineNum=countMine;
    srcEle.className='M'+countMine;
    if(!countMine){
      Array.prototype.push.apply(T.aClear,aTmpClear);
      i=aTmpClear.length;
      while(i--)T.fGetMine((TAr=aTmpClear[i])[0],TAr[1]).State=1;
    }else{
      selectSys()==2?
        srcEle.textContent=countMine
        :srcEle.innerText=countMine
    }
    T.fClearMine();
  },


  fOpenFlagMine:function(X,Y){
    var T=this,FlagCount=0,TX,TY,ObXY,ObTXTY,aTmpClear=[],FlagErr=false,
      arr=T.fGetAround(X,Y),i=arr.length,TAr;
    while(i--){
      ObTXTY=T.fGetMine(TX=(TAr=arr[i])[0],TY=TAr[1]);
      switch(ObTXTY.State){
        case 0: 
          !ObTXTY.Mine&&aTmpClear.push([TX,TY]); 
          break;
        case 2: 
          ++FlagCount; 
          !ObTXTY.Mine&&(FlagErr=true); 
      }
    }
    if(FlagCount<T.fGetMine(X,Y).mineNum||aTmpClear.length==0)return;
    if(FlagErr){ 
      T.fFail();
      return;
    }
    Array.prototype.push.apply(T.aClear,aTmpClear);
    i=aTmpClear.length;
    while(i--)T.fGetMine((TAr=aTmpClear[i])[0],TAr[1]).State=1;
    T.fClearMine();
  },

  //show all mines
  fShowMine:function(){
    var T=this,X=0,Y=T.MaxY,MaxX=T.MaxX,Mine=T.Mine,TAr,TArX;
    while(Y--){
      X=MaxX;
      TAr=Mine[Y];
      while(X--){
        TArX=TAr[X];
        switch(TArX.Mine){
          case 0:
            TArX.State==2&&(getEle('Img'+X+'_'+Y).className='ErrFlag');
            break;
          case 1:
            getEle('Img'+X+'_'+Y).className='Mine';
        }
      }
    }
  },

  fSuccess:function(){
    this.success=true;
    getEle('btnRefreshMap').src='images/success.gif';
  },

  fFail:function(){
    this.gameOver=true;
    getEle('btnRefreshMap').src='images/sad.gif';
    this.fShowMine();
  }

},

//change map
ChangeMap=function(Map){
  var O=OMine;
  switch(Map){
    case 1:
      gameLevel="Easy";
      O.MaxX=O.MaxY=9;
      O.mineNum=10;
      break;
    case 2:
      gameLevel="Medium";
      O.MaxX=O.MaxY=16;
      O.mineNum=40;
      break;
    case 3:
      gameLevel="Hard";
      O.MaxX=30;
      O.MaxY=16;
      O.mineNum=99;
  }
  O.fInit();
},

selectSys=function(){
  if(navigator.userAgent.indexOf("MSIE")>0)return 1;
  if(isFirefox=navigator.userAgent.indexOf("Firefox")>0)return 2;
  if(isSafari=navigator.userAgent.indexOf("Safari")>0)return 3;  
  if(isCamino=navigator.userAgent.indexOf("Camino")>0)return 4;
  if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0)return 5;
  return 0;
};




