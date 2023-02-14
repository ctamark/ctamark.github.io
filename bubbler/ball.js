
class Vec2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(v){
        return new Vec2(this.x+v.x, this.y+v.y);
    }

    subtr(v){
        return new Vec2(this.x-v.x, this.y-v.y);
    }

    mag(){
        return Math.sqrt(this.x**2 + this.y**2);
    }

    mult(n){
        return new Vec2(this.x*n, this.y*n);
    }

    normal(){
        return new Vec2(-this.y, this.x).unit();
    }

    unit(){
        if(this.mag() === 0){
            return new Vec2(0,0);
        } else {
            return new Vec2(this.x/this.mag(), this.y/this.mag());
        }

/*		
	 static perpendicularCW(iV1){

               return new Vec2(iV1.y, -iV1.x);
	    }		
*/		
    }
	
	
	
 /*
    drawVec(start_x, start_y, n, color){
        ctx.beginPath();
        ctx.moveTo(start_x, start_y);
        ctx.lineTo(start_x + this.x * n, start_y + this.y * n);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    }
  */  
    static dot(v1, v2){
        return v1.x*v2.x + v1.y*v2.y;
    }
	
}


function  vec2PerpendicularCW(iV1){

	   return new Vec2(iV1.y, -iV1.x);
}		

function vec2PerpendicularCCW(iV1){

	   return new Vec2(-iV1.y, iV1.x);
}		



//------------------------------
//manage dist-joint 
//-----------------------------
function updateContactInfo(){
	
	//anchor pos로 되돌아가기 
	
    for(let i=0; i < gBalls.length ; i++){
		
		let b = gBalls[i]
						
		
	}
		
	
}




class ball{
	
	constructor(rscIdx, radius){
		
		this.pos = {x: 0, y: 0}
		this.radius = radius
 		
        this.img = new Image()		
		this.img.src = './bullet-01.png' 
		this.state = 0
		
		this.velocity = {x:0, y:-0.5}
		
		this.angleR = 0
		
		this.link_idx = -1
		this.link_ball_id = -1
		
		this.id = 0 
		this.rscIdx = rscIdx
		this.isWaitForRemove = false 
		
		this.isCheckMatchedBall = false  
		
		this.anchor = {x:0, y:0}
		this.isAnchored = false 
		
		this.acc = {x:0, y:0};
		
		//자신을 끌어당기는 ball 
		this.draw_ballA_id = 0		
		this.isBeginDrawBall = false 
		
		this.prop = 0
		
	}

   translate(x, y){

    this.pos.x += x 
    this.pos.y += y
	
	this.anchor.x +=x 
	this.anchor.y +=y 
	
   }	   
	
	
	setVelocity(vx, vy){
		
		this.velocity = {x: vx, y: vy} 
	}
	
	addProp(iProp){
		
		this.prop |= iProp 
		
	}
	
	removeProp(iProp){
		
		this.prop &=~iProp 
	}
	
	resetProp() {
		
		this.prop = 0 
	}
	

	hasProp(iProp){
		
		if((this.prop&iProp) != 0){
			
			return true;
		}		
		return false;
	}
	
