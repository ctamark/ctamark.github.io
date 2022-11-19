import {getRandomVal, isCollision_circle2Circle, isInCircle, getDistSqrt} from './helper.js'
import {Sprite, Earwax, Stuff} from './helper.js' 


class App {
	
	constructor(){
		
		//this.canvas = document.createElement('canvas');
		this.canvas = document.getElementById("myCanvas");
		this.ctx = this.canvas.getContext('2d');
		//document.body.appendChild(this.canvas);
		
		this.playstate = playstate_ready
		
		this.numTotalStuff = 0
		this.numCleanedStuff = 0
		//----------------------
		//---------------------
		let randomVal = getRandomVal(0, 10);
		let msg = "randomVal: " + randomVal; 
		console.log(msg);

	    this.face_img = new Image();
		
		if(gSelectedPlay == playkind_earCleaning){
			
	       this.face_img.src = "face_base-02.png";
		}
		else if(gSelectedPlay == playkind_acne){

	       this.face_img.src = "face_base-02.png";
		}
				
		this.eyeclose_img = new Image();
		this.eyeclose_img.src = "eye_close_d.png"
		
		this.isEyeclose = true

		this.eyebrow_img = new Image();
		this.eyebrow_img.src = "./eyebrow_normal_d.png"
		//this.eyebrow_img.style.borderImageWidth = "10px 20px"
//		.borderImageWidth = "20px 30px";
		
		this.lip_img = new Image();
		this.lip_img.src = "./lip_normal.png"
		
		
	   this.stuffArray = [];
	   this.spriteArray = [];

        this.initSprite();

				
	   this.sound_move = new Audio("effect-01.wav"); 
	   this.sound_move.loop = true
		//this.sound_move.play();
		//this.sound_move.volume = 0.0
		// buffers automatically when created
		/*

		
		if(this.sound_move.ended){
			
			console.log("audio.ended: true")
		}		
        if(this.sound_move.paused){
			
			console.log("audio.paused: true")
		}
		
		console.log("currentT: " + this.sound_move.currentTime);
		*/
		
		this.snd_acne_effect = new Audio("acne_effect-01.wav");
		this.snd_acne_effect.loop = false

	    this.soundBg = new Audio("sea-01.mp3"); 
//	    this.soundBg = new Audio("bg-01.mp3"); 


		
		this.faceState =  facestate_normal
			  
		
		//50x50
		this.earwax_img = new Image(); 
	    this.earwax_img.src = "earwax_type.png";
		
		
		this.stuff_img = new Image
		
		if(gSelectedPlay == playkind_earCleaning){

     	       this.stuff_img.src = "earwax_type.png";
			
		}
		else if(gSelectedPlay == playkind_acne){

     	       this.stuff_img.src = "acne_type.png";
						
		}
		
		
		this.closeup_img = new Image();		
		
		if(gSelectedPlay == playkind_earCleaning){
		
		    this.closeup_img.src = "ear_closeup.png";
		}
		else if(gSelectedPlay == playkind_acne){
			
		    this.closeup_img.src = "acne_closeup.png";			
		}
		
		this.touchSPos = {x:0, y:0}


         //300x300 귀, 여드름 피부,...
		 //RscPos(drawPos)
		 this.closeupRscPos = {x:0, y:300}
		 
		 this.closeupPos = {x:150, y:450}

		 let refPos = { x:this.closeupRscPos.x+150, y: this.closeupRscPos.y +150}
		 
		// this.numTotalStuff = 2
		// this.createEarwax(refPos, 2);

		/*
		this.earwaxPos = {x:10, y:10} 
		*/
		
		//ear_swab, ...
		this.toolPos = {x:10, y:60};
		this.lastMovePos = {x:0, y:0};
		this.lastMoveRefPos = {x:0, y:0};
		
		//----------------------
		this.initEvent();
		//---------------------
		
		this.isMoveTracking = false;
		this.isCleaningStuff = false;
		
		
		this.isDraggingStuff = false
		
		this.isPlayMovesound = false;
		
		this.lastMoveT = 0
		//---------------------------
		this.moveSpeedCheckT = 0
		this.moveSpeedCheckPos = {x:0, y:0}
		
		this.touchCheckT = 0
		this.isValidTouchPos = false 
		//3초간 2손가락이 범위내에 유지 
		
		
		this.appCurT = 0
		
		
		
		window.addEventListener('resize', this.resize.bind(this), false);
		this.resize();
		
		/*
		this.sprite_d = new  sprite("sprite-01.png");
		
   		this.sprite_d.addFrame(0, 0, 40, 100); 
        this.sprite_d.addFrame(40, 0, 40, 100); 
        this.sprite_d.addFrame(80, 0, 40, 100); 
		*/
		
		/*
		let rectA = {x:0, y:0, w:100, h:100}
		let rectB = {x:50, y:50, w:100, h:100}
		
		let rCollision = isCollision(rectA, rectB);
     
	    console.log("collision: " + rCollision);
		*/
		/*
        let circleA = {x:0, y:0, r:30}
		let circleB = {x:50, y:50, r:50}
		
		let rCollision = isCollision_circle2Circle(circleA, circleB);     
	    console.log("collision: " + rCollision);
       */
	   
	   /*
	    let toolPos_collision =  {x:this.toolPos.x+15, y:this.toolPos.y+15}
       	let toolRadius_collison = 15	
	    let size = this.stuffArray.length
	   for(let i=0; i < size; i++){
			
			let obj = this.stuffArray[i]
					
			//earwax 		
			let offsetA = obj.radius;
			let cA = {x: obj.x+offsetA, y: obj.y+offsetA, r: obj.radius}; 			
			
			let cB = {x:toolPos_collision.x, y: toolPos_collision.y, r: toolRadius_collison};
								
			let rCollision = isCollision_circle2Circle(cA, cB);
			
			if(rCollision == true){
				
  	     		console.log("rCollision!!");
			}
		}

   */
         
		
		let mainMenuBtn = document.getElementById("mainMenuBtn")
		mainMenuBtn.onclick = function(){
			
			alert("mainMenuBtn");
			
		}

		let playBtn = document.getElementById("playBtn")
		playBtn.onclick = this.onTouchPlayBtn.bind(this)

         //------------- 
         let closeRatingBtn = document.getElementById("closeRatingBtn")
		 closeRatingBtn.onclick = this.onCloseRatingBtn.bind(this)


        //---------------- 
		   			      
	    this.showSysMsg("afdasfaf");
   
        console.log("this.playstate: " + this.playstate )
			
	    //객체에서 분리된 함수인 App.updateFrame이 전달되기 때문에 this의 정보가 사라짐
		//let boundfunc = func.bind(context);
		requestAnimationFrame(this.updateFrame.bind(this));

	}//constructor()
	
	
	//플레이, 다시 플레이...
	onTouchPlayBtn(){
	
	       this.sound_move.play();
	  
	       this.playstate = playstate_prepare
	  
		   this.sound_move.muted = true 
		   
		   this.soundBg.play();
		   this.soundBg.loop = true 
		   this.soundBg.volume = 0.5;
		   this.soundBg.pause();
		   
		   let menuDiv = document.getElementById("menuDiv");
		   menuDiv.style.display = 'none'
		  
		   let floatMenuDiv = document.getElementById("floatMenuDiv");
		   floatMenuDiv.style.display = 'block'
		  
		  		  
          //---------
           //this.snd_acne_effect.play();
		   //this.snd_acne_effect.muted = true 

           this.showSysMsg("preparing")
		   
		   
		   setTimeout(this.end_prepareState.bind(this) , 3000)
		   
		   
	}
	
	
	
