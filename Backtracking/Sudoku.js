//回溯算法解数独
/*
 * 第37题解数独
 * 编写一个程序，通过已填充的空格来解决数独问题。
 * 一个数独的解法需遵循如下规则：
 * 数字 1-9 在每一行只能出现一次。
 * 数字 1-9 在每一列只能出现一次。 
 * 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
 * 空白格用 '.' 表示。
 * 输入：[["5","3",".",".","7",".",".",".","."],
 *      ["6",".",".","1","9","5",".",".","."],
 *      [".","9","8",".",".",".",".","6","."],
 *      ["8",".",".",".","6",".",".",".","3"],
 *      ["4",".",".","8",".","3",".",".","1"],
 *      ["7",".",".",".","2",".",".",".","6"],
 *      [".","6",".",".",".",".","2","8","."],
 *      [".",".",".","4","1","9",".",".","5"],
 *      [".",".",".",".","8",".",".","7","9"]]
 * 输出：[["5","3","4","6","7","8","9","1","2"],
 *      ["6","7","2","1","9","5","3","4","8"],
 *      ["1","9","8","3","4","2","5","6","7"],
 *      ["8","5","9","7","6","1","4","2","3"],
 *      ["4","2","6","8","5","3","7","9","1"],
 *      ["7","1","3","9","2","4","8","5","6"],
 *      ["9","6","1","5","3","7","2","8","4"],
 *      ["2","8","7","4","1","9","6","3","5"],
 *      ["3","4","5","2","8","6","1","7","9"]]
 */
 /**
 * @param {character[][]} board
 * @return {void}
 */
var solveSudoku = function(board) {
    const line = 9;
    let row = new Array(line), col = new Array(line), block = new Array(line);
    let index = 0, solve = [];
    let square = (i,j) =>  Math.floor(i/3)*3+Math.floor(j/3);
    
    //solve数组保存要填入的位置, index为当前要填入的位置，row、col、block分别为第x行列块已经填入的数字
    for(let i = 0; i < line; i++){
        [row[i], col[i], block[i]] = [[],[],[]];
    }
    for(let i = 0; i < line; i++){
        for(let j = 0; j < line; j++){
            if(board[i][j] != '.'){
                row[i].push(board[i][j]);
                col[j].push(board[i][j]);
                block[square(i,j)].push(board[i][j]);
            }else{
               solve.push([i,j]);
            }
        }
    }
    let sudoku = function(index){
        if(index == solve.length) return true;
        
        let [i, j] = solve[index];
        for(let x = 1; x <=line; x++){
            x = String(x);
            if(!row[i].includes(x) && !col[j].includes(x) && !block[square(i,j)].includes(x)){
                board[i][j] = x;
                row[i].push(x);
                col[j].push(x);
                block[square(i,j)].push(x);
                //递归解决下一个位置，如果下一个位置无解则回溯状态
                if(sudoku(index+1)){
                    return true;
                }else{
                    board[i][j] = '.';
                    row[i].pop();
                    col[j].pop();
                    block[square(i,j)].pop();
                }
            }
        }
        return false;
    };
    sudoku(0);
};
