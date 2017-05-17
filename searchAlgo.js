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

var text = "lunch dresscode";
var searchText = text.split(" ");
console.log(text);
searchText.forEach(function(entry){
for(var i = 0; i < jtest.events.length; i++){
	var event = jtest.events[i];
	if(event.namn === entry){
		//egentligen return info
		console.log(event.info);
		break;
		}
	}
});

var appearences = 0;
var index = null;
for(var i = 0; i < jtest.events.length; i++){
	var event = jtest.events[i];
	var textComp = event.info.split(" ");
	var k = 0;
	searchText.forEach(function(entry){
		for(var j = 0; j<textComp.length; j++){
			if(entry === textComp[j]){
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
var event = jtest.events[index];
console.log(appearences + " " + index + event.info);
}