  onCloseRatingBtn(){

   console.log("closeRatingDiv")

  let bgDiv = document.getElementById('bgDiv')
  bgDiv.style.display = 'none'

  let ratingDiv = document.getElementById("ratingDiv")
  ratingDiv.style.display = 'none'
  
  
  let menuDiv = document.getElementById('menuDiv')
  menuDiv.style.display = 'block'
  
  this.playstate = playstate_ready
  
  }
  
		
  initSprite(){
	
		if(gSelectedPlay!=playkind_acne){

            return						
		}
		
		console.log("ani_prop_debug: " + Sprite.ani_prop_debug);

/*		
	    let sprite = new Sprite()
		 sprite.setFName('acne_ani-01.png')
		 sprite.isDisplay = false
//		 this.sprite.aniProp = Sprite.ani_prop_loop
   	     sprite.aniProp = Sprite.ani_prop_keep_endframe


		 sprite.addFrame(0, 0 , 40, 70)
		 sprite.addFrame(40, 0, 40, 70)
		 sprite.addFrame(80, 0, 40, 70)
		 
		 this.spriteArray.push(sprite)
		 
	
         sprite2 = new Sprite()
		 sprite2.setFName('acne_ani-01.png')
		 sprite2.isDisplay = false
//		 this.sprite.aniProp = Sprite.ani_prop_loop
   	     sprite2.aniProp = Sprite.ani_prop_keep_endframe
		 sprite2.addFrame(120, 0 , 40, 70)
		 sprite2.addFrame(1600, 0, 40, 70)
		
		// this.sprite.addFrame(120, 0, 40, 70)
	*/
	
	}
	
	
	
	
	drawSprite(curT){
		
		if(gSelectedPlay!=playkind_acne){

            return						
		}
		
	
		
	  for(let i=0; i < this.spriteArray.length ; i++){
		
		  let obj = this.stuffArray[i] 
		  
	 	  
		  if(obj.state != 2){		
           // console.log("obj state not 2")		  
                continue;			
		  }

		  let sprite = this.spriteArray[i]
		
		 if(sprite.isDisplay == false){
			
		  	continue
		 }
		 
		 sprite.update(curT);		
        	
		//----------
		//dx(drawPosX)
		//closeupRscPos(부모의 좌측,상단 in canvas)
		let drawPosX = this.closeupRscPos.x + obj.x  
		let drawPosY = this.closeupRscPos.y + obj.y 
			
        sprite.drawFrameEx(this.ctx, drawPosX, drawPosY, 0.8)	
        //console.log("sprite.drawFrameEx")		
		
	    //this.sprite.drawFrameEx(this.ctx, drawPosX, drawPosY, 0.8)
		
		}
	}
	
	
	
	
	 end_prepareState(){
		 
		 console.log("end_prepareState");
		 //----------------------
		 this.playstate = playstate_treatment
		  console.log("playstate: " + this.playstate);
		 
		 this.hideSysMsg()
		 
		 
		 if(gSelectedPlay == playkind_earCleaning){
			 
			 
			 
		 }
		 else if(gSelectedPlay == playkind_acne){
		 
	   	      this.numTotalStuff = 2
		      this.createAcne(this.numTotalStuff )
		 }
		 
		  this.soundBg.play();
		 
	 }
		 
		 
	 showSysMsg(msg){

		   let sysMsg = document.getElementById("sysMsg");
           sysMsg.innerText = msg
           //innerHTML은 태그까지 가능

          let sysMsgDiv = document.getElementById("sysMsgDiv");
          sysMsgDiv.style.display = "block"	    		   

     	  setTimeout(this.hideSysMsg.bind(this), 3000);
	 }
	 
