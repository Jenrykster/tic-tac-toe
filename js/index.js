let displayManager = (function(){
    let _elementBoard;
    let _boardSquares;
    let _boardData;
    let _xTextElement;
    let _oTextElement;
    let _lastTurn = "x";

    let _changeBoard = (event) =>{
        let index = event.target.dataset.index;
        if(_lastTurn == "x"){
            _boardData[index] = "o";
            _lastTurn = "o";
        }else{
            _boardData[index] = "x";
            _lastTurn = "x";
        }
        _draw();
    }
    let init = (boardData) =>{
        _elementBoard = document.querySelector('#game-board');
        _boardSquares = _elementBoard.children;
        _xTextElement =  document.createElement('p');
        _xTextElement.innerHTML = "X";
        _oTextElement =  document.createElement('p');
        _oTextElement.innerHTML = "O";
        
        _boardData = boardData;
        for (let square of _boardSquares) {
            square.addEventListener('click', _changeBoard);
        }
        _draw(); 
    };
    let _draw = () =>{
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
    let update = () => {

    }
    return {
        init
    };
})();
let gameBoard = (function(){
    let board = ["","","","","","","","",""]; // Array with empty strings to not mess order of elements
    return {
        board
    }
})();

displayManager.init(gameBoard.board);