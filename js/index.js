let displayManager = (function(){
    let _elementBoard;
    let _boardSquares;
    let _boardData;
    let _xTextElement;
    let _oTextElement;

    let _changeBoard = (event) =>{
        let index = event.target.dataset.index;
        _boardData[index] = "x";
        draw();
        console.log(index);
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
    };
    let draw = () =>{
        for(let i = 0;i<9;i++){
            if(_boardSquares[i].firstChild != null){
                console.log(_boardSquares[i].firstChild);
                _boardSquares[i].removeChild(_boardSquares[i].firstChild);
            }
            if(_boardData[i] == "x"){
                _boardSquares[i].appendChild(_xTextElement.cloneNode(true));
            }else{
                _boardSquares[i].appendChild(_oTextElement.cloneNode(true));
            }
        }
    };
    let update = () => {

    }
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

displayManager.init(gameBoard.board);
displayManager.draw();