	 hideSysMsg(){
		 		 
       let sysMsgDiv = document.getElementById("sysMsgDiv");
       sysMsgDiv.style.display = "none"	   
		 
	 }
	 
	
	 updateSoundEffect(){
		 
	  //this.snd_acne_effect.en	 
		 
		 
		 
	 }
	
	resize(){
		
		//let width  = document.body.clientWidth;
		//let height = document.body.clientHeight;
		
		//html5 
		//let width  = window.innerWidth;
		//let height = window.innerHeight;
		
		var size = {
         width : window.innerWidth || document.body.clientWidth,
         height : window.innerHeight || document.body.clientHeight 
		}
		
		console.log("resize: " + size.width + ", " +size.height);
       		
		this.canvas.width = size.width*0.9;
		this.canvas.height =size.height*0.9;
		
	}
	
	
	
   drawFace(facestate ){

       //canvas size보다 작게 유지 
	   //600x632
 	   let ratio = 632/600.0
	   let dh = 300*ratio 
	   this.ctx.drawImage(this.face_img, 0, 0, 600, 632, 0, 0, 300, dh);
	   
	   //--------------------

       this.ctx.drawImage(this.eyebrow_img, 164, 155)
       this.ctx.drawImage(this.lip_img, 206, 291)
     

	}		
	
			
	updateFrame( ){
		
		 let curT = new Date().getTime();
		 this.appCurT = curT 
		
		//------------------------------
		//지우는 처리 해야함
		//-------------------------------
		
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
		
		
      
	  
	    this.drawFace(this.faceState)
	  
	  
	    if(this.isEyeclose == true){   
	 
	        this.ctx.drawImage(this.eyeclose_img, 164, 191);
	    }
     
	   if(this.playstate == playstate_treatment || this.playstate == playstate_finish){

           this.ctx.drawImage(this.closeup_img, this.closeupRscPos.x, this.closeupRscPos.y); 
	   
	       this.drawAllStuff()
		  
		   if(this.playstate == playstate_treatment){
		        this.updateAcneTreatment(curT)
		   }
		   
       	   this.drawSprite(curT)
	   
	   }
	   
	   
        let toolPos_collision =  {x:this.toolPos.x+15, y:this.toolPos.y+15}
       	let toolRadius_collison = 15	


      /*
		for(let i=0; i < this.stuffArray.length; i++){
			
			let obj = this.stuffArray[i]
			
			let drawPosX
			let drawPosY 
			
			if(obj.state == 0){

               drawPosX = obj.x - obj.radius
               drawPosY = obj.y - obj.radius             

			  this.ctx.drawImage(this.earwax_img, drawPosX, drawPosY);			  
				
			}
			else if(obj.state ==1){
				
				drawPosX = this.lastMovePos.x + obj.collision_offsetX - obj.radius
                drawPosY = this.lastMovePos.y + obj.collision_offsetY - obj.radius		
				 
				 //console.log("collisionOffset: " + obj.collision_offsetX + ", " + obj.collision_offsetY );
                 //console.log("drawPos " + drawPos.x + "," + drawPos.y);
		     	this.ctx.drawImage(this.earwax_img, drawPosX , drawPosY);
				 
			}
			else {
							
			}			
			
		}
		*/
		
		
		
      if(this.isDraggingStuff  == true){

		 if(curT - this.lastMoveT >= 500){
			 
			 if((this.lastMoveRefPos.x == this.lastMovePos.x) && 
			    (this.lastMoveRefPos.y ==this.lastMovePos.y) ){
                //마지막 움직임이후 0.5초 동안 이동없음
				
	    		   //this.sound_move.pause();
				   this.sound_move.muted = true
			 
			 }		
		
  	 	 }
		 else {
		 
		 }
		 		 
		 this.probe_dragSpeed(curT)
		 
	  } //if(this.isDraggingStuff 
		 	 

	

	 
	
  	  this.probeFinishJob(curT)
			
     requestAnimationFrame(this.updateFrame.bind(this));
		
	}
	
	
	  drawAllStuff(){
		  		  
		     //기준점: 좌측 상단 
		    let parentDrawX=   this.closeupRscPos.x 
            let parentDrawY =  this.closeupRscPos.y
				  
		   if(gSelectedPlay == playkind_earCleaning){
			  
			  
			  
		   }
		   else if(gSelectedPlay == playkind_acne){
			  		  			  
			  this.drawAcneStuff(parentDrawX, parentDrawY)
			  			  
		   }
		  
		  
			//

	
		  
	  }
	
	
	
