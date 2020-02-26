//扁平化多级链表
//1---2---3---4---5---6--NULL
//        |
//        7---8---9---10--NULL
//            |
//            11--12--NULL
//输出:
//1-2-3-7-8-11-12-9-10-4-5-6-NULL
function Node(val,prev,next,child) {
    this.val = val;
    this.prev = prev;
    this.next = next;
    this.child = child;
};
var flatten = function(head) {
    if(head == null) return head;
    let stack = [], temp = head, pre;
    while(temp.next != null || temp.child != null || stack.length != 0){
        if(temp.next == null && temp.child == null){
            pre = stack.pop();
            temp.next = pre;
            pre.prev = temp;
            temp = pre;
        }else if(temp.child != null){
            if(temp.next != null){
                stack.push(temp.next);
            }
            temp.next = temp.child;
            temp.child = null;
            temp.next.prev = temp;
            temp = temp.next;
        }else{
            temp = temp.next;
        }
    }
    return head;
};

//复制带随机指针的链表

function Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
};
var copyRandomList = function(head) {
    let array = [], copyArray = [], pre = new Node(0,null,null), res = pre, value, temp, copy = head, circular, index;
    while(head){
        value = head.val;
        temp = new Node(head.val,null,null);
        pre.next = temp;
        array.push(head);
        copyArray.push(temp);
        pre = pre.next;
        head = head.next;
    }
    pre = res.next;
    while(copy){
        circular = copy.random;
        if(circular !== null){
            index = 0;
            for(let i = 0, len = array.length; i < len; i++){
                if(array[i] === circular){
                    index = i;
                    break;
                }
            }
            pre.random = copyArray[index];
        }
        copy = copy.next;
        pre = pre.next;
    }
    return res.next;
};
