

//Math.floor(가장 정수로 내림된 수)
//ceil 
//round(반올림)
//toFixed
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


//export { getRandomVal,  isCollision_circle2Circle, isInRect, isInCircle, getDistSqrt};

function drawImg_angle(ctx,angle,img,x,y,width,height){

	ctx.resetTransform();

	ctx.translate(x + img.width / 2, y + img.height / 2);
	ctx.rotate((Math.PI/180) * angle);
	ctx.translate(-1 * (x + img.width / 2), -1 * (y + img.height / 2));

	ctx.drawImage(img, x , y , width , height);

	ctx.translate(x + img.width / 2, y + img.height / 2);
	ctx.rotate((Math.PI/180) * -1 * angle);
	ctx.translate(-1 * (x + img.width / 2), -1 * (y + img.height / 2));

	ctx.resetTransform();
}


function drawImage_angle2(ctx, image, x, y, degrees, scale) {

	var w = image.width * scale;
	var h = image.height * scale;

	ctx.save();

	ctx.translate(x, y);

	ctx.rotate(degrees * Math.PI/180);
	//x,y기준으로 회전

	ctx.drawImage(image, -(w/2), -(h/2), w, h);

     // we’re done with the rotating so restore the unrotated context
	 //context 반환
	ctx.restore();

}

//earWax, acne..
class Stuff{
	
	static state_normal = 0
	static state_treating = 1
	static state_treated = 2 
	
	
	constructor(){
	
      this.x = 0;
      this.y = 0;	 
	  this.radius = 25;
	  this.state = 0; 
	  //0(none), 1(cleaning: tool 따라 다니기)
	  //tool로부터의 상대적 거리 
	  this.collision_offsetX = 0;
	  this.collision_offsetY = 0;
	  
	  //canvas기준 좌측상단위치  
	  this.drawPosX = 0;
	  this.drawPosY = 0;
	  //----------------
	  this.rscIdx = 0;
	  this.id = 0;
      //----------------
	  
	  this.userVal = 0;
	  this.userFlag = 0;
	
	}
		
	
}

class Sprite{
	
	static ani_prop_loop = 1;
	static ani_prop_keep_endframe = 2
	static ani_prop_hide_after_endframe = 4


	static drawPos_minx_miny = 0;	
	static drawPos_midx_maxy = 1;
		
	
	constructor(){
		
		this.genIdx = 0;
		this.maxIdx = 0;
		this.curIdx  = 0;
	    this.coordArray= [];		
		
		this.img = new Image();				
		this.lastFrameT = 0;					
		this.aniProp = 0;
		
		this.isDisplay = false 
		
		this.drawPosKind = Sprite.drawPos_minx_miny 
		
	}
	
	addProp(prop){
	
       this.aniProp |= prop  			
	}
	
	removeProp(prop){
		
		this.aniProp &=~prop
	}
	
	hasProp(prop){
		
		if((this.aniProp&prop)!= 0 ){
			
			return true 
		}

      return false 		
	}
		
	
	setFName(imgFName){
		
		this.img.src = imgFName 
	}
	
    setRscName(pathFName){
		
		this.img.src = pathFName 
	}

	
	//sx(srcX)
	addFrame(sx, sy, width, height){
	
      var coord = {ix:sx, iy:sy, iw:width, ih:height};	
	
      this.coordArray[this.genIdx] = coord;	
	  this.maxIdx = this.genIdx
      this.genIdx = this.genIdx + 1;     	
				
 	}
	
	
	play(){
		
		this.curIdx = 0
		this.lastFrameT  = 0;		
        this.isDisplay = true
	}
	
	wait(){
		
		this.isDisplay = false 
				
	}
	
	
	
	update(curT){
	
	    let lapsT = 0
		
		if( this.lastFrameT == 0){
		
	 	 this.lastFrameT = curT;
	 	 return;
		}
		
		//console.log("curT: " + curT);
			
			lapsT = curT - this.lastFrameT;
			
			//0.5초마다 프레임 진행
			if(lapsT >= 100){
				
				this.curIdx = this.curIdx + 1;
				          
				if(this.curIdx > this.maxIdx){

						 if( (this.aniProp&Sprite.ani_prop_loop) != 0){
							 
								// console.log("ani_prop_loop");

								this.curIdx = 0				
						 }						 
						 else if( (this.aniProp&Sprite.ani_prop_keep_endframe) != 0){
							
								// console.log("ani_prop_keep_endframe");
								this.curIdx = this.maxIdx 								 
								
						 }
						 else {
							
								 console.log("need to check ani_prop ");						
						 }

				}
							
								
			 this.lastFrameT = curT;
  			// console.log("sprite.curIdx: " + this.curIdx );

			
	        }//lapsT >=500
           
		
	}
	
	

    draw(ctx, cx, cy){
				
		this.drawframe(ctx, this.curIdx, cx, cy);
		
	}		

    drawFrame(ctx,  cx, cy ){

/*
drawImage(image ,canvas_x, canvas_y,canvas_width,canvas_height)
- image : 이미지 객체
- canvas_x : 캔버스의 x 좌표
- canvas_y : 캔버스의 y 좌표
- canvas_width : 캔버스 위에 그려질 이미지의 넓이
- canvas_height : 캔버스 위에 그려질 이미지의 높이
*/
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
		
		if(this.curIdx > this.maxIdx){
			
			console.log("spriteIdx: out of bound");
		}
		
	  let frame =  this.coordArray[this.curIdx];
	  
	  let cw = frame.iw		
	  let ch = frame.ih 
    
	  let cx2 = cx 
	  let cy2 = cy 			
	  
     if(this.drawPosKind == Sprite.drawPos_minx_miny){

	
     }
     else if(this.drawPosKind == Sprite.drawPos_midx_maxy){
         //          ---->
         // (cx2,cy2)-----------|
		 //           |             |
		 //           |             |
		 //           |---cx,cy---|

          cx2 = cx - frame.iw/2 
          cy2 = cy - frame.ih 		  
		

  	 }
	else {
		
		console.log("undefined drawPosKind")		

	}	
				
	 
     ctx.drawImage(this.img, frame.ix, frame.iy, frame.iw, frame.ih, cx2, cy2, cw, ch) 
	
    }
	

    drawFrameEx(ctx,  cx, cy, scale ){

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
		
		if(this.curIdx > this.maxIdx){
			
			console.log("spriteIdx: out of bound");
		}
		
	  let frame =  this.coordArray[this.curIdx];
	  
	  let cw = frame.iw*scale 		
	  let ch = frame.ih*scale 
    
	  let cx2 = cx 
	  let cy2 = cy 			
	  
     if(this.drawPosKind == Sprite.drawPos_minx_miny){

	
     }
     else if(this.drawPosKind == Sprite.drawPos_midx_maxy){
         //          ---->
         // (cx2,cy2)-----------|
		 //           |             |
		 //           |             |
		 //           |---cx,cy---|

          cx2 = cx - cw/2 
          cy2 = cy - ch 		  
		

  	 }
	else {
		
		console.log("undefined drawPosKind")		

	}	
				
	 
     ctx.drawImage(this.img, frame.ix, frame.iy, frame.iw, frame.ih, cx2, cy2, cw, ch) 
	
    }
	


	
	
}

