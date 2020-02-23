/*
1353题 最多可以参加的会议数目
给你一个数组 events，其中 events[i] = [startDayi, endDayi] ，表示会议 i 开始于 startDayi ，结束于 endDayi 。
你可以在满足 startDayi <= d <= endDayi 中的任意一天 d 参加会议 i 。注意，一天只能参加一个会议。
请你返回你可以参加的 最大 会议数目。

输入：events = [[1,2],[2,3],[3,4]]
输出：3
输入：events = [[1,4],[4,4],[2,2],[3,4],[1,1]]
输出：4
*/
let maxEvents = function(events) {
    if(events.length == 1) return 1;
    //贪心算法：以先结束的会议为主排序，先结束可用日期较少优先考虑
    events.sort((pre,cur)=>pre[1] - cur[1] || pre[0] - cur[0]);
    let res = new Set();
    for(let i = 0; i < events.length; i++){
        //从开始到结束日期遍历，如果该日期未被使用，则选择该日期
        for(let j = events[i][0]; j <= events[i][1]; j++){
            if(!res.has(j)){
                res.add(j);
                break;
            }
        }
    }
    return res.size;
};
