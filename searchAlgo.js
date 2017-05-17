var jtest = {

	"events": [
	{
	"namn":"lunch",
	"tid":"12.00",
	"info":"lunchen börjar 12 och slutar 15. Meny finns på hemsidan."
	},
	{
	"namn":"bankett",
	"tid":"20.00",
	"info":"dresscode: högtidsklädsel."
	},
	{
	"namn":"företag",
	"tid":null,
	"info":"ARKAD har många företag, i år kommer över en miljon och det är kul"
	}
	]
};
var text = "klädsel";
search(text);
function search(text) {

text: text;
var searchText = text.split(" ");
var event;
var appearences = 0;
var index = null;
console.log(text);
searchText.forEach(function(entry){
for(var i = 0; i < jtest.events.length; i++){
	event = jtest.events[i];
	if(event.namn.toLowerCase() === entry.toLowerCase()){
		//return event.info
		console.log(event.info);
		break;
		}
	}
});

for(var i = 0; i < jtest.events.length; i++){
	event = jtest.events[i];
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
event = jtest.events[index];
//return event.info;
console.log(appearences + " " + index + " " + event.info);
}
};