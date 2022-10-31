import {getRandomVal, isCollision_circle2Circle, isInCircle, getDistSqrt} from './helper.js'
import {Sprite, Earwax} from './helper.js' 

class App {
	
	constructor(){
		
		//this.canvas = document.createElement('canvas');
		this.canvas = document.getElementById("myCanvas");
		this.ctx = this.canvas.getContext('2d');
		//document.body.appendChild(this.canvas);
		
		//----------------------
		//---------------------
	
	
	
		
		let randomVal = getRandomVal(0, 10);
		let msg = "randomVal: " + randomVal; 
		console.log(msg);

	    this.face_img = new Image();
	    this.face_img.src = "face-01.png";
		
		this.eyeclose_img = new Image();
		this.eyeclose_img.src = "eye_close.png"
		
		this.isEyeclose = true
		
		
		this.sound_move = new Audio("effect-01.wav"); 
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


		
			  
 
		
		//50x50
		this.earwax_img = new Image(); 
	    this.earwax_img.src = "earwax.png";
		
		
		this.earCloseup_img = new Image();
		this.earCloseup_img.src = "ear_closeup.png";
		

        this.earwaxArray = []		
		
		
		this.touchSPos = {x:0, y:0}

 
         //300x300
         this.closeupRscPos = {x:0, y:300}
		 
		 let refPos = { x:this.closeupRscPos.x+150, y: this.closeupRscPos.y +150}

		 this.createEarwax(refPos, 3);

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
	   
	    let toolPos_collision =  {x:this.toolPos.x+15, y:this.toolPos.y+15}
       	let toolRadius_collison = 15	
	    let size = this.earwaxArray.length
	   for(let i=0; i < size; i++){
			
			let obj = this.earwaxArray[i]
					
			//earwax 		
			let offsetA = obj.radius;
			let cA = {x: obj.x+offsetA, y: obj.y+offsetA, r: obj.radius}; 			
			
			let cB = {x:toolPos_collision.x, y: toolPos_collision.y, r: toolRadius_collison};
								
			let rCollision = isCollision_circle2Circle(cA, cB);
			
			if(rCollision == true){
				
  	     		console.log("rCollision!!");
			}
		}

/*
       //----------
		var clearBtn = document.querySelector('input[type="button"]');

			clearBtn.onclick = function(){
			 alert('click');
		} 
		//----------
*/
			
	    //객체에서 분리된 함수인 App.updateFrame이 전달되기 때문에 this의 정보가 사라짐
		//let boundfunc = func.bind(context);
		requestAnimationFrame(this.updateFrame.bind(this));

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
		
	
		this.canvas.width = size.width;
		this.canvas.height = size.height;
		
	}
	
	
	updateFace(Idx){





	}		
	
			
	updateFrame( ){
		
		 let curT = new Date().getTime();
		 this.appCurT = curT 
		
		//------------------------------
		//지우는 처리 해야함
		//-------------------------------
		
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
		
		this.ctx.drawImage(this.face_img, 0, 0);
      
	  
	    if(this.isEyeclose == true){   
	 
	        this.ctx.drawImage(this.eyeclose_img, 80, 200);
	    }


        this.ctx.drawImage(this.earCloseup_img, this.closeupRscPos.x, this.closeupRscPos.y); 
		
        let size = this.earwaxArray.length


        let toolPos_collision =  {x:this.toolPos.x+15, y:this.toolPos.y+15}
       	let toolRadius_collison = 15	

/*
        //collison 등
		for(let i=0; i < this.earwaxArray.length; i++){
			
			let obj = this.earwaxArray[i]
			
			if (obj.state == 1){		
			
				continue
			}
					
			//earwax 		
			let offsetA = obj.radius;
			let cA = {x: obj.x+offsetA, y: obj.y+offsetA, r: obj.radius}; 			
						

            //let touchPos = {x:lastMovePos.x			
			//let cB = {x:toolPos_collision.x, y: toolPos_collision.y, r: toolRadius_collison};
								
			let rCollision = isCollision_circle2Circle(cA, cB, false);
			
			//처음으로 충돌된 경우 
			if(rCollision == true){
						
				obj.state = 1;
				
				this.isDraggingStuff = true 
							
				obj.collision_offsetX = (obj.x - this.toolPos.x) 
				obj.collision_offsetY = (obj.y - this.toolPos.y) 
				
  	     		console.log("rCollision!! offset: " + obj.collision_offsetX + ", " + obj.collision_offsetY );
				
			}
	
		}
*/


       let attachPos = this.toolPos

		for(let i=0; i < size; i++){
			
			let obj = this.earwaxArray[i]
			
			if(obj.state == 0){

			  this.ctx.drawImage(this.earwax_img, obj.x, obj.y);
				
			}
			else if(obj.state ==1){
				
                //let drawPosX = (attachPos.x + obj.collision_offsetX)
                //let drawPosY = (attachPos.y + obj.collision_offsetY) 		
				let drawPosX = this.lastMovePos.x 
                let drawPosY = this.lastMovePos.y 		
				 
				 //console.log("collisionOffset: " + obj.collision_offsetX + ", " + obj.collision_offsetY );
                 //console.log("drawPos " + drawPos.x + "," + drawPos.y);
				 
		     	this.ctx.drawImage(this.earwax_img, drawPosX , drawPosY);
				 
			}
			else {
				
				
			}			
			
		}
		
		
		
		// this.ctx.drawImage(this.earswab_img, this.toolPos.x, this.toolPos.y);
		 //----------------------------
		 //
		 //----------------------------
		 
		if(this.isDraggingStuff  == true){

		 if(curT - this.lastMoveT >= 500){
			 
			 if((this.lastMoveRefPos.x == this.lastMovePos.x) && 
			    (this.lastMoveRefPos.y ==this.lastMovePos.y) ){
                //마지막 움직임이후 0.5초 동안 이동없음
             
	    		   this.sound_move.pause();
			 
			 }		
		
  	 	 }
		 else {
		 
		 }
		 
	     if(curT - this.moveSpeedCheckT >= 500 ){
			
				let diffY = this.lastMovePos.y - this.moveSpeedCheckPos.y 
				
				if(diffY < 0) {  diffY *= -1;  }
				
				if( diffY >= 20){
					
				   console.log("too fast: " + diffY);		
				   this.isEyeclose = false
				}
				else { //normal, good
					
				   this.isEyeclose = true 					
				}
			
			   this.moveSpeedCheckPos.x  = this.lastMovePos.x 
			   this.moveSpeedCheckPos.y  = this.lastMovePos.y 
			   this.moveSpeedCheckT = curT		   
	      }
		 
		 
	 }
		 
	 
/*
         if(this.isCleaningStuff ==true){



              //this.lastMovePos.x 
		


		}			 
*/

       /*
		this.sprite_d.update(curT);
		this.sprite_d.draw(this.ctx, 10, 10);
		*/
		
		requestAnimationFrame(this.updateFrame.bind(this));
		
	}
	

