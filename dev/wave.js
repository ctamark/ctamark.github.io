
class Point {
	
	constructor(idx, x, y){
		this.idx = idx 
		this.x = x 
        this.y = y 
        this.refY = y 
        this.angleSpeed = 0.03 
		this.angleR = idx
        this.max = Math.random()*100 +120 		
		
	}
	
	//point를 위아래로 움직이는 함수 
	update(){
			
		//console.log('point.update')	
		this.angleR += this.angleSpeed 
		this.y = this.refY + Math.sin(this.angleR)*this.max  
		
		//Math.sin() : -1 ~ 1  
		
	}
		
}

 class Wave {
	
	constructor(idx, totalPoints, color) {
		
		this.idx = idx ;
		this.totalPoints = totalPoints
		this.color = '#5599FF'
		this.points = [] 
	
	}
	
		
	resize(width, height){
		
		this.width = width 
		this.height = height
		this.centerX = width/2;
		this.centerY = height/2;		
		this.pointGap = width / (this.totalPoints-1)
		
		
		this.init()
		
	}
	
	
	init() {
   
      this.points = [] 
	  
	  for(let i = 0; i < this.totalPoints; i++){
		  
	    const point = new Point(this.idx + i , 
                         		this.pointGap* i, this.centerY);		  

         this.points[i] = point 	  
	  }
		
		
	}
	
	draw(ctx){
			
		//console.log('wave.draw()')
	
		ctx.beginPath();
		ctx.fillStyle = this.color

         let prvX = this.points[0].x 
		 let prvY = this.points[0].y 
		 
		 ctx.moveTo(prvX, prvY);
		 
 	    for(let i=1;  i < this.totalPoints; i++){
			
			if(i < this.totalPoints - 1){
				
			     this.points[i].update()
			}
			
			 let cx = (prvX + this.points[i].x ) /2 
			 let cy = (prvY + this.points[i].y ) /2 

             ctx.lineTo(cx, cy)			
			
             prvX = this.points[i].x 
		     prvY = this.points[i].y 
			 					
		 }
		 
		 ctx.lineTo(prvX, prvY) 
		 
       //원호 그리기: 
       // ctx.arc(x , y, radius, startAngle, endAngle, countClockwise)
	   //0~2PI 범위에서 시작점과 끝을 나타냄
       // ctx.arc(this.point.x , this.point.y, 30, 0, 2*Math.PI);
		//ctx.fill();		
		ctx.lineTo(this.width, this.height)
		ctx.lineTo(this.points[0].x, this.height)
		ctx.fill()		
		ctx.closePath();
		
	}
	
}

class WaveGroup {
	
	constructor(){
		
		this.totalWaves = 1
		this.totalPoints = 5 
		
		this.waves = [] 
		
		for (let i=0; i < this.totalWaves; i++){
			
			const wave = new Wave( i, this.totalPoints, 'rgba(0, 255, 0, 0)')
			this.waves[i] = wave 
		}
				
		
	}

    resize(width, height){
		
		for(let i=0; i < this.totalWaves; i++){
			
			const wave = this.waves[i];
			wave.resize(width, height)
			
		}

	}		
	
	
	draw(ctx){
		
		for(let i=0; i < this.totalWaves; i++){
			
			const wave = this.waves[i];
			wave.draw(ctx)
			
		}
		
		
	}
	
	
	
}