class  earCleaning {


   
   constructor(){
	   
      this.face_img = new Image();
	  this.face_img.src = "./face_base-02.png";
	
      this.closeup_img = new Image();
	  this.closeup_img.src = "closeup_ear.png";
	  
	  this.stuff_img = new Image();
      this.stuff_img.src = "earwax_type.png";

	  this.eyebrow_img = new Image();
      this.eyebrow_img.src = "eyebrow_normal-01.png";
	  
	  this.earswab_img = new Image();
      this.earswab_img.src = "./ear_swab.png";
	  

	  this.eyeclose_img = new Image();
      this.eyeclose_img.src = "eye_close-01-d.png";

	  
	  this.highlight_bg_img = new Image();
	  this.highlight_bg_img.src = "./highlight_bg.png"
	  
	  this.lipbad_img = new Image();
	  this.lipbad_img.src = "./lip_bad-01.png"
	  
	   this.faceProp = 0
	   
	 //   console.log("lip_bad: "+ face_lip_bad)
	   
	 //  this.faceProp |= face_lip_bad
	   
	   if( (this.faceProp&face_lip_bad) != 0){
		   
		   console.log('has lip_bad')
	   }
	  
	  
   	 
  
	   this.sound_treatment = new Audio("effect-01.wav"); 
	   this.sound_treatment.loop = true
		   
	   this.sound_bg = new Audio("white_noise-01.mp3"); 
	   this.sound_bg.loop = true
	  
			  		
      this.isTreatingStuff = false
	  
      
	  this.touchSPos= {x:0, y:0};

	  this.stuffArray = [] 		
	  
	  this.lastMovePos = {x: 0, y: 0} 
	  this.lastMoveRefPos = {x: 0, y: 0} 
	  this.lastMoveT = 0
	  this.appCurT = 0
	  //touch시작 Time
	  this.touchST = 0
	  
      //---------------	
	  this.moveSpeedCheckT = 0
      this.moveSpeedCheckPos = {x: 0, y: 0}
	  
	  //---------------
	  
	  this.numTotalStuff = 0
	  this.numTreatedStuff = 0
	  
	  //-----------	  
	  this.trashcanPos = {x:0, y:0}
	  this.trashcan_img = new Image();
	  this.trashcan_img.src = './trashcan.png'
      	  
	  this.isShowTrashcan = false 	  
	     
	  this.objV = 1.5
	  this.moveDist = 0
	  this.objAddedW = 0.0
	  
	  
	  this.isTouchState = false 
	  
	  this.curSwabDir = 0
		 
    }

	
	beginPrepare(){
				
		this.sound_bg.play()
		
	 let stateProgress = document.getElementById("playProgress") 
	   stateProgress.value = 0 		
	
	}
	

   //===================
   // commonInterface
   //================   
	updateFrame(curT){
		
	    this.appCurT = curT
				
        if(this.isTreatingStuff  == true){
		   
	        let elapsedT = curT - this.lastMoveT 

	 	   if( elapsedT >= 1000 ){
			   
             //   console.log('elapsedT: ' + elapsedT)			   
			 /*
			 if((this.lastMoveRefPos.x == this.lastMovePos.x) && 
			    (this.lastMoveRefPos.y ==this.lastMovePos.y) ){
                //마지막 움직임이후 0.5초 동안 이동없음
				
	    		   this.sound_treatment.muted = true			 
			 }					 
			 */			 
	           this.sound_treatment.muted = true			 
			 
		
  	 	 }
		 else {
		 
		 }
		 
		 		 
		 this.probe_dragSpeed(curT)
		 
	  } //if(this.isTreatingStuff 
		 	 
				
	} //updateFrame
	
	
	
