//this can be thought of as a main function
function checkTurn(id){
	block = Number(id.charAt(0));
	pos = Number(id.charAt(1));
	// eliminate the invalid moves
	if((valid != 0 && valid != block) || board[block][0] != 0 || end == 2 || board[block][pos] != 0)
		return 0;
	display(id);
	if((turn%2 == 0 && com == 1) || (turn%2 == 1 && com == -1) || auto == 1){
		disable(true);
		if(auto == 1){
			if(turn%2 == 0) com = 1;
			else com = -1;
		}
		setTimeout(function(){
			computer();
		}, 50 + (!auto)*450);
	}
}

//return 1 when X wins, -1 when O wins
function calculate_sum(blockLocal, posLocal, div){
	var sum = 0;
	i1 = [0,1,2,3,4,5,6,7,8,9];
	i2 = [0,1,2,3,4,5,6,7,8,9];
	//blockLocal indicates the local board to be check, 100 when check big board
	if(blockLocal != 100) for(j = 1; j <= 10; j++)
		i1[j] = blockLocal;
	if(posLocal != 100 && blockLocal == 100) for(j = 1; j <= 10; j++)
		i2[j] = posLocal;
	switch(posLocal){
		case 1: case 2: case 3: case 0: case 100:
			sum += 	parseInt((board[i1[1]][i2[1]]%10 + board[i1[2]][i2[2]]%10 + board[i1[3]][i2[3]]%10)/div);
		case 4: case 5: case 6: case 0: case 100:
			sum +=	parseInt((board[i1[4]][i2[4]]%10 + board[i1[5]][i2[5]]%10 + board[i1[6]][i2[6]]%10)/div);
		case 7: case 8: case 9: case 0: case 100:
			sum +=	parseInt((board[i1[7]][i2[7]]%10 + board[i1[8]][i2[8]]%10 + board[i1[9]][i2[9]]%10)/div);
		case 1: case 4: case 7: case 0: case 100:
			sum +=	parseInt((board[i1[1]][i2[1]]%10 + board[i1[4]][i2[4]]%10 + board[i1[7]][i2[7]]%10)/div);
		case 2: case 5: case 8: case 0: case 100:
			sum +=	parseInt((board[i1[2]][i2[2]]%10 + board[i1[5]][i2[5]]%10 + board[i1[8]][i2[8]]%10)/div);
		case 3: case 6: case 9: case 0: case 100:
			sum +=	parseInt((board[i1[3]][i2[3]]%10 + board[i1[6]][i2[6]]%10 + board[i1[9]][i2[9]]%10)/div);
		case 1: case 5: case 9: case 0: case 100:
			sum +=	parseInt((board[i1[1]][i2[1]]%10 + board[i1[5]][i2[5]]%10 + board[i1[9]][i2[9]]%10)/div);
		case 3: case 5: case 7: case 0: case 100:
			sum +=	parseInt((board[i1[3]][i2[3]]%10 + board[i1[5]][i2[5]]%10 + board[i1[7]][i2[7]]%10)/div);
	}
	if(blockLocal != 100 || posLocal != 100){
		if(sum > 1) sum = 1;
		if(sum < 0) sum = -1;
	}
	return sum;
}

//use to assign value for valid, take in the position of last move
function check_valid_move(posLocal){
	//if the local board of next move is not available
	if(board[posLocal][0] != 0)
		return 0;
	else
		return posLocal;
}


function computer(){
	var idArr = [], idArrTest = [], arrChosen = [];
	var eval1 = [], eval2 = [], evalRet = [], evalMax = -101, evalMin = 101,  evalFinal = [];
	var boardImage = [];
	idArr = possible_moves(pos);
	eval1 = evaluate(idArr, 1);
	for(i = 0; i < idArr.length; i++){
		 evalMin = 101;
		if(eval1[i] == 100){
			evalFinal[i] = 100;
			continue;
		}
		make_test_board(idArr[i]);
		idArrTest = possible_moves(Number(idArr[i].charAt(1)));
		evalRet = evaluate(idArrTest, -1);
		for(k = 0; k < evalRet.length; k++)
			if(evalRet[k] < evalMin)
				evalMin = evalRet[k];
		eval2[i] = evalMin;
		return_board(idArr[i]);
	}
	for(i = 0; i < idArr.length; i++){
		if(eval2[i] == -100)
			evalFinal[i] = -100;
		else if(evalFinal[i] >= 100)
			continue;
		else if(eval1[i] + eval2[i] == 0)
			evalFinal[i] = eval1[i];
		else if(eval1[i] + eval2[i] > 0)
			evalFinal[i] = 2*eval1[i] + eval2[i];
		else if(eval1[i] + eval2[i] < 0)
			evalFinal[i] = eval2[i] + Math.ceil((eval1[i] + eval2[i])/2);
	}
	console.log(eval1, eval2);
	if(idArr.length == 0)
		return 0;
	else{
		for(i = 0; i < idArr.length; i++)
			if(evalFinal[i] > evalMax)
				evalMax = evalFinal[i];
	}
	for(i = 0; i < idArr.length; i++)
		if(evalFinal[i] == evalMax)
			arrChosen.push(idArr[i]);
	if(evalMax < 2)
		arrChosen = construct(arrChosen);
	idChosen = arrChosen[Math.floor(Math.random()*arrChosen.length)];
	disable(false);
	document.getElementById(idChosen).click();
}

