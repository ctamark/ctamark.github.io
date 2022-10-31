function getRandomVal(min, max){
 
  let range = max-min

  let result = min + (Math.random()*range)
  return result;
}


function isCollision_rect2Rect(aRect, bRect ){
	
	let minX_a = aRect.x 
	let minY_a = aRect.y 
	let maxX_a = aRect.x + aRect.w
	let maxY_a = aRect.y + aRect.h
	
	let minX_b = bRect.x 
	let minY_b = bRect.y 
	let maxX_b = bRect.x + bRect.w
	let maxY_b = bRect.y + bRect.h

   if(minX_a > maxX_b ){
   
       return false 
   }
   else if(maxY_a < minY_b){
   
       return false 
   }

	return true
}

function isInRect(iRect, pos){
	

	let minX = iRect.x 
	let minY = iRect.y 
	let maxX = iRect.x + iRect.w
	let maxY = iRect.y + iRect.h
	
	if(pos.x <minX || pos.x > maxX){
		
		return false
	}

   if(pos.y < minY || pos.y > maxY){
	   
	   return false
   }
   
    return true 	
}

function isInCircle(iCircle, pos){
		
	let distX = pos.x - iCircle.x
	let distY = pos.y - iCircle.y
	
	let dist = Math.sqrt(distX*distX + distY*distY) 
	
   if(dist < iCircle.r){
	   
	   return true 
   }
 
   return false  
} 


function isCollision_circle2Circle(cA, cB, isDebug ){

	let aCenterX = cA.x 
	let aCenterY = cA.y 
	let aRadius = cA.r 
	

//------
	let bCenterX = cB.x 
	let bCenterY = cB.y 
	let bRadius = cB.r 

    if(isDebug==true){
      console.log("cA: " + cA.x +","+ cA.y + ", " + cA.r );	
      console.log("cB: " + cB.x +","+ cB.y + ", " + cB.r );	
	}
	
	let distX = bCenterX - aCenterX 
    let distY = bCenterY - aCenterY 
		
    let dist =Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));	
	let  refDist = aRadius + bRadius 
   
   if( dist < refDist){
	   
	   return true;
   }
   
   return false;
}

function   getDistSqrt(posA, posB){
	   
       let distX =  posB.x - posA.x
       let distY =  posB.y - posA.y
	   
	   let dist = Math.sqrt(distX*distX + distY*distY)
	   
	   return dist 	   
   }


export { getRandomVal,  isCollision_circle2Circle, isInRect, isInCircle, getDistSqrt};



export class Earwax{
	
	constructor(){
	
      this.x = 0;
      this.y = 0;	 
	  this.radius = 25;
	  this.state = 0; 
	  //0(none), 1(cleaning: tool 따라 다니기)
	  //tool로부터의 상대적 거리 
	  this.collision_offsetX = 0;
	  this.collision_offsetY = 0;
	
	}
		
	
}


export class CleanerTool{
	

	 constructor(){




	 }	 
		
}



export class Sprite{
	
	constructor(imgFName){
		
		this.genIdx = 0;
		this.curIdx = 0;
	    this.coordArray= [];		
		
		this.img = new Image();
		this.img.src = imgFName;
		
		this.isLoop = true;
		
		this.lastFrameT = 0;
			
	}
	
	update(curT){
	
	     let lapsT = 0
		
		if( this.lastFrameT == 0){
		
	 	 this.lastFrameT = curT;
	 	 return;
		}
		
		//console.log("curT: " + curT);
			
			lapsT = curT - this.lastFrameT;
			
			if(lapsT >= 500){
				
				this.curIdx = this.curIdx + 1;
				
				if(this.curIdx >= this.genIdx){
					this.curIdx = 0
				}
				
			 this.lastFrameT = curT;
				
	        }//lapsT >=500

           
		
	}
	
	addFrame(sx, sy, width, height){
	
      var coord = {ix:sx, iy:sy, iw:width, ih:height};	
	
      this.coordArray[this.genIdx] = coord;	
      this.genIdx = this.genIdx + 1;     	
				
 	}

    draw(ctx, cx, cy){
				
		this.drawframe(ctx, this.curIdx, cx, cy);
		
	}		

    drawframe(ctx, idx, cx, cy ){

        /*
         drawImage(img ,ix,iy,iw,ih,cx, cy,cw,ch)
		- img : 이미지 객체 
		- ix : 이미지 내에 있는 x 좌표 
		- iy : 이미지 내에 있는 y 좌표 
		- iw : 이미지 내에 있는 (x,y)를 중심으로 그려질 넓이 
		- ih: 이미지 내에 있는 (x,y)를 중심으로 그려질 높이 
		- cx : 캔버스의 x 좌표
		- cy : 캔버스의 y 좌표
		- cw : 캔버스 위에 그려질 이미지의  넓이
		- ch : 캔버스 위에 그려질 이미지의  높이
		*/
		
     let frame =  this.coordArray[idx];
	 let cw = frame.iw		
	 let ch = frame.ih 
	 
     ctx.drawImage(this.img, frame.ix, frame.iy, frame.iw, frame.ih, cx, cy, cw, ch) 
	
    }
	
	
	
}

