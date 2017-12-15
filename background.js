function background(win){	
	for(i = 0; i < 9; i++) for(k = 0; k < 9; k++) if(board[i+1][0] == 0 || board[i+1][0] == 10){
		idText = (i+1).toString() + (k+1).toString();
		document.getElementById(idText).style.backgroundColor = "#fffed3";		// yellow
	}
	if(valid != 0 && win == 0) for(i = 0; i < 9; i++){
		idText = pos.toString() + (i+1).toString();
		document.getElementById(idText).style.backgroundColor = "#ffffff";		// white to 9
	}
	if(valid == 0 && win == 0 || turn == 0) for(i = 0; i < 9; i++) for(k = 0; k < 9; k++) if(board[i+1][0] == 0){
		idText = (i+1).toString() + (k+1).toString();
		document.getElementById(idText).style.backgroundColor = "#ffffff";		// white to 81
	}
	if(win == 1) for(i = 0; i < 9; i++){
		idText = block.toString() + (i+1).toString();
		document.getElementById(idText).style.backgroundColor = "#ff6d6d";		// red
	}
	if(win == -1) for(i = 0; i < 9; i++){
		idText = block.toString() + (i+1).toString();
		document.getElementById(idText).style.backgroundColor = "#9bf8ff";		// blue
	}
}