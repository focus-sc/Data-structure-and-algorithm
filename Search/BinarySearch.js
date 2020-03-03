/* 基本二分查找模板
 * let search = function(nums, target) {
 *    let low = 0, high = nums.length-1, mid;
 *    while(low <= high){
 *        mid = Math.floor((low + high)/2);
 *        if(nums[mid] == target){
 *            return mid;
 *        }else if(nums[mid] > target){
 *            high = mid - 1;
 *        }else{
 *            low = mid + 1;
 *        }
 *    }
 *    return -1;
 * };
 */
 
 /*
  * 第475题 供暖器
  * 现在，给出位于一条水平线上的房屋和供暖器的位置，找到可以覆盖所有房屋的最小加热半径。
  * 所以，你的输入将会是房屋和供暖器的位置。你将输出供暖器的最小加热半径。
  * 输入: [1,2,3,4],[1,4]
  * 输出: 1
  * 解释: 在位置1, 4上有两个供暖器。我们需要将加热半径设为1，这样所有房屋就都能得到供暖。
  */
  
var findRadius = function(houses, heaters) {
    let res = 0, heatLen = heaters.length;
    heaters.sort((pre,cur)=>pre-cur);
    let search = function(target) {
        let low = 0, high = heatLen - 1, mid;
        while(low <= high){
            mid = Math.floor((low + high) / 2);
            if(heaters[mid] == target){
                return [mid,mid];
            }else if(heaters[mid] > target){
                high = mid - 1;
            }else{
                low = mid + 1;
            }
        }
        return [high,low];
    };
    for(let loc of houses){
        let [x, y] = search(loc);
        if(x != y){
            res = Math.max(res, Math.min(loc-heaters[x]||Infinity, heaters[y]-loc||Infinity));
        }
    }
    return res;
};


/*
 * 658题 找到 K 个最接近的元素
 * 给定一个排序好的数组，两个整数 k 和 x，从数组中找到最靠近 x（两数之差最小）的 k 个数。返回的结果必须要是按升序排好的。
 * 如果有两个数与 x 的差值一样，优先选择数值较小的那个数。
 * 输入: [1,2,3,4,5], k=4, x=3
 * 输出: [1,2,3,4]
 */
 let findClosestElements = function(arr, k, x) {
    let left = 0, right = arr.length-1, mid, index, res, start;
    while(left + 1 < right){
        mid = Math.floor((left+right)/2);
        if(arr[mid] == x || (arr[mid-1] < x && arr[mid] > x)){
            index = mid;
            break;
        }else if(arr[mid] < x){
            left = mid;
        }else{
            right = mid;
        }
    }
    if(index == undefined){
        index = x <= arr[0] ? 0 : arr.length-1;
    }
    start = index - k > 0 ? index- k : 0;
    res = arr.slice(start, index+k).map(value=>[value,Math.abs(value-x)]).sort((pre,cur)=>{return pre[1]-cur[1] || pre[0]-cur[0]}).slice(0,k).map(value=>value[0]).sort((pre,cur)=>pre-cur);
    return res;
};
