/**
 * Created by 123 on 2015/6/11.
 */
window.onload=function(){
    game.init()
};
var game={
    init:function(){
        sound.init();
        draw.init();
        game.count=0;
        extend.init();
        check.init();
        mouse.init()
    }
};
var draw={
    init:function(){
        game.ctx1=document.getElementById("board").getContext("2d");
        game.bg=new Image();
        game.bg.src="bg.jpg";
        game.bg.onload=function(){
            draw.drawbg()
        }
    },
    drawbg:function(){
        game.ctx1.drawImage(game.bg,0,0);
        draw.drawboard()
    },
    drawboard:function(){
        game.ctx1.strokeStyle="black";
        game.ctx1.lineWidth=3;
        game.ctx1.strokeRect(36,36,428,428);
        game.ctx1.strokeRect(40,40,420,420);
        game.ctx1.lineWidth=1;
        game.ctx1.beginPath();
        for(var i=0;i<13;i++){
            game.ctx1.moveTo(40+30*(i+1),40);
            game.ctx1.lineTo(40+30*(i+1),460);
            game.ctx1.stroke()
        }
        for(i=0;i<13;i++){
            game.ctx1.moveTo(40,40+30*(i+1));
            game.ctx1.lineTo(460,40+30*(i+1));
            game.ctx1.stroke()
        }
        game.ctx1.fillStyle="black";
        game.ctx1.beginPath();
        game.ctx1.arc(130,130,5,0,Math.PI*2,false);
        game.ctx1.closePath();
        game.ctx1.fill();
        game.ctx1.beginPath();
        game.ctx1.arc(370,130,5,0,Math.PI*2,false);
        game.ctx1.closePath();
        game.ctx1.fill();
        game.ctx1.beginPath();
        game.ctx1.arc(130,370,5,0,Math.PI*2,false);
        game.ctx1.closePath();
        game.ctx1.fill();
        game.ctx1.beginPath();
        game.ctx1.arc(370,370,5,0,Math.PI*2,false);
        game.ctx1.closePath();
        game.ctx1.fill();
        game.ctx1.beginPath();
        game.ctx1.arc(250,250,5,0,Math.PI*2,false);
        game.ctx1.closePath();
        game.ctx1.fill()
    },
    drawblack:function(x,y){
        game.ctx1.fillStyle="black";
        game.ctx1.beginPath();
        game.ctx1.arc(30*x+40,30*y+40,13,0,Math.PI*2,false);
        game.ctx1.closePath();
        game.ctx1.fill()
    },
    drawwhite:function(x,y){
        game.ctx1.fillStyle="white";
        game.ctx1.beginPath();
        game.ctx1.arc(30*x+40,30*y+40,13,0,Math.PI*2,false);
        game.ctx1.closePath();
        game.ctx1.fill()
    }
};
var sound={
    init:function(){
        game.fallsound=new Audio();
        game.fallsound.src="fall.mp3"
    }
};
var mouse={
    init:function(){
        mouse.pos=document.getElementById("board");
        mouse.click()
    },
    click:function(){
        mouse.pos.onclick=function(e){
            mouse.offx= e.layerX-40;
            mouse.offy= e.layerY-40;
            mouse.fall();
        }
    },
    fall:function(){
        for(var i=1;i<16;i++){
            if(mouse.offx>=-15+30*(i-1)&&mouse.offx<-15+30*i){
                var x=i-1;
                for(var j=1;j<16;j++){
                    if(mouse.offy>=-15+30*(j-1)&&mouse.offy<-15+30*j){
                        var y=j-1;
                        if(game.count%2===0){
                            check.fall(x,y);
                            if(check.canfall){
                                draw.drawblack(x,y);
                                game.fallsound.play();
                                check.win(x,y);
                                if(check.canwin){
                                    alert("黑方胜！");
                                    game.init();
                                    break
                                }
                                extend.xy(x,y);
                                extend.bxy(x,y);
                                game.count++
                            }
                            else{
                                check.canfall=true
                            }
                        }
                        else{
                            check.fall(x,y);
                            if(check.canfall){
                                game.fallsound.play();
                                draw.drawwhite(x,y);
                                check.win(x,y);
                                if(check.canwin){
                                    alert("白方胜！");
                                    game.init();
                                    break
                                }
                                extend.xy(x,y);
                                extend.wxy(x,y);
                                game.count++
                            }
                            else{
                                check.canfall=true
                            }
                        }
                    }
                }
            }
        }
    },
};
var check={
    init:function(){
        check.canfall=true;
        check.canwin=false;
    },
    fall:function(x,y){
        check.current=100*x+y;
        if(game.xy.indexOf(check.current)!==-1){
            check.canfall=false
        }
    },
    win: function (x,y) {
        check.current=100*x+y;
        check.x();
        check.y();
        check.zhengxie();
        check.fanxie();
    },
    x:function(){
        check.count=1;
        if(game.count%2==0){
            for(var i=1;i<5;i++){
                var a=game.bxy.indexOf(check.current+100*i);
                if(a!==-1){
                    check.count++
                }
                else{
                    break
                }
            }
            for(var j=1;j<5;j++){
                var b=game.bxy.indexOf(check.current-100*j);
                if(b!==-1){
                    check.count++
                }
                else{
                    break
                }
            }
        }
        else{
            for(var i=1;i<5;i++){
                var a=game.wxy.indexOf(check.current+100*i);
                if(a!==-1){
                    check.count++
                }
                else{
                    break
                }
            }
            for(var j=1;j<5;j++){
                var b=game.wxy.indexOf(check.current-100*j);
                if(b!==-1){
                    check.count++
                }
                else{
                    break
                }
            }
        }
        if(check.count>4){
            check.canwin=true;
        }
    },
    y:function(){
        check.count=1;
        if(game.count%2==0){
            for(var i=1;i<5;i++){
                var a=game.bxy.indexOf(check.current+i);
                if(a!==-1){
                    check.count++
                }
                else{
                    break
                }
            }
            for(var j=1;j<5;j++){
                var b=game.bxy.indexOf(check.current-j);
                if(b!==-1){
                    check.count++
                }
                else{
                    break
                }
            }
        }
        else{
            for(var i=1;i<5;i++){
                var a=game.wxy.indexOf(check.current+i);
                if(a!==-1){
                    check.count++
                }
                else{
                    break
                }
            }
            for(var j=1;j<5;j++){
                var b=game.wxy.indexOf(check.current-j);
                if(b!==-1){
                    check.count++
                }
                else{
                    break
                }
            }
        }
        if(check.count>4){
            check.canwin=true;
        }
    },
    zhengxie:function(){
        check.count=1;
        if(game.count%2==0){
            for(var i=1;i<5;i++){
                var a=game.bxy.indexOf(check.current+99*i);
                if(a!==-1){
                    check.count++
                }
                else{
                    break
                }
            }
            for(var j=1;j<5;j++){
                var b=game.bxy.indexOf(check.current-99*j);
                if(b!==-1){
                    check.count++
                }
                else{
                    break
                }
            }
        }
        else{
            for(var i=1;i<5;i++){
                var a=game.wxy.indexOf(check.current+99*i);
                if(a!==-1){
                    check.count++
                }
                else{
                    break
                }
            }
            for(var j=1;j<5;j++){
                var b=game.wxy.indexOf(check.current-99*j);
                if(b!==-1){
                    check.count++
                }
                else{
                    break
                }
            }
        }
        if(check.count>4){
            check.canwin=true;
        }
    },
    fanxie:function(){
        check.count=1
        if(game.count%2==0){
            for(var i=1;i<5;i++){
                var a=game.bxy.indexOf(check.current+101*i);
                if(a!==-1){
                    check.count++
                }
                else{
                    break
                }
            }
            for(var j=1;j<5;j++){
                var b=game.bxy.indexOf(check.current-101*j);
                if(b!==-1){
                    check.count++
                }
                else{
                    break
                }
            }
        }
        else{
            for(var i=1;i<5;i++){
                var a=game.wxy.indexOf(check.current+101*i);
                if(a!==-1){
                    check.count++
                }
                else{
                    break
                }
            }
            for(var j=1;j<5;j++){
                var b=game.wxy.indexOf(check.current-101*j);
                if(b!==-1){
                    check.count++
                }
                else{
                    break
                }
            }
        }
        if(check.count>4){
            check.canwin=true;
        }
    }
};
var extend={
    init:function(){
        game.xy=[];
        game.bxy=[];
        game.wxy=[];
    },
    xy:function(x,y){
        game.xy.push(100*x+y);
        if(game.xy.length==225){
            alert("和棋!");
            game.init()
        }
    },
    bxy:function(x,y){
        game.bxy.push(100*x+y)
    },
    wxy:function(x,y){
        game.wxy.push(100*x+y)
    },
};
