$(window).load(function(){game.init()})
var timer1
var timer2
var timer3
var vol=true
var f=0
var game={
	init:function(){
		$(".menulayer").show()
		$(".gamelayer").hide()
		$(".selectlayer").hide()
		$(".show").hide()
		$(".loadlayer").hide()
		$(".overlayer").hide()
		$(".buttom").show()
		game.ctx=document.getElementById("huabu").getContext("2d");
		levels.init();
		key.init();
		enemyship1ocr.ready()
		enemyship2ocr.ready()
		enemyship3ocr.ready()
		enemyship4ocr.ready()
		enemyship5ocr.ready()
		ourbltocr.ready()
		enemybltocr.ready()
		enemyshiploc.ready()
		
		game.bgmz=loader.loadsound("sound/BGM.mp3")
		game.bgmz.loop=true
		game.bgmz.play()
		game.bltm=loader.loadsound("sound/zidan.mp3")
		game.burnm1=loader.loadsound("sound/burn.mp3")
		game.burnm2=loader.loadsound("sound/burn.mp3")
		game.burnm3=loader.loadsound("sound/burn.mp3")
		game.burnm4=loader.loadsound("sound/burn.mp3")
		},
	showselcet:function(){
		$(".menulayer").hide()
		$(".overlayer").hide()
		$(".selectlayer").show()},
	start:function(){
		$(".loadlayer").hide()
		$(".buttom").hide()
		$(".gamelayer").show()
		$(".show").show()
		$(".scoreshow").show()
		$(".overlayer").hide()
		$(".pause").show()
		
		game.bgY=0
		game.circle=0
		game.shipy=0
		game.enemy1num
		game.enemy2num
		game.enemy3num
		game.enemy4num
		game.enemy5num
		game.burnlocx=[]
		game.burnlocy=[]
		game.ourburnx=[]
		game.ourburny=[]
		game.moveit()
		game.bgheight=game.currentlevel.bg.height;
		
		game.osmy=200;
		game.osmx=240;
		
		game.bgmz.pause()
		if(vol){
			game.currentlevel.bgm.play()}
		game.burnm=[game.burnm1,game.burnm2,game.burnm3,game.burnm4]
		},
	moveit:function(){
		timer1=setInterval(game.draw,18)
		timer2=setInterval(ourbltocr.init,500)
		timer3=setInterval(enemybltocr.init,1000)
		},
	stopit:function(){
		clearInterval(timer1);
		clearInterval(timer2);
		clearInterval(timer3);
		},
	draw:function(){
		game.drawbg()
		game.drawourship1()
		if(enemyship1ocr.loaded){game.drawenemyship1()};
		if(enemyship2ocr.loaded){game.drawenemyship2()};
		if(enemyship3ocr.loaded){game.drawenemyship3()};
		if(enemyship4ocr.loaded){game.drawenemyship4()};
		if(enemyship5ocr.loaded){game.drawenemyship5()};
		enemyshiploc.init()
		game.drawourblt()
		game.drawenemyblt()
		game.drawhealth()
		game.drawburn()},
	drawbg:function(){
		if(game.bgheight-506-game.bgY<0){
			game.ctx.drawImage(game.currentlevel.bg,0,game.bgheight-game.circle,480,game.circle,0,0,480,game.circle)
			game.circle+=0.25
			if(game.bgheight-506-game.bgY==-506){
				game.bgY=0
				game.circle=0
				}
			}
		game.ctx.drawImage(game.currentlevel.bg,0,game.bgheight-506-game.bgY,480,506,0,0,480,506)
		game.bgY+=0.25
			},
	drawourship1:function(){
		game.ctx.drawImage(game.currentlevel.ourship,game.osmx+key.right-key.left,game.osmy+key.down-key.up);
		key.getkey();
			},
	drawenemyship1:function(){
		for(var i=0;i<game.enemy1num;i++)
			{game.ctx.drawImage(game.currentlevel.enemyship[0],enemyship1ocr.x[i],enemyship1ocr.y[i])
			enemyship1ocr.y[i]++
			}
			if(game.score==2500){
				game.stopit()
				$(".overlayer p").html("WIN!")
				$("#tryagain").attr("onClick","game.showselcet()")
				$("#tryagain").attr("src","img/next.png")
				$(".overlayer").show()
				$(".pause").hide()
				}
		},
	drawenemyship2:function(){},
	drawenemyship3:function(){},
	drawenemyship4:function(){},
	drawenemyship5:function(){},			
	drawourblt:function(){
		for(var j=0;j<=ourbltocr.i;j++)
		{
		if(ourbltocr.y[j]<0){
		ourbltocr.x.splice(j,1,1000)}else{
		for(var i=0;i<enemyshiploc.y.length;i++){
			if(ourbltocr.x[j]>enemyship1ocr.x[i]-20&&ourbltocr.x[j]<enemyship1ocr.x[i]+50&&ourbltocr.y[j]>enemyship1ocr.y[i]-50&&ourbltocr.y[j]<enemyship1ocr.y[i]+30)
			{ourbltocr.x.splice(j,1,1000);
			game.burnlocx.push(enemyship1ocr.x[i])
			game.burnlocy.push(enemyship1ocr.y[i])
			enemyship1ocr.x.splice(i,1,2000)
			game.score+=100
			$("#scoreshow p").html('score:'+game.score)
			if(vol){
			game.burnm[f].play()
			f++
			if(f>3){f=0}
				}
			}	
			else{
				game.ctx.drawImage(game.currentlevel.ourblt,ourbltocr.x[j],ourbltocr.y[j])}	
			}
		ourbltocr.y[j]-=8;}
		}},
	drawenemyblt:function(){
		var x=game.osmx+key.right-key.left;
		var y=game.osmy+key.down-key.up
		for(var i=0;i<enemybltocr.i;i++){
			if(enemybltocr.y[i]>700){enemybltocr.x.splice(i,1,1000)}else{
			if(enemybltocr.x[i]>x-20&&enemybltocr.x[i]<x+50&&enemybltocr.y[i]>y&&enemybltocr.y[i]<y+30)
			{enemybltocr.x.splice(i,1,1000)
			game.ourburnx.push(x)
			game.ourburny.push(y)
			game.health--
			if(vol){game.burnm1.play()}
			}
			else{game.ctx.drawImage(game.currentlevel.enemyblt,enemybltocr.x[i],enemybltocr.y[i])}
			}
		enemybltocr.y[i]+=5	
		}
		},
	drawburn:function(){
		for(var i=0;i<game.burnlocx.length;i++){
			game.ctx.drawImage(game.currentlevel.burn,game.burnlocx[i]-80,game.burnlocy[i]-80)
			game.ctx.drawImage(game.currentlevel.burn,game.ourburnx[i]-90,game.ourburny[i]-80)
		setTimeout(game.burnlocx.splice(i,1,3000),10000)
		setTimeout(game.ourburnx.splice(i,1,3000),10000)
}
		},
	drawhealth:function(){
		switch(game.health){
		case 3:
		game.ctx.drawImage(game.currentlevel.health,30,30);
		game.ctx.drawImage(game.currentlevel.health,70,30);
		game.ctx.drawImage(game.currentlevel.health,110,30);
		break;
		case 2:
		game.ctx.drawImage(game.currentlevel.health,30,30);
		game.ctx.drawImage(game.currentlevel.health,70,30);
		break;
		case 1:
		game.ctx.drawImage(game.currentlevel.health,30,30);
		break;
		case 0:game.stopit();
		$(".overlayer").show()
		$(".pause").hide()
		game.currentlevel.bgm.pause()
		break;}
		},
	}

