
let gImgFrameW = 100 
let gImgFrameH = 100 

class spotDiff{
	
	   constructor(){
	   
	   this.img_origin = new Image();   
	   
	   const me = this
  	   this.img_origin.onload = () => {
		     
            //this 의미 
			//arrow function : 최상위
			//function: scope
     			 
		   console.log('img_origin onload')				
    	  this.beginStage_step2()
		 	
	   }	   
	   	   
	    this.img_origin.src = './img-01.png'
	  
	   
	   this.img_mod = new Image();
   	   //this.img_mod.src = './img-01-mod.png' 

	   this.img_progress= new Image();
   	   this.img_progress.src = './progress.png' 
	   
	   this.img_mark =new Image();
	   this.img_mark.src = './spot-mark.png'
	   
	   this.img_heart = new Image();
	   this.img_heart.src = './heart.png'
	   	   

	   //canvas에서 이미지 사이즈
	   this.cImgW = 200 
	   this.cImgH =  200
	   
	   this.beginStageT = 0	   
	   this.topMenuH = 50 
	   this.bottomMenuH = 80 
	
	/*
	    let imgAreaW = gClientWidth 
        let imgAreaH 	= (gClientHeight- -this.topMenuH - this.bottomMenuH)/2 
		
		console.log('imgAreaH: ' + imgAreaH)
		*/
		this.cWidth_d = 0
		this.cHeight_d = 0
		
		this.modOffsetPos = {x:0, y:0}
		
	    this.stageBeginT = 0
	   
	 	
		//3~5개 유동적 
		this.spotInfoArray = []
	

       // this.beginStage()
		
		this.timerPos= {x:0, y:0}
		
		this.xScale = 1.0
		this.yScale = 1.0
		
		this.imgFrameW = 100 
		this.imgFrameH = 100
		
		this.falseMarkBeginT = 0
		this.isShowFalseMark = false 
		this.falseMarkPos = {x:0, y:0}
		
		
        this.maxNumSpot = 0
		

		
     }
	

   //===============
   //common Interface   
   //===============
	init(){
				
	
	}
	


beginStage(){
	
	console.log('beginStage()')
	
	
	let stageNumberStr = ''
	
	if(gStageIdx < 10){
		
		stageNumberStr = '0' + gStageIdx.toString()
		
	}
	else {

	   stageNumberStr = gStageIdx.toString()
		
	}
	
	this.img_origin.src = './img-' + stageNumberStr + '.png'
	this.img_mod.src = './img-' + stageNumberStr + '-mod.png' 
			
	
   //gClientHeight	
   //imgArea
  let  offsetY = this.topMenuH 
  this.modOffsetPos.y = offsetY   
  
  
   this.spotInfoArray = []    
   
   let spotPos = gAllSpotPosArray[gStageIdx]
   let spotA = spotPos.spots
   
   for(let idx=0; idx< spotA.length; idx++){
  
     let spot = spotA[idx]
	
      let spotInfo = {
		   x: spot.x , y: spot.y, spot: false 
	  }
	 
      this.spotInfoArray.push(spotInfo)	  
   }
     
   
  // this.spotInfoArray.push( {x:355, y:72, spot: false} )
  // this.spotInfoArray.push( {x:117, y:24, spot: false} )

   this.imgFrameW = gClientWidth 
   this.imgFrameH  = (gClientHeight- this.topMenuH - this.bottomMenuH)/2 
   
   gImgFrameW =  gClientWidth 
   gImgFrameH = this.imgFrameH 

  console.log('ImgFrameSize:  ' + this.imgFrameW  + ' x '  + this.imgFrameH)  
  
  console.log('beginStage()--end')
}


//-----------
beginStage_step2(){
	
	console.log('beginStage_step2')
	
	
	 this.updateLayout_imgFrame()	   
	 	 
	 this.stageBeginT = gAppCurT
	 gPlaystate = playstate_ready
	 
	 //1초후 play하기 
	 
	 //beginPlay()-->함수반환값을 넘기는 것이므로 함수명을 써야 함
	 setTimeout(this.beginPlay.bind(this), 1000)
		 
	
}

beginPlay(){
console.log('beginPlay')

gPlaystate = playstate_play 
		
}


