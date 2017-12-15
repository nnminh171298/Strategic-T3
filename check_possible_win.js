//return an array of positions that lead to local win
function check_small_win(blockLocal, factor){
	var save = [];
	for(t = 0; t < 3; t++){
		if(board[blockLocal][t%3+1] == com*factor && board[blockLocal][(t+1)%3+1] == com*factor && board[blockLocal][(t+2)%3+1] == 0)
			save.push((blockLocal)*10 + ((t+2)%3+1));
		if(board[blockLocal][t%3+4] == com*factor && board[blockLocal][(t+1)%3+4] == com*factor && board[blockLocal][(t+2)%3+4] == 0)
			save.push((blockLocal)*10 + ((t+2)%3+4));
		if(board[blockLocal][t%3+7] == com*factor && board[blockLocal][(t+1)%3+7] == com*factor && board[blockLocal][(t+2)%3+7] == 0)
			save.push((blockLocal)*10 + ((t+2)%3+7));
		if(board[blockLocal][(t%3+1)*3] == com*factor && board[blockLocal][((t+1)%3+1)*3] == com*factor && board[blockLocal][((t+2)%3+1)*3] == 0)
			save.push((blockLocal)*10 + (((t+2)%3+1)*3));
		if(board[blockLocal][(t%3+1)*3-1] == com*factor && board[blockLocal][((t+1)%3+1)*3-1] == com*factor && board[blockLocal][((t+2)%3+1)*3-1] == 0)
			save.push((blockLocal)*10 + (((t+2)%3+1)*3-1));
		if(board[blockLocal][(t%3+1)*3-2] == com*factor && board[blockLocal][((t+1)%3+1)*3-2] == com*factor && board[blockLocal][((t+2)%3+1)*3-2] == 0)
			save.push((blockLocal)*10 + (((t+2)%3+1)*3-2));
		if(board[blockLocal][(t%3+1)*2+1] == com*factor && board[blockLocal][((t+1)%3+1)*2+1] == com*factor && board[blockLocal][((t+2)%3+1)*2+1] == 0)
			save.push((blockLocal)*10 + (((t+2)%3+1)*2+1));
		if(board[blockLocal][(t%3+1)*4-3] == com*factor && board[blockLocal][((t+1)%3+1)*4-3] == com*factor && board[blockLocal][((t+2)%3+1)*4-3] == 0)
			save.push((blockLocal)*10 + (((t+2)%3+1)*4-3));
	}
	return save;
}

//return an array of local wins that lead to big win
function check_big_win(factor){
	var save = [];
	for(t = 0; t < 3; t++){
		if(board[t%3+1][0] == com*factor && board[(t+1)%3+1][0] == com*factor && board[(t+2)%3+1][0] == 0)
			save.push((t+2)%3+1);
		if(board[t%3+4][0] == com*factor && board[(t+1)%3+4][0] == com*factor && board[(t+2)%3+4][0] == 0)
			save.push((t+2)%3+4);
		if(board[t%3+7][0] == com*factor && board[(t+1)%3+7][0] == com*factor && board[(t+2)%3+7][0] == 0)
			save.push((t+2)%3+7);
		if(board[(t%3+1)*3][0] == com*factor && board[((t+1)%3+1)*3][0] == com*factor && board[((t+2)%3+1)*3][0] == 0)
			save.push(((t+2)%3+1)*3);
		if(board[(t%3+1)*3-1][0] == com*factor && board[((t+1)%3+1)*3-1][0] == com*factor && board[((t+2)%3+1)*3-1][0] == 0)
			save.push(((t+2)%3+1)*3-1);
		if(board[(t%3+1)*3-2][0] == com*factor && board[((t+1)%3+1)*3-2][0] == com*factor && board[((t+2)%3+1)*3-2][0] == 0)
			save.push(((t+2)%3+1)*3-2);
		if(board[(t%3+1)*2+1][0] == com*factor && board[((t+1)%3+1)*2+1][0] == com*factor && board[((t+2)%3+1)*2+1][0] == 0)
			save.push(((t+2)%3+1)*2+1);
		if(board[(t%3+1)*4-3][0] == com*factor && board[((t+1)%3+1)*4-3][0] == com*factor && board[((t+2)%3+1)*4-3][0] == 0)
			save.push(((t+2)%3+1)*4-3);
	}
	return save;
}