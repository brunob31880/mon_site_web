
/**
 * Configure a mock JSDOM navigator for tests with TIMEMODE_CHANGE
 */

import {JSDOM} from "jsdom";
import 'jsdom-global/register';

// Define some html to be our basic document
const DEFAULT_HTML = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>';
// JSDOM will consume this and act as if we were in a browser
const window = new JSDOM(DEFAULT_HTML).window;
global.navigator = {
	userAgent: "node.js"
};

/**
 * Mock Canvas / Context2D calls
 */
const mockCanvas = window => {
	window.HTMLCanvasElement.prototype.getContext = () => {
		return {
			fillRect: function() {},
			clearRect: function(){},
			getImageData: function(x, y, w, h) {
				return  {
					data: new Array(w*h*4)
				};
			},
			putImageData: function() {},
			createImageData: () => [],
			setTransform: function(){},
			drawImage: function(){},
			save: function(){},
			fillText: function(){},
			restore: function(){},
			beginPath: function(){},
			moveTo: function(){},
			lineTo: function(){},
			closePath: function(){},
			stroke: function(){},
			translate: function(){},
			scale: function(){},
			rotate: function(){},
			arc: function(){},
			fill: function(){},
			measureText: function(){
				return { width: 0 };
			},
			transform: function(){},
			rect: function(){},
			clip: function(){},
		};
	};

	window.HTMLCanvasElement.prototype.toDataURL = () => {
		return "";
	};
};

mockCanvas(window);
