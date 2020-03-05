//unionfind
//并查集与kruskal实现最小生成树
/*
 *   想象一下你是个城市基建规划者，地图上有 N 座城市，它们按以 1 到 N 的次序编号。
 *   给你一些可连接的选项 conections，其中每个选项 conections[i] = [city1, city2, cost] 表示将城市 city1 和城市 city2 连接所要的成本。
 *   （连接是双向的，也就是说城市 city1 和城市 city2 相连也同样意味着城市 city2 和城市 city1 相连）。
 *   返回使得每对城市间都存在将它们连接在一起的连通路径（可能长度为 1 的）最小成本。该最小成本应该是所用全部连接代价的综合。
 *   如果根据已知条件无法完成该项任务，则请你返回 -1。
 *   示例 1：
 *   输入：N = 3, conections = [[1,2,5],[1,3,6],[2,3,1]]
 *   输出：6
 *   解释：选出任意 2 条边都可以连接所有城市，我们从中选取成本最小的 2 条。
 */
let minimumCost = function(N, connections) {
    let union = new Array(N).fill(0), rank = new Array(N).fill(1), aRoot, bRoot, allCost = 0;
    union.forEach((value,index,array)=>{array[index]=index});
    connections.sort((pre,cur)=>pre[2]-cur[2]);
    let find = function(index){
        while(index != union[index]){
            union[index] = union[union[index]];
            index = union[index];
        }
        return index;
    };
    let isGroup = function(){
        let num = 0;
        for(let i = 0; i < N; i++){
            if(i == union[i]){
                num++;
                if(num >= 2) return false;
            }
        }
        return true;
    };
    for(let [city1, city2, cost] of connections){
        if((aRoot = find(city1-1)) !== (bRoot = find(city2-1))){
            if(rank[aRoot] < rank[bRoot]){
                union[aRoot] = bRoot;
            }else if(rank[aRoot] > rank[bRoot]){
                union[bRoot] = aRoot;
            }else{
                union[bRoot] = aRoot;
                rank[aRoot] += 1;
            }
            allCost += cost;
            if(isGroup()) return allCost;
        }
    }
    return -1;
};

/*
 * 959题 由斜杠划分区域
  * 在由 1 x 1 方格组成的 N x N 网格 grid 中，每个 1 x 1 方块由 /、\ 或空格构成。这些字符会将方块划分为一些共边的区域。
  *（请注意，反斜杠字符是转义的，因此 \ 用 "\\" 表示。）。
  * 返回区域的数目。
  * 输入：[" /", "/ "] 输出：2
  */
 let regionsBySlashes = function(grid) {
    let n = grid.length, res = 1, xRoot, yRoot;
    let union = new Array((n+1)**2).fill(0), rank = new Array(n).fill(1);
    union.forEach((value,index,array)=>{array[index]=index});
    let find = function(index){
        while(index != union[index]){
            union[index] = union[union[index]];
            index = union[index];
        }
        return index;
    };
    //初始化把网格边缘存入
    for(let i = 0; i < n+1; i++){
        for(let j = 0; j < n+1; j++){
            if(i == 0 || j == 0 || i == n || j == n){
                union[i*(n+1)+j] = 0;
            }
        }
    }
    for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
            let x,y;
            if(grid[i][j] == '/'){
                x = i * (n + 1) + j + 1;
                y = (i + 1) * (n + 1) + j;
            }else if(grid[i][j] == '\\'){
                x = i * (n + 1) + j;
                y = (i + 1) * (n + 1) + j + 1;
            }else{
                continue;
            }
            //若两个点已经在一个连通图中，则增加一个区域
            if((xRoot = find(x)) !== (yRoot = find(y))){
                if(rank[xRoot] < rank[yRoot]){
                    union[xRoot] = yRoot;
                }else if(rank[xRoot] > rank[yRoot]){
                    union[yRoot] = xRoot;
                }else{
                    union[yRoot] = xRoot;
                    rank[xRoot] += 1;
                }
            }else{
                res++;
            }
        }
    }
    return res;
};
