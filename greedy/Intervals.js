//贪心算法解决区间类问题

/*
253 题会议室 II
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
435 题无重叠区间
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
630 题课程表 III
这里有 n 门不同的在线课程，他们按从 1 到 n 编号。每一门课程有一定的持续上课时间（课程时间）t 以及关闭时间第 d 天。
一门课要持续学习 t 天直到第 d 天时要完成，你将会从第 1 天开始。
给出 n 个在线课程用 (t, d) 对表示。你的任务是找出最多可以修几门课。
输入: [[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]
输出: 3
输入: [[100, 200], [200, 1300], [200, 1300], [1000, 1250], [2000, 3200]]
输出: 4
*/
let scheduleCourse = function(courses) {
    courses.sort((pre,cur)=>pre[1]-cur[1] || pre[0]- cur[0]);
    let start = 0, queue = [];
    for(let item of courses){
        if(start+ item[0] <= item[1]){
            start += item[0];
            queue.push(item[0]);
        }else if(queue.length && queue[0] > item[0]){
            start += item[0] - queue.shift();
            queue.push(item[0]);
        }
        //优先队列保证最多修课
        if(queue.length >= 2){
            let index = queue.indexOf(Math.max(...queue));
            [queue[0], queue[index]] = [queue[index], queue[0]];
        }
    }
    return queue.length;
};

/*
757题 设置交集大小至少为2
一个整数区间 [a, b]  ( a < b ) 代表着从 a 到 b 的所有连续整数，包括 a 和 b。
给你一组整数区间intervals，请找到一个最小的集合 S，使得 S 里的元素与区间intervals中的每一个整数区间都至少有2个元素相交。
输出这个最小集合S的大小。
输入: intervals = [[1, 3], [1, 4], [2, 5], [3, 5]]
输出: 3
输入: intervals = [[1, 2], [2, 3], [2, 4], [4, 5]]
输出: 5
*/
let intersectionSizeTwo = function(intervals) {
    if(!intervals.length) return 0;
    intervals.sort((pre,cur)=>pre[1]-cur[1] || cur[0]-pre[0]);
    let count = [], length = intervals.length;
    count.push(intervals[0][1]-1,intervals[0][1]);
    for(let i = 0; i < length; i++){
        let pre = count[count.length-2], cur = count[count.length-1];
        //整数区间开始值比集合最大的数还要大，则添加新的两个最大数, 只大于最大数则加一个数，否则不加新数，
        if(intervals[i][0] > cur){
            count.push(intervals[i][1]-1, intervals[i][1]);
        }else if(intervals[i][0]<=cur && intervals[i][0] > pre){
            count.push(intervals[i][1]);
        }
    }
    return count.length;
};

/*
759题 员工空闲时间
给定员工的 schedule 列表，表示每个员工的工作时间。
每个员工都有一个非重叠的时间段  Intervals 列表，这些时间段已经排好序。
返回表示 所有 员工的 共同，正数长度的空闲时间 的有限时间段的列表，同样需要排好序。
输入：schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
输出：[[3,4]]
输入：schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]
输出：[[5,6],[7,9]]
*/
/**
 * // Definition for an Interval.
 * function Interval(start, end) {
 *    this.start = start;
 *    this.end = end;
 * };
 */
/**
 * @param {Interval[][]} schedule
 * @return {Interval[]}
 */
let employeeFreeTime = function(schedule) {
    let time = [], rest = [];
    //数据预处理，使问题数据可排序
    for(let i = 0, len = schedule.length; i < len; i++){
        for(let j = 0; j < schedule[i].length; j++){
            let {start, end} = schedule[i][j];
            time.push([start,end]);
        }
    }
    time.sort((pre,cur)=>pre[0]-cur[0]||pre[1]-cur[1]);
    task = [[time[0][0],time[0][1]]], top = 0;
    for(let i = 1, len = time.length; i < len; i++){
        if(time[i][0]<=task[top][1]){
            task[top][1] = Math.max(task[top][1],time[i][1]);
        }else{
            task.push([time[i][0],time[i][1]]);
            top++;
        }
    }
    //空闲时间为非空闲时间的间歇
    for(let i = 0, len = task.length; i < len-1; i++){
        let [start, end] = [task[i][1], task[i+1][0]];
        let temp = new Interval(start,end);
        rest.push(temp);
    }

    return rest;
};

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
