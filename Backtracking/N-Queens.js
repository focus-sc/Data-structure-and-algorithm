/**
 * 求解N皇后问题
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    //res保存最终结果，row保存每一种可能的皇后在列的位置，col判断列冲突，dia1,dia2判断两个对交线冲突 
    let res = [], row = [], col = new Array(n).fill(0);
    let dia1 = new Array(2*n-1).fill(0), dia2 = new Array(2*n-1).fill(0);
    // [0,0 0,1 0,2 0,3  共2*1-1条对角线 k=1的对角线和相同i+j in [0 - 6]
    //  1,0 1,1 1,2 1,3                k=-1的对角线差相同 i-j in [-3, 3] => i-j+n-1 => [0, 6]
    //  2,0 2,1 2,2 2,3
    //  3,0 3,1 3,2 3,3 ]
    //格式化结果
    let format = function(row){
        let array = [];
        for(let i = 0; i < n; i++){
            let str = '.'.repeat(row[i]) + 'Q' + '.'.repeat(n-row[i]-1);
            array.push(str)
        }
        return array;
    }
    //回溯算法放置皇后
    let putQueens = function(i, row){
        if(n == i){
            res.push(format(row));
            return;
        }
        for(let j = 0; j < n; j++){
            if(!col[j] && !dia1[i+j] && !dia2[i-j+n-1]){
                //放置皇后在j的位置，并设置新的冲突，进行下一个行的皇后判断，取消冲突回溯算法
                row.push(j);
                [col[j],dia1[i+j],dia2[i-j+n-1]] = [1,1,1];
                putQueens(i+1, row);
                row.pop();
                [col[j],dia1[i+j],dia2[i-j+n-1]] = [0,0,0];
            }
        }
    }
    putQueens(0,row);
    return res;
};