	drawAcneStuff(refX, refY){
		
		
      for(let i=0; i < this.stuffArray.length; i++){
			   
			   let obj = this.stuffArray[i]
			   //obj size  50x50
			   //obj.rscIdx 
			   			   
			   	
				if(obj.state == 0){

                      //this.ctx.drawImage(this.stuff_img, sx, sy, 50, 50, dx, dy, 50, 50);
					
					
				}
               else  if(obj.state == 2){			   
	             //여드름을 짠 이후의 모습을 표시		
		

		        }
				
										   
			   let sx = 50*obj.rscIdx 
			   let yIdx = obj.rscIdx/5;
               let sy = 50*yIdx 			   
			   let dx = refX+ obj.x - obj.radius   
               let dy = refY+ obj.y - obj.radius
			   //-------
			   obj.drawPosX = dx
			   obj.drawPosY = dy 
			   //-------

               this.ctx.drawImage(this.stuff_img, sx, sy, 50, 50, dx, dy, 50, 50);				
			   			   			   
//drawImage(image, dx, dy)
//drawImage(image, dx, dy, dWidth, dHeight)
//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
		
		} //for 
		
		
		
	}


	probe_dragSpeed(curT){
		
		   if(curT - this.moveSpeedCheckT >= 1000 ){
			
   			    let diffX = this.lastMovePos.x - this.moveSpeedCheckPos.x 
				let diffY = this.lastMovePos.y - this.moveSpeedCheckPos.y 
				
				if(diffX < 0) { diffX *= -1;  } 
				if(diffY < 0) {  diffY *= -1;  }
				
				let moveDist = Math.sqrt(diffX*diffX + diffY*diffY);

  		         console.log("speedCheck during 1s: " + moveDist);		
				 
				 //refDist: 난이도에 따라 달라져야 함
				 let refDist = 30 
									
				if( moveDist >= refDist){
					
				   console.log("too fast");		
				   this.isEyeclose = false
				   this.eyebrow_img.src = "eyebrow_pain.png"
				   this.lip_img.src = "lip_pain.png"				  				   
				}
				else { //normal, good
	
		
				   this.isEyeclose = true 					
				}
			
			   this.moveSpeedCheckPos.x  = this.lastMovePos.x 
			   this.moveSpeedCheckPos.y  = this.lastMovePos.y 
			   this.moveSpeedCheckT = curT		   
	      }
	
	}
	
		
	 createEarwax(refPos, num){
				
		this.stuffArray.length = 0;
		
		//40x40
		for(let i=0; i < num; i++){
			
       	      let earwax = new Stuff();
			  earwax.radius = 20;

			 let genX = refPos.x + getRandomVal(-105, 105);
             let genY = refPos.y + getRandomVal(-105, 105);			
			 
				earwax.x = genX
         		earwax.y = genY 

              console.log("createEarwax:Pos: " + genX + ", " + genY);

               this.stuffArray.push(earwax)
		  }

		
	}
	
	
    //	
	createAcne(num){
	
		this.stuffArray.length = 0;
        this.spriteArray.length = 0;

		
		//미리 위치가 정해져 있음 
	   //(54, 200)
		//40x40
		
		 let posArray = [] 
		 posArray.push({x: 60, y: 265}) 		 
		 posArray.push({x: 260, y: 150}) 
		 posArray.push({x: 230, y: 230})  
		 
		 for(let i=0; i < num; i++){
		
  		   let acne = new Stuff();
		   acne.state = Stuff.state_normal 
		   
		   acne.radius = 22;

           let pos = posArray[i]
	  	   acne.x = pos.x
		   acne.y = pos.y 
		     			 
		  this.stuffArray.push(acne)
		
          //acne개수만큼 sprite생성해야 함  		
		  //array Index를 똑같이 맞춤
          let sprite = new Sprite()
		  
		 sprite.setFName('acne_ani-01.png')
		 sprite.isDisplay = false
   	     sprite.aniProp = Sprite.ani_prop_keep_endframe
	     sprite.drawPosKind = Sprite.drawPos_midx_maxy 
	
         //서로 다른 애니 프레임으로 수정필요
		 
		 if(i==0){
		 sprite.addFrame(0, 0 , 40, 70)
		 sprite.addFrame(40, 0, 40, 70)
		 sprite.addFrame(80, 0, 40, 70)
		 }
		 else {
          sprite.addFrame(120, 0 , 40, 70)
		  sprite.addFrame(160, 0, 40, 70)				
		 }
		 
         this.spriteArray.push(sprite)
		  
 	 }
		 
   

	}

	
	
//============	
	getTouchedStuff(touchPos){

		console.log("---getTouchedStuff---");
		
		   //collison 등
		for(let i=0; i < this.stuffArray.length; i++){
			
			let obj = this.stuffArray[i]
								
			let cA = {x: obj.x,  y: obj.y, r: obj.radius}; 			
			
			console.log("objPos: " + obj.x +"," + obj.y + "radius" + obj.radius);
															
			let rCollision = isInCircle(cA, touchPos)
			
			if(rCollision == true){
			
               return obj									
			}
		
	    }
		
	}

 
   releaseTouchedStuff(){
	   
      for(let i=0; i < this.stuffArray.length; i++){
			
			let obj = this.stuffArray[i]
			
			if(obj.state == 1){
				
				obj.state = 0;
			}										
	   }//for(...( 
	   
   } //
   
   
   moveTouchedStuff(deltaX, deltaY){
	   
	    for(let i=0; i < this.stuffArray.length; i++){
			
			let obj = this.stuffArray[i]
			
			if(obj.state == 1){
								
				obj.x += deltaX;
				obj.y += deltaY;				
			}										

	   }//for(...)
	   
	   
   }
   
