function background(win){	
	for(i = 0; i < 9; i++) for(k = 0; k < 9; k++) if(board[i+1][0] == 0 || board[i+1][0] == 10){
		idText = (i+1).toString() + (k+1).toString();
		document.getElementById(idText).style.backgroundColor = "#fffed3";		//yellow
	}
	if(valid != 0 && win == 0) for(i = 0; i < 9; i++){
		idText = pos.toString() + (i+1).toString();
		document.getElementById(idText).style.backgroundColor = "#ffffff";		//white to 9
	}
	if(valid == 0 && win == 0 || turn == 0) for(i = 0; i < 9; i++) for(k = 0; k < 9; k++) if(board[i+1][0] == 0){
		idText = (i+1).toString() + (k+1).toString();
		document.getElementById(idText).style.backgroundColor = "#ffffff";		//white to 81
	}
	if(win == 1) for(i = 0; i < 9; i++){
		idText = block.toString() + (i+1).toString();
		document.getElementById(idText).style.backgroundColor = "#ff6d6d";		//red
	}
	if(win == -1) for(i = 0; i < 9; i++){
		idText = block.toString() + (i+1).toString();
		document.getElementById(idText).style.backgroundColor = "#9bf8ff";		//blue
	}
}

function display(id){
	turn++;
	id += "i";
	if(turn%2 == 0){
		document.getElementById(id).src="circle.png";
		document.getElementById("result").innerHTML = "<b>>> Cross turn <<</b>";
	}
	else{
		document.getElementById(id).src="cross.png";
		document.getElementById("result").innerHTML = "<b>>> Circle turn <<</b>";
	}
	change_board();
	background(end);
}

function change_board(){
	//after block and pos have been decided, change array board
	if(turn%2 == 0)
		board[block][pos] = -1;
	else
		board[block][pos] = 1;
	check_win();
}

function check_win(){
	//store the number of local boards each player wins
	var sumCross = 0, sumCircle = 0;
	//use to store the number of local boards left
	var zeroBig = 0;
	check_local_board();
	sumBig = calculate_sum(100, 0, 3);
	for(i = 1; i < 10; i++){
		if (board[i][0] == 1) sumCross++;
		if (board[i][0] == -1) sumCircle++;
		if (board[i][0] == 0) zeroBig++;
	}
	if(sumBig > 0) win_alert("Cross wins");
	else if(sumBig < 0) win_alert("Circle wins");
	else if(zeroBig == 0){
		if(sumCross > sumCircle) win_alert("Cross wins");
		else if(sumCross < sumCircle) win_alert("Circle wins");
		else win_alert("Its a tie");
	}
	valid = check_valid_move(pos);
	background(calculate_sum(block, 100, 3));
}

function win_alert(alertText){
	end = 2;
	setTimeout(function(){
		alert(alertText);
	}, 25);
}

window.onload = background;