var levels={
	data:[
		{bg:'bg1',bgm:'BGM1',ourship:'ourship1',enemyship:['enemyship1','enemyship2'],enemynum:[50,10],ourblt:'ourblt1',enemyblt:'enemyblt1',},
		{bg:'bg2',bgm:'bgm2'},
		{},{},{}
		],
	init:function(){
		var html=""
		for(var i=0;i<this.data.length;i++){
			var leveldata=levels.data[i]
			html+='<input type="button" value="'+(i+1)+'">'
			}
		$(".selectlayer").html(html)
		$(".selectlayer input").click(function(){
			levels.loadit(this.value-1);
			$(".selectlayer").hide()
			$(".loadlayer").show()
			})
		},
	loadit:function(numb){
		game.currentlevel={number:numb};
		game.currentlevel.enemyship=[];
		game.score=0
		$("#scoreshow p").html('score:000')
		game.health=3
		$(".scoreshow").html("Score:"+game.score)
		var level=levels.data[numb]
		game.currentlevel.bg=loader.loadimg("img/bg/"+level.bg+".png")
		game.currentlevel.ourship=loader.loadimg("img/ourship/"+level.ourship+".png")
		game.currentlevel.burn=loader.loadimg("img/bomb.png")
		for(var i=0;i<level.enemyship.length;i++){
		game.currentlevel.enemyship[i]=loader.loadimg("img/enemyship/"+level.enemyship[i]+".png")
		game.currentlevel.health=loader.loadimg("img/health/health.png")
		switch(level.enemyship[i])
			{case "enemyship1":
			game.enemy1num=level.enemynum[0]
			enemyship1ocr.init();
			break;
			case "enemyship2":
			game.enemy2num=level.enemynum[1]
			enemyship2ocr.init();
			break;
			case "enemyship3":
			game.enemy3num=level.enemynum[2]
			enemyship3ocr.init();
			break;
			case "enemyship4":
			game.enemy1num=level.enemynum[3];
			enemyship4ocr.init();
			break;
			case "enemyship5":
			game.enemy1num=level.enemynum[4];
			enemyship5ocr.init();
			break;
			}
		}
		game.currentlevel.ourblt=loader.loadimg("img/ourblt/"+level.ourblt+".png")
		game.currentlevel.enemyblt=loader.loadimg("img/enemyblt/"+level.enemyblt+".png")
		game.currentlevel.bgm=loader.loadsound("sound/bgm/"+level.bgm+".mp3")
		}
	}
	