   isMyLinkBall(id){
				
		let res = isDistJoint(this.id, id)
		
		return res
		
	}

//=========================
//
//
//=========================	
 update(){
		
		this.isCheckMatchedBall = false  						
		
		if(this.state == ballstate_move){
			
				let acc = 0.0	
				
				let minX = this.pos.x - this.radius 
				let maxX = this.pos.x + this.radius 
					
				 if(minX <= 10 || maxX > (gClientW-10)){

					 this.velocity.x = -1*this.velocity.x;	
				 }
				 
				 this.angleR += 0.1
				 
				 this.velocity.x += this.acc.x 
                 this.velocity.y += this.acc.y 

				 
				this.pos.x +=  this.velocity.x             
				this.pos.y +=  this.velocity.y
				
				
				 let contact_array = resolveCollision(this)
				 				 
				  if(contact_array.length > 0){
				
					 	//this.state = ballstate_anchored						
						this.setState(ballstate_anchoring)
						this.isCheckMatchedBall = true 							
						
				  
				        contact_array.forEach( (info, idx) => {
							
						if(info.ball.rscIdx == rscIdx_rock_01){
						
                         	 this.velocity.x = 0 
						     this.velocity.y = 0						
							 
							 this.isAnchored = true 
							 this.setState(ballstate_anchored)
							 
							 //pos는 object이므로 참조값을 사용
                             //(주의! pos가 바뀌면 anchor도같이 바뀜)							 
							 this.anchor.x = this.pos.x 
							 this.anchor.y = this.pos.y
							 
							 this.addProp(ball_prop_fixed)
							 							 							 							 
						 }
						 else {
							 
							   console.log(this.id + '.collision! with-->'  + info.ball.id )
						   	
								if(this.rscIdx  ==  info.ball.rscIdx){
									
		  						   // regContactInfo(this.id, info.ball.id)									   
							        regMatchBall_id(this.id, info.ball.id)
							
								}
																
								let refDist = this.radius + info.ball.radius 
								 regDistJoint(this.id, info.ball.id, refDist)
								 
															
								//-----------
								//this.regMyLinkBalls(info.ball.id)
								//-----------
								 
								 if(info.ball.state == ballstate_anchored){
															
									  info.ball.setVelocity(this.velocity.x, this.velocity.y)	
									  info.ball.setState(ballstate_move_byExtForce)
									 
								 }
								 
								 
								 	 //pos는 object이므로 참조값을 사용
									 //(주의! pos가 바뀌면 anchor도같이 바뀜)							 
									 this.anchor.x = this.pos.x 
									 this.anchor.y = this.pos.y
								 

								 	 this.velocity.x = info.resV.x 
									 this.velocity.y = info.resV.y
									 
							  		 this.setState(ballstate_anchored)
									 
									 
									 let  drawBall = probeDrawBalls()
									 
									 if(drawBall != null){
										 
										 
									 }
									 else {
										 
										 	 let event = new CustomEvent("post_ball_interact", {detail:{id:this.id} })
                           		  	         document.dispatchEvent(event)										 
									 }
									 
								 	

						 }						 
						 
									
				      } ) //forEach 

				}				 
 							
		} //ballstate_move
		else {
		
          this.updateMove2()		
			
		}
				
		
	} //update 


