let gameManager = (function(){
    let _boardData;
    let _lastTurn = "x";

    const changeBoard = (event) =>{
        let index = event.target.dataset.index;
        if(_lastTurn == "x"){
            _boardData[index] = "o";
            _lastTurn = "o";
        }else{
            _boardData[index] = "x";
            _lastTurn = "x";
        }
        displayManager.draw(_boardData);
        console.log("Win: ", gameBoard.checkWinCond());
    }
    const init = (boardData) =>{
        _boardData = boardData;
        
        displayManager.init();
        displayManager.draw(_boardData); 
    };
    return {
        init,
        changeBoard,
    };
})();

let gameBoard = (function(){
    let board = ["","","","","","","","",""]; // Array with empty strings to not mess order of elements
    const checkWinCond = () => {
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
        board,
        checkWinCond
    }
})();

let displayManager = (function(){
    let _elementBoard;
    let _boardSquares;
    let _xTextElement;
    let _oTextElement;

    const init = () =>{
        _elementBoard = document.querySelector('#game-board');
        _boardSquares = _elementBoard.children;
        _xTextElement =  document.createElement('p');
        _xTextElement.innerHTML = "X";
        _oTextElement =  document.createElement('p');
        _oTextElement.innerHTML = "O";
        for (let square of _boardSquares) {
            square.addEventListener('click', gameManager.changeBoard);
        }
    }
    const draw = (_boardData) =>{
        for(let i = 0;i<9;i++){
            if(_boardSquares[i].firstChild == null){
                if(_boardData[i] == "x"){
                    _boardSquares[i].appendChild(_xTextElement.cloneNode(true));
                }else if(_boardData[i] == "o"){
                    _boardSquares[i].appendChild(_oTextElement.cloneNode(true));
                }
            }
        }
    };
    return {
        init,
        draw
    }
})();

const playerFactory = (name, ticChoice) => {  //TicChoice is either X or O
    return {
        name,
        ticChoice
    }
}

let player1 = playerFactory('Jenryk', 'x');
let player2 = playerFactory('NotJenryk', 'o');

gameManager.init(gameBoard.board);