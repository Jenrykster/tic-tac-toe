let displayManager = (function(){
    let _elementBoard;
    let _boardSquares;
    let _xTextElement;
    let _oTextElement;
    let init = () =>{
        _elementBoard = document.querySelector('#game-board');
        _boardSquares = _elementBoard.children;
        _xTextElement =  document.createElement('p');
        _xTextElement.innerHTML = "X";
        _oTextElement =  document.createElement('p');
        _oTextElement.innerHTML = "O";
    };
    let draw = (boardData) =>{
        for(let i = 0;i<9;i++){
            if(boardData[i] == "x"){
                _boardSquares[i].appendChild(_xTextElement.cloneNode(true));
            }else{
                _boardSquares[i].appendChild(_oTextElement.cloneNode(true));
            }
        }
    };
    return {
        init,
        draw
    };
})();
let gameBoard = (function(){
    let board = ["x","o","x","o","o","o","x","x","x"];
    return {
        board
    }
})();

displayManager.init();
displayManager.draw(gameBoard.board);