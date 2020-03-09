//从前序与中序遍历序列构造二叉树
let buildTree = function(preorder, inorder) {
    let pre_index = 0;
    var help = function(inLeft, inRight){
        if(inLeft==inRight){
            return null;
        }
        let target = preorder[pre_index++],
            index = inorder.indexOf(target),
            node = new TreeNode(target);
        node.left = help(inLeft, index);
        node.right = help(index+1, inRight);
        return node;
    }
    return help(0, preorder.length);
};

//从中序与后序遍历序列构造二叉树
let buildTree2 = function(inorder, postorder) {
    let post_index = postorder.length-1;
    var help = function(inLeft, inRight){
        if(inLeft == inRight){
            return null;
        }
        let target = postorder[post_index--],
            index = inorder.indexOf(target),
            node = new TreeNode(target);
        node.right = help(index+1, inRight);
        node.left = help(inLeft, index);
        return node;
    }
    return help(0,inorder.length);
};