  //================
   updateMove(){


   }	   
     
 
   
   
//============   
 updateMove2(){
	 
	 	  
 	  if(this.state == ballstate_move_nextCollide){
	
	
	         this.pos.x +=  this.velocity.x             
		     this.pos.y +=  this.velocity.y
			 
			 
			 let diffX = this.pos.x - this.anchor.x 
			 let diffY = this.pos.y - this.anchor.y
			 let dist = Math.sqrt(diffX*diffX + diffY*diffY)
			 
			 if(dist >= 40){
				 
				 this.setState(ballstate_restore_toAnchor)
				 
			 }
			
		  
	  }
	  else if(this.state == ballstate_restore_toAnchor){
		  
             this.pos.x +=  this.velocity.x             
		     this.pos.y +=  this.velocity.y
			 
			 let diffX = this.pos.x - this.anchor.x 
			 let diffY = this.pos.y - this.anchor.y
			 let dist = Math.sqrt(diffX*diffX + diffY*diffY)
			 

            if(dist < 2.0){		  
		   		  
  		          this.pos.x = this.anchor.x 				 
  		          this.pos.y = this.anchor.y 				 
				  
				   printVec('pos ' , this.pos)
				   printVec('anchor' , this.anchor)
				  
				  this.setState(ballstate_anchored)
				  
		  
	          }
			  else {
				  
				      this.velocity.x = (this.anchor.x - this.pos.x)/10
          			  this.velocity.y = (this.anchor.y - this.pos.y)/10
				  
			  }
			  
	  }
	  	 
 	  if(this.state == ballstate_anchoring ){
	

	
	
	         this.pos.x +=  this.velocity.x             
		     this.pos.y +=  this.velocity.y

		  
	  }
	  else if(this.state == ballstate_anchored){
		  
		  
		  
		  
		  
		  
	  } 
	  else if(this.state == ballstate_move_byExtForce){
		 	
			console.log('ballstate_move_byExtForce')
			
		
			
	    	 this.pos.x +=  this.velocity.x             
		     this.pos.y +=  this.velocity.y
			
	 		/*
			 let diffX = this.pos.x - this.anchor.x 
			 let diffY = this.pos.y - this.anchor.y
			 let dist = Math.sqrt(diffX*diffX + diffY*diffY)
			 
			 
			 if(dist < 2.0){
				 
                  this.pos = this.anchor				 
				  
				   printVec('pos ' , this.pos)
				   printVec('anchor' , this.anchor)
				  
				  this.setState(ballstate_sleep)
				  
				  
			 }
			 else {
				 
				 this.velocity.x = (this.anchor.x - this.pos.x)/10
				 this.velocity.y = (this.anchor.y - this.pos.y)/10
			 
			 }
			 */
			 //ballstate_restore_toAnchor
			 this.setState(ballstate_restore_toAnchor)
			 			
		
	  } //ballstate_move_byExtForce
	  else if(this.state == ballstate_sleep){
		  
		  		  
				  
				  
	  }	  
	 else if(this.state == ballstate_move_toDrawBall){
		 
		let drawBall = getBall(this.draw_ballA_id)
       
 	    let dirX =  drawBall.pos.x - this.pos.x 
	    let dirY =  drawBall.pos.y - this.pos.y 
		
		let dirV = new Vec2(dirX, dirY)
		let dirV2 = dirV.unit()
		
		let refDist = drawBall.radius + this.radius			
	    let dstPos = {x: (drawBall.pos.x - dirV2.x*refDist), y: (drawBall.pos.y - dirV2.y*refDist)}
	
		this.velocity.x = dirX/10 
		this.velocity.y = dirY/10 
		
		this.pos.x += this.velocity.x  
		this.pos.y += this.velocity.y  
		
		let dist = Math.sqrt(dirX*dirX + dirY*dirY)
		
		if(dist < refDist) {
			
			this.pos.x = dstPos.x 
			this.pos.y = dstPos.y
						
 			console.log(this.id + '.end -ballstate_move_toDrawBall: ')
			regDistJoint(this.id, this.draw_ballA_id, refDist, '---ballstate_move_toDrawBall: ' + this.draw_ballA_id + '<------' + this.id)

         	if(this.rscIdx  ==  drawBall.rscIdx){
				
				 regMatchBall_id(this.id,this.draw_ballA_id)
			 }
			 

			this.setState(ballstate_anchored)
			
			 let event = new CustomEvent("post_ball_interact", {detail:{id:this.id} })
			 document.dispatchEvent(event)
						 			
		}


				 
	 }

	 	

 }	   


moveToDrawTarget(){
	
	
	
}


//draw대상 contact후
drawNextBall(peer){
	
  //let diffX = this.pos.x - peer.pos.x  
  //let diffY = this.pos.y - peer.pos.y  
		
}


getDrawTarget(){

   let refDist = 0	
   for(let idx=0	; idx < gBalls.length ; idx++){
        
        let b = gBalls[idx]
        
		if(b.rscIdx == rscIdx_rock_01){
			
             continue
		}			
		
		if( (b.prop&ball_prop_fixed) != 0){
			
			continue;
		}
  	    
		if(b.id == this.id ){
			continue 
		}
		
		//이동중인 rock 
		if(b.state == ballstate_move){
		
            continue 		
		}
		
		//-------------
		//이미 나와 contact인 경우 
		if( this.isMyLinkBall(b.id) == true){
			
			continue;
		}
			          		 
        let distX =this.pos.x - b.pos.x
        if(distX < 0) distX = -1*distX 
	   
        let distY =this.pos.y - b.pos.y
        if(distY < 0) distY = -1*distY 
			  
         refDist = b.radius + this.radius + 5 
			  
		if( (distX < refDist) && (distY < refDist) ){

           return b 
		}			
			  	  
   }
	

	return null 
	
}


 //nextBall: peer2 
 move_TolinkNextBall(peer1, nextBall){
	 
	 let diffX = nextBall.pos.x - this.pos.x 
	 let diffY = nextBall.pos.y - this.pos.y 
	 	 
	 let velocity = {x: diffX, y: diffY}	

      velocity.x = diffX/10
      velocity.y = diffY/10
	 
     this.pos.x += velocity.x 	 
     this.pos.y += velocity.y 	 
	 
    //reposition peer1 
	// this----peer1---->nextBall	

    let dirV = new Vec2(this.pos.x -peer1.pos.x  , this.pos.y - peer1.pos.y )
	let dirV2 = dirV.unit()
	
	//보정하기 
    let refDist = this.radius + peer1.radius     
	
	this.pos.x = peer1.pos.x + dirV2.x*refDist 
	this.pos.y = peer1.pos.y + dirV2.y*refDist 

		
 }



