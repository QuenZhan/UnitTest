// Unit Test 0.751 
// 2013-12-26 

var VooUnitTest={first:false
	,url:"http://test.talkin.cc/voo/api/"
	,logs:{}
	,quere:[]
	,delay:500
	,total:10
	,index:0
	,formdata:false
	,prefabLog:$("#log").detach()
	,upadate:function(){
		if(VooUnitTest.index>=VooUnitTest.quere.length)return;
		setTimeout(VooUnitTest.upadate,VooUnitTest.delay);
		var e=VooUnitTest.quere[VooUnitTest.index];
		VooUnitTest.sendAjax(e[0],e[1],e[2]);
		VooUnitTest.index+=1;
	}
	,pushGetObjects:function(index){
		this.quere.push(["getObjects",{
					mask:["oid"
						,"type"
						,"scores"
						,"title"
						,"photos"
						,"hyperllink"
						,"actions"
						,"user"
					]
					,page:index
				}
				,"error = 0, and categories != "
				]);
	}
	,objectPage:function(){
		this.start();
	}
	,mainPage:function(){
		this.quere=([
			["getCategories",{},"error = 0, and targetObjects != NULL, and adsObjects = NULL "]
			,["getSingleObject"
				,{
					"oid":"0"
					,mask:["photos","hyperllink","actions"]
				}
				,"error = 0, and objects != NULL, and isEnd = FALSE"]
			]);
		for(var i=0;i<this.total;i+=1)this.pushGetObjects(i,"error = 0, and objects != NULL, and isEnd = false" );
		for(var i=0;i<this.total;i+=2)this.pushGetObjects(i,"error = 0 , and objects != null , and isEnd = false");
		for(var i=0;i<20;i+=1)this.pushGetObjects(this.total+i,"error == -100 , and objects == null , and isEnd == true");
		for(var i;i<100;i++){
			this.quere.push(["setUser",{
					user:{
						uid:"userid"
						// ,photoFile:File()
						,firstName:"名"
						,lastName:"姓"
						,signUpFrom:"fb"
						,gender:0
						,email:"email"
						,emailSync:"email"
					}
				},{
					error:0
					,uid:"BE generated"
					,psid:"BE generated"
				}]);
		}
		// this.start();
	}
	,start:function(){
		this.index=0;
		this.mainPage();
		this.upadate();
	}
	// ,packLog:function(){}
	,sendAjax:function(apiName,parameter,anwser){
		var jLog=this.prefabLog.clone()
			,from=(new Date().getTime())
			// ,url=this.url+apiName+"?callback=voo";
			,url=this.url+apiName;
		jLog
			.appendTo("#logConatiner").end()
			// .find(".from").text(from+"").end()
			.find(".apiName").text(url).end()
			.find(".parameter").text(JSON.stringify(parameter)).end()
			.find(".returnSupposed").text(JSON.stringify(anwser)).end()
		$.ajax({
			 type:"POST",
			 data:parameter,
			 //async: false,
			 url:url,
			 timeout : 5000,
			 dataType: "json",
			 // dataType: "jsonp",//指定以jsonp方式執行
			 // jsonp: "mycallback",//"mycallback"會以GET的變數名稱傳送，沒指定時，jQuery使用"callback"當變數名稱
			 // jsonpCallback:'aaaa',//"mycallback"變數的值，沒指定時，jQuery隨機產生
			 success:function(res){
				var campare=jLog.find(".returnSupposed").text()==JSON.stringify(res);
				 jLog
					.find(".duration").text((new Date().getTime())-from+"").end()
					.find(".returnActual").text(JSON.stringify(res)).end()
					.find(".campare").text(campare+"").end()
			 },
			 error:function(jqXHR,textStatus, errorThrown){
				jLog
					.find(".duration").text((new Date().getTime())-from+"").end()
					.find(".returnActual").text("error : "+ textStatus + " \n"+ errorThrown).end()
			 }
		 });
	}
}