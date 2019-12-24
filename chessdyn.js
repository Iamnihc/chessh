class square{
    constructor({htmlid= "", chesscord="", cord="", htmltag=""}){
        if (chesscord != ""){
            this.htmlid = document.getElementById("square" + chesscord);
            this.cord = getChessCord(this.htmlid);
            this.chesscord ="";
        }
    }
    getChessCord(loc){
        var letters = ["a", 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        var loc = location.id.substring(6);
        var row = letters.indexOf(loc.substring(0, 1));
        var col = Number(loc.substring(1,2));
        return [row, col];
    }
    getCord(){

    }
    getElement(){

    }
}

var board = []
var boardFlip = 0
var turn = "white";
var chosen = NaN;

for (var i = 0; i < 8; i++) {
    board.push(new Array("", "", "", "", "", "", "", ""));
}
console.log(board)


function setID() {
    var squares = document.getElementsByClassName("col");
    var letters = ["a", 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    for (var i = 0; i < squares.length; i++) {
        squares[i].id = "square" + (letters[i / 8]) + (i % 8 +1)
    }
}


function flipBoard() {
    if (boardFlip == 0) {
        console.log("0")
        document.styleSheets[1].disabled = true;
        document.styleSheets[2].disabled = false;
        boardFlip = 1;
    }
    else if (boardFlip == 1) {
        console.log("1")
        document.styleSheets[1].disabled = false;
        document.styleSheets[2].disabled = true;
        boardFlip = 0;
    }
}


function MakeCheckers() {
    var squares = document.getElementsByClassName("col");
    for (var i = 0; i < squares.length; i++) {
        squares[i].classList.add(["whitesquare", "blacksquare"][(i + Math.floor(i / 8) + 1) % 2]);
    }
}


function getColor(location) {
    //String()
    var piece = location.innerHTML.charCodeAt(0);
    if (isNaN(piece)) return NaN;
    if (piece < 9818) return "white";
    if (piece > 9817) return "black";
}


function getType(location) {
    var piece = location.innerHTML.charCodeAt(0);
    piece = piece - 2654 % 6;
    var list = ["king", "queen", "rook", "bishop", "knight", "pawn"];
    return list[piece];
}


function getLocationBreakdown(location) {
    var letters = ["a", 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var loc = location.id.substring(6);
    var row = letters.indexOf(loc.substring(0, 1));
    var col = Number(loc.substring(1,2));
    return [row, col];
}


function getMoves(piece) {
    if (getType(piece) == "pawn") {
        out = []
        if (getColor() == "white") {
            if (getLocationBreakdown(piece)[1] == 1) {
                out.push(getLocationBreakdown(piece))
            }
        }
        return
    }
    return []
}


function getTakes(piece) {
    return []
}


function getOptions(piece) {
    return getTakes(piece).concat(getMoves(piece));
}


function setBoard() {
    board[0][4] = "&#9812";
    board[0][3] = "&#9813";
    board[0][0] = "&#9814";
    board[0][7] = "&#9814";
    board[0][2] = "&#9815";
    board[0][1] = "&#9816";
    board[0][5] = "&#9815";
    board[0][6] = "&#9816";

    board[7][4] = "&#9818";
    board[7][3] = "&#9819";
    board[7][0] = "&#9820";
    board[7][7] = "&#9820";
    board[7][2] = "&#9821";
    board[7][1] = "&#9822";
    board[7][5] = "&#9821";
    board[7][6] = "&#9822";
    for (var i = 0; i < board[0].length; i++) {
        board[1][i] = "&#9817";
        board[6][i] = "&#9823";
    }
}


function updateBoard() {
    for (var i = 0; i < board.length; i++) {
        var chrow = document.getElementsByClassName("r" + (i +1));
        var currow = board[i];
        for (var j = 0; j < (currow.length); j++) {
            var col = chrow[0].children[j];
            col.innerHTML = board[i][j];
        }
    }
}


function resizeBoard() {
    var mindim = Math.min(document.getElementsByTagName("BODY")[0].clientWidth, document.getElementsByTagName("BODY")[0].clientHeight);
    var rows = document.getElementsByClassName("col");
    for (var i = 0; i < rows.length; i++) {
        rows[i].style.height = (mindim / 10) + "px";
        rows[i].style.width = (mindim / 10) + "px";
        rows[i].style.fontSize = .9 * mindim / 10 + "px";
    }
}


document.getElementsByTagName("BODY")[0].onresize = function () { resizeBoard(); };
resizeBoard();
flipBoard();
flipBoard();
MakeCheckers();
setBoard();
updateBoard();
setID();
var htmlboard = document.getElementsByClassName("col");

// Selecting pieces
window.onclick = e => {
    if (e.target.classList.contains("col") && getColor(e.target) == turn) {
        while (document.getElementsByClassName("selected").length) {
            document.getElementsByClassName("selected")[0].classList.remove("selected");
        }
        chosen = e.target;
        chosen.classList.add("selected");
    }
    if (e.target.classList.contains("col") && getColor(e.target) == "") {
        while (document.getElementsByClassName("selected").length) {
            document.getElementsByClassName("selected")[0].classList.remove("selected");
        }
        if (getOptions(chosen).includes(e.target)) {
            board
        }
        chosen = NaN;
    }
} 