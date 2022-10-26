import {getRandomVal} from './helper.js'

class App {
	
	constructor(){
		
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		document.body.appendChild(this.canvas);
	}
	
		
}

window.load = () => {
	
	new App();
	
}