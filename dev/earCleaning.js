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

      this.eyeopen_img = new Image();
	  this.eyeopen_img.src = 'eye_open-01-d.png' 
	  
	  this.highlight_bg_img = new Image();
	  this.highlight_bg_img.src = "./highlight_bg.png"
	  
	  this.lipbad_img = new Image();
	  this.lipbad_img.src = "./lip_bad-01.png"
	  
	  this.lipgood_img = new Image();
	  this.lipgood_img.src = "./lip_good.png"
	  
	  
	  this.bubble_img = new Image();
	  this.bubble_img.src = "./speech_bubble.png"
	  
	 // this.dialogST = 0 
	  this.dialogMsg = ""
	  
	 
	 
	  
	   this.faceProp = facestate_good
	  

       this.bottomFrame_img = new Image();
	   this.bottomFrame_img.src = './bottom_frame.png'
	   
	  
	 //   console.log("lip_bad: "+ face_lip_bad)
	   
	 //  this.faceProp |= face_lip_bad
	   
	   if( (this.faceProp&facestate_good) != 0){
		   
		   console.log('facestate_good')
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
	  //0.5초 안에 100이상 이면 too fast 
	  this.moveSpeedDist = 0;
	  this.touchMoveDist = 0;
	  
	  //---------------
	  
	  this.numTotalStuff = 0
	  this.numTreatedStuff = 0
	  
	  //-----------	  
	  this.trashcanPos = {x:0, y:0}
	  this.trashcan_img = new Image();
	  this.trashcan_img.src = './trashcan.png'
      	  
	  this.isShowTrashcan = false 	  
	     
	  this.objV = 1.5
	  this.objAddedW = 0.0
	  
	  
	  this.isShowTool = false  
	  
	  
	  this.isTouchState = false 
	  
	

      this.closeUpDrawPos = {x: 0, y: 220}
	  
	  this.treatingStuff_id = 0
		 
      this.faceEventST = 0
	  
	
	  
	  
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
				
		if(this.treatingStuff_id > 0){
		   
	        let elapsedT = curT - this.lastMoveT 

	 	   if( elapsedT >= 1000 ){
			   			   
			   if(this.touchMoveDist <= 2 ){
				   
         	           this.sound_treatment.pause()	
					  // console.log('sound pause')
					   
			   }
			   			   
               // console.log('touchMoveDist: ' + this.touchMoveDist)			   
			
               this.touchMoveDist = 0 		
				
  	   	  }
		 		 
		  this.probe_dragSpeed(curT)
		 
	  } //if(his.treatingStuff_id > 0)
		 	 
				
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
      //-------------------	 
	  //원본 이미지(upper_body)  
	  let imgRatio = 850/370
	  let cWidth = 400  
	  let cHeight = 400*imgRatio
	  
	  let offsetX = (gClientWidth - cWidth)*0.5
	  let drawPosY;		
	  
	
	
	  //this.drawFace(ctx, this.faceProp)
	    if(gPlaystate == playstate_prepare || gPlaystate == playstate_treatment){
						
						
		    cWidth  = 400 
		    cHeight = cWidth*imgRatio		
			
			let xOffsetRatio = cWidth/370
			let yOffsetRatio = cHeight/850			
			
	        ctx.drawImage(gUpperBody_img, 0, 0, cWidth, cHeight)
              			
		   this.updateFace(ctx, this.faceProp, 0, 0, xOffsetRatio, yOffsetRatio )
			  
			drawPosY = gClientHeight - 130		
		    ctx.drawImage(this.bottomFrame_img, 0, drawPosY)
			
		}
		else if( gPlaystate == playstate_rest || gPlaystate == playstate_finish){

             cWidth  = 350 
		     cHeight = 350*imgRatio
	         offsetX = (gClientWidth - cWidth)*0.5
				  
			ctx.drawImage(gUpperBody_img, offsetX, 0, cWidth, cHeight)

         	ctx.save()
			ctx.globalAlpha = 0.7;
			ctx.drawImage(this.highlight_bg_img, 0, 0, gClientWidth, gClientHeight )
			
			ctx.restore()
		}
		
		
	

	   //rest일 때는 얼굴만 
	   if(gPlaystate == playstate_treatment ){

             ctx.globalAlpha = 0.7;
			 ctx.drawImage(this.highlight_bg_img, 0, 0, gClientWidth, gClientHeight )
   		     ctx.globalAlpha = 1.0;
					   		   

             //closeUP size_canvas(원본: 300x300)  
			  cWidth = 300
              offsetX = (gClientWidth - cWidth)*0.5							   
							   
				   
			//let drawPosY = gClientHeight - 300
			 drawPosY = this.closeUpDrawPos.y
			
		     ctx.drawImage(this.closeup_img, offsetX, this.closeUpDrawPos.y); 
			 		
			if(this.isShowTrashcan){
								
				//closeUPLT
				let w = 60, h=60
				let trashcanDrawX = 0 + offsetX + 150 + this.trashcanPos.x - (w/2)
				let trashcanDrawY = 0 + drawPosY + 150 + this.trashcanPos.y - (h/2)
											
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
			  
			  
			  if(this.isShowTool){
			  
			      this.drawEarSwab(ctx)
			  
			  }
			
   	    } //end treatment
		
		
		this.drawDialog(ctx)
	
		
	/*
		//---------------
		if(gPlaystate == playstate_rest || gPlaystate == playstate_finish){
			
			ctx.drawImage(gUpperBody_img, 0, 0)
						
			ctx.globalAlpha = 0.7;
			ctx.drawImage(this.highlight_bg_img, 0, 0, gClientWidth, gClientHeight )
   		    ctx.globalAlpha = 1.0;

						
		}
*/
		
	
	}
	
	drawEarSwab(ctx){
  
          //30x200  
		  let w=30 , h=200 
	
		   let  drawX = this.lastMovePos.x - (w/2)
		   let  drawY = this.lastMovePos.y	- h*(2/3)	   
			   			   
			ctx.drawImage(this.earswab_img, drawX, drawY, 30,200);	
					   		
	}
	
	//==================
	//
	//=================
	updateFace(ctx, faceProp, refDrawX, refDrawY, xOffsetRatio, yOffsetRatio){
	  
	  let refX = 0
	  let refY = 0
	  let cx, cy 
	
		if((faceProp&facestate_bad) !=0){
						
					
			//132, 85
			cx = 132*xOffsetRatio; 
            cy = 85*yOffsetRatio;  			
		    ctx.drawImage(this.eyebrow_img, cx, cy)
			
            //135, 101
			cx = 135*xOffsetRatio; 
            cy = 101*yOffsetRatio;  						
			ctx.drawImage(this.eyeopen_img, cx, cy)
			
			//lip normal  
		}
		else if((faceProp&facestate_bad2) !=0){
						
		   //eyebrow
		   ctx.drawImage(this.eyebrow_bad_img, 132, 85)
		  
		   ctx.drawImage(this.eyeopen_img, 135, 101)
		  
		  	let cx = refX + 160
		   let cy = refY + 158
				
				/*
				 dx = faceDrawX + 246*300/600
	 			 dy = faceDrawY + 375*cfaceH/imgH	   
				
				 cw = 118*width_scale	
				 ch = 64*height_scale	
                */	
			 ctx.drawImage(this.lipbad_img, cx, cy);
			
		}
		else if( (faceProp&facestate_good) != 0 ){
			
			console.log('facestate_good')
			//132, 85
	      cx = 132*xOffsetRatio; 
	  	  cy = 85*yOffsetRatio;  			
          ctx.drawImage(this.eyebrow_img, cx, cy)
			
			
			cx = 153*xOffsetRatio; 
	      	cy = 156*yOffsetRatio;  			
            ctx.drawImage(this.lipgood_img, cx, cy);

                		
		}
		else {
		//eyebrow 
		
		//132, 85
		cx = 132*xOffsetRatio; 
		cy = 85*yOffsetRatio;  			
         ctx.drawImage(this.eyebrow_img, cx, cy)
					
		}
		
			
     let  elapsedT = this.appCurT - this.faceEventST
   
  
     if(elapsedT >= 1000){
	   
	       this.faceProp = 0	   
      }
	  
	  
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
			   
			   faceDrawY = 0
			  // faceDrawY =  300//gClientHeight - cfaceH
			   
		   }

	   
      //drawImage( img, cx, cy, cwidth, cheight )
      ctx.drawImage(this.face_img, offsetX, faceDrawY,  cfaceW, cfaceH);

      
       let dx = faceDrawX + 167*300/600
       let dy = faceDrawY +197*cfaceH/imgH	
	   
	   let cw = 276*300/600		
       let ch = 39*cfaceH/imgH		
       //drawImage( img, cx, cy, cwidth, cheight )
	   ctx.drawImage(this.eyebrow_img,  dx,  dy, cw, ch);
	   
	   
	   //good이면 감은 눈, 
	   if((faceProp&face_eye_good)!=0){
	   
	   //eyeclose위치 175, 236
	     dx = faceDrawX + 175*300/600
         dy = faceDrawY + 236*cfaceH/imgH	   
		
         cw = 258*width_scale	
         ch = 67*height_scale			
   	      ctx.drawImage(this.eyeclose_img, dx, dy, cw, ch);
		  
		  
		  
	   }
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



    drawDialog(ctx){
		
		if(this.dialogMsg.length == 0){
			
			return
		}
		
		let cx=100, cy=10 
			
		//180x120	
		ctx.drawImage(this.bubble_img, cx, cy)
		
	     ctx.font ="15pt System";
         ctx.fillStyle = 'black'
		 ctx.fillText(this.dialogMsg, cx+10, cy+50);
                
		
	}

	
	//==============
	//common interface
	//=============
	beginTreatment(){
		//prepare 끝났을 때 호출
	
       console.log('beginTreatment');	
	   	   
	   this.sound_bg.pause()
		
     	
	   let playInfoDiv = document.getElementById("playInfoDiv")
	   playInfoDiv.style.display = 'block'
	   playInfoDiv.style.top = 0 + 'px'	
	  
  
		this.totalTreatedStuff = 2
		this.numTreatedStuff = 0
		
		
		this.createEarwax(this.closeUpDrawPos, 2);
		
	}
	
	
	//미리 할당된 자리에 생성되는 것으로 변경해야 함
	//refPos -->closeup 중심점
	createEarwax(closeUpDrawPos, num){
				
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
				
				earwax.id = i+1
				
				//canvas기준 위치 
				earwax.drawPosX =  closeUpDrawPos.x + 150 + genX 
				earwax.drawPosY =  closeUpDrawPos.y + 150 + genY  

         //     console.log("createEarwax:drawPos: " + earwax.drawPosX  + ", " + earwax.drawPosY );
			  

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
				
				
				if(this.touchMoveDist <= 2){
					
					
				}else {
					
				}
				
				
				let moveDist = Math.sqrt(diffX*diffX + diffY*diffY);

  		         console.log("speedCheck during 1s: " + moveDist);		
				 
				 //refDist: 난이도에 따라 달라져야 함
				 let refDist = 30 
									
				if( moveDist >= refDist){
					
				   console.log("too fast");		
				   
				  this.showDialog('too fast', 1000)		
				   
				   //this.isEyeclose = false
				   //this.eyebrow_img.src = "eyebrow_pain.png"
				   //this.lipbad_img.src = "lip_bad-01.png"		

                   this.faceProp = facestate_bad				   
				   this.faceEventST = this.appCurT
				   
				   
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
		
	    this.isShowTool = true 

       console.log("x: " + tx + ", " + "y: " + ty); 		
	  
		   
	   this.lastMovePos.x = tx 
	   this.lastMovePos.y = ty 

		this.touchSPos= {x:tx, y:ty};

		//console.log("touch_start Pos: " + ex + ", " + ey);
		
		let swabW = 30
		let swabH = 200 
		
		let probePos = {x: tx-(swabW/2), y: ty- swabH*(2/3)} 
		  
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
		   this.touchMoveDist = 0
		   
		   this.treatingStuff_id = obj.id 
		   //-----
	 }
	 else {
		
		console.log("touchS:  not touched stuff");
		
	 }
	
	  this.draw(gCtx)


    }

	//==============
	//common interface
	//touch한 채로 움직이지 않으면 호출안됨 
	//=============
   touchM(e){
	   	   
	   if(gPlaystate != playstate_treatment){
		   
		    return 
	    }
	   
	    this.isShowTool = true 

	   
    	 let touches = e.touches 

		let tx = touches[0].clientX 
		let ty = touches[0].clientY 

	    let deltaX =  tx - this.lastMovePos.x 
	    let deltaY =  ty - this.lastMovePos.y
						
		let moveDist = Math.sqrt(deltaX*deltaX + deltaY*deltaY)
		//----------------------------
	
		//-----------------------------

	    this.moveSpeedDist += moveDist
		
		
        let elapsedT = this.appCurT - this.moveSpeedCheckT
        if(elapsedT >= 1000){

            console.log('moveSpeedDist:  ' + this.moveSpeedDist + 'during 1s')
            if(this.moveSpeedDist > 100){

          
			}
   		   else {

    
		    }	
			
			   //this.touchMoveDist  =0 
               this.moveSpeedCheckT = this.appCurT
		 }			 
      		
	

	  this.lastMovePos.x = tx 
	  this.lastMovePos.y = ty 		 
				  
    				  
    let  treatingStuff =  this.getTreatingStuff()		  

    if( treatingStuff != null){
				
		
	 //this.touchMoveDist += moveDist
	 //console.log("add moveDist: " + moveDist)
		
		
 	 } else {
		
		
			let swabW = 30
			let swabH = 200 

			let probePos = {x: tx-(swabW/2), y: ty-(swabH*2/3) } 
			
			 treatingStuff =  this.getTouchedStuff(probePos);	
			 
			 if(treatingStuff != null){
					 
				if(treatingStuff.state == Stuff.state_normal){
			 
					treatingStuff.state = Stuff.state_treating
					//bug-fix
				    this.treatingStuff_id = treatingStuff.id
					this.touchMoveDist = 0
					this.moveSpeedCheckT = this.appCurT
					
					
						
				    if(this.sound_treatment.paused){
					
					   this.sound_treatment.play()
					 }
			 
				  }
			 }
  	}
					
	if(treatingStuff == null){
		
		return 
	}


	 this.trashcanPos = this.procTrashcan(treatingStuff.x, treatingStuff.y)
	 this.isShowTrashcan = true 
			
      this.moveTouchedStuff(deltaX, deltaY)
				

		 //------------------------
		 this.lastMoveT = this.appCurT 
		 this.lastMoveRefPos.x = tx 
		 this.lastMoveRefPos.y = ty 
		 //-----------------------------
		  
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
			
			this.faceProp = facestate_good;
			this.faceEventST = this.appCurT;
			
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
	   
	     this.draw(gCtx)
	   
  }



	//==============
	//common interface
	//=============
   touchE(e){
	   
 	   this.isShowTool = false 


	   this.isTouchState  = false 
	   
	   
	   this.objAddedW = 0
	   
	    this.isTreatingStuff = false 
		this.isShowTrashcan = false
		this.sound_treatment.pause() 
		
		this.touchMoveDist = 0
		
		
		this.treatingStuff_id = 0
		
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
	
	getTreatingStuff(){
		
	     //collison 등
		for(let i=0; i < this.stuffArray.length; i++){
			
			let obj = this.stuffArray[i]
			
			if(obj.state == Stuff.state_treating){
				
				return obj
			}
			
		}		
		
		return null
		
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
	
	//console.log("raotated UnitV: " + x + ", " + y)
	
	
	  return {x:150 , y: 0}
	
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
           
		       //  console.log('drawPos: ' + obj.drawPosX + ", " + obj.drawPosY) 
				
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
  
            if(dist < 25){
			 
				treatedStuff +=1				
				//cleaned 
				obj.state = 2
				console.log("remove stuff: " + dist)				
				
			}
				
	   }//for(...)
	   
       return treatedStuff
   }
   

   showDialog(msg, spanT=2000){

    this.dialogMsg = msg

     setTimeout(this.hideDialog.bind(this), spanT)   

   }	
   
   hideDialog(){

     this.dialogMsg = ""
    
	   
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
