class acne {
	
	   constructor(){
	   
      this.face_img = new Image();
	  this.face_img.src = "./face_base-02.png";
	
      this.closeup_img = new Image();
	  this.closeup_img.src = "acne_closeup.png";	  
	  //canvas 기준
	  
 	  this.closeupRscPos = {x:0, y:0}
	
	
	  this.stuff_img = new Image();
      this.stuff_img.src = "acne_type.png";

	  this.eyebrow_img = new Image();
      this.eyebrow_img.src = "eyebrow_normal-01.png";
	  
	  this.eyeclose_img = new Image();
	  this.eyeclose_img.src = 'eye_close-01-d.png' 
	  
	  
	  this.highlight_bg_img = new Image();
	  this.highlight_bg_img.src = "./highlight_bg.png"
	  
	  this.lipbad_img = new Image();
	  this.lipbad_img.src = "./lip_bad-01.png"
	  
	  
	   this.faceProp = 0
	  
	  
	   this.sound_treatment = new Audio("acne_effect-01.wav"); 
	   this.sound_treatment.loop = true
		   
		   
	   this.sound_bg = new Audio("white_noise-01.mp3"); 
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
		
		//150, 300+150 		
		let refPos = {x:150, y: 150}
		
		this.numTotalStuff = 2
		this.numTreatedStuff = 0
		
		this.createAcne(2);
		
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
		
		
		
		this.drawFace(ctx, this.faceProp)
		
		this.drawLine(ctx, 0,0, 200,200)
		
		let cFaceW = 300
		
		this.closeupRscPos.x  = (gClientWidth - gCloseupCanvasSize)*0.5
		this.closeupRscPos.y = 0

     
	    if(gPlaystate == playstate_treatment){
         
	         ctx.globalAlpha = 0.7;
			 ctx.drawImage(this.highlight_bg_img, 0, 0, gClientWidth, gClientHeight )
   		     ctx.globalAlpha = 1.0;		
		 
            ctx.drawImage(this.closeup_img, this.closeupRscPos.x, this.closeupRscPos.y, gCloseupCanvasSize, gCloseupCanvasSize); 
	   	     
		}
			    
		if(gPlaystate == playstate_treatment){
 
           this.drawAcneStuff(ctx)
		   
		    this.drawSprite(ctx, this.appCurT)		
		 }
		 
		 
     	if(gPlaystate == playstate_rest || gPlaystate == playstate_finish){
			
			ctx.drawImage(gUpperBody_img, 0, 0)
						
			ctx.globalAlpha = 0.7;
			ctx.drawImage(this.highlight_bg_img, 0, 0, gClientWidth, gClientHeight )
   		    ctx.globalAlpha = 1.0;

						
		}
		 
		 

	} //draw 



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
		
	
    touchS(e){
    
	let touches = e.touches 

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
	
    touchM(e){

    let touches = e.touches




	}		

    touchE(e){


     //---acne------------
	 this.isExtrudingAcneState = false
	
	 let playInfoDiv = document.getElementById("playInfoDiv")
	 playInfoDiv.style.display = 'none'
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
		 else {
		   sprite.addFrame(120, 0 , 40, 70)
		   sprite.addFrame(160, 0, 40, 70)				
		   sprite.addFrame(200, 0, 40, 70)				

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

            this.sound_treatment.loop = false 
		 	this.sound_treatment.currentTime = 0
			this.sound_treatment.play() 			
			this.isExtrudingAcneState = false  
			
			
			this.numTreatedStuff +=1
			
			let percent = this.numTreatedStuff/this.numTotalStuff
			
			let stateProgress = document.getElementById("playProgress") 
	        stateProgress.value = percent 		
			

    	}	  	  
  
      this.touchCheckT = curT  
	  	  
  }	//	if(elapsedT >= 3000

	
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
			
			//너무 빨리 rest로 넘어가면 안됨 
			//압출sprite가 끝이 나고 넘어가야 자연스러움 			
			 //함수만 넘겨주는 것이므로 bind(this) 빼먹지 말기			
			setTimeout(this.begin_playstate_rest.bind(this), 5000)		
		
		
		
	}	

  }
  
	
}