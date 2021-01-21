var player1;
var player2;
var gameOver = false;

function Player(playerName, playSymbol, winStatus, activeUser, boardStatus) { //constructor/blue print looks like an object
    this.playerName = playerName;
    this.playSymbol = playSymbol;
    this.winStatus = winStatus;
    this.activeUser = activeUser;    
    this.boardStatus = ['', '', '', '', '', '', '', '', ''];
}

function randomNumGen() {
    return Math.floor((Math.random() * 9)); //Generate Random no from 0 to 8
};



var board = ['', '', '', '', '', '', '', '', ''];

$(document).ready(function () {
    $('.game-restart').click(function (e) {   //Restart game button
        document.location.reload(true);       //Reload Page
    });

    $('.hide').hide()           //Hide Grid
    $('.game-restart').hide()   //Hide restart game button

    $('#start-game').click(function (e) {  //Show Starts here. Why e?
        $('#start-game').hide();           //Hide start game button
        e.preventDefault();
        $('.hide').show()
        startGame();
    });

    var player1 = new Player("Player-1", "X", false, ['', '', '', '', '', '', '', '', ''], false);
    var player2 = new Player("Player-2", "O", false, ['', '', '', '', '', '', '', '', ''], false);

    function startGame() {
        player1.playSymbol = prompt('Please choose X or O').toUpperCase();
        if (player1.playSymbol === 'X') {
            player2.playSymbol = 'O'
        } else {
            player2.playSymbol = 'X'
        };
    }

    function nonClickable() {
        if (player1.winStatus === true || player2.winStatus === true) {
            $('.cells').addClass('unClick');
            
        }
    };

    function computerTurn() {
        var cellLocation = randomNumGen();
        while (board[cellLocation] !== '') {
            cellLocation = randomNumGen();
            console.log(`      Inside While Loop: Random number is ${cellLocation}`);
        }
        console.log(`      Computer chosen UNOCCUPIED cellLocation is ${cellLocation}`);
        $('#' + cellLocation).append(player2.playSymbol);
        board[cellLocation] = player2.playSymbol;
        player2.boardStatus[cellLocation] = player2.playSymbol;
        checkPlayerWin();
    }

    function checkPlayerWin() {
        if (
            ((board[6] == player1.playSymbol && board[7] == player1.playSymbol && board[8] == player1.playSymbol) || // bottom row
             (board[3] == player1.playSymbol && board[4] == player1.playSymbol && board[5] == player1.playSymbol) || // middle row
             (board[0] == player1.playSymbol && board[1] == player1.playSymbol && board[2] == player1.playSymbol) || // top row
             (board[0] == player1.playSymbol && board[3] == player1.playSymbol && board[6] == player1.playSymbol) || // down the left
             (board[1] == player1.playSymbol && board[4] == player1.playSymbol && board[7] == player1.playSymbol) || // down the middle
             (board[2] == player1.playSymbol && board[5] == player1.playSymbol && board[8] == player1.playSymbol) || // down the right
             (board[0] == player1.playSymbol && board[4] == player1.playSymbol && board[8] == player1.playSymbol) || // diagonal
             (board[6] == player1.playSymbol && board[4] == player1.playSymbol && board[2] == player1.playSymbol)))  // diagonal
        {            
            $('.game-restart').show();
            player1.winStatus = true;
            alert(player1.playerName + " You have won!!!!");
            console.log(`WIN Loop: Player1 array playerName:playSymbol:winStatus:boardStatus::::${player1.playerName}:${player1.playSymbol}:${player1.winStatus}:${player1.boardStatus}`);
            nonClickable();
        }
       else if (
            ((board[6] == player2.playSymbol && board[7] == player2.playSymbol && board[8] == player2.playSymbol) || // bottom row
             (board[3] == player2.playSymbol && board[4] == player2.playSymbol && board[5] == player2.playSymbol) || // middle row
             (board[0] == player2.playSymbol && board[1] == player2.playSymbol && board[2] == player2.playSymbol) || // top row
             (board[0] == player2.playSymbol && board[3] == player2.playSymbol && board[6] == player2.playSymbol) || // down the left
             (board[1] == player2.playSymbol && board[4] == player2.playSymbol && board[7] == player2.playSymbol) || // down the middle
             (board[2] == player2.playSymbol && board[5] == player2.playSymbol && board[8] == player2.playSymbol) || // down the right
             (board[0] == player2.playSymbol && board[4] == player2.playSymbol && board[8] == player2.playSymbol) || // diagonal
             (board[6] == player2.playSymbol && board[4] == player2.playSymbol && board[2] == player2.playSymbol)))  // diagonal
        {
            $('.game-restart').show();
            player2.winStatus = true;
            alert(player2.playerName + " You have won!!!!");            
            console.log(`WIN Loop: Player2 array playerName:playSymbol:winStatus:boardStatus::::${player2.playerName}:${player2.playSymbol}:${player2.winStatus}:${player2.boardStatus}`);
            nonClickable();
        }
        else {
            console.log(`      Non-WIN Loop: Player1 array playerName:playSymbol:winStatus:boardStatus::::${player1.playerName}:${player1.playSymbol}:${player1.winStatus}:${player1.boardStatus}`);
            console.log(`      Non-WIN Loop: Player2 array playerName:playSymbol:winStatus:boardStatus::::${player2.playerName}:${player2.playSymbol}:${player2.winStatus}:${player2.boardStatus}`);
        }
    }
    
    $('.cells').each(function (cell) {
        $('#' + cell).click(function () {
            //console.log("Click Detected");
            if ((board[cell] == '') && (player1.winStatus === false) && (player2.winStatus === false) ){
               checkPlayerWin(); 

			   $('#' + cell).append(player1.playSymbol);
                board[cell] = player1.playSymbol;
                player1.boardStatus[cell] = player1.playSymbol; 
                player1.activeUser = true;                  
                console.log(`Main loop: Player1 array playerName:playSymbol:winStatus:boardStatus::::${player1.playerName}:${player1.playSymbol}:${player1.winStatus}:${player1.boardStatus}`);
               // setTimeout(function () {
                    checkPlayerWin(); 
               // }, 100);      
                if (board.includes('')) {
                    if ((player1.winStatus === false) && (player2.winStatus === false)) {
                        console.log("Calling ComputerTurn")
                        player1.activeUser = false;
                        player2.activeUser = true;
                        setTimeout(function () {
                            computerTurn();
                        }, 800); 
                    }
                }
            }
            //console.log(board);
        })
    })
});
