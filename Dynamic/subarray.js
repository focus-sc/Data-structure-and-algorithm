//子序问题

/*
53题 最大子序和
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
   let length = nums.length;
   let dp = new Array(length).fill(0);
   dp[0] = nums[0];
   for(let i = 1; i < length; i++){
       dp[i] = Math.max(nums[i], nums[i] + dp[i-1]);
   }
   return Math.max(...dp);
};

/*
152题 乘积最大子序列
给定一个整数数组 nums ，找出一个序列中乘积最大的连续子序列（该序列至少包含一个数）。
输入: [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。
*/
var maxProduct = function(nums) {
   let length = nums.length;
   let dp = new Array(length).fill(0), max = nums[0];
   dp.forEach((v,i,a)=>{a[i]=[0,0]});
   dp[0] = [nums[0],nums[0]];
   for(let i = 1; i < length; i++){
       dp[i][0] = Math.max(nums[i], nums[i] * dp[i-1][0], nums[i] * dp[i-1][1]);
       dp[i][1] = Math.min(nums[i], nums[i] * dp[i-1][0], nums[i] * dp[i-1][1]);
       max = Math.max(max,dp[i][0]);
   }
   return max;
};