	 createEarwax(refPos, num){
				
	   //300x300
		
		for(let i=0; i < num; i++){
			
       	      let earwax = new Earwax();
			  earwax.radius = 25;


			 let genX = refPos.x + getRandomVal(-130, 130);
             let genY = refPos.y + getRandomVal(-130, 130);			
			 
				earwax.x = genX
         		earwax.y = genY 

              console.log("createEarwax:Pos: " + genX + ", " + genY);

               this.earwaxArray.push(earwax)
		  }

		
	}
	
	
	updateCleaner(){
		
	}
	
	updateFace(){
		
		
	}
	
	
//============	
	getTouchedStuff(touchPos){
		
		   //collison 등
		for(let i=0; i < this.earwaxArray.length; i++){
			
			let obj = this.earwaxArray[i]
								
			//earwax 		
			let offsetA = obj.radius;
			let cA = {x: obj.x+offsetA, y: obj.y+offsetA, r: obj.radius}; 			
												
			let rCollision = isInCircle(cA, touchPos)
			
			if(rCollision == true){
			
               return obj									
			}
		
	    }
		
	}

 
   releaseTouchedStuff(){
	   
      for(let i=0; i < this.earwaxArray.length; i++){
			
			let obj = this.earwaxArray[i]
			
			if(obj.state == 1){
				
				obj.state = 0;
			}										
	   }//for(...( 
	   
   } //
   
   
   moveTouchedStuff(deltaX, deltaY){
	   
	    for(let i=0; i < this.earwaxArray.length; i++){
			
			let obj = this.earwaxArray[i]
			
			if(obj.state == 1){
								
				obj.x += deltaX;
				obj.y += deltaY;				
			}										

	   }//for(...( 
	   
	   
   }
   
