function getHistory(url){
	query = url;
	chrome.history.search({text: query}, function(array_of_history_item_results){

		var ul = document.getElementById('list');

		for(var i=0; i<array_of_history_item_results.length; i++){
			var history_item = array_of_history_item_results[i];

			var link_text = historyItemToString(history_item);

			var a = buildLink(link_text, history_item.url);

		 	var li = document.createElement('li');
		 	li.appendChild(a);
		 	ul.appendChild(li);

		 	getVisits(history_item);
		}	
	});
};

function getVisits(url_input){
	var ul = document.getElementById('list');

	chrome.history.getVisits({url:url_input}, function(array_of_visit_item_results){

		for(var j=0; j<array_of_visit_item_results.length; j++){
			visit_item = array_of_visit_item_results[j];

			for (var property in visit_item){
				if(visit_item.hasOwnProperty(property)){
					var li = document.createElement('li');
					li.appendChild(document.createTextNode(property + ' : ' + visit_item[property]));
					ul.appendChild(li);
				}
			}
		}
	});
};

/* Helper functions
 *
 */

function historyItemToString(history_item){
	var link = history_item.url;
	var time = millisecondsToDateTimeString(history_item.lastVisitTime);
	var name = history_item.title;
	var id = history_item.id;
	var link_text = time + '  -  ' + link + '  -  ' + id;
	return link_text;
};

function buildLink(link_text, url){
	var a = document.createElement('a');
	a.innerHTML = link_text;
	a.href = url;
	a.target = '_blank';
	return a;
};

function millisecondsToDateTimeString(milliseconds){
	var date_time = new Date(milliseconds);
	return date_time.toLocaleDateString() + ' ' + date_time.toLocaleTimeString();

};

/* "Main method"
 *
 */

document.addEventListener('DOMContentLoaded', function() {
	console.log('Hello World');
	
	var url = '';

	getHistory(url);

	//getVisits(url);

	console.log('done');
});