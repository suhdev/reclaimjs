'use strict';
let inj = require('../framework/core/Injector');
var chai = require('chai');
var assert = chai.assert;//require('assert');
var expect = chai.expect;
// var expect = require('expect.js');

describe("InjectorSpec", function() {
	it("should create an Injector instance", function() {
		let k = new inj.Injector(); 
		assert.equal(true,k instanceof inj.Injector);
	});

	it("should register numeric value", function() {
		let k = new inj.Injector(); 
		k.register('test',10);
		assert.equal(k.get('test'),10);
	});

	it("should register string value",function(){
		let k = new inj.Injector(); 
		k.register('test','Suhail');
		assert.equal(k.get('test'),'Suhail');
	});

	it("should not register function with no name",function(){
		let k = new inj.Injector(); 
		
		expect(function(){
			k.register(function(){
				return 10; 
			});
		}).to.throw();
	});

	it("should register function with name",function(){
		let k = new inj.Injector(); 
		function serviceA(){
			return 'Suhail';
		}
		expect(function(){
			k.register(serviceA);
		}).not.to.throw();
		expect(serviceA.$inject).not.to.be.undefined; 
		expect(serviceA.$inject).to.have.length(0);
		expect(k.get('serviceA')).to.equal('Suhail');
	});

	it("should register three functions", function() {
		let k = new inj.Injector(); 
		function serviceA(){
			return 'Suhail';
		}
		function serviceB(serviceA){
			return 'Najm';
		}

		function serviceC(serviceB,serviceA){
			return 'Abood'
		}
		expect(function(){
			k.register(serviceA);
			k.register(serviceB);
			k.register(serviceC);
		}).not.to.throw();
		expect(serviceA.$inject).not.to.be.undefined; 
		expect(serviceA.$inject).to.have.length(0);
		expect(serviceB.$inject).not.to.be.undefined; 
		expect(serviceB.$inject).to.have.length(1);
		expect(serviceC.$inject).not.to.be.undefined; 
		expect(serviceC.$inject).to.have.length(2);
		expect(k.get('serviceA')).to.equal('Suhail');
		expect(k.get('serviceB')).to.equal('Najm');
		expect(k.get('serviceC')).to.equal('Abood');
	});

	it("should register two functions and a primitive ", function() {
		let k = new inj.Injector(); 
		k.register('firstName','Suhail');
		function serviceB(firstName){
			return firstName+' Najm';
		}

		function serviceC(serviceB,firstName){
			return 'Abood'
		}
		expect(function(){
			k.register(serviceB);
			k.register(serviceC);
		}).not.to.throw();
		expect(serviceB.$inject).not.to.be.undefined; 
		expect(serviceB.$inject).to.have.length(1);
		expect(serviceC.$inject).not.to.be.undefined; 
		expect(serviceC.$inject).to.have.length(2);
		expect(k.get('firstName')).to.equal('Suhail');
		expect(k.get('serviceB')).to.equal('Suhail Najm');
		expect(k.get('serviceC')).to.equal('Abood');
	});

	it("should throw an error for array notation with an anonymous function [has no name]",function(){
		let k = new inj.Injector(); 
		k.register('firstName','Suhail');
		function serviceB(firstName){
			return firstName+' Najm';
		}

		function serviceC(serviceB,firstName){
			return 'Abood'
		}
		expect(function(){
			k.register(serviceB);
			k.register(['serviceB','firstName',function(serviceB,firstName){
				return firstName+' '+serviceB;
			}]);
		}).to.throw();
		// expect(serviceB.$inject).not.to.be.undefined; 
		// expect(serviceB.$inject).to.have.length(1);
		// expect(serviceC.$inject).not.to.be.undefined; 
		// expect(serviceC.$inject).to.have.length(2);
		// expect(k.get('firstName')).to.equal('Suhail');
		// expect(k.get('serviceB')).to.equal('Suhail Najm');
		// expect(k.get('serviceC')).to.equal('Abood');
	});

	it("should register array notation with a named function",function(){
		let k = new inj.Injector(); 
		k.register('firstName','Suhail');
		function serviceB(firstName){
			return firstName+' Najm';
		}

		function serviceC(serviceB,firstName){
			return firstName+' '+serviceB;
		}
		expect(function(){
			k.register(serviceB);
			k.register(['serviceB','firstName',serviceC]);
			expect(serviceC.$inject).not.to.be.undefined; 
			expect(serviceC.$inject).to.have.length(2);
		}).not.to.throw();
		expect(serviceB.$inject).not.to.be.undefined; 
		expect(serviceB.$inject).to.have.length(1);
		expect(k.get('firstName')).to.equal('Suhail');
		expect(k.get('serviceB')).to.equal('Suhail Najm');
		expect(k.get('serviceC')).to.equal('Suhail Suhail Najm');
	});

	it("should register object literals as instances", function() {
		let k = new inj.Injector(); 
		k.register('name',{
			first:'Suhail',
			middle:'Najm',
			last:'Abood'
		});
		function serviceB(name){
			return name.first+' '+name.middle;
		}

		function serviceC(serviceB,name){
			return serviceB + ' ' +name.last;
		}

		expect(function(){
			k.register(serviceB);
			k.register(['serviceB','name',serviceC]);
		}).not.to.throw();
		expect(serviceC.$inject).not.to.be.undefined; 
		expect(serviceC.$inject).to.have.length(2);
		expect(k.get('name')).not.to.be.undefined;
		expect(k.get('name').first).to.equal('Suhail');
		expect(k.get('serviceC')).to.equal('Suhail Najm Abood');
	});

	it("should flag circular dependencies", function() {
		let k = new inj.Injector(); 
		k.register('name',{
			first:'Suhail',
			middle:'Najm',
			last:'Abood'
		});
		function serviceB(name,serviceC){
			return name.first+' '+name.middle;
		}

		function serviceC(serviceB,name){
			return serviceB + ' ' +name.last;
		}

		expect(function(){
			k.register(serviceB);
			k.register(['serviceB','name',serviceC]);
			k.get('serviceC');
		}).to.throw('Circular dependency: serviceC -> serviceB -> serviceC');
	});

	it("should register class with static $inject", function() {
		let k = new inj.Injector(); 
		k.register('name',{
			first:'Suhail',
			middle:'Najm',
			last:'Abood'
		});
		class TestA {
			constructor(name){
				this.name = name;
			}

			getName(){
				return this.name.first;
			}

			static factory(name,service){
				return new TestA(name,service); 
			}

		}
		TestA.$inject = ['name','serviceC'];

		function serviceB(name){
			return name.first+' '+name.middle;
		}

		function serviceC(serviceB,name){
			return serviceB + ' ' +name.last;
		}

		expect(function(){
			k.register(serviceB);
			k.register(['serviceB','name',serviceC]);
			k.register(TestA);
			k.get('TestA');
		}).not.to.throw();
		expect(k.get('TestA').getName).to.exist;
		expect(k.get('TestA').getName()).to.equal('Suhail');
	});

	it("should inject method", function() {
		let k = new inj.Injector(); 
		k.register('name',{
			first:'Suhail',
			middle:'Najm',
			last:'Abood'
		});
		
		function serviceB(name){
			return name.first+' '+name.middle;
		}

		function serviceC(serviceB,name){
			return serviceB + ' ' +name.last;
		}

		k.register(serviceB);
		let kk = k.injectFunction(serviceC);
		expect(kk).to.equal('Suhail Najm Abood');
	});


});