 showFalseMark(x, y){
	
	this.falseMarkBeginT = gAppCurT
	this.isShowFalseMark = true 
	
	this.falseMarkPos.x =  x
	this.falseMarkPos.y =  y
	
  }
  
  
//----------
updateLayout_imgFrame(){

     let ratio = this.img_origin.height/this.img_origin.width 
	 console.log('img-ratio:  ' + ratio)  
		 
	 
     this.cImgH  = gImgFrameH
	 this.cImgW = this.cImgH *(1.0/ratio) 
	 
	 if(this.cImgW > gClientWidth){
		 
		 //width기준으로 다시 조정 
		 
		 this.cImgW = gClientWidth
		 this.cImgH = ratio*this.cImgW		 
	 }
	
	this.xScale = this.cImgW/this.img_origin.width	
	this.yScale = this.cImgH/this.img_origin.height
	
	console.log('ImgFrameSize:  ' + gClientWidth  + ' x '  + this.imgFrameH)  
	console.log('gImgFrameSize:  ' + gImgFrameW  + ' x '  + gImgFrameH)  
	console.log('cImgSize:  ' + this.cImgW +  ' x ' + this.cImgH)  
		
}


   post_timeout(){
	    gPlaystate = playstate_timeout
	   
       gIsIgnoreUserInput = true		  
		   
        g_showGameDlg(gameDlg_timeOut)	  
   }

	//==============
    //common interface
    //=============
	updateFrame(curT){
		
         this.appCurT = curT		
 			  
   
		 if(this.isShowFalseMark){

			  let elapsedT = curT - this.falseMarkBeginT
			  if(elapsedT > 200) {
				  
				  this.isShowFalseMark =false   
				}
		 }		 
			  
		
	}
	
	
//==============
//common interface
//=============	
draw(ctx){
		
		
	if(gPlaystate == playstate_timeout){
		
		return 
	}


    if(gAppstate == appstate_home){

   
         return 
	}		
	
     let offsetX=0, offsetY = 0 
 
     let imgFrameW = gClientWidth 
     let imgFrameH  = (gClientHeight- this.topMenuH - this.bottomMenuH)/2 
	 
	 let ratio =  this.img_origin.height/this.img_origin.width;
	 //가로세로 중 긴쪽에 맞추기 
	 
	 let cWidth , cHeight 
	 	 
	 if(imgFrameW > imgFrameH){
		 //세로에 맞추기 
		
       cHeight = imgFrameH
	   cWidth  = cHeight*(1/ratio)
	   
	   this.cHeight_d = cHeight 
    	  				 
		 		 
	 }
	 else {		 
		 //가로에 맞추기 
		 cWidth = imgFrameW
		 cHeight = ratio*cWidth

	    this.cHeight_d = cHeight 

	 }	
		
	  offsetY = this.topMenuH 
	  ctx.drawImage(this.img_mod, offsetX, offsetY,  this.cImgW,  this.cImgH)

	  offsetY +=  cHeight //여백 5
	  let timerY = offsetY
	  //----------  
	  offsetY += 30
	  ctx.drawImage(this.img_origin, offsetX, offsetY,  this.cImgW, this.cImgH)
	    
      this.drawPlayInfo(ctx, timerY)
	  
} //draw 

	
  