   //refPos에서 refDist이상이면 clear
   probe_touchedStuff_removal(refPos, refDist){

        let  clearedStuff=0	  
	  
	    for(let i=0; i < this.earwaxArray.length; i++){
			
			let obj = this.earwaxArray[i]
			
			if(obj.state == 0 || obj.state == 2){							
                  continue;														
			}
			
	        let objPos = {x: obj.x , y: obj.y}
	
            let dist = getDistSqrt( refPos, objPos); 		
			
			if(dist >= refDist){
				
				clearedStuff +=1				
				//cleared 
				obj.state = 3
				console.log("remove stuff: " + dist)
			}
			
	   }//for(...)
	   
	   
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
          
		  for(let i=0; i < this.earwaxArray.length ; i++){
			 
                let obj = this.earwaxArray[i]			 
				if(obj.state == 1){
			  
                       numAttach += 1
				}
		  }
		  
         return numAttach

	   
   }


 ts(e){
  
  var touches = e.touches;
  var ex = touches[0].pageX;
  var ey = touches[0].pageY - this.canvas.offsetTop;
  
  //touchSPos[0] = ex 
  //touchSPos[1] = ey   
  
   this.lastMovePos.x = ex 
   this.lastMovePos.y = ey 
  
   this.touchSPos= {x:ex, y:ey};
  
   let obj = this.getTouchedStuff(this.touchSPos);
  
    if(obj != undefined){		

		this.isDraggingStuff = true 
	
    	obj.state = 1 
		console.log("find touchedStuff");
	}
	
    
   this.isMoveTracking = true;
   this.moveSpeedCheckT = this.appCurT   
   this.moveSpeedCheckPos = {x: ex, y: ey}
 
   var msg = "touch start: (" + ex + ", " + ey + ")" 
   console.log(msg);
  
}



 tm(e){
	 
   if(this.isDraggingStuff == false){
       return;
   }	   

   var touches = e.touches;
  
  let ex = touches[0].pageX 
  let ey = touches[0].pageY
  
  let deltaX = ex - this.lastMovePos.x 
  let deltaY = ey - this.lastMovePos.y
  
  this.lastMovePos.x = ex
  this.lastMovePos.y = ey
  
   var msg = "touch move.curPos: " + ex + ", " + ey 
   //console.log(msg);
     
    msg = "touch move:delta: " + deltaX + ", " + deltaY 
    console.log(msg);
  
    this.moveTouchedStuff(deltaX, deltaY);
     
   if(this.sound_move.paused == true){	   

    //play중이 아니라면
	 this.sound_move.currentTime = 0
	 this.sound_move.play();	   
	   
   }
   else { //playing
	   
	   if(this.sound_move.ended == true){
		   
			 this.sound_move.currentTime = 0
			 this.sound_move.volume = 1.0
	   }
	   
	  // this.sound_move.play();	      
      // this.isPlayMovesound = true;
   }
   
   
   
  
    let offset = 150 
    let centerRefPos =  {x: this.closeupRscPos.x+offset , y: this.closeupRscPos.y+offset}
		
	this.probe_touchedStuff_removal(centerRefPos, 140);
  
     //this.toolPos.x += deltaX
     //this.toolPos.y += deltaY
   }


	te(e){

	console.log("touch end"); 
	
	this.isMoveTracking = false
	this.isDraggingStuff = false  
	
	
	//this.sound_move.pause();
	this.sound_move.volume = 0.0
	
	this.releaseTouchedStuff();
	
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


var AudioContext;
var audioContext;

window.onload = function(){
	
		console.log("window.load");
		
		 navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
			 
        AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
   /*
    	window.AudioContext  = window.AudioContext || window.webkitAudioContext;		 
        var audioContext = new AudioContext();	
	*/   
		
    }).catch(e => {
        
		console.error(`Audio permissions denied: ${e}`);
    });
		
	new App();
	
}

