var db = require("./database");
var text = "hejsan best";

db.read_everything_from_table(function(err, res){

function search(text, res) {

text: text;
var searchText = text.split(" ");
var event;
var appearences = 0;
var index = null;

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
	if(k > appearences){
		appearences = k;
		index = i;
	}
}
if(index === null){
	console.log("Inga sökresultat. ");
}else{
event = res.rows[index];
//return event.info;
console.log(appearences + " " + index + " " + event.info);
}

}

search(text, res)

});