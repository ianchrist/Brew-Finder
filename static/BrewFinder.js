//Create a constructor and have it be location list and return location list


function findBrews(callback){
	let locality = document.getElementById('locality').value
	let region = document.getElementById('region').value
	let data 
	let submit_btn = document.getElementById('submit_btn')

	$.ajax({
		url: ("http://0.0.0.0:8001/api/breweries?locality="+locality+"&region=" + region),
		method: "GET",
		async: false,
		success: function (resp) {
			data = resp
			callback(data)
		},
		error: function () {}

	})

}