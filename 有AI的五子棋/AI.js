/**
 * Created by 123 on 2015/6/11.
 */
var AI={
    init:function(){
        if(game.canclick!==true){
            cpu.ifnext=0;
            man.ifnext=0;
            score.init();
            cpu.score=0;
            arrays.blank();
            arrays.init();
            situation.init()
        }
    },
    fall:function(){
        AI.x=Math.floor(AI.next/100);
        AI.y=Math.floor(AI.next%100);
        mouse.cpufall()
    },
    transtonum:function(x,y){
        return 100*x+y
    }
};
var arrays={
    init:function(){
        cpu.next=[];
        man.next=[];
        cpu.nextduan=[];
        man.nextduan=[];
    },
    blank:function(){
        AI.blank=[];
        AI.blank2=[];
        AI.blank3=[];
        for(var i=1;i<16;i++){
            for(var j=1;j<16;j++){
                if(game.xy.indexOf(100*i+j)===-1){
                    AI.blank.push(100*i+j)
                }
            }
        }
    },
    cpu:function(){
        if(game.mode===0){
            cpu.xy=game.wxy.slice(0,game.wxy.length+1);
            man.xy=game.bxy.slice(0,game.bxy.length+1)
        }
        else{
            cpu.xy=game.bxy.slice(0,game.bxy.length+1);
            man.xy=game.wxy.slice(0,game.wxy.length+1)
        }
    }
};

