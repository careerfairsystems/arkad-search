var db = require("./database");
var text = "best";
var jsonResult = {
			result:
			[{
				"index": 0,
				"appearences": -1,
				"info" : "null"
			},{
				"index": 1,
				"appearences": -1,
				"info" : "null"
			},{
				"index": 2,
				"appearences": -1,
				"info" : "null"
			}]
			};
var minIndex = 0;
var minAppearences = 0;


db.read_everything_from_table(function(err, res){

function search(text, res) {
var searchText = text.split(" ");
var event;

//Jämför sökord med eventnamn - ska bytas mot "type" längre fram
searchText.forEach(function(entry){
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

res.rows.forEach(function(event){
	var textComp = event.info.split(" ");
	var k = 0;
	searchText.forEach(function(searchWord){
		textComp.forEach(function(infoWord){
			if(infoWord.toLowerCase().indexOf(searchWord.toLowerCase()) != -1){
				k++;
			}
		});
	});
	if(k > minAppearences && k !== 0){
	sortResult(k, event);
	}

    });
}
search(text, res);
console.log(jsonResult);

});


//bygger resultat-JSON på rätt
function sortResult(k, event){

	jsonResult.result.forEach(function(result){
			if(result.index === minIndex){ //när vi kommer till index där det minsta värdet finns så byts det ut
				result.appearences = k;
				result.info = event.info;
				minAppearences = k;
				}
			});

			//sätter rätt index och värde på minAppearences
			jsonResult.result.forEach(function(entry){
				if(entry.appearences < minAppearences){
					minIndex = entry.index;
					minAppearences= entry.appearences;
				}
			});
}