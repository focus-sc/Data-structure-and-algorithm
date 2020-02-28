//动态规划求解背包类问题
/* 
 *	0/1背包问题
 *	给定一个固定大小、能够携带重量W的背包，以及一组有价值和重量的物品
 *	找出一个最佳的解决方案，使得装入背包的完整物品总重量不超过W，且价值最大，返回最大价值
 *  状态转移方程：F(n,c) 考虑将那个物品放入容量为C的背包，使得价值最大
 *	F(i,c) = max(F(i-1,c), F(i-1,c-w(i))+v(i))
 */
let knapSack = function(capacity,weights,values){
	let n = weights.length;
	let dp = new Array(capacity+1).fill(0);
	for(let i = 0; i < n; i++){
		for(let j = capacity; j>= weights[i]; j--){
			dp[j] = Math.max(dp[j], dp[j-weights[i]]+values[i]);
		}
	}
	return dp[capacity];
}



/* 
 * 完全背包问题(每一种物品可以有无限个)
 * 322题 零钱兑换
 * 给定不同面额的硬币 coins 和一个总金额 amount。计算可以凑成总金额所需的最少的硬币个数。
 * 如果没有任何一种硬币组合能组成总金额，返回 -1。
 * 输入: coins = [1, 2, 5], amount = 11
 * 输出: 3 
 * 解释: 11 = 5 + 5 + 1
 */
let coinChange = function(coins, amount) {
	let n = coins.length;
    let dp = new Array(amount+1).fill(Infinity);
    dp[0] = 0;
    for(let i = 0; i < n; i++){
        for(let j = coins[i]; j <= amount; j++){
            dp[j] = Math.min(dp[j], dp[j-coins[i]]+1);
        }
    }
    return Number.isFinite(dp[amount]) ? dp[amount] : -1;
};
/*
 * 518题 零钱兑换 II
 * 给定不同面额的硬币和一个总金额。写出函数来计算可以凑成总金额的硬币组合数。假设每一种面额的硬币有无限个。
 * 输入: amount = 5, coins = [1, 2, 5]
 * 输出: 4
 */
let change = function(amount, coins) {
    let n = coins.length;
    let dp = new Array(amount+1).fill(0);
    dp[0] = 1;
    for(let i = 0; i < n; i++){
        for(let j = coins[i]; j <= amount; j++){
            dp[j] = dp[j] + dp[j-coins[i]];
        }
    }
    return dp[amount];
};


 /*
  * 背包问题变种 填满背包
  * 416题 分割等和子集
  * 给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
  * 输入: [1, 5, 11, 5]
  * 输出: true
  */
let canPartition = function(nums) {
	let sum = nums.reduce((pre,cur)=>pre+cur);
	if(sum % 2 == 1){
    	return false;
	}
	let n = nums.length, c = sum / 2, dp = new Array(c+1).fill(false);
	for(let i = 0; i <= c; i++){
    	dp[i] = nums[0] === i;
	}
	for(let i = 1; i < n; i++){
    	for(let j = c; j >= nums[i]; j--){
        	dp[j] = dp[j] || dp[j-nums[i]];
    	}
	}
	return dp[c];
};


/*
 * 二维背包问题 (对于每件物品，具有两种不同的费用)
 * 474题 一和零
 * 在计算机界中，我们总是追求用有限的资源获取最大的收益。
 * 现在，假设你分别支配着 m 个 0 和 n 个 1。另外，还有一个仅包含 0 和 1 字符串的数组。
 * 任务是使用给定的 m 个 0 和 n 个 1 ，找到能拼出存在于数组中的字符串的最大数量。每个 0 和 1 至多被使用一次。
 * 输入: Array = {"10", "0001", "111001", "1", "0"}, m = 5, n = 3
 * 输出: 4
 */
 //f[i][v][u]=max{f[i-1][v][u],f[i-1][v-a[i]][u-b[i]]+w[i]}
let findMaxForm = function(strs, m, n) {
    let dp = new Array(m+1).fill(0);
    dp.forEach((value,index,array)=>{array[index] = new Array(n+1).fill(0)});
    for(let i = 0, len = strs.length; i < len; i++){
        let zero = strs[i].replace(/[1]+/g,'').length,
            one = strs[i].length - zero;
        for(let j = m; j >= zero; j--){
            for(let k = n; k >= one; k--){
                dp[j][k] = Math.max(dp[j][k], dp[j-zero][k-one]+1);
            }
        }
    }
    return dp[m][n];
};
