var https = require('https')
var cheerio = require('cheerio')
var fs = require('fs');

var url = "https://www.biaoqing.com/";

var MysqlJson = require('mysql-json');

var mysqljson = new MysqlJson({
	host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'shuoshuo'
});

https.get(url,function(res){
	var html = '';
	res.on('data',function(data){
		html += data;
	})

	res.on('end',function(){
		//console.log(html);
		getDatas(html);
	})
})
.on('error',function(){
	console.log('error');
})


function getDatas(htmls){
	const $ = cheerio.load(htmls);
	let scripts = $('html').find('script')
	let firstData = '';
	for(var i=0;i<scripts.length;i++){
		//没有src的script，即为第一页的json数据
		if(!$(scripts.get(i)).attr('src')){
			//console.log('null src')
			//console.log($(scripts.get(i)).html());
			firstData = $(scripts.get(i)).html()
		}
	}
	var filename = 'jsons/1.json';
	
	//console.log(firstData)

	if(firstData != null && firstData != ''){
		var s = firstData.indexOf('=');
		//console.log(s)
		firstData = firstData.slice(s+1)
	}

	console.log(firstData)

	/*fs.writeFile(filename,JSON.stringify(firstData),function(err){
		if(err){
			console.log('write error')
		}
	})*/

	// mysqljson.insert('expression',{
	// 	'name':'张三',
	// 	'image_url':'www.baidu.com'
	// },function(err,response){
	// 	if(err) {
	// 		console.log(err);
	// 		throw err
	// 	};
	// 	console.log(response);
	// })

}