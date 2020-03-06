//二叉树的遍历
//前序遍历
let preorderTraversal = function(root) {
    let stack = [], res = [];
    while(stack.length || root){
        if(root){
            res.push(root.val);
            stack.push(root);
            root = root.left;
        }else{
            root = stack.pop();
            root = root.right;
        }
    }
    return res;
};

//中序遍历
let inorderTraversal = function(root) {
    let tree = [], stack = [], top = 0, temp;
    stack.push(root);
    while(top!=-1){
        while(stack[top]){
            stack.push(stack[top].left);
            top++;
        }
        stack.pop();
        top--;
        if(top!=-1){
            temp = stack.pop();
            tree.push(temp.val);
            stack.push(temp.right);
        }
    }
    return tree;
};

//后序遍历
let postorderTraversal = function(root) {
    let res = [], stack = [root], r = null, top = 0;
    while(top!=-1){
        while(stack[top]){
            stack.push(stack[top++].left);
        }
        stack.pop();
        top--;
        if(top!=-1){
            if(stack[top].right && stack[top].right != r){
                stack.push(stack[top++].right);
            }else{
                r = stack.pop();
                res.push(r.val);
                stack.push(null);
            }
        }
    }
    return res;
};

//层次遍历
let levelOrder = function(root) {
    let queue = [], res = [], temp, node, level, cur_level = 1;
    if(root){
        queue.push([root,1]);
    }
    while(queue.length){
        temp = [];
        while(queue.length && queue[0][1] == cur_level){
            [node, level] = queue.shift();
            if(node.left){
                queue.push([node.left,level+1]);
            }
            if(node.right){
                queue.push([node.right,level+1]);
            }
            temp.push(node.val);
        }
        cur_level++;
        res.push(temp);
    }
    return res;
};
