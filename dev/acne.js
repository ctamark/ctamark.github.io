class acne {
	
	
	  static touch_none = 0
	  static touch_good = 1 
	  static touch_bad = 2
	  
	   constructor(){
	   
      this.face_img = new Image();
	  this.face_img.src = "./face_base-02.png";
	
      this.closeup_img = new Image();
	  this.closeup_img.src = "acne_closeup.png";	  
	  //canvas 기준
	  
 	  this.closeupRscPos = {x:0, y:300}
	
	
	  this.stuff_img = new Image();
      this.stuff_img.src = "acne_type.png";

	  this.eyebrow_img = new Image();
      this.eyebrow_img.src = "eyebrow_normal-01.png";
	  //
	 
 	  this.eyebrow_bad_img = new Image();
      this.eyebrow_bad_img.src = './eyebrow_bad-03-d.png';	  
	  
	  this.eyeopen_img = new Image();
	  this.eyeopen_img.src = 'eye_open-01-d.png' 
	  
	  
	  this.highlight_bg_img = new Image();
	  this.highlight_bg_img.src = "./highlight_bg.png"
	  
	  this.lipbad_img = new Image();
	  this.lipbad_img.src = "./lip_bad-01.png"
	  

	  this.finger_img = new Image();
	  this.finger_img.src = "./acne_finger-01.png"
	  
	  
	  
	   this.faceProp = 0
	  // this.faceProp |= face_lip_bad
	  
	   this.sound_treatment = new Audio("acne_effect-01.wav"); 
	   this.sound_treatment.loop = true
		   
		   
	   this.sound_bg = new Audio("asmr-01.mp3"); 
	   this.sound_bg.loop = true
	  
			  		
      this.isTreatingStuff = false
	  //= isExtruding
	  
	
      
	  this.touchSPos= {x:0, y:0};

      this.touchCheckT = 0

	  this.stuffArray = [] 		
	  this.spriteArray = [];
	  
	  
	  this.lastMovePos = {x: 0, y: 0} 
	  this.lastMoveRefPos = {x: 0, y: 0} 
	  this.lastMoveT = 0
	  this.appCurT = 0
	  
	  
	  this.numTotalStuff = 0
	  this.numTreatedStuff = 0
	  
	   this.isExtrudingAcneState = false
	   
	   this.isShowFinger = false 
	   
	   
	   this.postMsg_begin_rest = false 
	   
	   this.faceEventST = 0
	   
	     
    }
	

   //===============
   //common Interface   
   //===============
	beginPrepare(){
				
		this.sound_bg.play()
	
	}
	
   //===============
   //common Interface   
   //===============	
	beginTreatment(){
	
       console.log('beginTreatment');	
	   
	   this.sound_bg.pause();
	   
		//150, 300+150 		
		let refPos = {x:150, y: 150}

		this.numTreatedStuff = 0
		
		this.numTotalStuff = 3		
		this.createAcne(this.numTotalStuff);
		
       let playInfoDiv = document.getElementById("playInfoDiv")
	   playInfoDiv.style.display = 'block'
 	   //playInfoDiv.style.top = this.closeupRscPos.y + 'px'	
		
	}

	//==============
    //common interface
    //=============
	updateFrame(curT){
		
      this.appCurT = curT		
			  
	   if(gPlaystate == playstate_treatment){
			
			this.updateAcneTreatment(curT)

            //처리된 stuff의 개수를 체크한 후 playstate_rest로 세팅
            this.probeFinishJob(curT)	

	   }
			
		
	}
	
	//==============
    //common interface
    //=============	
	draw(ctx){
		
				
	//	this.drawFace(ctx, this.faceProp)
		
	//	this.drawLine(ctx, 0,0, 200,200)
	    
		ctx.drawImage(gUpperBody_img, 0, 0)
		
		let faceRefX = 0
		let faceRefY = 0				
		this.updateFace(ctx, this.faceProp)		
				
	   
	   	if(gPlaystate == playstate_treatment || gPlaystate == playstate_rest || gPlaystate == playstate_finish){
			
			//ctx.drawImage(gUpperBody_img, 0, 0)
			ctx.save()			
			ctx.globalAlpha = 0.7;
			ctx.drawImage(this.highlight_bg_img, 0, 0, gClientWidth, gClientHeight )
			ctx.restore()
						
		}
	   
	   
		
		let cFaceW = 300
		
		this.closeupRscPos.x  = (gClientWidth - gCloseupCanvasSize)*0.5
		this.closeupRscPos.y = 250

     
	    if(gPlaystate == playstate_treatment){
           /*
	         ctx.globalAlpha = 0.7;
			 ctx.drawImage(this.highlight_bg_img, 0, 0, gClientWidth, gClientHeight )
   		     ctx.globalAlpha = 1.0;		
		  */
            ctx.drawImage(this.closeup_img, this.closeupRscPos.x, this.closeupRscPos.y, gCloseupCanvasSize, gCloseupCanvasSize); 
	   	     
		}
			    
		if(gPlaystate == playstate_treatment){
 
           this.drawAcneStuff(ctx)
		   
		    this.drawSprite(ctx, this.appCurT)		
			
			if(this.isShowFinger==true){
				
				  let w= this.finger_img.width
				  let h= this.finger_img.height
				
				  let drawX  = this.lastMovePos.x - w/2
				  let drawY  = this.lastMovePos.y - h*(2/3)

                  ctx.drawImage(this.finger_img, drawX, drawY, w, h); 			
			
			}
			
		   this.drawPlayInfo(ctx)
						
		 }
		 
		 
	} //draw 

//================
//
//=================
updateFace(ctx, faceProp){
	  
	  let refX = 0
	  let refY = 0
	
		if((faceProp&facestate_bad) !=0){
						
		    ctx.drawImage(this.eyebrow_img, 132, 85)
			ctx.drawImage(this.eyeopen_img, 135, 101)
			
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
		else {
		//eyebrow 
         ctx.drawImage(this.eyebrow_img, 132, 85)
		
			
		}
		
			
     let  elapsedT = this.appCurT - this.faceEventST
   
  
     if(elapsedT >= 1000){
	   
	       this.faceProp = 0	   
      }
	  
	  
  }


/*
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
			   faceDrawY =  0//gClientHeight - cfaceH			   
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
*/




   drawAcneStuff(ctx){
        

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
				   let dx = this.closeupRscPos.x + obj.x - obj.radius   
				   let dy = this.closeupRscPos.y + obj.y - obj.radius
				   //-------
				   obj.drawPosX = dx
				   obj.drawPosY = dy 
				   //-------

				   ctx.drawImage(this.stuff_img, sx, sy, 50, 50, dx, dy, 50, 50);														   
			
			} //for 
			
    } //drawAcneStuff(ctx)
		
	//===========
	//
	//===========
    touchS(e){
				
    if(gPlaystate != playstate_treatment){

       return 
	}		
		
    
	let touches = e.touches 

	//let posArray = [];
	
		
	let tx = touches[0].clientX 
	let ty = touches[0].clientY 
	
	//posArray.push({x:tx, y:ty})
	
	let probePos = {x:0, y:0}
	//finger 200x155
	
	let w = this.finger_img.width
	let h = this.finger_img.height
	
	probePos.x =  tx 
	probePos.y =  ty - h*(2/3) 
	
	let touchState = acne.touch_none
	let touchCount = 0
	      	
	for(let i =0 ; i < this.stuffArray.length; i++){

			let obj = this.stuffArray[i] 
			//여드름 짠 후 모습			
			
			if(obj.state == 2){
			  // 이미 treated 			
                  continue;			
			}
		
			//obj.x: 부모기준 obj중심좌표(화면출력시 반지름만큼 보정해야함) 
			let objCanvasX = this.closeupRscPos.x + obj.x 
            let objCanvasY = this.closeupRscPos.y + obj.y 

			let diffX = 0, diffY = 0 					
			
				diffX = objCanvasX - probePos.x
				diffY = objCanvasY - probePos.y					
														
				let dist = Math.sqrt(diffX*diffX + diffY*diffY)
			
				if(dist <= 40){
								
				    console.log("inRange: ")		
				  
				   //let sprite = this.spriteArray[i]
				   //sprite.play()
				  
                  if(diffY < 0){
					  
					  touchState = acne.touch_good
				  }
				  else {
					  
					  touchState = acne.touch_bad					  
				  }
				  
				   touchCount++
			
				   console.log("obj.state  1(treating)") 
				   obj.state =  Stuff.state_treating  // treating 
								   
				   this.touchCheckT = this.appCurT
				   this.isExtrudingAcneState = true 

   			   }		

	  } 	
	 
	 if(touchCount == 0){
		 //엉뚱한 곳 터치 

	   this.faceEventST = this.appCurT  
       this.faceProp = facestate_bad2
  		
	 }else {
		 //터치는 했지만 벗어난 경우 
		 
		 if(touchState == acne.touch_bad){			

     	    this.faceEventST = this.appCurT  
            this.faceProp = facestate_bad
		 }
		 
	 }
	 
	 
	 this.lastMovePos.x = tx 
	 this.lastMovePos.y = ty 
	 
 	 this.isShowFinger = true 
	



	}		
	
	//=============
	//
	//==============
    touchM(e){

    let touches = e.touches




	}		


	//=============
	//
	//============
    touchE(e){

		for(let i =0 ; i < this.stuffArray.length; i++){

				let obj = this.stuffArray[i] 
				
				if(obj.state == Stuff.state_treating){
					
					obj.state = Stuff.state_normal
					//obj.userVal = 0
				}
		}

     this.isShowFinger = false 
     //---acne------------
	 this.isExtrudingAcneState = false
	
	 //-------------------
	
	}		
		
	
	//=================
    //	
	//=================
	createAcne(num){
		
		console.log('createAcne')

		this.stuffArray.length = 0;
		this.spriteArray.length = 0;
		
		
		//미리 위치가 정해져 있음 
	   //(54, 200)
		//40x40
		
		//closeup imgSize: 400x400
         let xRatio = gCloseupCanvasSize/400 		
		 let yRatio = gCloseupCanvasSize/400
		 
		 
		 //closeUp LT기준 
		 let posArray = [] 
		 posArray.push({x: 60, y: 265}) 		 
		 
		 posArray.push({x: 260, y: 150}) 
		 
		 posArray.push({x: 230, y: 230})  
		 
		 
		 for(let i=0; i < num; i++){
		
		   let acne = new Stuff();
		   acne.state = Stuff.state_normal 
		   
		   acne.radius = 22;

		   let pos = posArray[i]
		   acne.x = pos.x*xRatio 
		   acne.y = pos.y*yRatio 
						 
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
		 else if(i==1){
		   sprite.addFrame(120, 0 , 40, 70)
		   sprite.addFrame(160, 0, 40, 70)				
		   sprite.addFrame(200, 0, 40, 70)				

		 }else {
			 
		   sprite.addFrame(0,  70 , 40, 40)
		   sprite.addFrame(40, 70, 40, 40)				
		   sprite.addFrame(80, 70, 40, 40)				
			 			 
		 }
		 
		 this.spriteArray.push(sprite)
		  
	 }
		 


	}
		
	//=================
	//
	//==================
	begin_playstate_rest(){
	
	  console.log("begin_playstate_rest")		 
		
	  gPlaystate = playstate_rest
	  
	  this.sound_bg.play();

	
  	 showSysMsg("begin-->playstate_rest", 0)
	
		 //100초후
		 //함수만 넘겨주는 것이므로 bind(this) 빼먹지 말기			
     setTimeout(this.end_playstate_rest.bind(this), 10000)		
		
	
	}
	
    //------------	
	 end_playstate_rest(){

	   console.log("end_playstate_rest")		 
	  
	   gPlaystate = playstate_finish
	  
       this.postFinishJob()
	  
     }

    //===============
    //
    //============== 
	 postFinishJob() {
		 
	  console.log("postFinishJob")		 
		 
	  let ratingDiv = document.getElementById("ratingDiv");
	  ratingDiv.style.display = 'block'
	 
	  let bgDiv = document.getElementById("bgDiv");
	  bgDiv.style.display = 'block'
	  
	
	 //playMenu용 메뉴표시 
     var  preMenuDiv = document.getElementById("simpleMenuDiv");
      preMenuDiv.style.display = 'block'
	  
	  //this.sound_bg.pause()
	   
	   /*
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
 		

//==================
//
//=================
    drawSprite(ctx, curT){
		
	
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
			
        sprite.drawFrameEx(ctx, drawPosX, drawPosY, 0.8)	
        //console.log("sprite.drawFrameEx")				
	    //this.sprite.drawFrameEx(this.ctx, drawPosX, drawPosY, 0.8)
		
		}
	}		
		
	

//3초간 유지한 경우 여드름 압출
updateAcneTreatment(curT){
	
	if(this.isExtrudingAcneState != true){

		  return 
	 }		 


  let elapsedT =  curT - this.touchCheckT  
 
  let  percent = (elapsedT/3000)*100 
//  this.updateAcnePlayState(percent)
  
 
	  console.log("AcneTreatment")	
		
	  for(let i =0 ; i < this.stuffArray.length; i++){

			let obj = this.stuffArray[i] 
			//여드름 짠 후 모습			
			
		     console.log("obj.state: " + obj.state)
			
			//treating인 경우에만
			if(obj.state == Stuff.state_normal || obj.state == Stuff.state_treated){ 
			
			   continue 
			}
			
			obj.userVal += elapsedT 
			
			
			
			if(obj.userVal  >= 3000){
				
				 obj.state = 2 //treated
			     obj.rscIdx = 1 // 짠 후의 모습 	
				 
		        let sprite = this.spriteArray[i]
				sprite.play()
				console.log("sprite.play")

				this.sound_treatment.loop = false 
				this.sound_treatment.currentTime = 0
				this.sound_treatment.play() 			
				this.isExtrudingAcneState = false  
								
				this.numTreatedStuff +=1
				
				let percent = (this.numTreatedStuff/this.numTotalStuff)*100
				
				let stateProgress = document.getElementById("playProgress") 
				stateProgress.value = percent 	

            				
				
			}
			else {
								
				
			}
			
    	}	  	  
  
      this.touchCheckT = curT  
	  	  

	
}


drawPlayInfo(ctx){
	
	  for(let i =0 ; i < this.stuffArray.length; i++){

			let obj = this.stuffArray[i] 
			//여드름 짠 후 모습			
		
 		   //treating인 경우에만
			if(obj.state != Stuff.state_treating){ 
			
			   continue 
			}
			
			
		   //cx: 캔버스 기준 좌표
		   //obj.x(부모기준 obj's LT좌표)
          let cx = this.closeupRscPos.x + obj.x 
	   	  let cy = this.closeupRscPos.y + obj.y
		  
		  let info =  obj.userVal + '/3000'

	     // 3-6. 텍스트+외곽선 그리기
		 ctx.font ="10pt Fira";
         ctx.fillStyle = 'white'
		 ctx.fillText(info, cx, cy);
                
         ctx.strokeStyle = 'black';
		 ctx.strokeText(info, cx, cy);
			
			
    	}	  	  
	
	
}

drawLine(ctx, sx,sy, dx, dy){
	
	
	 // 6. 선 두께/색상 설정
	 ctx.lineWidth = 20;
	 ctx.strokeStyle = 'pink';
		
	
	//ctx.beginPath()를 호출하지 않으면, 직전 도착점에서 이어지는 선이 그려진다.
	ctx.beginPath()
	
	ctx.moveTo(sx, sy)
	//도착점
	ctx.lineTo(dx, dy)
	
	//선그리기
	ctx.stroke()
}


 probeFinishJob(curT){
		
   if(gPlaystate != playstate_treatment){
	
       return 	
    }
	
	if(this.postMsg_begin_rest ==true){
		
		return 
	}
	
	if(this.numTotalStuff == 0){
		
		console.log("numTotalStuff==0 ")
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
				
		     this.isTreatingStuff = false; 
			 
		 	this.postMsg_begin_rest = true 
			
			//너무 빨리 rest로 넘어가면 안됨 
			//압출sprite가 끝이 나고 넘어가야 자연스러움 			
			 //함수만 넘겨주는 것이므로 bind(this) 빼먹지 말기			
			setTimeout(this.begin_playstate_rest.bind(this), 5000)				
	}	
	
	

  }
  
	
}