	//==================
	//
	//==================
    draw(ctx){
		
        //=======================    	 
     	//draw face{facial expression
		//======================
       //canvas size보다 작게 유지 
	   //600x632
	  
	  let cfaceW = 300 
	  let offsetX = (gClientWidth - cfaceW)*0.5
	  
	  
	  this.drawFace(ctx, this.faceProp)

	   
	   //rest일 때는 얼굴만 
	   if(gPlaystate == playstate_treatment ){


             ctx.globalAlpha = 0.7;
			 ctx.drawImage(this.highlight_bg_img, 0, 0, gClientWidth, gClientHeight )
   		     ctx.globalAlpha = 1.0;
					   		   
				   
			//let drawPosY = gClientHeight - 300
			let drawPosY = 0
			
		     ctx.drawImage(this.closeup_img, offsetX, drawPosY); 
			 		
			if(this.isShowTrashcan){
								
				//closeUPLT
				let w = 60, h=60
				let trashcanDrawX = 0 + offsetX + 150 + this.trashcanPos.x - (w/2)
				let trashcanDrawY = 0 + 150 + this.trashcanPos.y - (h/2)
											
			    ctx.drawImage(this.trashcan_img, trashcanDrawX, trashcanDrawY, w, h);	
				
			}
						
						
            let parentDrawX = 0
            let parentDrawY = 0
           // let refX = parentDrawX, refY = parentDrawY
       		 let refX = 150, refY = 150
       			
								
			let touchElapsT = this.appCurT - 	this.touchST 
				
			//drawStuff
			 for(let i=0; i < this.stuffArray.length; i++){
						   
					   let obj = this.stuffArray[i]
					   //obj size  50x50
					   //obj.rscIdx 
					   if(obj.state  == 2){
						 continue;
					   }							   
								   
						 
				    let rscIdx = obj.rscIdx 
					
					if(obj.state == Stuff.state_treating){
						
					}					 
						 
					let sx = 50*rscIdx 
					let yIdx = obj.rscIdx/5;
					let sy = 50*yIdx 		
					
				   // let diffX = this.lastMovePos.x - this.touchSPos.x 
				   // let diffY = this.lastMovePos.y - this.touchSPos.y 
					
					//let dx = refX+ obj.x - obj.radius   
					//let dy = refY+ obj.y - obj.radius
				
	  		     	let dx = obj.drawPosX   
					let dy = obj.drawPosY
			     
					if(obj.state==Stuff.state_treating ){
					
	                    let cw =  50 
                        let ch  =  50						
												 
						 //drawImage_angle2(ctx, image, x, y, degrees, scale)
						 //drawImage_angle2(ctx, this.stuff_img, dx, dy, 30, 1.0) 
						 //drawImage_angleEx(ctx, rscIdx, dx, dy, degrees, scaleX=1.0, scaleY=1.0)
						 						 
						 let angle = 0//getRandomVal(10, 15)
						 
						 let offsetW = 0
						 
						 if(this.curSwabDir == dir_right){
							 
							 //offsetW = -10							 
							 //dx = this.lastMovePos.x + 5
							 
						 }
						 else {

							 //offsetW = -10							 
							 //dx = this.lastMovePos.x - 5
							 
						 }
						 
						 //dx, dy 캔버스기준 이미지 LT좌표
						 //this.draw_treatingStuff_ex(ctx, obj.rscIdx, dx, dy,  cw, ch, diffX, diffY)
						 
						 
                         ctx.drawImage(this.stuff_img, sx, sy, 50, 50, dx, dy, 50+ offsetW, 50);	
						
												 
					}
					else {
					
				
					   ctx.save();
           		       ctx.globalAlpha = 0.6;	 	
                      // console.log('dx: ' + dx + ", " + "dy: " + dy);																	   
                       ctx.drawImage(this.stuff_img, sx, sy, 50, 50, dx, dy, 50, 50);	
					   
						 //context 반환
                    	  ctx.restore();

					
					}
					   
			  }			   	
			  

			   this.drawEarSwab(ctx)
			
			
   	    }
		
	
		//---------------
		if(gPlaystate == playstate_rest || gPlaystate == playstate_finish){
			
			ctx.drawImage(gUpperBody_img, 0, 0)
						
			ctx.globalAlpha = 0.7;
			ctx.drawImage(this.highlight_bg_img, 0, 0, gClientWidth, gClientHeight )
   		    ctx.globalAlpha = 1.0;

						
		}
					
	
	}
	
