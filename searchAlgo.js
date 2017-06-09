var db = require("./database");
var text = "best";

db.read_everything_from_table(function(err, res){

function search(text, res) {

text: text;
var searchText = text.split(" ");
var event;
var jsonResult = {
			result:
			[{
				"index": -1,
				"appearences": -1,
				"info" : "null"
			},{
				"index": -1,
				"appearences": -1,
				"info" : "null"
			},{
				"index": -1,
				"appearences": -1,
				"info" : "null"
			}]
			};
var index = null;
var minAppearences = 0;


searchText.forEach(function(entry){
	//Jämför sökord med eventnamn - kanske onödigt?
for(var i = 0; i <  res.rows.length; i++){
	event =  res.rows[i];
	if(event.name.toLowerCase() === entry.toLowerCase()){
		//return event.info
		console.log(event.info);
		break;
		}
	}
});

//itererar över strängen med sökord och jämför varje objekt med varje ord i event-infon
//sparar antal matchningar i variablen k
for(var i = 0; i <  res.rows.length; i++){
	event =  res.rows[i];
	var textComp = event.info.split(" ");
	var k = 0;
	searchText.forEach(function(entry){
		for(var j = 0; j<textComp.length; j++){
			if(textComp[j].toLowerCase().indexOf(entry.toLowerCase()) != -1){
				k++;
			}
		}

	});
	//ifall någon av de första tre jämförelserna ger minst 1 träff så läggs de direkt in i resultat-JSON
	//detta för att vi har sagt att vi ska returnera de tre mest relevanta eventen
	if(i < 3 && k > 0){
		jsonResult.result[i].index = i;
		jsonResult.result[i].appearences = k;
		jsonResult.result[i].info = event.info;
		if(k <= minAppearences){
			index = i;
			minAppearences = k;
		}
	}else{
		//använder mig av minsta antalet matchningar för att avgöra om man ens ska gå in i loopen
		if(k > minAppearences){
			for(var j = 0; j<jsonResult.result.length; j++){
				if(jsonResult.result[j].index === index){
				jsonResult.result[j].index = i;
				jsonResult.result[j].appearences = k;
				jsonResult.result[j].info = event.info;
				index = i;
				minAppearences = k;
				break;
				}
			}
			//sätter rätt index och matchingsantal på minAppearences
			for(var j = 0; j<jsonResult.result.length; j++){
				if(jsonResult.result[j].appearences < minAppearences){
				index = jsonResult.result[j].index;
				minAppearences = jsonResult.result[j].appearences;
				}
		}
	}
}
}

//ifall index aldrig har blivit ändrat så har vi inte hittat någon matchning alls, i annat fall så returneras jsonResult
if(index === null){
	console.log("Inga sökresultat. ");
	console.log(jsonResult);
}else{
//return jsonResult;
console.log(jsonResult);
}

}

search(text, res)

});