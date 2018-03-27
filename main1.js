var https = require('https')
var cheerio = require('cheerio')
var fs = require('fs');

async function getData(){
	for(var i=2;i<100;i++){
		var url = "https://www.biaoqing.com/api/subject?&keyword=1&pageSize=15&pageNum="+i;
		await downJson(url,i);
	}
}

async function downJson(url,i){
	https.get(url,function(res){
			var html = '';
			res.on('data',function(data){
				html += data;
			})

			res.on('end',function(){
				saveDatas(html,i)
			})
		})
		.on('error',function(){
			console.log('error');
		})
}

async function saveDatas(dataJson,name){
	
	var filename = 'jsons' + '/' + name + ".json";
	if (fs.existsSync(filename)) {
		return
	}
	if(dataJson != null && dataJson != ''){
		fs.writeFile(filename,dataJson,function(err){
			if(err){
				console.log('write error')
			}
		})
	}
	
}

getData();