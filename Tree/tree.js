function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
/*
 * 236题 二叉树的最近公共祖先   
 *
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

let lowestCommonAncestor = function(root, p, q) {
    if(root == null) return null;
    if(root == p || root == q){
        return root;
    }
    let left = lowestCommonAncestor(root.left,p,q),
        right = lowestCommonAncestor(root.right,p,q);
    if(left !== null && right != null){
        return root;
    }
    return left ? left : right;
};

/*
 * 1110题 删点成林
 *
 * @param {TreeNode} root
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
let delNodes = function(root, to_delete) {
    let del = new Set(to_delete), res = [];
    let help = function(root,node){
        if(node == null) return null;
        if(del.has(node.val)){
            if(node.left){
                help(node.left, node.left);
            }
            if(node.right){
                help(node.right, node.right);
            }
            return null;
        }else{
            node.left = help(root, node.left);
            node.right = help(root, node.right);
            if(root == node && root != null){
                res.push(root); 
            }
            return node;
        }
    }
    help(root,root);
    return res;
};
