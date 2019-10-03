const ALIVE = '*';
const LIFELESS = "-";

const make_board = (rows, cols) => {
    let board = [];
    for (let i = 0; i<rows; i++) {
        board.push([]);
        for (let j = 0; j<cols; j++) {
            board[i].push(false);
        }
    }
    return board;
};

const display = (board) => {
    const div = document.getElementById("board");
    let text = "";
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j])
                text += ALIVE;
            else
                text += LIFELESS;
        }
        text += "\n";
    }
    div.innerText = text;
};

const main = () => {
    let board = make_board(5,10);
    display(board);
};
document.addEventListener("DOMContentLoaded", main);