   //refPos에서 refDist이상이면 cleaned
   //새롭게 clean된 것을 반환
   probe_touchedStuff_removal(refPos, refDist){

        let  cleanedStuff=0	  
	  
	    for(let i=0; i < this.stuffArray.length; i++){
			
			let obj = this.stuffArray[i]
			
			if(obj.state == 0 ){							
                  continue;														
			}
			
			if(obj.state == Stuff.state_treated){
				
				cleanedStuff += 1;
				continue;
			}
			
			//touched 상태인 stuff만 체크 
			
	        let objPos = {x: obj.x , y: obj.y}
	
            let dist = getDistSqrt( refPos, objPos); 		
			
			if(dist >= refDist){
				
				cleanedStuff +=1				
				//cleaned 
				obj.state = 2
				console.log("remove stuff: " + dist)
			}
			
	   }//for(...)
	   
       return cleanedStuff
   }
   
   
   getNumCleanedStuff(){
	   
	   var cleanedStuff = 0 
	   
	   for(let i=0; i < this.stuffArray.length; i++){
			
			let obj = this.stuffArray[i]
			
			if(obj.state != 3){							
                  continue;														
			}
			
			cleanedStuff +=1				
			
	   }//for(...)
	   
	   return cleanedStuff
   }
   
  
   showMenu(isShow){
	   
	  let menuDiv = document.getElementById("menuDiv");
	   menuDiv.style.display = 'block'

      	  	   
	   
   }


	
	initEvent(){

   if ('ontouchstart' in document.documentElement === true){
   
   console.log("add touchEvent");
   
   this.canvas.addEventListener("touchstart",this.ts.bind(this));
   this.canvas.addEventListener("touchmove",this.tm.bind(this));
   this.canvas.addEventListener("touchend",this.te.bind(this));
  
   }
   else {

   console.log("add mouseEvent");
  
  //this.canvas.addEventListener("click", onClick, false);
  //------------
  this.canvas.addEventListener("mousedown",this.md.bind(this) );
  this.canvas.addEventListener("mousemove",this.mm.bind(this) );
  this.canvas.addEventListener("mouseup",this.mu.bind(this) ); 

   }

}

