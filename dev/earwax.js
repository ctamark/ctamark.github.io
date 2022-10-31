export class earwax{
	
	constructor(){
		
		this.img = new Image();
		this.img.src = "./earwax.png"
		
	}
	
	draw(ctx){
	
		ctx.drawImage(ctx, 0, 0); 
				
	}
	
	
}