 //==================
   getNearestCollidableBall(){
	   

    let collidableBalls=[]	   
	   
	 let ray = {x: this.velocity.x*50, y: this.velocity.y*50}
     	 
	 let normV = vec2PerpendicularCCW(ray)
	 normV = normV.unit()
	 
	 console.log('normV: ' + normV.x + ', ' + normV.y)
	 console.log('rayV: ' + ray.x + ', ' + ray.y)
	 
	 let dot = 0
	 
	 let refV = {x:0, y:0}
	 let refDist
	 	  
    for(let i=0; i< gBalls.length ; i++){
		
			let b = gBalls[i]
		
			if(b==this || b.rscIdx == rscIdx_rock_01){
					
				  continue	
			}
			
			if(b.state == ballstate_move){
				
				continue;
			}
	
		  refV.x = b.pos.x - this.pos.x  	
		  refV.y = b.pos.y - this.pos.y
		  
		  dot = normV.x*refV.x + normV.y*refV.y  

		  console.log( 'rayCast: ' + b.id + '.dot ' + dot)  	
		  if (dot < 0){

			  continue;
		  }
		  
		  refDist = b.radius + this.radius
		 		  
		  if(dot <= refDist){
			  
			  console.log('rayCast: intersect-----> ' + b.id + 'dist ' + dot)  
			  
			  collidableBalls.push(b.id)
			  
		  }
		  
	  	
	 	   
    }
 	 
     return collidableBalls
	 
	   
   }
   
   
/*
const ballstate_move = 0
const ballstate_link = 1 
const ballstate_anchored = 1 
const ballstate_move_byExtForce = 2 
const ballstate_sleep = 3
*/
    setState(state){
		
		let stateDispName = '' 
		switch(state){
	
	    case ballstate_anchored: 
			stateDispName = 'ballstate_anchored'
 		break;
		
		case ballstate_move_byExtForce: 
			stateDispName = 'ballstate_move_byExtForce'		
          break;		
		
		case ballstate_sleep: 
			stateDispName = 'ballstate_sleep'		
          break;		
		  
	    case ballstate_move_toDrawBall:
		    stateDispName = 'ballstate_move_toDrawBall'		
          break;   	  
		
		 default:   
		    stateDispName = '----'		
		  
		}	
	
        console.log('id/'+ this.id + ': stateBegin--->' + stateDispName)		
		this.state =state 
		
	}

	
	draw(ctx){
				
		let size = this.radius*2
		let cx = this.pos.x
		let cy = this.pos.y 
		
		let hSize = size/2
		
        ctx.translate(cx, cy) 	
		ctx.rotate(this.angleR); 
			
		ctx.drawImage(this.img, -hSize, -hSize, size, size)
		//ctx.drawImage(this.img, 100, 200, size, size)
		
		 ctx.rotate(-this.angleR);
	     ctx.translate(-cx, -cy) 	
		 
		 let dinfo =  this.id.toString() 	
         ctx.fillStyle = '#fff'	 		 
 		 ctx.fillText(dinfo, cx+1, cy+1)
         ctx.fillStyle = '#000'	 		 
 		 ctx.fillText(dinfo, cx, cy)
		 
		 
		 //선그리기 
		 
		 
		 if(this.state == ballstate_move || this.state == ballstate_move_nextCollide){
		  
		  let beginPos = this.pos 		 
		  let endPos = {x: (this.pos.x+ this.velocity.x*50), y: (this.pos.y + this.velocity.y*50) }
		 
          ctx.strokeStyle = "#FF0000";
		 		
		  ctx.beginPath();
			  ctx.moveTo(beginPos.x, beginPos.y);
			  ctx.lineTo(endPos.x, endPos.y);
			 // ctx.lineTo(100, 25);
			   ctx.stroke();
			   ctx.closePath();
		 }

		 

	}
	
		
}

