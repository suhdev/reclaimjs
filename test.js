"use strict"; 

function* shake(){
	"use strict";
	var i = 0,done = false,exec = false;

	function n(){

	}
	

	while(true){
		if (exec){
			
		}
		setTimeout(function(){
			++i;
			done = true;
		},2000);


	}
}

var k = shake(); 
console.log(k.next());
console.log(k.next());
console.log(k.next());
console.log(k.next());
console.log(k.next());
console.log(k.next());
console.log(k.next());
console.log(k.next());