//二叉树序列化与反序列化
var serialize = function(root) {
    let queue = [root], res = [], temp;
    while(queue.length){
        temp = queue.shift();
        if(temp){
            queue.push(temp.left);
            queue.push(temp.right);
            res.push(temp.val);
        }else{
            res.push(null);
        }
    }
    for(let i = res.length-1; i >= 0; i--){
        if(res[i]!=null){
            break;
        }else{
            res.pop();
        }
    }
    return JSON.stringify(res);
};

var deserialize = function(data) {
    let queue = JSON.parse(data);
    if(queue.length == 0) return null;
    let node = queue.shift(),
        root = new TreeNode(node),
        cur = [root],temp,level,len,index;
    while(queue.length){
        len = cur.length, index = 0;
        level = queue.splice(0,2*len);
        for(let i = 0; i < len; i++){
            if(level[index]!=null){
                temp = new TreeNode(level[index++]);
                cur[i].left = temp;
                cur.push(temp);
            }else{
                cur[i].left = null;
                index++;
            }
            if(level[index]!=null){
                temp = new TreeNode(level[index++]);
                cur[i].right = temp;
                cur.push(temp);
            }else{
                cur[i].right = null;
                index++;
            }
        }
        cur.splice(0,len);
    }
    
    return root;
};

//N叉树序列化
class Codec {
  	constructor() {
        
    }
  
    /** 
     * @param {Node} root
     * @return {string}
     */
    // Encodes a tree to a single string.
    serialize = function(root) {
    let queue = [root], res = [], temp, child;
        while(queue.length){
            temp = queue.shift();
            if(temp){
                child = temp.children.length;
                for(let i = 0; i < child; i++){
                    queue.push(temp.children[i]);
                }
                res.push([temp.val,child]);
            }
        }
        return JSON.stringify(res);
    };

    /** 
     * @param {string} data 
     * @return {Node}
     */
    // Decodes your encoded data to tree.
    deserialize = function(data) {
        let queue = JSON.parse(data);
        if(queue.length == 0) return null;
        let [node,child] = queue.shift(),
            root = new Node(node,[]),
            cur = [[root, child]],temp,level,len,index;
        while(queue.length){
            //cur:当前节点和子节点个数，level:下一层子节点，child:下一层子节点个数
            len = cur.length;
            level = queue.splice(0,child);
            child = 0, index = 0;
            for(let i = 0; i < len; i++){
                for(let j = 0; j < cur[i][1]; j++){
                    temp = new Node(level[index][0],[]);
                    child += level[index][1];
                    cur[i][0].children[j] = temp;
                    cur.push([temp,level[index][1]]);
                    index++;
                }
            }
            cur.splice(0,len);
        }
        return root;
    };

}
