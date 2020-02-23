//贪心算法区间(不)重叠类问题

/*
253题会议室 II
给定一个会议时间安排的数组，每个会议时间都会包括开始和结束的时间 [[s1,e1],[s2,e2],...] (si < ei)，
为避免会议冲突，同时要考虑充分利用会议室资源，请你计算至少需要多少间会议室，才能满足这些会议安排。

输入: [[0, 30],[5, 10],[15, 20]]
输出: 2
*/
let minMeetingRooms = function(intervals) {
    if(!intervals.length) return 0;
    let length = intervals.length;
    //以先结束的会议顺序排序
    intervals.sort((pre,cur)=> pre[1] - cur[1] || pre[0] - cur[0]); 
    //room数组表示会议室及其结束使用的时间
    let room  = [];
    for(let i = 0; i < length; i++){
        room.sort((pre,cur)=>pre-cur);
        let flag = 1;
        let [start, end] = intervals[i];
        for(let i = room.length-1; i >= 0; i--){
            //如果该使用开始时间大于该会议室的结束时间，则不用增加新会议室，直接修改结束时间。
            if(start >= room[i]){
                room[i] = end;
                flag = 0;
                break;
            }
        }
        if(flag){
            room.push(end);
        }
    }
    return room.length;
};

/*
435题无重叠区间
给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。
注意:可以认为区间的终点总是大于它的起点。区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。

输入: [ [1,2], [2,3], [3,4], [1,3] ]
输出: 1
输入: [ [1,2], [1,2], [1,2] ]
输出: 2
*/
let eraseOverlapIntervals = function(intervals) {
    if(intervals.length == 0) return 0;
   
    intervals.sort((pre,cur)=>{return pre[1] - cur[1] || pre[0] - cur[0];});
    let res = 1, pre = 0,length = intervals.length;

    for(let i = 1; i < length; i++){
        if(intervals[i][0] >= intervals[pre][1]){
            res++;
            pre = i;
        }
    }
    return length - res;
}

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