	drawEarSwab(ctx){
  
          //30x200  
		  let w=30 , h=200 
	
		   let  drawX = this.lastMovePos.x - (w/2)
		   let  drawY = this.lastMovePos.y	- (h/2)	   
			   			   
			ctx.drawImage(this.earswab_img, drawX, drawY, 30,200);	
					   		
	}
	
	
  drawFace(ctx, faceProp){

	   let imgW = 600	 
	   let imgH = 900 
       let imgRatio = imgH/imgW
	
	   //canvas기준 넓이 
	   let cfaceW = 300 
	   let cfaceH = 300*imgRatio 
	   
	   let offsetX = (gClientWidth - cfaceW)*0.5
	  
	 
	   let width_scale = 300/600 
	   let height_scale = cfaceH/900
	   
	   let faceDrawX = offsetX 
       let faceDrawY = 0
	   
	   //중앙정렬
	   	 
      if(gPlaystate == playstate_prepare || gPlaystate == playstate_treatment){ 


         if(gPlaystate == playstate_prepare){

               faceDrawY =  gClientHeight - cfaceH
		   
		   }
		   else if( gPlaystate == playstate_treatment){
			   
			  // faceDrawY = 0
			   faceDrawY =  300//gClientHeight - cfaceH
			   
		   }

	   
      //drawImage( img, cx, cy, cwidth, cheight )
      ctx.drawImage(this.face_img, offsetX, faceDrawY,  cfaceW, cfaceH);

      
       let dx = faceDrawX + 167*300/600
       let dy = faceDrawY +197*cfaceH/imgH	
	   
	   let cw = 276*300/600		
       let ch = 39*cfaceH/imgH		
       //drawImage( img, cx, cy, cwidth, cheight )
	   ctx.drawImage(this.eyebrow_img,  dx,  dy, cw, ch);
	   
	   //eyeclose위치 175, 236
	    dx = faceDrawX + 175*300/600
        dy = faceDrawY + 236*cfaceH/imgH	   
		
         cw = 258*width_scale	
         ch = 67*height_scale			
   	    ctx.drawImage(this.eyeclose_img, dx, dy, cw, ch);
		//==========================
				
			if((this.faceProp&face_lip_bad) != 0){
				
				 dx = faceDrawX + 246*300/600
	 			 dy = faceDrawY + 375*cfaceH/imgH	   
				
				 cw = 118*width_scale	
				 ch = 64*height_scale			
				 ctx.drawImage(this.lipbad_img, dx, dy, cw, ch);
				
			}

	  }
	   	





  }	  

//dx,dy 이미지 중심
 draw_treatingStuff(ctx, rscIdx, c_left, c_top, degrees, width, height, diffX=0) {

	ctx.save();
	
	let dx = c_left + (width/2)
    let dy = c_top + (height/2)

//   console.log("cx, cy: " +  	dx + ", " + dy)
   
   //캔버스의 원점 이동 
	ctx.translate(dx, dy);

    //회전중심은 항상 캔버스의 0*0지점이 원점
	ctx.rotate(degrees * Math.PI/180);

    if(rscIdx ==0) {

	   	   	   
     }
	 
	  let image = this.stuff_img
	
	  //offsetX만큼 늘리기 
	  let drawX = -(width/2)
	  let drawY = -(height/2)
	  
	 // console.log("c_left: " + c_left + ", -(width/2): " +drawX)	  	  
	  
	  //let drawX = c_left 
	  //let drawY = c_top
	  
	  //diffX > 0  : ----> 
	   //diffX < 0 : <-----
	
	  let addedW = 0
	  if(diffX < 0) {
		 
		  addedW = -1*diffX
		 
		  drawX = -(width/2)
	      drawY = -(height/2)
		  
	  }
	  else {
		 		 
		  addedW = diffX
		  drawX = -(width/2) -diffX
		  
	  }
	  	
	  ctx.drawImage(this.stuff_img, 0, 0, 50, 50, drawX, drawY, width+addedW, height);	

	  //ctx.drawImage(image, -(w/2), -(h/2), w, h);

     // we’re done with the rotating so restore the unrotated context

}


//dx,dy 이미지 중심
//rscIdx(zero-based)
 draw_treatingStuff_ex(ctx, rscIdx, c_left, c_top,  width,  height, diffX=0, diffY=0) {

	//ctx.save();
	
	//let dx = c_left + (width/2)
    //let dy = c_top + (height/2)

     let srcX , srcY 
	 
	 let xIdx = rscIdx %5
	 let yIdx = rscIdx /5 
	
	 let sx = xIdx*50 
	 let sy = yIdx*50
	 	 
	 let widthOffset = Math.abs(diffX)
     let heightOffset = Math.abs(diffY)

     if(widthOffset > heightOffset){

        
	 }		
	 
	 
	  let image = this.stuff_img
	
	  //offsetX만큼 늘리기 
	  let drawX = c_left
	  let drawY = c_top 
	  
	 //console.log("c_left: " + c_left + ", -(width/2): " +drawX)	  	  
	  
	  //let drawX = c_left 
	  //let drawY = c_top
       let addedH  = 0	 
	   if(diffY > 0){
		   
		   addedH = diffY 
	   }
	   else {
		  
 		   addedH = -1*diffY 
	   }
	   
	     	 
	  //diffX > 0  : ----> 
	  //diffX < 0 : <----	
	  let addedW = 0
	  if(diffX > 0) {
		  //------->
		  
		  addedW = diffX
		  drawX = c_left 
          drawY = c_top	  
		  
		  //drawX = -(width/2)
	      //drawY = -(height/2)
		  
	  }
	  else {
		  //<-----

		 // addedW = -1*diffX		  
		  
		  drawX = c_left 
          drawY = c_top   
		
	  }
	  
	    addedH = 0
	  
	  if(addedW > 15) {
		  
		  addedW = 15
		  
	  }
	  		
      
		
	
	    ctx.drawImage(this.stuff_img, sx, sy, 50, 50, drawX, drawY, width-addedW, height-addedH);	
        ctx.restore();

	  //ctx.drawImage(image, -(w/2), -(h/2), w, h);

     // we’re done with the rotating so restore the unrotated context
	 //context 반환
  	  //ctx.restore();

}


	
	//==============
	//common interface
	//=============
	beginTreatment(){
		//prepare 끝났을 때 호출
	
       console.log('beginTreatment');	
	   	   
	   this.sound_bg.pause()
		
		//150, 300+150 		
		let refPos = {x:150, y: 150}
		
		this.totalTreatedStuff = 2
		this.numTreatedStuff = 0
		
		this.createEarwax(refPos, 2);
		
	}
	
	
	//미리 할당된 자리에 생성되는 것으로 변경해야 함
	//refPos -->closeup 중심점
	createEarwax(refPos, num){
				
		this.stuffArray.length = 0;
		
		//40x40
		for(let i=0; i < num; i++){
			
       	      let earwax = new Stuff();
			  earwax.radius = 10;
             			 
			 let genX =  getRandomVal(-100, 100);
             let genY =   getRandomVal(-100, 100);			
			 
			    //중심점 기준 상대좌표
				// -3,+5 --->  closeup 좌측상단기준: (150-3 , 150+5)
				earwax.x =  genX
         		earwax.y =  genY 
				
				earwax.rscIdx= i 
				
				//canvas기준 위치 
				earwax.drawPosX = 0 + refPos.x + genX 
				earwax.drawPosY = 0 + refPos.y + genY  

              console.log("createEarwax:drawPos: " + earwax.drawPosX  + ", " + earwax.drawPosY );
			  

               this.stuffArray.push(earwax)
		  }

		
	}
	
	
	
