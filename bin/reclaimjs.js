'use strict'; 
const args = require('yargs').argv;
const readline = require('readline'); 
const fs = require('fs');
const path = require('path'); 
const currentDir = process.cwd(); 
const Stager = require('../framework/cli/Stager').Stager; 
const stager = new Stager(); 
stager.task(function(rl,st){
	let c = 'height,width,length'.split(',');
	st.setCompletions(c);
	rl.question('Are you okay? ['+c.join(', ')+']\n',function(answer){
		if (c.indexOf(answer) === -1){
			st.retry();
		}else{
			st.next();
		}
	});
});
stager.task(function(rl,st){
	let c = 'box,cube,circle'.split(',');
	st.setCompletions(c);
	rl.question('Are you doing well?\n',function(answer){
		if (c.indexOf(answer) === -1){
			st.retry();
		}else{
			st.next();
		}
	});
});

stager.execute();