//动态规划方式求子序问题，包括最大子序和，最大子序乘积，最长上升子序列，最长公共子序列
/**
 * @param {number[]} nums
 * @return {number}
 */
/*
53题 最大子序和
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
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
解释: 子数组 [2,3] 有最大乘积 6。
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

/*
300题 最长上升子序列
给定一个无序的整数数组，找到其中最长上升子序列的长度。
输入: [10,9,2,5,3,7,101,18]
输出: 4 
*/
var lengthOfLIS = function(nums) {
    let dp = [0], memo = [];
    for(let i = 0; i < nums.length; i++){
        dp[i] = 1;
        for(let j = i -1; j >= 0; j--){
            if(nums[i] > nums[j] && dp[j] + 1 > dp[i]){
                dp[i] = dp[j] + 1;
            }
        }
    }
    return Math.max(...dp);
};

/*
673题 最长递增子序列的个数
给定一个未排序的整数数组，找到最长递增子序列的个数。
输入: [10,9,2,5,3,7,101,18]
输出: 4 
*/
var findNumberOfLIS = function(nums) {
    if(!nums.length) return 0;
    let dp = [],length = nums.length, count = 0, max = 0;
    for(let i = 0; i < length; i++){
        dp[i] = [1,1];
        for(let j = i - 1; j >= 0; j--){
            if(nums[i] > nums[j]){
               //遇到可能成为新的最长序列时重置值，遇到相同长度的最长序列时更新值
                if(dp[i][0] <= dp[j][0]){
                    dp[i] = [dp[j][0]+1,dp[j][1]];
                }else if(dp[i][0] == dp[j][0]+1){
                    dp[i][1]+=dp[j][1];
                }
            }
        }
        if(dp[i][0] > max){
            max = dp[i][0];
            count = dp[i][1];
        }else if(dp[i][0] == max){
            count += dp[i][1];
        }
    }
    return count;
};

/*
1143题 最长公共子序列
给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列。
一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。
若这两个字符串没有公共子序列，则返回 0。

输入：text1 = "abcde", text2 = "ace" 
输出：3  
*/
var longestCommonSubsequence = function(text1, text2) {
    let m = text1.length, n = text2.length;
    let dp = new Array(m).fill(0);
    dp.forEach((v,i,a)=>{ a[i] = new Array(n).fill(0)});
   
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            if(text1.charAt(i) === text2.charAt(j)){
                dp[i][j] = (i ==0 || j == 0) ? 1 : 1  + dp[i-1][j-1];
            }else{
                if(i == 0 && j == 0){
                    dp[i][j] = 0;
                }else if(i == 0){
                    dp[i][j] = dp[i][j-1];
                }else if(j == 0){
                    dp[i][j] = dp[i-1][j];
                }else{
                   dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]); 
                }
            }
        }
    }
    return dp[m-1][n-1];
};
