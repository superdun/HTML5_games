/**
 * Created by li on 2015/7/7.
 */

var game={
    init:function(){
		$('.overlayer').hide();
        clearInterval(game.timer);
        game.ctx=document.getElementById('canvas').getContext('2d');
        loader.init();
        eyes.init();
        face.init();
        body.init();
        ears.init();
        game.shake_dist=0;
        mosquito.init();
        mouse.init();
        hands.real_speed=5;
        hands.init();
        game.time_count=0;
        game.inter();
        lamp.init();
    },
    move:function(){
        game.time_count++;
        draw.draw_face();
        draw.draw_eyes();
        draw.draw_lamps();
        draw.draw_mosquito();
        power_and_score.init();
        draw.draw_power();
        draw.draw_score();
        hands.speed_up();
        hands.ready_move();
        draw.draw_hands();
        shake.start()
    },
    inter:function(){
        game.timer=setInterval(game.move,20)
    },
    over1:function(){
        clearInterval(game.timer);
        $('.overlayer').show();
		$('#p2').text('您的蚊子被打死了!');
		$('#p3').text('蚊子吸了'+mosquito.score+'滴血')
    },
	over2:function(){
        clearInterval(game.timer);
        $('.overlayer').show();
		$('#p2').text('您的蚊子活活累死了');
		$('#p3').text('蚊子吸了'+mosquito.score+'滴血')
	}
};
var loader={
    init:function(){
        loader.img();
    },
    img:function(){
        img.face=new Image();
        img.face.src='face.jpg';
        img.wzr=new Image();
        img.wzr.src='wzr.png';
        img.rhand=new Image();
        img.rhand.src='rhand.png';
        img.lhand=new Image();
        img.lhand.src='lhand.png';
        img.wzl=new Image();
        img.wzl.src='wzl.png';
        img.wzing=new Image();
        img.wzing.src='wzing.png';
    },
};
var img={};
var draw={
    draw_face:function(){
        game.ctx.drawImage(img.face,face.posx,face.posy,600,600);
    },
    draw_eyes:function(){
        if(mouse.offy>=313){
            eyes.lx=Math.sin(Math.atan((mouse.offx-230)/(mouse.offy-313)))*25+230;
            eyes.ly=Math.cos(Math.atan((mouse.offx-230)/(mouse.offy-313)))*10+313;
            eyes.rx=Math.sin(Math.atan((mouse.offx-415)/(mouse.offy-313)))*25+415;
            eyes.ry=Math.cos(Math.atan((mouse.offx-415)/(mouse.offy-313)))*10+313;
        }
        else{
            eyes.lx=-Math.sin(Math.atan((mouse.offx-230)/(mouse.offy-313)))*25+230;
            eyes.ly=-Math.cos(Math.atan((mouse.offx-230)/(mouse.offy-313)))*10+313;
            eyes.rx=-Math.sin(Math.atan((mouse.offx-415)/(mouse.offy-313)))*25+415;
            eyes.ry=-Math.cos(Math.atan((mouse.offx-415)/(mouse.offy-313)))*10+313;
        }
        game.ctx.fillStyle='black';
        game.ctx.beginPath();
        game.ctx.arc(eyes.lx,eyes.ly,12,0,2*Math.PI,false);
        game.ctx.arc(eyes.rx,eyes.ry,12,0,2*Math.PI,false);
        game.ctx.closePath();
        game.ctx.fill();
        game.ctx.fillStyle='white';
        game.ctx.beginPath();
        game.ctx.arc(eyes.lx,eyes.ly,2,0,2*Math.PI,false);
        game.ctx.arc(eyes.rx,eyes.ry,2,0,2*Math.PI,false);
        game.ctx.closePath();
        game.ctx.fill();
    },
    draw_mosquito:function(){
        if(mosquito.condition===0){
            if(mouse.offx>=319){
                game.ctx.drawImage(img.wzr,mouse.offx-mosquito.size/2,mouse.offy-mosquito.size/2,mosquito.size,mosquito.size)
            }
            else{
                game.ctx.drawImage(img.wzl,mouse.offx-mosquito.size/2,mouse.offy-mosquito.size/2,mosquito.size,mosquito.size)
            }
        }
        else{
            game.ctx.drawImage(img.wzing,mouse.offx-mosquito.size/2,mouse.offy-mosquito.size/2,mosquito.size,mosquito.size)
        }
    },
    draw_lamps:function(){
        for (var i=0;i<lamp.wherex.length;i++){
            game.ctx.fillStyle='red';
            game.ctx.beginPath();
            game.ctx.arc(lamp.wherex[i],lamp.wherey[i],lamp.size_array[i],0,Math.PI*2,false);
            game.ctx.fill()
        }
    },
    draw_power:function(){
        game.ctx.fillStyle='grey';
        game.ctx.fillRect(131,13,mosquito.power*2,13);
        game.ctx.closePath();
    },
    draw_score:function(){
        game.ctx.font="24px Courier New";
        game.ctx.fillStyle='red';
        game.ctx.fillText(mosquito.score,510,30)
    },
    draw_hands:function(){
        if(hands.r_or_l==='l'){
            game.ctx.drawImage(img.lhand,hands.x-hands.scope/2,hands.y-hands.scope/2,hands.scope,hands.scope);
        }
        else{
            game.ctx.drawImage(img.rhand,hands.x-hands.scope/2,hands.y-hands.scope/2,hands.scope,hands.scope);
        }
        //console.log(hands.x-hands.scope/2)
    }
};
var mouse={
    init:function(){
        mouse.pos=document.getElementById('canvas');
        mouse.move();
        mouse.click();
    },
    move:function() {
        mouse.pos.onmousemove = function (e) {
            e=e||window.event;
            if(mosquito.condition===0){
                mouse.offx = e.layerX;
                mouse.offy = e.layerY;//console.log(mouse.offx,mouse.offy)
            }
        };
    },
    click:function(){
        mouse.pos.onclick=function(){
            scope(mouse.offx,mouse.offy);
            if(mosquito.where!=='out'){
                if(mosquito.condition===0){
                    mosquito.condition=1;
                    lamp.add();
                }
                else {
                    mosquito.condition = 0
                }
            }
        }
    }
};
var eyes={
    init:function(){
        eyes.lx=230;
        eyes.rx=415;
        eyes.ly=313;
        eyes.ry=313;

    }
};
var scope=function(x,y){
    switch (true){
        case Math.pow(x-face.scope[0],2)+Math.pow(y-face.scope[1],2)<=Math.pow(face.scope[2],2):
            mosquito.where='face';
            break;
        case ((x>ears.scope1[0]&&x<ears.scope1[2]&&y>ears.scope1[1]&&y<ears.scope1[3])||(x>ears.scope2[0]&&x<ears.scope2[2]&&y>ears.scope2[1]&&y<ears.scope2[3])):
            mosquito.where='ears';
            break;
        case (x>body.scope[0]&&x<body.scope[2]&&y>body.scope[1]&&y<body.scope[3]):
            mosquito.where='body';
            break;
        default :mosquito.where='out';

    }
};
var face={
    init:function(){
        face.scope=[316,324,183];
        face.perscore=3;
        face.posx=0;
        face.posy=0
    }
};
var ears={
    init:function(){
        ears.scope1=[87,266,113,371];
        ears.scope2=[490,275,527,379];
        ears.perscore=10
    }
};
var body={
    init:function(){
        body.scope=[0,532,597,597];
        body.perscore=1
    }
};
var hands={
    init:function(){
        clearTimeout(game.timeout1);
        clearTimeout(game.timeout2);
        clearTimeout(game.timeout3);
        hands.x=-500;
        hands.y=-500;
        hands.scope=150;
        hands.rx=650;
        hands.ry=100;
        hands.lx=-50;
        hands.ly=100;
        hands.timer=6000;
        hands.speed=0;
        game.timeout1=setTimeout(hands.ready,hands.timer-Math.round(Math.random()*1000))
    },
    ready:function(){
        mosquito.lastx=mouse.offx;
        mosquito.lasty=mouse.offy;
        if( mosquito.lastx>=319){
            hands.x=hands.rx;
            hands.y=hands.ry;
        }
        else{
            hands.x=hands.lx;
            hands.y=hands.ly;
        }
        hands.speed=hands.real_speed;
    },
    ready_move:function(){
        if( mosquito.lastx>=319){
            hands.r_or_l='r';
           if(hands.x>=550){
                hands.x-=hands.speed
            }
           else{
               var x1=550;
               var y1=100;
               var x2=mosquito.lastx;
               var y2=mosquito.lasty;

               hands.do_it(x1,x2,y1,y2)
           }
        }
        else{
            hands.r_or_l='l';
            if(hands.x<=50){
                hands.x+=hands.speed
            }
            else{
                var x1=50;
                var y1=100;
                var x2=mosquito.lastx;
                var y2=mosquito.lasty;

                hands.do_it(x1,x2,y1,y2)
            }
        }
    },
    do_it:function(x1,x2,y1,y2){
        if(mosquito.lasty>100){
            if(hands.y<=mosquito.lasty){
                hands.y+=hands.speed;
                hands.x=(x1-x2)*(y2-hands.y)/(y2-y1)+x2
            }
            else{
                game.shake_dist=5;
                game.timeout2=setTimeout(shake.over,200)
            }
        }
        else{
            if(hands.y>=mosquito.lasty){
                hands.y-=hands.speed;
                hands.x=(x1-x2)*(y2-hands.y)/(y2-y1)+x2
            }
            else{
                game.shake_dist=5;
                game.timeout2=setTimeout(shake.over,200)
            }
        }
        if(Math.abs(mouse.offx-hands.x)<=(hands.scope-50)/2&&Math.abs(mouse.offy-hands.y)<=(hands.scope-50)/2){
            game.over1();
        }
    },
    speed_up:function(){
        hands.real_speed=5+game.time_count/1000
    }
};
var mosquito={
    init:function(){
        mosquito.condition=0;
        mosquito.where='out';//0:fly,1:ding
        mosquito.power=100;
        mosquito.size=50;
        mosquito.score=0;
    }
};
var lamp={
    init:function(){
        lamp.wherex=[];
        lamp.wherey=[];
        lamp.size_array=[];
        lamp.size=3;
    },
    add:function(){
        lamp.wherex.push(mouse.offx);
        lamp.wherey.push(mouse.offy);
        lamp.size_array.push(lamp.size)
    }
};
var power_and_score={
    init:function(){
        if(mosquito.condition===0){
            power_and_score.power_down()
        }
        else{
            power_and_score.power_up();
            power_and_score.score_up();
        }
        power_and_score.check_lose();
        power_and_score.check_size()
    },
    power_up:function(){
        if(mosquito.power<100){
            mosquito.power+=0.15
        }
    },
    power_down:function(){
       if(mosquito.power>=0){
            mosquito.power-=0.1
        }
    },
    score_up:function(){
        mosquito.score+=eval(mosquito.where+'.perscore');
    },
    check_lose:function(){
        if(mosquito.power<=0){
            game.over2()
        }
    },
    check_size:function(){
        mosquito.size=50+mosquito.score/500;
        lamp.size=Math.round(mosquito.size/17)
    }
};
var shake={
    start:function(){
        switch (game.time_count%5){
            case 0:
                face.posx=-1*game.shake_dist;
                face.posy=-1*game.shake_dist;
                break;
            case 1:
                face.posx=0;
                face.posy=0;
                break;
            case 2:
                face.posx=-game.shake_dist;
                face.posy=game.shake_dist;
                break;
            case 4:
                face.posx=0;
                face.posy=0;
                break;
        }
    },
    over:function(){
        game.shake_dist=0;
        hands.init()
    }
}
$(document).ready(game.init);
