let gameManager = (function(){
    let _boardData;
    let _lastTurn;
    let _actualTurn;
    let _gameOver = false;
    let _player1;
    let _player2;

    const setGameOver = (isGameOver) =>{
        _gameOver = isGameOver;
        if(isGameOver){
            console.log("Winner: ", _lastTurn.name);
            displayManager.displayGameOver(_lastTurn);
        }
    }
    const changeBoard = (event) =>{
        if(!_gameOver){
            console.log(_actualTurn)
            let index = event.target.dataset.index;
            if(event.target.firstChild != null){
                return;
            }
            if(_lastTurn == _player1){
                _boardData[index] = _player2.choice;
                console.log("BOrdS: ", _boardData[index]);
                _lastTurn = _player2;
                _actualTurn = _player1;
            }else{
                _boardData[index] = _player1.choice;
                _lastTurn = _player1;
                _actualTurn = _player2;
            }
            displayManager.draw(_boardData);   
            setGameOver(gameBoard.checkWinCond());   
        }
    }
    const init = (player1, player2) =>{
        console.log(player1, player2)

        if(_gameOver){
            _gameOver = false;
            displayManager.clean();
        }
        _player1 = player1;
        _player2 = player2;
        _boardData = gameBoard.reset();
        _lastTurn = _player2;
        _actualTurn = _player1;
        displayManager.init(_player1.choice, _player2.choice);
        displayManager.draw(_boardData); 
    };
    return {
        init,
        changeBoard,
        setGameOver,
    };
})();

let gameBoard = (function(){
    let board;

    const reset = () =>{
        board = ["","","","","","","","",""];  // Array with empty strings to not mess order of elements
        console.log("CARALHA", board);
        return board;
    }
    const checkWinCond = () => {
        console.log(board);
        if(board[0] == board[1] && board[1] == board[2] && board[0]!=''){
            return true;
        }
        if(board[3] == board[4] && board[4] == board[5] && board[3]!=''){
            return true;
        }
        if(board[6] == board[7] && board[7] == board[8] && board[6]!=''){
            return true;
        }
        if(board[0] == board[3] && board[3] == board[6] && board[0]!=''){
            return true;
        }
        if(board[1] == board[4] && board[4] == board[7] && board[1]!=''){
            return true;
        }
        if(board[2] == board[5] && board[5] == board[8] && board[2]!=''){
            return true;
        }
        if(board[0] == board[4] && board[4] == board[8] && board[0]!=''){
            return true;
        }
        if(board[2] == board[4] && board[4] == board[6] && board[2]!=''){
            return true;
        }
        return false;
    }
    return {
        reset,
        board,
        checkWinCond,
    }
})();

let displayManager = (function(){
    let _elementBoard;
    let _boardSquares;
    let _xText;
    let _oText;
    let _xTextElement;
    let _oTextElement;
    let _gameOverDivElement;

    const init = (choice1, choice2) =>{
        _gameOverDivElement = document.querySelector('#game-over-text');
        _elementBoard = document.querySelector('#game-board');
        _boardSquares = _elementBoard.children;
        _xText = choice1;
        _oText = choice2;
        _xTextElement =  document.createElement('p');
        _xTextElement.innerHTML = _xText;
        _oTextElement =  document.createElement('p');
        _oTextElement.style.color = 'red';
        _oTextElement.innerHTML = _oText;
        for (let square of _boardSquares) {
            square.addEventListener('click', gameManager.changeBoard);
        }
    }
    const draw = (_boardData) =>{
        for(let i = 0;i<9;i++){
            if(_boardSquares[i].firstChild == null){
                if(_boardData[i] == _xText){
                    _boardSquares[i].appendChild(_xTextElement.cloneNode(true));
                }else if(_boardData[i] == _oText){
                    _boardSquares[i].appendChild(_oTextElement.cloneNode(true));
                }
            }
        }
    };
    const clean = () => {
        for(let i = 0;i<9;i++){
            if(_boardSquares[i].firstChild != null){
                _boardSquares[i].removeChild(_boardSquares[i].firstChild);
            }
        }
        _gameOverDivElement.style.visibility = 'hidden';
    };
    const displayGameOver = (winner) => {
        _gameOverDivElement.children[1].innerHTML = `${winner.name.toUpperCase()} WINS !`;
        _gameOverDivElement.style.visibility = 'visible';
    }
    return {
        init,
        clean,
        draw,
        displayGameOver
    }
})();
const playerManager = (function(){
    let _player1Data;
    let _player2Data;
    let _pform1;
    let _pform2;
    const createPlayers = () =>{
        _pform1 = document.querySelector('#player-one');
        _pform2 = document.querySelector('#player-two');
        _player1Data = Object.fromEntries(new FormData(_pform1).entries());
        _player2Data = Object.fromEntries(new FormData(_pform2).entries());
        let player1 = playerFactory(_player1Data.name, _player1Data.choice);
        let player2 = playerFactory(_player2Data.name2, _player2Data.choice2);
        return{
            player1,
            player2
        }
    }
    return{
        createPlayers
    }
})();

const playerFactory = (name, choice) => {  //TicChoice is either X or O
    return {
        name,
        choice
    }
};

function startGame(){
    let players = playerManager.createPlayers();
    gameManager.init( players.player1, players.player2);
};