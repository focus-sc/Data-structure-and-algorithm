function ListNode(val) {
    this.val = val;
    this.next = null;
}
//链表插入排序
var insertionSortList = function(head) {
    if(head == null) return head;
    var pre = new ListNode(0);
    pre.next = head;
    //temp指向当前要比较的结点 temp2指向下一个要比较的结点 max是当前尾结点
    let temp = head.next, max = head, temp2, target;
    max.next = null;
    while(temp){
        temp2 = temp.next;
        target = temp.val;
        //比新链表尾结点还大
        if(target >= max.val){
            max.next = temp;
            max = temp;
            max.next = null;
        }else{
            if(target > head.val){
                while(target > head.next.val){
                    head = head.next;
                }
                temp.next = head.next
                head.next = temp;
                head = pre.next;
            }else{ //比新链表头结点还要小
                temp.next = head;
                head = temp;
                pre.next = head;
            }
        }
        temp = temp2;
    }
    return head;
};

var sortList = function(head) {
    //归并排序函数
    const mergeSort = function(left,right){
        let pre = new ListNode(0);
        let cur = pre;
        while(left && right){
            if(left.val <= right.val){
                cur.next = left;
                left = left.next
            }else{
                cur.next = right;
                right = right.next;
            }
            cur = cur.next;
        }
        cur.next = left ? left : right;
        return pre.next;
    };
    //二分函数
    const splitList = function(head){
        //如果分不了了就返回
        if(!head || !head.next){
            return head;
        }
        //快慢指针找中点
        let slow = head, fast = head.next;
        while(fast && fast.next){
            slow = slow.next;
            fast = fast.next.next;
        }
        //右头节点 断掉中点的节点
        let rListHead = slow.next;
        slow.next = null;
        
        //继续二分
        let lList = splitList(head);
        let rList = splitList(rListHead);
        //归并
        return mergeSort(lList,rList);
    };
    
    return splitList(head);
};