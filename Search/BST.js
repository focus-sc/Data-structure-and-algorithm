//二叉搜索树
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
//向二叉搜索树插入节点
let insertIntoBST = function(root, val) {
    if(root == null){
        return new TreeNode(val);
    }
    
    if(root.val > val){
        root.left = insertIntoBST(root.left, val);
    }else{
        root.right = insertIntoBST(root.right, val);
    }
    return root;
};
//在二叉搜索树中查找节点
let searchBST = function(root, val) {
    if(root == null) return null;
    
    if(root.val == val){
        return root;
    }else if(root.val > val){
        return searchBST(root.left, val);
    }else{
        return searchBST(root.right, val);
    }
};
//在二叉搜索树中删除节点
let deleteNode = function(root, key) {
    if(root == null) return null;
    if(root.val == key){
        if(root.right && root.left){
            let temp = root.right, parent = root, status = 0;
            while(temp.left){
                status = 1;
                parent = temp
                temp = temp.left;
            }
            temp.left = root.left;
            if(status){
                parent.left = temp.right;
                temp.right = root.right;
            }
            root = null;
            return temp;
        }else if(root.left){
            return root.left;
        }else if(root.right){
            return root.right;
        }else{
            return null;
        }
    }else if(root.val > key){
        root.left = deleteNode(root.left, key);
    }else{
        root.right = deleteNode(root.right, key);
    }
    return root;
};

//二叉搜索树的最近公共祖先
var lowestCommonAncestor = function(root, p, q) {
    if((p.val<=root.val && q.val>=root.val) || (p.val>=root.val && q.val<=root.val)){
        return root;
    }else if(p.val < root.val && q.val < root.val){
        return lowestCommonAncestor(root.left, p, q);
    }else if(p.val > root.val && q.val > root.val){
        return lowestCommonAncestor(root.right, p, q);
    }
};
