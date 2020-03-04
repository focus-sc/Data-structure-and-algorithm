//实现线段树(默认进行加法运算)
(function(window){
    function child(index, r, l){
        let leftChild = 2 * index + 1,
            rightChild = 2 * index + 2,
            mid = Math.floor((r + l) / 2);
        return [leftChild,rightChild,mid];
    };
    class Tree{
        //初始化线段树
        constructor(nums){
            this.segmentTree = [];
            this.len = nums.length;
            this.data = nums;
            let self = this;
            let buildSegmentTree = function(treeIndex, l, r){
                if(l == r){
                    self.segmentTree[treeIndex] = nums[l];
                    return;  
                }
                let [leftChild,rightChild,mid] = child(treeIndex, r, l);
                buildSegmentTree(leftChild, l, mid);
                buildSegmentTree(rightChild, mid+1, r);
                self.segmentTree[treeIndex] = self.segmentTree[leftChild] + self.segmentTree[rightChild];
            }
            if(self.len != 0){
               buildSegmentTree(0, 0, self.len -1); 
            }
        }
        //更新线段树
        update(i, val) {
            let origin = this.data[i];
            let self = this;
            this.data[i] = val;
            let updateVal = function(treeIndex, l, r){
                self.segmentTree[treeIndex] = self.segmentTree[treeIndex] - origin + val;
                if(l == r) return;
                let [leftChild,rightChild,mid] = child(treeIndex, r, l);
                if(i <= mid){
                    updateVal(leftChild, l, mid);
                }else{
                    updateVal(rightChild, mid+1, r);
                }
            }
            if(i >= 0 && i < this.len){
                updateVal(0,0,this.len-1);
            } 
        }
        //计算线段树
        cal (i, j) {
            if(i > j) return 0;
            let self = this;
            let queryL = i < 0 ? 0 : i,
                queryR = j > self.len - 1 ? self.len - 1 : j;
            let query = function(treeIndex, l, r, queryL, queryR){
                if(l == queryL && r == queryR){
                    return self.segmentTree[treeIndex];
                }
                let [leftChild,rightChild,mid] = child(treeIndex, r, l);
                if(queryL > mid){
                    return query(rightChild, mid+1, r, queryL, queryR);
                }else if(queryR <= mid){
                    return query(leftChild, l, mid, queryL, queryR);
                }else{
                    return query(leftChild,l,mid,queryL,mid) + query(rightChild,mid+1,r,mid+1,queryR);
                }
            }
            return query(0,0,self.len-1,queryL,queryR);
        }
    }
    
    window.segmentTree = Tree;
})(this);
