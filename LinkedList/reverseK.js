//反转链表与K个一组反转链表
//链表
function ListNode(val) {
    this.val = val;
    this.next = null;
}
//反转链表
let reverse = function(head){
    let preHead = new ListNode(0), temp;
    while(head){
        temp = head.next;
        head.next = preHead.next;
        preHead.next = head;
        head = temp;
    }
    return preHead.next;
};
//K个一组反转链表 1->2->3->4->5   k=3=>  3->2->1->4->5
var reverseKGroup = function(head, k) {
    if(k == 1) return head;
    let len = k, preHead = new ListNode(0), begin = head, end, adj = preHead;
    preHead.next = head;
    
    while(head){
        if(head.next == null && len != 1){
            adj.next = begin;
        }
        if(len == 1){
            //切断尾结点
            end = head;
            head = head.next;
            end.next = null;
            //反转k个链表
            adj.next = reverse(begin);
            //链接点为当前的尾结点(原来的开始结点)
            adj = begin;
            begin = head;
            len = k;
        }else{
            head = head.next;
            len--;
        }
    }
    return preHead.next;
};