var loader={
	totalcount:0,
	loadedcount:0,
	loaded:true,
	loadimg:function(url){
		loader.totalcount++;
		var img=new Image();
		loader.loaded=false;
		img.src=url;
		img.onload=loader.itemloaded;
		return img
		},
	loadsound:function(url){
		loader.totalcount++;
		loader.loaded=false;
		audio=new Audio();
		audio.src=url;
		loader.loadedcount++
		return audio;
		},
	itemloaded:function(){
		loader.loadedcount++
		$("#loadmsg p").html("装填弹药"+loader.loadedcount+"of"+loader.totalcount);
		if(loader.loadedcount==loader.totalcount){
			loader.loaded=true;
			game.start()
			}
		},
	}
	
var key={
	init:function(){
		key.up=0;
		key.left=0;
		key.down=0;
		key.right=0;
		},
	getkey:function(){
		$(window).keydown(function(e){
			key.whichkey=e.which})
		$(window).keyup(function(){key.whichkey=""})
			switch(key.whichkey){
				case 87:
				if(game.osmy+key.down-key.up>0)
				{key.up+=5;}else{key.up-=1;}
				break;
				case 65://a
				if(game.osmx+key.right-key.left>0)
				{key.left+=5;}else{key.left-=1;}
				break;
				case 83://s
				if(game.osmy+key.down-key.up<420)
				{key.down+=5;}else{key.down-=1;}
				break;
				case 68://d
				if(game.osmx+key.right-key.left<400)
				{key.right+=5;}else{key.right-=1;}
				break;
				default:;
				}	
		},
	}
	