   getNumAttachedSubStuff(){

          let numAttach = 0
          
		  for(let i=0; i < this.stuffArray.length ; i++){
			 
                let obj = this.stuffArray[i]			 
				if(obj.state == 1){
			  
                       numAttach += 1
				}
		  }
		  
         return numAttach

	   
   }


    postCleanStuff(){
	  
	  console.log("postCleanStuff")
	  
      this.eyebrow_img.src = "./eyebrow_normal_d.png"
	  this.lip_img.src = "./lip_good_d.png"
	  
     }
	 
	 postFinishJob(){
		 
	  console.log("postFinishJob")		 
		 

		 let ratingDiv = document.getElementById("ratingDiv");
		 ratingDiv.style.display = 'block'
		 
		 let bgDiv = document.getElementById("bgDiv");
		 bgDiv.style.display = 'block'
		 
	 }
	 

  probeFinishJob(curT){
		
   if(this.playstate != playstate_treatment){
	
       return 	
    }
			
	let numTreated = 0
	
	for(let i=0; i < this.stuffArray.length; i++){
					
		let stuff = this.stuffArray[i]
				
		if(stuff.state == Stuff.state_treated){
			
			numTreated++
		}
				
	}
	
	if(numTreated >= this.numTotalStuff){
		
		this.playstate = playstate_finish
		console.log("playstate_finish")			
		
		
		setTimeout(this.postFinishJob, 3000);
		
	}	

  }

// screenX,screenY --> 디바이스기준 
// clientX, clientY --> 브라우저 화면기준(스크롤 미포함)
// pageX, pageY --> 브라우저 화면기준(스크롤을 포함) 
 ts(e){
  
  var touches = e.touches;
  
  
   if(gSelectedPlay == playkind_acne){
	   	   
	   this.ts_acne(touches)
	   
	   return 
   }
   
   var ex = touches[0].pageX.toFixed(2);
   var ey = touches[0].pageY.toFixed(2);
  
   this.lastMovePos.x = ex 
   this.lastMovePos.y = ey 
  
   this.touchSPos= {x:ex, y:ey};


	console.log("touch_start Pos: " + ex + ", " + ey);
  
   let obj = this.getTouchedStuff(this.touchSPos);
  
    if(obj != undefined){		

		this.isDraggingStuff = true 
	    this.sound_move.muted = false 
    			
		//obj.collision_offsetX = obj.x - ex;
		//obj.collision_offsetY = obj.y - ey;
	    
		obj.state = Stuff.state_treating
		
		console.log("objPos: " + obj.x + ", " + obj.y);
		
		console.log("find touchedStuff, sound: muted=false");
	}
    
	//-----------------------------
	this.lastMoveRefPos.x = ex;
	this.lastMoveRefPos.y = ey;		   
	this.lastMoveT = this.appCurT //0.5초후 refPos와 lastMovePos가 같다면 이동중지 상태
	
	//----------------------------
	
   this.isMoveTracking = true;
   this.moveSpeedCheckT = this.appCurT   
   this.moveSpeedCheckPos = {x: ex, y: ey}
 
   var msg = "touch start: (" + ex + ", " + ey + ")" 
   console.log(msg);
     
}


ts_acne(touches){
	

	let posArray = [];
	
	for(let i=0; i < touches.length ; i++){
		
		let tx = touches[i].clientX 
		let ty = touches[i].clientY 
		
		posArray.push({x:tx, y:ty})
	
        console.log("touchStart: " + tx + ", " + ty)   	
    }		
	   
   	
	for(let i =0 ; i < this.stuffArray.length; i++){

			let obj = this.stuffArray[i] 
			//여드름 짠 후 모습			
			
			if(obj.state == 2){
			  // 이미 treated 			
                  continue;			
			}
		
			//obj.x: 부모기준 좌표 
			let objCanvasX = this.closeupRscPos.x + obj.x 
            let objCanvasY = this.closeupRscPos.y + obj.y 

			let diffX = 0, diffY = 0 					
			
			let touchCount = 0
			for(let pi=0; pi < posArray.length; pi++){
			//2개 이상의 터치가 모두 범위 내에 있어야    
			
				diffX = objCanvasX - posArray[pi].x
				diffY = objCanvasY - posArray[pi].y 					
														
				let dist = Math.sqrt(diffX*diffX + diffY*diffY)
			
				if(dist <= 40){
					
			
				   // console.log("distToObj: " + dist + ", touchX: "+tx + "objCanvasX: " + objCanvasX)		
				  
				   //let sprite = this.spriteArray[i]
				   //sprite.play()
				  			 
				   touchCount++
				}		
								
			}//for (pi...)

           if(touchCount >= 1){
			   
			  console.log("obj.state  1(treating)") 
			  obj.state =  1  // treating 
			 	   
			 this.touchCheckT = this.appCurT
       		 this.isExtrudingAcneState = true 
			   			   
		   }

	 } 	
	
	
	let playInfoDiv = document.getElementById("playInfoDiv")
	playInfoDiv.style.display = 'block'
	playInfoDiv.style.top = this.closeupRscPos.y + 'px'	
	
					
}


updatePlayState(){
	
	
	
}

updateAcnePlayState(progress){
	
	let stateProgress = document.getElementById("playProgress") 
	stateProgress.value = progress
	
}


//3초간 유지한 경우 여드름 압출
updateAcneTreatment(curT){
	
    if(this.isExtrudingAcneState != true){

          return 
	 }		 
 
  let elapsedT =  curT - this.touchCheckT  
 
  let  percent = (elapsedT/3000)*100 
  this.updateAcnePlayState(percent)
  
  if(elapsedT >= 3000){
	  
	  console.log("AcneTreatment")	
		
	  for(let i =0 ; i < this.stuffArray.length; i++){

			let obj = this.stuffArray[i] 
			//여드름 짠 후 모습			
			
		     console.log("obj.state: " + obj.state)
			
			//treating인 경우에만
			if(obj.state != 1){ 
			
			   continue 
			}
			
			 obj.state = 2 //treated
			 obj.rscIdx = 1 // 짠 후의 모습 		

            let sprite = this.spriteArray[i]
		    sprite.play()
       	    console.log("sprite.play")

            this.snd_acne_effect.loop = false 
		 	this.snd_acne_effect.currentTime = 0
			this.snd_acne_effect.play() 			
			this.isExtrudingAcneState = false  

    	}	  	  
  
      this.touchCheckT = curT  
	  	  
  }	//	if(elapsedT >= 3000

	
}


begin_extrudeAcne(){
	
	
	
	
}


//screen에 손이 닿은 상태에서 움직일 경우 
 tm(e){
	 
  var touches = e.touches;	 
	
  if(gSelectedPlay == playkind_acne){
	  
	  //this.tm_acne(touches)
	  
	  return 
  }

   if(this.isDraggingStuff == false){
       return;
   }	   

  let ex = touches[0].pageX.toFixed(2) 
  let ey = touches[0].pageY.toFixed(2)
  

 
  let deltaX = ex - this.lastMovePos.x 
  let deltaY = ey - this.lastMovePos.y
  
	
    this.lastMovePos.x = ex
    this.lastMovePos.y = ey

    this.lastMoveRefPos.x = ex;
	this.lastMoveRefPos.y = ey;		   
	this.lastMoveT = this.appCurT //0.5초후 refPos와 lastMovePos가 같다면 이동중지 상태
  
   // var msg = "touch curPos: " + ex + ", " + ey + "delta:(" + deltaX + ", " + deltaY + ")"  
   // console.log(msg);
    
    //움직인 거리만큼 stuff 이동시켜야 함	
    this.moveTouchedStuff(deltaX, deltaY);
     
   if(this.sound_move.muted==true){	   

    //
	 this.sound_move.currentTime = 0
	 this.sound_move.muted = false 
	   
   }
   else { //playing
	   
	   if(this.sound_move.ended == true){
		   
			this.sound_move.currentTime = 0
			 //this.sound_move.volume = 1.0
	   }
	   
	  // this.sound_move.play();	      
      // this.isPlayMovesound = true;
   }
   
   
    let offset = 150 
    let centerRefPos =  {x: this.closeupRscPos.x+offset , y: this.closeupRscPos.y+offset}
		
	 let lastNumCleanedStuff = this.numCleanedStuff	
		
 	 this.numCleanedStuff = this.probe_touchedStuff_removal(centerRefPos, 140);
	
	 if(this.numCleanedStuff > lastNumCleanedStuff){
		 
          		 this.postCleanStuff()
	 }
	
	//this.numCleanedStuff = this.getNumCleanedStuff()
	
	if(this.numCleanedStuff >= this.numTotalStuff){	
		 //clearStage
    	this.playstate = playstate_finish
		console.log("playstate_clear")		
		
		this.postFinishJob()
		
	} 
   
 }
 
 

 


