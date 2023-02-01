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
	}
		
	
	setVelocity(vx, vy){
		
		this.velocity = {x: vx, y: vy} 
	}

 
	
	update(){
		
		this.isCheckMatchedBall = false  						
		
		if(this.state == ballstate_move){
			
				//console.log('update: ' + this.pos.x + ',' + this.pos.y)
				let acc = 0.0	
				let deltaY = (this.velocity.y += acc)
				
				let minX = this.pos.x - this.radius 
				let maxX = this.pos.x + this.radius 
					
				 if(minX < 10 || maxX > (gClientW-10)){

					 this.velocity.x = -1*this.velocity.x;			 
					 
				 }
				 
				 this.angleR += 0.1
				 
				this.pos.x += this.velocity.x             
				this.pos.y += deltaY
				
				
				let contactInfo = getContactBall(this)
				
				if(contactInfo != null){
					
					if(contactInfo.ball.rscIdx == rscIdx_rock_01){
								
												
					}
					else {
						
						this.link_idx = contactInfo.ball.link_idx 
						//------
						this.link_ball_id = contactInfo.ball.id
						
						if(this.rscIdx == contactInfo.ball.rscIdx){
							
						      regContactInfo(this.id, contactInfo.ball.id)							
						}
						
						this.isCheckMatchedBall = true 												
					}
					
					this.state = ballstate_link 
					
					this.pos = contactInfo.pos
				}
						
		}
		else {
			
			
			
		}


		
	}
	
	
	draw(ctx){
				
		let size = this.radius*2
		let cx = this.pos.x - this.radius
		let cy = this.pos.y - this.radius 
		
    //    console.log('draw: ' + cx+ ',' + cy)				

        ctx.translate(cx, cy) 	
		ctx.rotate(this.angleR); 
			
		ctx.drawImage(this.img, -size/2, -size/2, size, size)
		//ctx.drawImage(this.img, 100, 200, size, size)
		
		 ctx.rotate(-this.angleR);
	     ctx.translate(-cx, -cy) 	

	}
	
		
}