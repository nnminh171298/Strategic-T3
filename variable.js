//indicate the block number for next move, 0 for anywhere
var valid = 0, validTemp = 0;
//indicate whose turn it is, 0 for X, 1 for O
var turn = 0;
//indicate end game, 0 is not end, 2 is end
var end = 0;
//com buttons, 1 is comX, -1 is comO
var com = 0;
//auto button, 1 is on, 0 is off
var auto = 0;
//use for board navigating, value range 1-9
var block, pos;
//10x10 board, board[block][0] indicates situation of local board
//1 for X, -1 for O, 10 for tie, 0 for unidentified
var board = [[],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]];