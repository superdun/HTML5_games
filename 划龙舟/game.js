/**
 * Created by li on 2015/6/20.
 */
    window.onload=function(){
      game.init()
    };
var game={
    init:function(){
        $("div").show();
        game.loadcout=0;
        game.totalcount=0;
        enemy1.i=0;
        enemy1.x=0;
        enemy2.x=0;
        enemy3.x=0;
        us.x=0;
        game.harder=1;
        us.i=0;
        enemy2.i=0;
        enemy3.i=0;
        draw.init();
        mouse.init();
        check.init();
        game.ctx=document.getElementById("game").getContext("2d");
        loader.loadimg();
        game.standard=100
    },
    start:function(){
        game.timer();

    },
    timer:function(){
        game.timer1=setInterval(game.draw,18);
        game.timer2=setInterval(enemy1.movecount,game.standard+Math.round(Math.random()*50));
        game.timer3=setInterval(enemy2.movecount,game.standard+Math.round(Math.random()*50));
        game.timer4=setInterval(enemy3.movecount,game.standard+Math.round(Math.random()*50));
    },
    draw:function(){
        draw.bg();
        draw.enemy();
        draw.us();
        draw.win()
    }
};
var draw={
    init:function(){
        game.slowx=0;
        game.fastx=0;
        game.stempx=0;
        game.ftempx=0;
        us.lastx=0
    },
    bg:function(){
        if(game.slowx+720<3356){
            game.ctx.drawImage(game.bg1,game.slowx,0,720,460,0,0,720,460);
            game.slowx+=(us.x-us.lastx)/3+0.1
        }
        else{
            game.ctx.drawImage(game.bg1,game.slowx,0,720,460,0,0,720,460);
            game.slowx+=(us.x-us.lastx)/3+0.1;
            game.ctx.drawImage(game.bg1,0,0,720,460,720-game.stempx,0,720,460);
            game.stempx+=(us.x-us.lastx)/3+0.1;
            if(game.stempx>720){
                game.slowx=720;
                game.stempx=0
            }
        }
        if(game.fastx+720<3356){
            game.ctx.drawImage(game.bg2,game.fastx,0,720,460,0,0,720,460);
            game.fastx+=(us.x-us.lastx)/1.5+0.5
        }
        else{
            game.ctx.drawImage(game.bg2,game.fastx,0,720,460,0,0,720,460);
            game.fastx+=(us.x-us.lastx)/1.5+0.5;
            game.ctx.drawImage(game.bg2,0,0,720,460,720-game.ftempx,0,720,460);
            game.ftempx+=(us.x-us.lastx)/1.5+0.5;
            if(game.ftempx>720){
                game.fastx=720;
                game.ftempx=0
            }
        }
        us.lastx=us.x
    },
    enemy:function(){
        game.ctx.drawImage(eval(enemy1.action[enemy1.i]),enemy1.x-us.x+200,enemy1.posy,180,60);
        game.ctx.drawImage(eval(enemy2.action[enemy2.i]),enemy2.x-us.x+200,enemy2.posy,180,60);
        game.ctx.drawImage(eval(enemy3.action[enemy3.i]),enemy3.x-us.x+200,enemy3.posy,180,60);
    },
    us:function(){
        game.ctx.drawImage(eval(us.action[us.i]),200,us.posy,180,60)
    },
    win:function(){
        check.win();
        game.ctx.fillStyle="red";
        game.ctx.fillRect(check.winx,180,10,460)
    }
};
var loader={
    loadimg:function(){
        game.bg1=new Image();
        game.totalcount++;
        game.bg1.src='img/bg1.png';
        game.bg1.onload=function(){
            loader.loadercount()
        };
        game.bg2=new Image();
        game.totalcount++;
        game.bg2.src='img/bg2.png';
        game.bg2.onload=function(){
            loader.loadercount()
        };
        game.b1=new Image();
        game.totalcount++;
        game.b1.src='img/b1.png';
        game.b1.onload=function(){
            loader.loadercount()
        };
        game.b2=new Image();
        game.totalcount++;
        game.b2.src='img/b2.png';
        game.b2.onload=function(){
            loader.loadercount()
        };
        game.b3=new Image();
        game.totalcount++;
        game.b3.src='img/b3.png';
        game.b3.onload=function(){
            loader.loadercount()
        };
        game.r1=new Image();
        game.totalcount++;
        game.r1.src='img/r1.png';
        game.r1.onload=function(){
            loader.loadercount()
        };
        game.r2=new Image();
        game.totalcount++;
        game.r2.src='img/r2.png';
        game.r2.onload=function(){
            loader.loadercount()
        };
        game.r3=new Image();
        game.totalcount++;
        game.r3.src='img/r3.png';
        game.r3.onload=function(){
            loader.loadercount()
        };
        game.y1=new Image();
        game.totalcount++;
        game.y1.src='img/y1.png';
        game.y1.onload=function(){
            loader.loadercount()
        };
        game.y2=new Image();
        game.totalcount++;
        game.y2.src='img/y2.png';
        game.y2.onload=function(){
            loader.loadercount()
        };
        game.y3=new Image();
        game.totalcount++;
        game.y3.src='img/y3.png';
        game.y3.onload=function(){
            loader.loadercount()
        };
        game.p1=new Image();
        game.totalcount++;
        game.p1.src='img/p1.png';
        game.p1.onload=function(){
            loader.loadercount()
        };
        game.p2=new Image();
        game.totalcount++;
        game.p2.src='img/p2.png';
        game.p2.onload=function(){
            loader.loadercount()
        };
        game.p3=new Image();
        game.totalcount++;
        game.p3.src='img/p3.png';
        game.p3.onload=function(){
            loader.loadercount()
        };
    },
    loadercount:function(){
        game.loadcout++;
        $("p").html("载入中："+game.loadcout+"/"+game.totalcount);
        if(game.loadcout===game.totalcount){
            game.start();
            $("div").hide()
        }
    }
};
var mouse={
    init:function(){
        mouse.pos=document.getElementById("game");
        mouse.click()
    },
    click:function(){
        mouse.pos.onclick=function(){
            us.movecount();
        }
    }
};
var enemy1={
    movecount:function(){
        if(enemy1.i===2){
            enemy1.i=0
        }
        else{
            enemy1.i++
        }
        enemy1.x+=game.harder
    },
    action:['game.b1','game.b2','game.b3'],
    posy:200
};
var enemy2={
    movecount:function(){
        if(enemy2.i===2){
            enemy2.i=0
        }
        else{
            enemy2.i++
        }
        enemy2.x+=game.harder
    },
    action:['game.y1','game.y2','game.y3'],
    posy:400
};
var enemy3={
    movecount:function(){
        if(enemy3.i===2){
            enemy3.i=0
        }
        else{
            enemy3.i++
        }
        enemy3.x+=game.harder
    },
    action:['game.p1','game.p2','game.p3'],
    posy:350
};
var us={
    movecount:function(){
        if(us.i===2){
            us.i=0
        }
        else{
           us.i++
        }
        us.x+=6;
        check.standard()
    },
    action:['game.r1','game.r2','game.r3'],
    posy:250
};
var check={
    init:function(){
        check.x=0;
        check.winx=2000
    },
    standard:function(){
        if(us.x>50&&us.x<150){
            game.harder=2
        }
        if(us.x>150&&us.x<300){
            game.harder=3
        }
        if(us.x>300&&us.x<400){
            game.harder=4
        }
    },
    win:function(){
        check.x+=(us.x-us.lastx)/1.5+0.5;
        check.winx=2000-check.x;
        if(check.winx===375){
            if(enemy1.x-us.x>0||enemy2.x-us.x>0||enemy2.x-us.x>0){
                alert('输啦！再接再厉！');
                game.init();
                clearInterval(game.timer1);
                clearInterval(game.timer2);
                clearInterval(game.timer3);
                clearInterval(game.timer4);
            }
            else{
                alert('赢啦，恭喜！');
                game.init();
                clearInterval(game.timer1);
                clearInterval(game.timer2);
                clearInterval(game.timer3);
                clearInterval(game.timer4);
            }
        }
    }
};