   //===============
   //
   //==============	
    touchS(e){
		
		if(gIsIgnoreUserInput== true){
			
			console.log('gIsIgnoreUserInput')
			
			return
		}
    
		let touches = e.touches 
			
		let tx = touches[0].clientX 
		let ty = touches[0].clientY 
		
		if(this.isTimeout == true || gPlaystate == playstate_stageClear){
			
			return 
		}
		
			
		
				
		//이미지 기준 좌표 구하기 
		let imgX = tx - this.modOffsetPos.x 
		let imgY = ty - this.modOffsetPos.y 
		
		console.log('touch imgPos: '  + imgX + ',' + imgY)
		
	   let dist  = 0 
	   let diffX, diffY 
	   
	   let i=0, spotCount = 0
	   
	   for( i=0; i <  this.spotInfoArray.length; i++){

             let posInfo = this.spotInfoArray[i]
             if(posInfo.spot == true){

                  continue 
 			  }
			 
			  diffX = imgX - posInfo.x*this.xScale 
			  diffY = imgY - posInfo.y*this.yScale
				  
			  dist = Math.sqrt(diffX*diffX + diffY*diffY)
			  
			   console.log('dist: ' + dist + '-->pos: ' + posInfo.x + ',' + posInfo.y)
			  
			  
			  //in circle 
			   if(dist < 20){

                 posInfo.spot = true ;
				 console.log('spot--true: ')
				 spotCount++;
				 break;
				}			  
	    }

        if(spotCount == 0){

           this.showFalseMark(tx, ty)
		}			
		
		this.probeFinishJob()
		
	   	
	}		
	
	
	//================
	//
	//================
    touchM(e){

    let touches = e.touches

    let tx = touches[0].clientX 
	let ty = touches[0].clientY 


	
 	  } 
	  	  
		  

//===============
//
//==============
    touchE(e){

  
	
	}		
		
	
    //===============
    //
    //============== 
	 postFinishJob() {
		 
	  console.log("postFinishJob")		 
	
	}		
	

//========================
// 전체 진행률을 표시 	
//========================				
	updatePlayState(progress){
	
	let stateProgress = document.getElementById("playProgress") 
	stateProgress.value = progress
	
}


drawPlayInfo(ctx, timerY){
	 
	     let cX=0, cY=0
		 
  	     if(this.isShowFalseMark){

           cX = this.falseMarkPos.x - 25
		   cY = this.falseMarkPos.y - 25

             ctx.drawImage(this.img_mark,128, 0, 128, 128, cX, cY, 50, 50)  

		 }			 
	
	
         for(let i=0; i<	this.spotInfoArray.length; i++){
			 
	        let info = this.spotInfoArray[i]

           //이미지 중심 좌표에 출력 			   
           if(info.spot){	
		   
		   //redcircle radius = 50 
		    cX = this.modOffsetPos.x + info.x*this.xScale - 30
			cY = this.modOffsetPos.y + info.y*this.yScale - 30  
              		  
             ctx.drawImage(this.img_mark,0, 0, 128, 128, cX, cY, 60, 60)  

		   }			   
			 
			 
		 }
	 
		 let elapsedT = this.appCurT - this.stageBeginT
		 let elapsedSec = Math.floor(elapsedT/1000)
		 
		 let remainSec = 60 - elapsedSec  
		 
		 let ratio = remainSec/60 
		 
		 //drawImage(img ,ix,iy,iw,ih,cx, cy,cw,ch)
     	 ctx.drawImage(this.img_progress, 0, 0, 500, 50, 0, timerY, gClientWidth, 30)	
	
		 
	 	 	 
  	    let info = '---'	  
        let cx=200, cy= 16

	     // 3-6. 텍스트+외곽선 그리기
		 ctx.font ="15pt Fira";
         ctx.fillStyle = 'white'
                
    		 
		 //남은 시간 표시 1:00		 
		 if(remainSec >= 0){
			 
  	  	     info = 'remainT: ' + remainSec		 
			 
			//0, 60, 500, 60+28
			 let iBarW = 386*ratio
			 let cBarW = gClientWidth*ratio 
			 //bar출력
			 ctx.drawImage(this.img_progress, 8, 48, iBarW, 30,  0, timerY+10, cBarW, 22)	
		 }
		 else {
			 
			 if(gPlaystate == playstate_play){
			 			 
                 this.post_timeout()			 
                 info = 'timeout'		 
			 }
		 }
				 		 
         ctx.fillText(info, cx, cy);		 

         info = ' '		 
		 
		 cy = 15
		 
		if(this.spotInfoArray.length ==2){			
			
             ctx.fillText('●●', 0, cy);		 
		
		}else if(this.spotInfoArray.length ==3){			
			
             ctx.fillText('●●●', 0, cy);		 
		}
		else if (this.spotInfoArray.length == 5){
			
             ctx.fillText('●●●●●', 0, cy);		 			
		}
		
		info = ''
		
		for(let i=0; i < this.spotInfoArray.length ; i++){
			
			let item = this.spotInfoArray[i]
			
			if(item.spot==false){
				
				continue 
			}
			
			if(i==0){				
				info = '●'
			}else {
				
				info += '●'				
			}

		}
		
		 ctx.fillStyle = 'red'
		 ctx.fillText(info, 0, cy);		 

	
	    //하트 		
		
		cy = gClientHeight - 15
		ctx.drawImage(this.img_heart, 0, cy-25, 40, 40)
		info =  "x " + gNumHeart
	    ctx.fillText(info, 0 + 50, cy);		 

}



    beginStageClear(){
	
	  console.log('beginStageClear')

  
       gPlaystate = playstate_stageClear
       g_showGameDlg(gameDlg_stageClear)	
	   
	  gStageIdx++ 
  
     let idxStr = gStageIdx.toString()  
	  window.localStorage.setItem('stageIdx', idxStr);	
  	   
  
     }
	 

  probeFinishJob(curT){
	  
	  let info 
	  let numSpotted = 0 
	  let maxSpot = this.spotInfoArray.length
				
		for(let idx=0; idx < maxSpot; idx++){
	 
            info = this.spotInfoArray[idx]
			if(info.spot == true){
				
				numSpotted++
			}

		}
  
      if(numSpotted == maxSpot){

          gIsIgnoreUserInput = true		  
		  
		  setTimeout(this.beginStageClear.bind(this), 1000)
		  		  
	  }
	
  }
  
  //=========================
  
  
	//https://www.crocus.co.kr/1617
}