	//------------------------------
	//
	//-------------------------------
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
				   
				   //this.isEyeclose = false
				   //this.eyebrow_img.src = "eyebrow_pain.png"
				   //this.lipbad_img.src = "lip_bad-01.png"		

                   this.faceProp |= face_lip_bad				   
				   
				   
				}
				else { //normal, good
	
		
				   this.isEyeclose = true 					
				}
			
			   this.moveSpeedCheckPos.x  = this.lastMovePos.x 
			   this.moveSpeedCheckPos.y  = this.lastMovePos.y 
			   this.moveSpeedCheckT = curT		   
	      }
	
	}
		
	//==============
	//common interface
	//=============
   //
   touchS(e){

        this.isTouchState  = true 

        let touches = e.touches 

		let tx = touches[0].clientX 
		let ty = touches[0].clientY 

       console.log("x: " + tx + ", " + "y: " + ty); 		
	  
		   
	   this.lastMovePos.x = tx 
	   this.lastMovePos.y = ty 

		this.touchSPos= {x:tx, y:ty};

		//console.log("touch_start Pos: " + ex + ", " + ey);
		
		let swabW = 30
		let swabH = 200 
		
		let probePos = {x: tx-(swabW/2), y: ty-(swabH/2)} 
		  
		let obj = this.getTouchedStuff(probePos);
	  
		if(obj != undefined){		

			this.isTreatingStuff = true	
			this.lastMoveT = this.appCurT
			
			this.touchST = this.appCurT
						
			//obj.collision_offsetX = obj.x - ex;
			//obj.collision_offsetY = obj.y - ey;
			
			obj.state = Stuff.state_treating
			
			console.log("objPos: " + obj.x + ", " + obj.y);
			
			console.log("find touchedStuff, sound: muted=false");
			
			this.objV = 1.5 
			this.moveDist = 0
			
			this.sound_treatment.currentTime = 0
			this.sound_treatment.play()
			
			//-------------
			//목표 trash를 표시해 주어야 합니다.
			//------------
			this.trashcanPos = this.procTrashcan(obj.x, obj.y)
			this.isShowTrashcan = true 
			
			console.log("trashcanPos: " + this.trashcanPos.x + ",  " + this.trashcanPos.y)		
	
		   //-----
		   this.moveSpeedCheckT = this.appCurT
		   this.moveSpeedCheckPos = {x: tx, y: ty}
		   //-----
	 }
	 else {
		
		console.log("touchS:  not touched stuff");
		
	 }
	


    }

	//==============
	//common interface
	//=============
   touchM(e){
	   	   
        console.log("touchM:  ");
	   
	   if(gPlaystate != playstate_treatment){
		   
		    return 
	    }
	   
    	 let touches = e.touches 

		let tx = touches[0].clientX 
		let ty = touches[0].clientY 

	    let deltaX =  tx - this.lastMovePos.x 
	    let deltaY =  ty - this.lastMovePos.y
		
		if(deltaX >0){
		
		   this.curSwabDir = dir_right
		}
		else if(deltaX < 0) {
			
			 this.curSwabDir = dir_left
		}
			
		
		
    let swabW = 30
	let swabH = 200 
	
	
	
	
	
	let probePos = {x: tx-(swabW/2), y: ty-(swabH/2)} 
	  
    let obj = this.getTouchedStuff(probePos);
	
	if(obj != undefined){
		
		if(obj.state == Stuff.state_normal){
			
			obj.state = Stuff.state_treating
            this.isTreatingStuff = true 		
		
			if(this.sound_treatment.paused){
				
				this.sound_treatment.play()
			}
			
		}
		
		this.trashcanPos = this.procTrashcan(obj.x, obj.y)
		this.isShowTrashcan = true 
		
		this.objAddedW = -20
				
   	}						      	
	
      this.moveTouchedStuff(deltaX, deltaY)
				
				
		if(deltaX < 0) {		
  		   deltaX  = -1 *deltaX
		}
		
		this.moveDist += deltaX 

	  this.lastMovePos.x = tx 
	  this.lastMovePos.y = ty 		 
		
	 
		 //------------
		 this.lastMoveT = this.appCurT
		 
		 this.lastMoveRefPos.x = tx 
		 this.lastMoveRefPos.y = ty 
		  
		if(this.sound_treatment.muted==true){	   

		//
		  this.sound_treatment.currentTime = 0
		  this.sound_treatment.muted = false 
		   
		}
		else { //playing
		   
		   if(this.sound_treatment.ended == true){
			   
				this.sound_treatment.currentTime = 0
				 //this.sound_move.volume = 1.0
		   }
		   
		}
		
		let lastNumTreated = this.numTreatedStuff

        //trashcan에 들어간 경우 제거 		 
		this.numTreatedStuff = this.probe_touchedStuff_removal_d(140)
		
		if(this.numTreatedStuff > lastNumTreated){
			
			//추가로 치료 
			this.postAddTreatedStuff()
			
		}
	
	
	   let pcnt = (this.numTreatedStuff/this.totalTreatedStuff)*100
	
	   //console.log('progress: ' + progress)
 	   let stateProgress = document.getElementById("playProgress") 
	   stateProgress.value = pcnt		

		
		if(this.numTreatedStuff >= this.totalTreatedStuff){
			
			this.isTreatingStuff = false; 
			
			//clearStage
			gPlaystate = playstate_rest	
			
			showSysMsg("begin-->playstate_rest", 0)
           
            this.sound_bg.play()		   
		
			//rest 때 = prepare 사운드를 사용
			
			 //100초후
             //함수만 넘겨주는 것이므로 bind(this) 빼먹지 말기			
			setTimeout(this.end_playstate_rest.bind(this), 10000)		
		}
	   
  }



	//==============
	//common interface
	//=============
   touchE(e){
	   
	   this.isTouchState  = false 
	   
	   this.objAddedW = 0
	   
	    this.isTreatingStuff = false 
		this.isShowTrashcan = false
		this.sound_treatment.pause() 
		
        this.moveDist = 0
		
		for(let i=0; i < this.stuffArray.length; i++){
			
			let obj = this.stuffArray[i]
			
			if(obj.state == 1){
								
			   obj.state = Stuff.state_normal					
			}										

	   }//for(...)
	   
       
		
	   
   }

 
 //touchPos -->canvas기준 좌표 
  getTouchedStuff(touchPos){

	//	console.log("---getTouchedStuff---");
		
		   //collison 등
		for(let i=0; i < this.stuffArray.length; i++){
			
			let obj = this.stuffArray[i]
			
			if(obj.state == Stuff.state_treated){
				
				continue 
			}
			
			let objCanvasCenterX = obj.drawPosX + obj.radius 
	        let objCanvasCenterY = obj.drawPosY + obj.radius 
								
			let cA = {x: objCanvasCenterX ,  y: objCanvasCenterY,  r: obj.radius}; 			
			           			
		//	console.log("objCanvasCenterPos: " + objCanvasCenterX +"," + objCanvasCenterY + "radius" + obj.radius);
															
			let rCollision = isInCircle(cA, touchPos)
			
			if(rCollision == true){
			
               return obj									
			}
		
	    }
		
	}
	
	//objPos(obj의 closeUp 중심점 기준 상대좌표: (ex) (-3, +5)    
	//return closeUp중심점 기준 상대좌표 
	procTrashcan(objX, objY){

    //
    //   
   	let degree = 180 
	const radius = 150 
	var radian = degree*(Math.PI/180)
	
    let x =  1*Math.cos(radian) - 0*Math.sin(radian)
    let y =  1*Math.sin(radian) + 0*Math.cos(radian)    
	
	let dstX = x*radius 
	let dstY = y*radius  	
	
	console.log("raotated UnitV: " + x + ", " + y)
	
	
	  return {x:0 , y: 150}
	
	   //  return {x:dstX , y: dstY}
		
	}
	
