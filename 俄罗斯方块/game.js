/**
 * Created by Dun on 2015/6/3.
 */
window.onload=function(){
    game.init()
};
var game={
    init:function(){
        clearInterval(game.timer1);
        clearInterval(game.timer2);
        game.style=0;
        game.ctx1=document.getElementById("erosgame").getContext("2d");
        game.ctx2=document.getElementById("erosmenu").getContext("2d");
        game.bg=new Image;
        game.bg.src="bg.png";
        game.currentx=150;
        game.currenty=-50;
        stack.init();
        gradient.init();
        randomocr.init();
        randomocr.drawitem();
        wall.init();
        game.controlit();
        speedup.init();
        game.timer();
        randomocr.init();
        bestscore.init()
        score.init();
        score.next();
    },
    controlit:function(){
        document.getElementById("body").onkeydown=function(e){
            switch (e.keyCode){
                case 37:
                    wall.left();
                    if(wall.l==true){
                        game.currentx-=25;
                    }
                    else{
                        wall.l=true
                    }
                    break;//left
                case 38:
                    wall.change1();
                    wall.change2();
                    wall.change3();
                    if(wall.a==true){
                        if(game.style==3){
                            game.style=0;
                            game.currentx=wall.x;
                        }
                        else{
                            game.style++;
                            game.currentx=wall.x;
                        }
                    }
                    else{
                        wall.a=true
                    }
                    break;//UP
                case 39:
                    wall.right();
                    if(wall.r==true){
                        game.currentx+=25;
                    }
                    else{
                        wall.r=true
                    }
                    break;//R
                case 40:
                    wall.down();
                    if(wall.b==true){
                        game.currenty+=25
                    }
                    else{
                        wall.b=true
                    }
                    break;//DOWN
            }

        }
    },
    timer:function(){
        game.timer1=setInterval(game.moveit,18);
        game.timer2=setInterval(game.fall,game.speed)
    },
    fall:function(){
        wall.down();
        if(wall.b==true){
            game.currenty+=25;
        }
        else{
            wall.b=true;
            stack.extend();
            check.init();
            gameover.init();
            game.style=0;
            game.currentx=150;
            game.currenty=-100;
            randomocr.drawitem();
            randomocr.init();
            speedup.up();
            score.next()
        }
    },
    drawbg:function(){
        game.ctx1.drawImage(game.bg,0,0)
    },
    moveit:function(){
        game.drawbg();
        game.drawsquad();
        game.drawstack()
    },
    drawsquad:function() {
        for (var i = 0; i < 4; i++) {
            var x = game.jihe[game.style].xdot[i] + game.currentx;
            var y = game.jihe[game.style].ydot[i] + game.currenty;
            squad.init(x, y, "red", "black")
        }
    },
    drawstack:function(){
        for(var i=0;i<stack.totalx.length;i++){
            game.ctx1.fillStyle=game.grad;
            game.ctx1.fillRect(stack.totalx[i],stack.totaly[i],25,25)
            game.ctx1.strokeStyle="black";
            game.ctx1.strokeRect(stack.totalx[i],stack.totaly[i],25,25)
        }
    }
};
var squad={
    init:function(x,y,fillcolor,strokecolor){
        game.ctx1.fillStyle=fillcolor;
        game.ctx1.fillRect(x,y,25,25);
        game.ctx1.strokeStyle=strokecolor;
        game.ctx1.strokeRect(x,y,25,25);
    }
};
var tian={
    init:function(){
        game.jihe=[tian.style1,tian.style2,tian.style3,tian.style4];
        tian.total=[];
    },
    style1: {
        xdot:[0,25,0,25],
        ydot:[0,0,25,25]
    },
    style2:{
        xdot:[0,25,0,25],
        ydot:[0,0,25,25]
    },
    style3:{
        xdot:[0,25,0,25],
        ydot:[0,0,25,25]
    },
    style4:{
        xdot:[0,25,0,25],
        ydot:[0,0,25,25]
    },

    drawit:function(){
        tian.init();
        for(var i=0;i<4;i++){
            var x=game.jihe[game.style].xdot[i]+game.currentx;
            var y=game.jihe[game.style].ydot[i]+game.currenty;
            squad.init(x,y,"red","black")
        }
    }
};
var I={
    init:function(){
        game.jihe=[I.style1,I.style2,I.style3,I.style4];
        I.total=[];
    },
    style1: {
        xdot:[0,0,0,0],
        ydot:[0,25,50,75]
    },
    style2:{
        xdot:[0,25,50,75],
        ydot:[0,0,0,0]
    },
    style3:{
        xdot:[0,0,0,0],
        ydot:[0,25,50,75]
    },
    style4:{
        xdot:[0,25,50,75],
        ydot:[0,0,0,0]
    },

    drawit:function(){
        I.init();
        for(var i=0;i<4;i++){
            var x=game.jihe[game.style].xdot[i]+game.currentx;
            var y=game.jihe[game.style].ydot[i]+game.currenty;
            squad.init(x,y,"green","black")
        }
    }

};
var Z1={
    init:function(){
        game.jihe=[Z1.style1,Z1.style2,Z1.style3,Z1.style4];
        Z1.total=[];
    },
    style1: {
        xdot:[0,25,25,50],
        ydot:[0,0,25,25]
    },
    style2:{
        xdot:[25,0,25,0],
        ydot:[0,25,25,50]
    },
    style3:{
        xdot:[0,25,25,50],
        ydot:[0,0,25,25]
    },
    style4:{
        xdot:[25,0,25,0],
        ydot:[0,25,25,50]
    },

    drawit:function(){
        for(var i=0;i<4;i++){
            var x=game.jihe[game.style].xdot[i]+game.currentx;
            var y=game.jihe[game.style].ydot[i]+game.currenty;
            squad.init(x,y,"white","black")
        }
    }

};
var Z2={
    init:function(){
        game.jihe=[Z2.style1,Z2.style2,Z2.style3,Z2.style4];
        Z2.total=[];
        Z2.x=25
    },
    style1: {
        xdot:[25,50,0,25],
        ydot:[0,0,25,25]
    },
    style2:{
        xdot:[0,0,25,25],
        ydot:[0,25,25,50]
    },
    style3:{
        xdot:[25,50,0,25],
        ydot:[0,0,25,25]
    },
    style4:{
        xdot:[0,0,25,25],
        ydot:[0,25,25,50]
    },

    drawit:function(){
        Z2.init();
        for(var i=0;i<4;i++){
            var x=game.jihe[game.style].xdot[i]+game.currentx;
            var y=game.jihe[game.style].ydot[i]+game.currenty;
            squad.init(x,y,"yellow","black")
        }
    }

};
var T={
    init:function(){
        game.jihe=[T.style1,T.style2,T.style3,T.style4];
        T.total=[];
        T.x=25
    },
    style1: {
        xdot:[0,25,50,25],
        ydot:[0,0,0,25]
    },
    style2:{
        xdot:[25,0,25,25],
        ydot:[0,25,25,50]
    },
    style3:{
        xdot:[25,0,25,50],
        ydot:[0,25,25,25]
    },
    style4:{
        xdot:[0,0,25,0],
        ydot:[0,25,25,50]
    },

    drawit:function(){
        T.init();
        for(var i=0;i<4;i++){
            var x=game.jihe[game.style].xdot[i]+game.currentx;
            var y=game.jihe[game.style].ydot[i]+game.currenty;
            squad.init(x,y,"red","black")
        }
    },

};
var L1={
    init:function(){
        game.jihe=[L1.style1,L1.style2,L1.style3,L1.style4];
        L1.total=[];
    },
    style1: {
        xdot:[0,25,0,0],
        ydot:[0,0,25,50]

    },
    style2:{
        xdot:[0,25,50,50],
        ydot:[0,0,0,25]
    },
    style3:{
        xdot:[25,25,0,25],
        ydot:[0,25,50,50]
    },
    style4:{
        xdot:[0,0,25,50],
        ydot:[0,25,25,25]
    },

    drawit:function(){
        L1.init();
        for(var i=0;i<4;i++){
            var x=game.jihe[game.style].xdot[i]+game.currentx;
            var y=game.jihe[game.style].ydot[i]+game.currenty;
            squad.init(x,y,"red","black")
        }
    }

};
var L2={
    init:function(){
        game.jihe=[L2.style1,L2.style2,L2.style3,L2.style4];
        L2.total=[];
        L2.x=25
    },
    style1: {
        xdot:[0,25,25,25],
        ydot:[0,0,25,50]
    },
    style2:{
        xdot:[50,0,25,50],
        ydot:[0,25,25,25]
    },
    style3:{
        xdot:[0,0,0,25],
        ydot:[0,25,50,50]
    },
    style4:{
        xdot:[0,25,50,0],
        ydot:[0,0,0,25]
    },

    drawit:function(){
        L2.init();
        for(var i=0;i<4;i++){
            var x=game.jihe[game.style].xdot[i]+game.currentx;
            var y=game.jihe[game.style].ydot[i]+game.currenty;
            squad.init(x,y,"red","black")
        }
    }

};
var randomocr={
    init:function(){
        randomocr.a=Math.round(Math.random()*6);
    },
    drawitem:function(){
        switch (randomocr.a){
            case 1:tian.init();
                break;
            case 2:Z1.init();
                break;
            case 3:Z2.init();
                break;
            case 0:I.init();
                break;
            case 5:T.init();
                break;
            case 6:L1.init();
                break;
            case 4:L2.init();
                break;
        }
    }
};
var stack={
    init:function(){
        stack.totalx=[0,25,50,75,100,125,150,175,200,225,250,275];
        stack.totaly=[500,500,500,500,500,500,500,500,500,500,500,500]
    },
    extend:function(){
        for(var i=0;i<4;i++){
            stack.currentx=game.jihe[game.style].xdot[i]+game.currentx;
            stack.currenty=game.jihe[game.style].ydot[i]+game.currenty;
            stack.totalx.push(stack.currentx);
            stack.totaly.push(stack.currenty);
        }
    }
};
var wall={
    init:function(){
        wall.a=true;
        wall.b=true;
        wall.l=true;
        wall.r=true;
        wall.nextstyle=0;
        wall.x=game.currentx
    },
    left:function(){
        for(var i=0;i<stack.totalx.length;i++){
            for(var j=0;j<4;j++){
                if(stack.totaly[i]===game.jihe[game.style].ydot[j]+game.currenty&&stack.totalx[i]===game.jihe[game.style].xdot[j]+game.currentx-25){
                    wall.l=false
                }
                if(game.jihe[game.style].xdot[j]+game.currentx===0){
                    wall.l=false
                }
            }
        }
    },
    right:function(){
        for(var i=0;i<stack.totalx.length;i++){
            for(var j=0;j<4;j++){
                if(stack.totaly[i]===game.jihe[game.style].ydot[j]+game.currenty&&stack.totalx[i]===game.jihe[game.style].xdot[j]+game.currentx+25){
                    wall.r=false
                }
                if(game.jihe[game.style].xdot[j]+game.currentx===275){
                    wall.r=false
                }
            }
        }

    },
    down:function(){
        for(var i=0;i<stack.totalx.length;i++){
            for(var j=0;j<4;j++){
                if(stack.totalx[i]===game.jihe[game.style].xdot[j]+game.currentx&&stack.totaly[i]===game.jihe[game.style].ydot[j]+game.currenty+25){
                    wall.b=false;
                }
            }
        }
    },
    change1:function(){
        if(game.style==3){
            wall.nextstyle=0
        }
        else{
            wall.nextstyle=game.style+1
        }
        for(var i=0;i<stack.totalx.length;i++){
            for(var j=0;j<4;j++){
                if(stack.totalx[i]===game.jihe[wall.nextstyle].xdot[j]+wall.x&&stack.totaly[i]===game.jihe[wall.nextstyle].ydot[j]+game.currenty+25){
                    wall.a=false;
                }
            }
        }
    },
    change2:function(){
        wall.x=game.currentx;
        for(var j= 0;j<4;j++){
            while(game.jihe[wall.nextstyle].xdot[j]+wall.x>275){
                wall.x-=25
            }
        }
        wall.change1();
    },
    change3:function(){
        wall.a=true;
        for(var i=0;i<stack.totalx.length;i++){
            for(var j=0;j<4;j++){
                if(stack.totalx[i]===game.jihe[wall.nextstyle].xdot[j]+wall.x&&stack.totaly[i]===game.jihe[wall.nextstyle].ydot[j]+game.currenty+25){
                    while(stack.totalx[i]===game.jihe[wall.nextstyle].xdot[j]+wall.x){
                        wall.x-=25;
                    }
                }
            }
        }
        wall.change1()
    }
};
var check={
    init:function(){
        check.num=0;
        check.startpoint=[];
        check.inde=[];
        for(var i=0;i<20;i++){
            var a=0;
            for(var j=0;j<stack.totalx.length;j++){
                if(stack.totaly[j]==i*25){
                    a++
                }
            }
            if(a==12){
                check.startpoint.push(25*i);
                check.num++
            }
        }
        setTimeout(check.cleanx,100)
    },
    cleanx:function(){
        if(check.num!=0){
            for(var i=0;i<check.startpoint.length;i++){
                for(var j=0;j<stack.totalx.length;j++){
                    if(stack.totaly[j]==check.startpoint[i]){
                        stack.totalx.splice(j,1,1000);
                        stack.totaly.splice(j,1,1000)
                    }
                    if(stack.totaly[j]<check.startpoint[i]){
                        stack.totaly[j]+=25
                    }
                }
            }
        }
    }
};
var gameover={
    init:function(){
        for(var i=0;i<stack.totalx.length;i++){
            if(stack.totaly[i]<=25){
                alert("GAME OVER");
                bestscore.check();
                game.init()
            }
        }
    }
};
var score={
    init:function(){
        game.score=0;
        score.drawbg()
    },
    drawbg:function(){
        game.ctx2.fillStyle="black";
        game.ctx2.fillRect(0,0,120,500);
        game.ctx2.font="bold 30px 宋体";
        game.ctx2.fillStyle="white";
        game.ctx2.fillText("NEXT:",5,40);
        game.ctx2.fillText("SCORE:",5,200);
        game.ctx2.fillText("BEST:",5,300)
    },
    plus:function(){
        var a=1;
        if(check.num!=0)
        for(var i=0;i<check.num;i++){
            a=a*(i+1);
            game.score+=a
        }
    },
    next:function(){
        switch (randomocr.a) {
            case 1:
                score.jihe = tian.style1;
                break;
            case 2:
                score.jihe = Z1.style1;
                break;
            case 3:
                score.jihe = Z2.style1;
                break;
            case 0:
                score.jihe = I.style1;
                break;
            case 5:
                score.jihe = T.style1;
                break;
            case 6:
                score.jihe = L1.style1;
                break;
            case 4:
                score.jihe = L2.style1;
                break;
        }
        score.plus();
        score.drawnext()
    },
    drawnext:function(){
        game.ctx2.clearRect(0,0,120,500);
        score.drawbg();
        game.ctx2.fillStyle="red";
        game.ctx2.strokeStyle="black";
        for(var i=0;i<4;i++){
            game.ctx2.fillRect(5+score.jihe.xdot[i],70+score.jihe.ydot[i],25,25);
            game.ctx2.strokeRect(5+score.jihe.xdot[i],70+score.jihe.ydot[i],25,25)
        }
        score.write()
    },
    write:function(){
        game.ctx2.font="30px 黑体";
        game.ctx2.fillStyle="white";
        game.ctx2.fillText(game.score,10,260);
        game.ctx2.fillText(bestscore.name,10,360);
        game.ctx2.fillText(bestscore.score,10,400)

    }
};
var speedup={
    init:function(){
        game.speed=800
    },
    up:function(){
        if(game.score>10&&game.score<20){
            game.speed=700
        }
        if(game.score>20&&game.score<30){
            game.speed=500
        }
        if(game.score>30&&game.score<40){
            game.speed=300
        }
        if(game.score>40&&game.score<50){
            game.speed=200
        }
        if(game.score>50&&game.score<60){
            game.speed=100
        }
        if(game.score>60&&game.score<70){
            game.speed=70
        }
        if(game.score>70&&game.score<80){
            game.speed=40
        }
        if(game.score>80&&game.score<90){
            game.speed=5
        }
    }
};
var gradient={
        init:function(){
            game.grad=game.ctx1.createLinearGradient(0,0,300,500);
            game.grad.addColorStop(1/6,'#ff0000');
            game.grad.addColorStop(2/6,'#ff9900');
            game.grad.addColorStop(3/6,'#ffff00');
            game.grad.addColorStop(4/6,'#00ff00');
            game.grad.addColorStop(5/6,'#00ffff');
            game.grad.addColorStop(1,'#ff0000')
        }
};
var bestscore={
    init:function(){
        bestscore.name="";
        if(window.localStorage.best){
            bestscore.load()
        }
        else{
            bestscore.name="";
            bestscore.score=0;
        }
    },
    check:function(){
        if(game.score>bestscore.score){
            window.localStorage.best=game.score;
            bestscore.name=prompt("新纪录"+"\n"+"请输入您的大名！")
            window.localStorage.name=bestscore.name
        }
    },
    load:function(){
        bestscore.name=window.localStorage.name;
        bestscore.score=window.localStorage.best
    }
};