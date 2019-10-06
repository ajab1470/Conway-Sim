/**
 * @file main.js
 * @author Ashley Beckers
 * @description:
 * Simple Simulator for Conway's Game of Life in JavaScript.
 *
 * Terms used:
 * conway board: 2d array of booleans. Each value represents a 'cell' with true representing a live cell and false
 *   representing a nonliving cell
 * neighbor: one of the 8 adjacent cells on a board. Diagonals included and wraps around to the other side of the board
 *   in the case of cells on the edge of the board
 * tick: the moment at which cells can change from living to nonliving or vice versa. Note: All changes of a tick happen
 *   simultaneously (changes from the same tick do not affect each other)
 *
 * For more information on Conway's Game of Life, visit https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 *
 * Ran through the DOM file index.html
 */

const ALIVE = "*";
const LIFELESS = "-";

/**
 * makes a starting board for Conway's Game of Life
 * @param rows the number of rows in the board
 * @param cols the number of columns in the board
 * @param live_chance the % chance each cell has to start alive
 * @returns 2d array of booleans (true indicates a living cell)
 */
const make_board = (rows, cols, live_chance) => {
    let board = [];
    //create the 2d array
    for (let i = 0; i<rows; i++) {
        board.push([]);
        for (let j = 0; j<cols; j++) {
            //rng gives a number 0-99. If less than live chance, create a live cell
            if (Math.random()*100 < live_chance) {
                board[i].push(true);
            } else {
                board[i].push(false);
            }
        }
    }
    return board;
};

/**
 * determines how many of the neighbor cells of a cell are alive
 * helper to tick function
 * @param board conway board
 * @param cell_row the row of the cell
 * @param cell_col the column of the cell
 * @returns number of living neighbors
 */
const get_neighbors = (board, cell_row, cell_col) => {
    //store the values for top left right and bottom positions relative to the given cell
    const top = (cell_row + (board.length - 1)) % board.length;
    const bottom = (cell_row + 1) % board.length;
    const left = (cell_col + (board[cell_row].length - 1)) % board[cell_row].length;
    const right = (cell_col + 1) % board[cell_row].length;

    let neighbors = 0;
    //check each neighbor. If it is alive, increment the number of living neighbors
    if (board[top][left]) {
        neighbors++;
    }
    if (board[top][cell_col]) {
        neighbors++;
    }
    if (board[top][right]) {
        neighbors++;
    }
    if (board[cell_row][left]) {
        neighbors++;
    }
    //cell itself is not a neighbor
    if (board[cell_row][right]) {
        neighbors++;
    }
    if (board[bottom][left]) {
        neighbors++;
    }
    if (board[bottom][cell_col]) {
        neighbors++;
    }
    if (board[bottom][right]) {
        neighbors++;
    }
    return neighbors;
};

/**
 * performs a single tick on the current configuration of Conway's Game of Life
 * @param board the life board to move forward
 */
const tick = (board) => {
    //store dimensions of board for simplicity
    let rows = board.length;
    let cols = board[0].length;
    //create a constant deep copy to save the board before the tick began
    const before = [];
    for (let i = 0; i<rows; i++) {
        before.push([]);
        for (let j = 0; j<cols; j++) {
            before[i].push(board[i][j]);
        }
    }

    //go through the deep copy and make correct changes in the original
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let live_neighbors = get_neighbors(before,i,j);
            //live cell dies if overpopulated or underpopulated
            if (before[i][j]) {
                if (live_neighbors < 2) {
                    board[i][j] = false;
                } else if (live_neighbors > 3) {
                    board[i][j] = false;
                }
            //nonliving cell comes alive if perfectly populated
            } else {
                if (live_neighbors === 3) {
                    board[i][j] = true;
                }
            }
        }
    }
};

/**
 * display the board onto the board div in the DOM
 * @param board the conway board to display
 * @pre the DOM file has a div tag of id "board"
 */
const display = (board) => {
    //get the div
    const div = document.getElementById("board");
    //create a string representation of the board to display
    let text = "";
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j]) {
                text += ALIVE;
            } else {
                text += LIFELESS;
            }
        }
        text += "\n";
    }
    //set string representation to the display
    div.innerText = text;
};

/**
 * uses the above functions to simulate Conway's Game of Life
 */
const main = () => {
    let board = make_board(35, 125, 50);
    display(board);
    setInterval(function () {
            tick(board);
            display(board);
            },500);
};

document.addEventListener("DOMContentLoaded", main);