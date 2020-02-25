//动态规划买卖股票的最佳时机类问题
//给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。注意你不能在买入股票前卖出股票。设计一个算法来计算你所能获取的最大利润。
/*状态转移：
dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
              max(   选择 rest  ,           选择 sell      )
解释：今天没有持有股票，有两种可能：昨天就没有持有，然后今天选择rest；昨天持有股票，今天sell。
dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
              max(   选择 rest  ,           选择 buy         )
解释：今天持有着股票，有两种可能：昨天就持有着股票，然后今天选择rest，昨天本没有持有，但今天选择 buy。

状态转移方程：
dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
base case：
dp[-1][k][0] = dp[i][0][0] = 0
dp[-1][k][1] = dp[i][0][1] = -infinity
*/

//第121题：最多只允许完成一笔交易（即买入和卖出一支股票）
let maxProfit1 = function(prices) {
    let length = prices.length, dp = [[0,-Infinity]];
    for(let i = 0; i < length; i++){
        dp[i+1] = [];
        dp[i+1][0] = Math.max(dp[i][0], dp[i][1]+prices[i]);
        dp[i+1][1] = Math.max(dp[i][1], -prices[i]);
    }
    return dp[length][0];
};

//第122题：尽可能地完成更多的交易，即无限次交易
var maxProfit = function(prices) {
    let length = prices.length, dp = [[0,-Infinity]];
    for(let i = 0; i < length; i++){
        dp[i+1] = [];
        dp[i+1][0] = Math.max(dp[i][0], dp[i][1]+prices[i]);
        dp[i+1][1] = Math.max(dp[i][1], dp[i][0]-prices[i]);
    }
    return dp[length][0];
};

//第123题：最多可以完成两笔交易
var maxProfit2 = function(prices) {
    let length = prices.length,k = 2, dp = [];
    for(let i = 0; i <= length; i++){
        dp[i] = [];
        for(let j = 0; j <= k; j++){
            dp[i][j] = [];
            dp[i][j][0] = 0;
            dp[i][j][1] = -Infinity;
        }
    }
    for(let i = 0; i < length; i++){
        for(let j = k; j >= 1; j--){
            dp[i+1][j][0] = Math.max(dp[i][j][0], dp[i][j][1] + prices[i]);
            dp[i+1][j][1] = Math.max(dp[i][j][1], dp[i][j-1][0] - prices[i]);
        }
    }
    return dp[length][k][0];
};

//第123题：最多可以完成k笔交易
var maxProfitk = function(k, prices) {
    if(k > prices.length / 2){
        return maxProfit(prices);
    }
    let length = prices.length, dp = [];
    for(let i = 0; i <= length; i++){
        dp[i] = [];
        for(let j = 0; j <= k; j++){
            dp[i][j] = [];
            dp[i][j][0] = 0;
            dp[i][j][1] = -Infinity;
        }
    }
    for(let i = 0; i < length; i++){
        for(let j = k; j >= 1; j--){
            dp[i+1][j][0] = Math.max(dp[i][j][0], dp[i][j][1] + prices[i]);
            dp[i+1][j][1] = Math.max(dp[i][j][1], dp[i][j-1][0] - prices[i]);
        }
    }
    return dp[length][k][0];
};

//第309题：卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)
let maxProfitCooldown = function(prices) {
    let len = prices.length, dp = [[0,-Infinity],[0,-Infinity]];
    for(let i = 0; i < len; i++){
        dp[i+2] = [];
        dp[i+2][0] = Math.max(dp[i+1][0], dp[i+1][1]+prices[i]);
        dp[i+2][1] = Math.max(dp[i+1][1], dp[i][0]-prices[i]);
    }
    return dp[len+1][0];
}

//第714题：无限次地完成交易，但是你每次交易都需要付手续费
var maxProfitFee = function(prices, fee) {
    let length = prices.length, dp0 = 0, dp1 = -Infinity;
    for(let i = 0; i < length; i++){
        [dp0,dp1] = [Math.max(dp0, dp1+prices[i]), Math.max(dp1, dp0-prices[i]-fee)];
    }
    return dp0;
};
