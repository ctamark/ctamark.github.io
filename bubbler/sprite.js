

class sprite{
	
	constructor(x, y){
				
		this.pos = {x:x, y: y}
		
		//text를 통해서 표시하는 경우  
		this.msg = ''
		
		this.lifeTime =0//<----  infinite
		this.beginT = 0
		
		this.alpha = 1.0 //
		
		this.rscIdx = -1
		
		this.isUpMove =false 
		
		this.isWaitForRemove = false 
		
					
	}

	update(){
		
		let elapsT = gAppCurT - this.beginT 
		
		if(this.lifeTime > 0){
			
			if( elapsT > this.lifeTime){
				
				this.isWaitForRemove = true
			}			
		}
		
		if(this.isUpMove){
		
		     this.pos.y -= 1.0
		}

		
	}
	
	draw(ctx){
		
		//   console.log('sprite.draw' + this.msg)
		
		this.update()
		
		if(this.msg.length >0){
						
		  ctx.font ="bold 16pt verdana";
		  
  		   ctx.fillStyle = '#000000'		   		  
		   ctx.fillText(this.msg ,this.pos.x, this.pos.y+1);		

		  ctx.fillStyle = '#FD9301'		   				   
		  ctx.fillText(this.msg ,this.pos.x, this.pos.y);		

				
		}
		
		
	}
	
	
}