//return an array of evaluations for the possible moves
function evaluate(idArrImage, factor){
	var ret1 = [], ret2 = [], ret3 = [], ret4 = [], evalArr = [];
	// index numbers
	var x, y, z;
	ret1 = check_big_win(factor);										// check big win
	for(x = 0; x < ret1.length; x++)
		ret2.push(check_small_win(ret1[x], factor));					// check which moves lead to big win
	for(x = 0; x < idArrImage.length; x++){
		a = Number(idArrImage[x].charAt(0));
		b = Number(idArrImage[x].charAt(1));
		for(y = 0; y < ret2.length; y++)
			for(z = 0; z < ret2[y].length; z++)
				if(ret2[y][z] == a*10+b)								// compare them to id
					evalArr[x] = 100*factor;
		
		if(evalArr[x] !== undefined) continue;
		ret3 = check_small_win(a, factor);
		for(y = 0; y < ret3.length; y++)
			if(ret3[y] == a*10+b)								// compare them to id
				evalArr[x] = 2*factor;
		
		if(evalArr[x] !== undefined) continue;
		ret4 = check_small_win(a, -factor);
		for(y = 0; y < ret4.length; y++)
			if(ret4[y] == a*10+b)								// compare them to id
				evalArr[x] = 1*factor;
		
		if(evalArr[x] === undefined)
			evalArr[x] = 0;
		
	}
	return evalArr;
}

//return an array of the next possible moves
function possible_moves(posLocal){
	var x, y, idText, idArrImage = [];
	if(valid == 0 || turn == 0){
		for(x = 0; x < 9; x++){
			if(board[x+1][0] != 0)
				continue;
			for(y = 0; y < 9; y++){
				if(board[x+1][y+1] != 0)
					continue;
				else{
					idText = (x+1).toString() + (y+1).toString();
					idArrImage.push(idText);
				}
			}
		}
	}
	else{
		for(x = 0; x < 9; x++){
			if(board[posLocal][x+1] != 0)
				continue;
			else{
				idText = (posLocal).toString() + (x+1).toString();
				idArrImage.push(idText);
			}
		}
	}
	return idArrImage;
}

//make a test board for further calculation
function make_test_board(idTest){
	var posTest = Number(idTest.charAt(1));
	board[Number(idTest.charAt(0))][posTest] = com;
	check_local_board();
	turn++;
	validTemp = valid;
	valid = check_valid_move(posTest);
}

//return the original board
function return_board(idTest){
	board[Number(idTest.charAt(0))][Number(idTest.charAt(1))] = 0;
	check_local_board();
	turn--;
	//if this is the first move
	if(pos !== undefined)
		valid = check_valid_move(pos);
	else
		valid = validTemp;
}

//check all local boards win, lose or tie
function check_local_board(){
	var zeroS = 0;
	for(x = 1; x < 10; x++){
		zeroS = 0;
		board[x][0] = calculate_sum(x, 100, 3);
		for(y = 1; y < 10; y++)
			if (board[x][y] == 0) zeroS++;
		if(zeroS == 0 && board[x][0] == 0)
			board[x][0] = 10;
	}
}

function construct(idArr){
	var sumArr = [], sumMax = -1, sum, retArr = [];
	for(x = 0; x < idArr.length; x++){
		sum = calculate_sum(Number(idArr[x].charAt(0)), Number(idArr[x].charAt(1)), 1);
		sumArr.push(sum);
	}
	for(x = 0; x < sumArr.length; x++){
		sumMax = -1;
		if(sumMax < sumArr[x])
			sumMax = sumArr[x];
	}
	for(x = 0; x < sumArr.length; x++)
		if(sumMax == sumArr[x])
			retArr.push(idArr[x]);
	return retArr;
}