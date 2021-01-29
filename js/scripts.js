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

        $('.formCSS').show();
        $('button#btnn').click(function (e) {
            $('.formCSS').hide();
            let symbol = $("input#symbol").val();
            startGame(symbol);
            e.preventDefault();


        });


    });

    var player1 = new Player("Player-1", "X", false, ['', '', '', '', '', '', '', '', ''], false);
    var player2 = new Player("Player-2", "O", false, ['', '', '', '', '', '', '', '', ''], false);

    function startGame(symbol) {
        // player1.playSymbol = prompt('Please choose a Character').toUpperCase();
        // if (player1.playSymbol === symbol) {
        //     player2.playSymbol = 'O'
        // } else {
        //     player2.playSymbol = 'X'
        // };
        player1.playSymbol = symbol;
        player2.playSymbol = 'x';

        $('.hide').show();
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
        checkPlayerWin(player2, player2.playSymbol);
    }

    function checkPlayerWin(player, playSymbol) {
        if (
            ((board[6] == playSymbol && board[7] == playSymbol && board[8] == playSymbol) || // bottom row
                (board[3] == playSymbol && board[4] == playSymbol && board[5] == playSymbol) || // middle row
                (board[0] == playSymbol && board[1] == playSymbol && board[2] == playSymbol) || // top row
                (board[0] == playSymbol && board[3] == playSymbol && board[6] == playSymbol) || // down the left
                (board[1] == playSymbol && board[4] == playSymbol && board[7] == playSymbol) || // down the middle
                (board[2] == playSymbol && board[5] == playSymbol && board[8] == playSymbol) || // down the right
                (board[0] == playSymbol && board[4] == playSymbol && board[8] == playSymbol) || // diagonal
                (board[6] == playSymbol && board[4] == playSymbol && board[2] == playSymbol)))  // diagonal
        {
            $('.game-restart').show();
            player.winStatus = true;
            // alert(player.playerName + "line 81 You have won!!!!");
            $("div#result").text(player.playerName + " You have won!!!!")
            console.log(`IN Loop: player array playerName:playSymbol:winStatus:boardStatus::::${player.playerName}:${player.playSymbol}:${player.winStatus}:${player.boardStatus}`);
            nonClickable();
        }
        else {
            console.log(`Non-WIN Loop: Player1 array playerName:playSymbol:winStatus:boardStatus::::${player.playerName}:${player.playSymbol}:${player.winStatus}:${player.boardStatus}`);
        }
    }

    $('.cells').each(function (cell) {
        $('#' + cell).click(function () {
            console.log("Click Detected cell is " + cell);
            if ((board[cell] == '') && (player1.winStatus === false) && (player2.winStatus === false)) {
                $('#' + cell).text(player1.playSymbol);
                // setTimeout(function () {
                    checkPlayerWin(player1, player1.playSymbol);
                // }, 2300);
                board[cell] = player1.playSymbol;
                player1.boardStatus[cell] = player1.playSymbol;
                player1.activeUser = true;
                console.log(`Main loop: Player1 array playerName:playSymbol:winStatus:boardStatus::::${player1.playerName}:${player1.playSymbol}:${player1.winStatus}:${player1.boardStatus}`);
                // setTimeout(function () {
                checkPlayerWin(player1, player1.playSymbol);
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
                else if (!board.includes('')) {
                    if ((player1.winStatus === false) && (player2.winStatus === false)) {
                       $("div#result").text("Game over. It's a Draw");
                       nonClickable();
                       $('.game-restart').show();
                    }
                }
            }
            //console.log(board);
        })
    })
});
