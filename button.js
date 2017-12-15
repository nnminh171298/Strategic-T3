function prompt_reset(){
	window.location.reload(true);
}
			
function com_first(){
	document.getElementById("1st").disabled=true;
	document.getElementById("2nd").disabled=true;
	com = 1;
	if (turn%2 == 0)
		computer();
}

function com_second(){
	document.getElementById("1st").disabled=true;
	document.getElementById("2nd").disabled=true;
	com = -1;
	if (turn%2 == 1)
		computer();
}

function automatic(){
	document.getElementById("auto").disabled=true;
	document.getElementById("1st").disabled=true;
	document.getElementById("2nd").disabled=true;
	auto = 1;
	if(turn%2 == 0)
		com_first();
	else
		com_second();
}

//use to disable pointer events on board
function disable(bool){
	for(i = 0; i < 9; i++) for(k = 0; k < 9; k++){
		idText = (i+1).toString() + (k+1).toString();
		if(bool)
			document.getElementById(idText).style.pointerEvents = 'none';
		else
			document.getElementById(idText).style.pointerEvents = 'auto';
	}
}