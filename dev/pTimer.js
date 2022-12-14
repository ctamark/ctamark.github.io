class PTimer{
	
	//뽀모도로		
	static state_rest = 0
	static state_break = 0	
	
	static state_flow  = 1
    static state_focus = 1
    
	static state_waitUserInput = 2 	
	
	constructor(){
		
		//redzone 남은 시간 		
		this.clock_img = new Image();
		this.clock_img.src = "./clock.png"
	
        this.startBtn_img = new Image();
		this.startBtn_img.src = './timer_start.png'
		//70x70

        this.stopBtn_img = new Image();
		this.stopBtn_img.src = './timer_stop.png'
		//70x70


		this.remainSec = 10*60*1000
		this.totalMSec = 0  
		this.startT = 0 		
		
		this.curState = PTimer.state_break
		
		//휴식후 자동으로 flow타이머 시작 여부 
		this.isAutoStart = false 
		
		this.clockSize = 300
		
		this.clockCenterPos = {x:0, y:0}
		
		
		this.ui_info_array = [ ]
		
	
		//---------------------
		this.focusMin = 25 
		
		//focus완료시 증가
		this.focusIdx = 0
		
	}
	
	setState(state){
		
		console.log('setState: ' + state)
		this.curState = state 
		
	}
	
	
	init(){
		
	  this.focusIdx = 0
     // gClientWidth  
     // gClientHeight 	  	  
	  this.clockCenterPos.x = gClientWidth/2 
	  this.clockCenterPos.y = gClientHeight/2 
						

      let x= this.clockCenterPos.x
	  let y= this.clockCenterPos.y + 10		  
	  


      //startBtn(break 상태일 때 표시) 
      this.ui_info_array.push({x:x, y:y, w: 70, h: 70})
	  
	  
 	   x= this.clockCenterPos.x
	   y= this.clockCenterPos.y + this.clockSize/2 + 30		  
      //stoptBtn(focus상태일 때 표시)  
      this.ui_info_array.push({x:x, y:y, w: 70, h: 70})
	 	 		
	}
	
		
	begin_stateRest(min){
			
			console.log('begin_stateRest')
			
			this.setState(PTimer.state_break )
							
			this.totalMSec =  min*60*1000				
 		    this.startT = gAppCurT		
		
	}
	
	//==============
	//
	//=============

	
	//25min
	begin_stateFocus(total_min){
		 
		 this.setState(PTimer.state_focus)
	
         this.totalMSec = total_min*60*1000
		 this.startT = gAppCurT		
	}
	
	end_stateFocus(){
		
		console.log('end_stateFocus')

        //자동으로 rest모드 진입 		
    	this.begin_stateRest(5)
		
	}
	
	reset(){
		
		
		
	}
	
	
	//============
	//
	//============
	draw(ctx){        				
				
	    let elapsedT = gAppCurT - this.startT		
		
		let remainSec =  (this.totalMSec - elapsedT)/1000 
		
		if(remainSec <= 0){
		
		    this.procEndTimer(this.curState)
			
			return 
		 }
		
		//floor 소수점을 버림 <---> ceil 올림
		remainSec = Math.floor(remainSec)
		
		let dispMin = Math.floor(remainSec/60)
		let dispSec =  remainSec%60
		
				   
	     let cx = 120 
	     let cy = 120
		 let  info = "rest time: " +  dispMin + ':' + dispSec			 
		//15min -> 90, 1min -> 6 degree, 1sec ->0.1 degree
		
		
	   let x =  150, y = 150;
	   
       if(this.curState == PTimer.state_focus){
 
           //cx,cy(drawPos)
           cx  = this.clockCenterPos.x - this.clockSize/2
		   cy  = this.clockCenterPos.y - this.clockSize/2
		
		   ctx.drawImage(this.clock_img, cx, cy, this.clockSize, this.clockSize)
  

		   ctx.beginPath();		
			//ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)		
			//중심좌표(x,y), 
			//anticlockwise: 기본값 false 
			//startAngle : 0도--->3시, 90도--->6시 		
			ctx.fillStyle = 'red'		
			let radius = 120
			
			let startAngle = 270*(Math.PI / 180)
			
			//let endAngle = 90*(Math.PI / 180)
			let endAngle = (270+remainSec*0.1)*(Math.PI / 180)
			//1min당 6도 
			 
			 
			 
			ctx.arc(this.clockCenterPos.x, this.clockCenterPos.y, radius, startAngle, endAngle, false)		
			ctx.lineTo(this.clockCenterPos.x, this.clockCenterPos.y)
			ctx.fill()
			
			
			//------------
			
		    info = "focus time: " +  dispMin + ':' + dispSec	
						   
		   ctx.font ="15pt Fira";
		   ctx.fillStyle = 'white'
		   ctx.textAlign = "center";
		   ctx.fillText(info, this.clockCenterPos.x,  cy);
		
		
	   } else if(this.curState == PTimer.state_rest){
		   		   
		     info = "break time: " +  dispMin + ':' + dispSec	
		 
		   cx  = gClientWidth/2
		   cy  = this.clockCenterPos.y - 50
				 
		   ctx.font ="20pt Fira";
  		   ctx.fillStyle = 'white'
		   ctx.textAlign = "center";
		   ctx.fillText(info, cx, cy);
		   
	   }
	   
	   this.drawUI(ctx)
	   
	   this.drawTimerInfo(ctx)
	   
	   //---------------
    
	}
	
	//=============
	//
	//=============
	drawUI(ctx){

        let drawX, drawY;
		
		
		

       if(this.curState == PTimer.state_break){
		   
 		      let info = this.ui_info_array[0]

			  drawX = info.x - info.w/2
			  drawY = info.y - info.h/2
			
			  ctx.drawImage(this.startBtn_img, drawX, drawY)			  
			  //break Time: xx:xx 
			  //       [start]
		
	    }
		
	   if(this.curState == PTimer.state_focus){

              let info = this.ui_info_array[1]

			  drawX = info.x - info.w/2
			  drawY = info.y - info.h/2
			
			  ctx.drawImage(this.stopBtn_img, drawX, drawY)
			  
	   }		   
		
	}
	
	
	drawTimerInfo(ctx){
				
	   //setInfo 			
	   let info= '#focus: ' + this.focusIdx  
	   let cx = gClientWidth/2
	   let cy = 30 
	   ctx.font ="20pt Fira";
	   ctx.fillStyle = 'white'
	   ctx.textAlign = "center";
	   ctx.fillText(info, cx, cy);
		
		
	}
	
	//============
	//
	//============	
	procEndTimer(state){
		
		console.log('procEndTimer')
		
		if(state == PTimer.state_break){
	
			if(this.isAutoStart == true){
				
				   this.begin_stateFocus(25)
				
			}
			else {
				
			//	this.curState = PTimer.state_waitUserInput
				
			}
		
		
		}else if (state == PTimer.state_flow) {
			//=================
			
			this.focusIdx += 1
		    this.end_stateFocus()
			
		}
				
	}
	
	//===========
	//
	//===========		
	touchS(e){
		
		console.log('PTimer.touchS')
		
		let touches = e.touches 
		let tx = touches[0].clientX 
        let ty = touches[0].clientY 
		
		let uiW = 70 
		let uiH = 70 
		
		
		// start_idx = 0 
		// stop_idx = 1
		
		console.log("touchPos: " + tx + "," + ty )
		
		let hw = 70/2
		let hh = 70/2 
		
		let rectInfo 
		
		if(this.curState == PTimer.state_break) {
			
			//startBtn 
		    let info = this.ui_info_array[0]
						
			let minX =  info.x - hw 
			let minY =  info.x - hh 
			let maxX =  info.x + hw
			let maxY =  info.y + hh		

            if(tx >= minX && tx<= maxX && ty>= minY && ty <= maxY) {
				
				   this.begin_stateFocus(this.focusMin)
				
			 }
						
		}
		else if (this.curState == PTimer.state_focus){
						
			//stopBtn 
		    let info = this.ui_info_array[1]
						
			let minX =  info.x - hw 
			let minY =  info.x - hh 
			let maxX =  info.x + hw
			let maxY =  info.y + hh		

            if(tx >= minX && tx<= maxX && ty>= minY && ty <= maxY) {
				
				   this.end_stateFocus()
				
			 }
								
		}
		
	
	}
	
	
	
}