	te(e){

	console.log("touch end"); 
	
	this.isMoveTracking = false
	this.isDraggingStuff = false  
	
	
	this.sound_move.muted = true 
	//this.sound_move.pause();
	//this.sound_move.volume = 0.0
	
	this.releaseTouchedStuff();

    //---acne------------
	 this.isExtrudingAcneState = false
	
	 let playInfoDiv = document.getElementById("playInfoDiv")
	 playInfoDiv.style.display = 'none'
	//-------------------
	
	}

    //--------------------
 
     md(e){

		  console.log("mouse down");
		  
		   let curX = e.offsetX
		   let curY = e.offsetY
		   
		   this.lastMovePos.x = curX 
           this.lastMovePos.y = curY
		   
		   this.isMoveTracking = true;
		  		  
		}

     mm(e){
  
		   if(this.isMoveTracking == true){			   

		   let curX = e.layerX
		   let curY = e.layerY
		  
		   //let lastX = this.lastMovePos.x 
		  
		   let deltaX = curX - this.lastMovePos.x 
           let deltaY = curY - this.lastMovePos.y
			   
		   let msg = "mouse move:delta: " + deltaX + ", " + deltaY 
		  		  
		   this.toolPos.x += deltaX
		   this.toolPos.y += deltaY
		   
		   this.lastMovePos.x = curX;
		   this.lastMovePos.y = curY;

          //-------------------
           //this.lastMoveRefPos.x = curX;
           //this.lastMoveRefPos.y = curY;		   
		   //this.lastMoveT = this.appCurT //0.5초후 refPos와 lastMovePos가 같다면 이동중지 상태
		   //-----------------
		   
	  	   console.log(msg);
		   
		   let numStuff = this.getNumAttachedSubStuff();
		   				   		   		   
		   if(this.isMoveTracking == true  &&numStuff >0 ){
	   
	   
			   if(this.sound_move.ended==true){

	                //재생위치를 처음으로
 	                this.sound_move.currentTime = 0;	
				    this.sound_move.play();
  				   
			   }
			   else {				   
				   
				    this.sound_move.play();
				   
			   }
				
				this.isPlayMovesound = true;
		  
 		   }
		   
	   			   
		   }
		
		   
		}

		  mu(e){


            this.isMoveTracking = false;
			this.isDraggingStuff = true 
			this.sound_move.pause();
		

  	   	  }
		
}






window.onload = function(){
	
	console.log("window.load");

	new App();
		
}

