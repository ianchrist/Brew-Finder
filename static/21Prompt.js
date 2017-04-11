window.onload = checkAge();

function checkAge() {
	var age = prompt("Please enter your age", "");
	var x = parseInt(age)

	if (x <21) {
		location.href= "https://www.stopalcoholabuse.gov/"
	}
	else {
		return;
	}

}