/*	
void rotate(  float* nx, float* ny, float tx, float ty, float cx, float cy,  float q )
{
    float cosq = cos( q ), sinq = sin( q );

    // 회전중심점 C가 원점  O와 일치하도록 회전할 점 T를 함께 평행이동
    tx -= cx, ty -= cy;

    // 원점 O에 대하여 회전할 점 T를 q라디안 만큼 회전
    *nx  =  tx *  cosq - ty * sinq;
    *ny =  ty * cosq + tx * sinq;

    // 원점 O가 원래의 회전 중심점 C와 일치하도록 회전된 점 N과 함께 이동
    *nx += cx, *ny += cy;
}
*/


	
	
    moveTouchedStuff(deltaX, deltaY){
	   
	    for(let i=0; i < this.stuffArray.length; i++){
			
			let obj = this.stuffArray[i]
			
			if(obj.state == 1){
								
				obj.x += deltaX;
                obj.y += deltaY;				
								
				obj.drawPosX += deltaX;
				obj.drawPosY += deltaY;		
           
		         console.log('drawPos: ' + obj.drawPosX + ", " + obj.drawPosY) 
				
			}										

	   }//for(...)
	   
	   
   }
	
	
	 //refPos에서 refDist이상이면 cleaned
   //새롭게 clean된 것을 반환
   probe_touchedStuff_removal(refDist){

        let  treatedStuff=0	  
	  
	    for(let i=0; i < this.stuffArray.length; i++){
			
			let obj = this.stuffArray[i]
			
			if(obj.state == 0 ){							
                  continue;														
			}
			
			if(obj.state == Stuff.state_treated){
				
				treatedStuff += 1;
				continue;
			}
			
			//treating 상태인 stuff만 체크 
			
	        let objPos = {x: obj.x , y: obj.y}
	
            //let dist = getDistSqrt( refPos, objPos); 		
			
			let dist = Math.sqrt(obj.x*obj.x + obj.y*obj.y)
						
			if(dist >= refDist){
				
				treatedStuff +=1				
				//cleaned 
				obj.state = 2
				console.log("remove stuff: " + dist)
			}
			
	   }//for(...)
	   
       return treatedStuff
   }

  //trashcan과 가까운 것 처리 
   probe_touchedStuff_removal_d(refDist){

        let  treatedStuff=0	  
	  
	    for(let i=0; i < this.stuffArray.length; i++){
			
			let obj = this.stuffArray[i]
			
			if(obj.state == 0 ){							
                  continue;														
			}
			
			if(obj.state == Stuff.state_treated){
				
				treatedStuff += 1;
				continue;
			}
			
			//treating 상태인 stuff만 체크 
            //objPos--> closeup 중심기준 상대좌표 			
	        let objPos = {x: obj.x , y: obj.y}
			
			
			let diffX = this.trashcanPos.x  - objPos.x 
			let diffY = this.trashcanPos.y  - objPos.y
			
			let dist = Math.sqrt(diffX*diffX + diffY*diffY)
  
            if(dist < 50){
			 
				treatedStuff +=1				
				//cleaned 
				obj.state = 2
				console.log("remove stuff: " + dist)				
				
			}
				
	   }//for(...)
	   
       return treatedStuff
   }
   
  //================    
  //
  //===============
  postAddTreatedStuff(){
	  
	  //웃는 얼굴등...
	  	console.log("postAddTreatedStuff")
	  
  }
  
  
  end_playstate_rest(){

	  console.log("end_playstate_rest")		 
	  
	  gPlaystate = playstate_finish
	  
      this.postFinishJob()
	  
	  
  }
  
  
  //rating 닫기 버튼 누를 때까지 
  //배경음 등 보여주기  
   postFinishJob() {
		 
	  console.log("postFinishJob")		 
		 
	  let ratingDiv = document.getElementById("ratingDiv");
	  ratingDiv.style.display = 'block'
	 
	  let bgDiv = document.getElementById("bgDiv");
	  bgDiv.style.display = 'block'
	  
	 /* 
	 // this.sound_bg.pause()
	  
	  let event = new CustomEvent("postFinishJob", {
	
                                            	detail:
										       {msg: "(_ _)v"}
	  	                                    });
	  
	  document.dispatchEvent(event);

     */		
		
	 } //postFinishJob 
		
 
   //user가 rating 닫기 누를 때
   closePlay(){
 
        this.sound_bg.pause()
		hideSysMsg()
        
    }	   
		
		
}