var enemyship1ocr={
	ready:function(){
	enemyship1ocr.x=[]
	enemyship1ocr.y=[]
	enemyship1ocr.loaded=false},
	
	init:function(){
		for(var i=0;i<game.enemy1num;i++){
			enemyship1ocr.x[i]=Math.round(Math.random()*400);
			}
		for(var i=0;i<game.enemy1num/3;i++){
			for(var j=0;j<3;j++)
			{enemyship1ocr.y[j+i*3]=Math.round(Math.random()*300+i*300)*-1}
			};
		enemyship1ocr.loaded=true;
		},
	}
	
var enemyship2ocr={
	ready:function(){
	enemyship2ocr.x=[]
	enemyship2ocr.y=[]
	enemyship2ocr.loaded=false},
	init:function(){},
	}
var enemyship3ocr={
	ready:function(){
	enemyship3ocr.x=[]
	enemyship3ocr.y=[]
	enemyship3ocr.loaded=false},
	init:function(){}}
var enemyship4ocr={
	ready:function(){
	enemyship4ocr.x=[]
	enemyship4ocr.y=[]
	enemyship4ocr.loaded=false},
	init:function(){}}
var enemyship5ocr={
	ready:function(){
	enemyship5ocr.x=[]
	enemyship5ocr.y=[]
	enemyship5ocr.loaded=false},
	init:function(){}}
var ourbltocr={
	ready:function(){
	ourbltocr.x=[]
	ourbltocr.y=[]
	ourbltocr.i=0},
	init:function(){
			if(vol){
			game.bltm.play()}
			ourbltocr.x[ourbltocr.i]=game.osmx+key.right-key.left+10
			ourbltocr.y[ourbltocr.i]=game.osmy+key.down-key.up-25
			ourbltocr.i++;
			
		},
	}
var enemybltocr={
	ready:function(){
	enemybltocr.x=[]
	enemybltocr.y=[]
	enemybltocr.i=0},
	init:function(){
		
		for(var j=0;j<enemyship1ocr.y.length;j++){
			if(enemyship1ocr.y[j]>0){
			enemybltocr.x[enemybltocr.i]=enemyship1ocr.x[j]
			enemybltocr.y[enemybltocr.i]=enemyship1ocr.y[j]
			enemybltocr.i++
			}}
},
	}
var enemyshiploc={
	ready:function(){
	enemyshiploc.x=[]
	enemyshiploc.y=[]
	enemyshiploc.i=0},
	init:function(){
		enemyshiploc.i=0
		for(var j=0;j<enemyship1ocr.y.length;j++){
			if(enemyship1ocr.y[j]>0){
			enemyshiploc.x[enemyshiploc.i]=enemyship1ocr.x[j]
			enemyshiploc.y[enemyshiploc.i]=enemyship1ocr.y[j]
			enemyshiploc.i++
			}
			}
		},
	}
var retry={
	tryit:function(){
		game.init();
		$(".pause").hide()
		$(".menulayer").hide()
		levels.loadit(game.currentlevel.number)},
	}
var paus={
	doit:function(){
		game.stopit()
		$(".overlayer").show()
		$(".pause").hide()
		$(".overlayer p").html("PAUSE!")
		$("#tryagain").attr("onClick","goon.doit()")
		$("#tryagain").attr("src","img/goon.png")
		game.currentlevel.bgm.pause()
		}
	}
var goon={
	doit:function(){
		$(".overlayer").hide()
		game.moveit()
		game.currentlevel.bgm.play()
		}
	}
var mute={
	init:function(){
		if(vol==true){
			$("#sound").attr("src","img/node2256.png")}
		else{
			$("#sound").attr("src","img/node2.png")
			}
		},
	doit:function(){
		if(vol==true){
			game.bgmz.pause();vol=false;
			$("#sound").attr("src","img/node2.png")
			}
		else{
			game.bgmz.play();vol=true;
			$("#sound").attr("src","img/node2256.png")
			}
		},
	}