var situation= {
    init: function () {

        for (var k=0;k<AI.blank.length;k++) {
            man.score=0;
            cpu.ifscore=0;
            cpu.xytemp=cpu.xy.slice(0,cpu.xy.length+1);
            game.xytemp=game.xy.slice(0,game.xy.length+1);
            AI.blank2=AI.blank.slice(0,AI.blank.length+1);
            cpu.next=[];
            cpu.nextduan=[];
            cpu.ifnext = AI.blank[k];

            situation.cpucountx = situation.check(cpu, 100);
            situation.cpucounty = situation.check(cpu,1);
            situation.cpucountzx = situation.check(cpu, 99);
            situation.cpucountfx = situation.check(cpu, 101);

            cpu.xytemp.push(cpu.ifnext);
            game.xytemp.push(cpu.ifnext);
            var c=AI.blank.slice(0,AI.blank.length+1);
            c.splice(k,1);
            AI.blank2= c.slice(0, c.length+1);
            for(var l=0;l<AI.blank2.length;l++){
                man.next=[];
                man.nextduan=[];
                man.xytemp=man.xy.slice(0,man.xy.length+1);
                man.ifnext=AI.blank2[l];

                situation.mancountx = situation.check(man, 100);
                situation.mancounty = situation.check(man, 1);
                situation.mancountzx = situation.check(man, 99);
                situation.mancountfx = situation.check(man, 101);
                score.start(man);
                score.compare(man)//对手最大分数
            }
            score.start(cpu);//自己各个位置的分数减去相应位置对手能得到的最大分数//console.log(cpu.ifscore,man.score,cpu.ifscore-man.score)
            score.compare2();
        }//console.log(score.temp)
        //console.log(cpu.score,man.score);
        score.compare3();
        AI.fall()
    },
    check: function (x,z) {//判断形势横竖斜几子相连，两面有几个堵头
        var a = 1;
        var c=0;
        var d=2;
        for (var i = 1; i < 5; i++) {
            var b = x.xytemp.indexOf(x.ifnext + z * i);
            if (b !== -1) {
                a++;
                d=1
            }
            else {
                if(game.xytemp.indexOf(x.ifnext + z * i)!==-1||(x.ifnext + z * i)/100>15||(x.ifnext + z * i)%100>15){
                    c++
                }
                break
            }
        }
        for (var i = 1; i < 5; i++) {
            var b = x.xytemp.indexOf(x.ifnext - z * i);
            if (b !== -1) {
                a++;
                d=0
            }
            else {
                if(game.xytemp.indexOf(x.ifnext - z * i)!==-1||(x.ifnext - z * i)/100>15||(x.ifnext - z * i)%100>15){
                    c++
                }
                break
            }
        }
        switch (true){//判断断开的情况
            case (a===2&&c===0):
                if(d===1){
                    if(x.xytemp.indexOf(x.ifnext+z*3)!==-1){
                        a=3;
                        if(game.xytemp.indexOf(x.ifnext+z*4)===-1){
                            c=0
                        }
                        else{
                            c=1
                        }
                    }
                    if(x.xytemp.indexOf(x.ifnext-z*2)!==-1){
                        a=3;
                        if(game.xytemp.indexOf(x.ifnext-z*3)===-1){
                            c=0
                        }
                        else{
                            c=1
                        }
                    }
                }
                else{
                    if(x.xytemp.indexOf(x.ifnext-z*3)!==-1){
                        a=3;
                        if(game.xytemp.indexOf(x.ifnext-z*4)===-1){
                            c=0
                        }
                        else{
                            c=1
                        }
                    }
                    if(x.xytemp.indexOf(x.ifnext+z*2)!==-1){
                        a=3;
                        if(game.xytemp.indexOf(x.ifnext+z*3)===-1){
                            c=0
                        }
                        else{
                            c=1
                        }
                    }
                }
                break;
            case (a===1&&c===0):
                if(x.xytemp.indexOf(x.ifnext+z*3)!==-1&&x.xytemp.indexOf(x.ifnext+z*2)!==-1){
                    a=3;
                    if(game.xytemp.indexOf(x.ifnext+z*4)===-1){
                        c=0
                    }
                    else{
                        c=1
                    }
                }
                if(x.xytemp.indexOf(x.ifnext-z*3)!==-1&&x.xytemp.indexOf(x.ifnext-z*2)!==-1){
                    a=3;
                    if(game.xytemp.indexOf(x.ifnext-z*4)===-1){
                        c=0
                    }
                    else{
                        c=1
                    }
                }
                break;
            case (a===2&&c===1):
                if(d===1){
                    if(x.xytemp.indexOf(x.ifnext+z*3)!==-1&&game.xytemp.indexOf(x.ifnext+z*2)===-1){
                        a=3;
                        if(game.xytemp.indexOf(x.ifnext+z*4)===-1){
                            c=1
                        }
                        else{
                            c=2
                        }
                    }
                    if(x.xytemp.indexOf(x.ifnext-z*2)!==-1&&game.xytemp.indexOf(x.ifnext-z)===-1){
                        a=3;
                        if(game.xytemp.indexOf(x.ifnext-z*3)===-1){
                            c=1
                        }
                        else{
                            c=2
                        }
                    }
                }
                else{
                    if(x.xytemp.indexOf(x.ifnext-z*3)!==-1&&game.xytemp.indexOf(x.ifnext-z*2)===-1){
                        a=3;
                        if(game.xytemp.indexOf(x.ifnext-z*4)===-1){
                            c=0
                        }
                        else{
                            c=1
                        }
                    }
                    if(x.xytemp.indexOf(x.ifnext+z*2)!==-1&&game.xytemp.indexOf(x.ifnext+z)===-1){
                        a=3;
                        if(game.xytemp.indexOf(x.ifnext+z*3)===-1){
                            c=0
                        }
                        else{
                            c=1
                        }
                    }

                }
                break;
            case (a===1&&c===1):
                if(x.xytemp.indexOf(x.ifnext+z*3)!==-1&&x.xytemp.indexOf(x.ifnext+z*2)!==-1&&game.xytemp.indexOf(x.ifnext+z)===-1){
                    a=3;
                    if(game.xytemp.indexOf(x.ifnext+z*4)===-1){
                        c=1
                    }
                    else{
                        c=2
                    }
                }
                if(x.xytemp.indexOf(x.ifnext-z*3)!==-1&&x.xytemp.indexOf(x.ifnext-z*2)!==-1&&game.xytemp.indexOf(x.ifnext-z)===-1){
                    a=3;
                    if(game.xytemp.indexOf(x.ifnext-z*4)===-1){
                        c=1
                    }
                    else{
                        c=2
                    }
                }
                break;
        }


        x.next.push(a);
        x.nextduan.push(c);
        return a
    },
    check2:function(x,y,z){//x:mancpu Y：n子相连，z:几个有n相连,如是，则返回10+，再根据堵头数加减
        var a=0;
        var b=0;
        var count=[];
        var pos=x.next.indexOf(y);
        while(pos>-1){
            if(x.nextduan[pos]===0){
                b++
            }
            if(x.nextduan[pos]===2){
                b-=5
            }
            count.push(pos);
            pos= x.next.indexOf(y,pos+1)
        }
        if(count.length===z){
            a=10
        }
        return a+b
    },
    check3:function(x,y,z){
    }
};
var score={
    init:function(){
        AI.nextscore=0;
        AI.ifscore=0;
        score.temp=-100000000000;
    },
    compare:function(x){
        if(x.ifscore> x.score){

            x.score=x.ifscore;
            x.ifscore=0
        }
        else{
            x.ifscore=0
        }
    },
    compare2:function(){
        var a=cpu.ifscore-man.score;
        if(a>score.temp){
            AI.next=cpu.ifnext;
            score.temp=a;
            cpu.score=cpu.ifscore
        }
        else{
            if(a===score.temp){
                if(Math.random()>0.5){
                    AI.next=cpu.ifnext;
                    score.temp=a;
                    cpu.score=cpu.ifscore
                }
            }
        }
    },
    compare3:function() {
        var z=1;
        if (AI.next >=1501&&cpu.ifscore===1) {//开局防止下15
            if (game.bxy.length > 0) {
                q = Math.round(Math.random() * 8);
                switch (true) {
                    case (q >= 0 && q < 2):
                        do{
                            AI.next = game.bxy[game.bxy.length-1] + z;
                            z++
                        }
						while (game.xy.indexOf(game.bxy[game.bxy.length-1] + z) > -1);
                        break;
                    case (q >= 2 && q < 4):
                        do{
                            AI.next = game.bxy[game.bxy.length-1] - z * 100;
                            z++
                        }
                        while(game.xy.indexOf(game.bxy[game.bxy.length-1] - z * 100) > -1);
                        break;
                    case (q >= 4 && q < 6):
                        do{
                            AI.next = game.bxy[game.bxy.length-1] + z * 99;
                            z++
                        }
                        while(game.xy.indexOf(game.bxy[game.bxy.length-1] + z * 99) > -1);
                        break;
                    case (q >= 6 && q < 8):
                        do{
                            AI.next = game.bxy[game.bxy.length-1] - z * 101;
                            z++
                        }while(game.xy.indexOf(game.bxy[game.bxy.length-1] - z * 101) > -1)
                        break;
                }
            }
            else{
                AI.next=808
            }
        }
    },
    start:function(x){
        score.一百();
        score.one(x)
    },
    一百:function(){
        var a=0;
        var b=0;
        for(var i=0;i<cpu.next.length;i++){
            if(cpu.next[i]>a){
                a=cpu.next[i]
            }
        }
        for(var j=0;j<man.next.length;j++){
            if(man.next[j]>b){
                b=man.next[j]
            }
        }
        if(a>=5){
            cpu.ifscore+=1000001
        }
        if(b>=5){
            man.ifscore+=1000000
        }
    },
    one:function(x){
        if(situation.check2(x,3,2)===12){
            x.ifscore+=2001
        }

        if(situation.check2(x,4,1)>=10&&situation.check2(x,3,1)===11){
            x.ifscore+=20001
        }

        if(situation.check2(x,4,2)>=10){
            x.ifscore+=20001
        }

        if(situation.check2(x,4,1)===11){
            x.ifscore+=20001
        }


        if(situation.check2(x,2,1)===10){
            x.ifscore+=2
        }
        if(situation.check2(x,2,1)===11){
            x.ifscore+=20;
        }

        if(situation.check2(x,2,2)===10){
            x.ifscore+=5
        }
        if(situation.check2(x,2,2)===12){
            x.ifscore+=40
        }
        if(situation.check2(x,2,2)===11){
            x.ifscore+=25
        }

        if(situation.check2(x,2,3)===10){
            x.ifscore+=10
        }
        if(situation.check2(x,2,3)===11){
            x.ifscore+=27
        }
        if(situation.check2(x,2,3)===12){
            x.ifscore+=45
        }
        if(situation.check2(x,2,3)===13){
            x.ifscore+=100
        }



        if(situation.check2(x,2,4)===10){
            x.ifscore+=15
        }
        if(situation.check2(x,2,4)===11){
            x.ifscore+=30
        }
        if(situation.check2(x,2,4)===12){
            x.ifscore+=50
        }
        if(situation.check2(x,2,4)===13){
            x.ifscore+=110
        }
        if(situation.check2(x,2,4)===14){
            x.ifscore+=200
        }


        if(situation.check2(x,3,1)===10){
            x.ifscore+=20
        }
        if(situation.check2(x,3,1)===11){
            x.ifscore+=150
        }

        if(situation.check2(x,3,2)===10){
            x.ifscore+=35
        }
        if(situation.check2(x,3,2)===11){
            x.ifscore+=200
        }

        if(situation.check2(x,3,3)===10){
            x.ifscore+=50
        }
        if(situation.check2(x,3,3)===11){
            x.ifscore+=250
        }
        if(situation.check2(x,3,3)===12){
            x.ifscore+=2001
        }
        if(situation.check2(x,3,3)===13){
            x.ifscore+=2002
        }
        if(situation.check2(x,3,4)===10){
            x.ifscore+=70
        }
        if(situation.check2(x,3,4)===11){
            x.ifscore+=300
        }
        if(situation.check2(x,3,4)===12){
            x.ifscore+=2003
        }
        if(situation.check2(x,3,4)===13){
            x.ifscore+=2004
        }
        if(situation.check2(x,3,4)===14){
            x.ifscore+=2005
        }
        if(x.spec===0){
            x.ifscore+=1
        }
    }
};
var cpu={
    xy:[],
    xytemp:[],
    ifnext:[],
    next:[],
    nextduan:[],
    score:0,
    ifscore:0,
    nextscore:0,
    spec:0
};
var man={
    xy:[],
    xytemp:[],
    ifnext:[],
    next:[],
    nextduan:[],
    score:0,
    ifscore:0,
    nextscore:0,
    spec:1
};