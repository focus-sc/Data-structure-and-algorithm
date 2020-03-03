//实现基本红黑树，添加节点与查找节点
(function(window){   
    const RED = true;
    const BLACK = false;
    
    //红黑树节点 默认为红节点
    function Node(key,value=0){
        this.key = key;
        this.val = value;
        this.left = this.right = null;
        this.color = RED;
    }

    class RBTree{
        constructor(){
            this.root = null;
            this.size = 0;
        }
        //共有方法，向红黑树添加节点，并保持根节点为黑色
        add (key, value = 0){
            this.root = this.insert(this.root, key, value);
            this.root.color = BLACK;
        }
        /*
             node(黑/红)                    X(黑/红)
                /   \          左旋转       /     \
              T1     X(红)      ===>     node(红) T3
                    /  \                 /  \
                   T2  T3               T1   T2
                   
                 node(黑)                      X(红)
                 /   \       右旋转            /  \
                X(红) T2      ===>          Y(黑) node(黑)
               /   \                              / \
              Y(红) T1                           T1  T2
        */
        //私有方法左旋转
        leftRotate(node){
            let x = node.right;
            [node.right, x.left]  =  [x.left,node];
            [x.color, node.color]= [node.color, RED];
            return x;
        }
        //私有方法右旋转
        rightRotate(node){
            let x = node.left;
            [node.left, x.right] = [x.right,node];
            [x.color, node.color] = [node.color, RED];
            return x;
        }
        //私有方法变换颜色
        flipColor(node){
            node.color = RED;
            node.left.color = node.right.color = BLACK;
        }
        //私有方法判断颜色是否为红色
        isRed(node){
            if(node == null) return BLACK;
            return node.color === RED;
        }
        //私有方法向红黑树中添加节点
        insert(node, key, value){
            
            if(node == null){
                this.size++;
                return new Node(key, value);
            }
            if(node.key > key){
                node.left = this.insert(node.left,key, value);
            }else if(node.key < key){
                node.right = this.insert(node.right,key, value);
            }else{
                node.val = value;
            }
            
            //判断当前节点是否满足红黑树的规则
            if(isRed(node.right) && !isRed(node.left)){
                node = this.leftRotate(node);
            }
            if(isRed(node.left) && isRed(node.left.left)){
                node = this.rightRotate(node);
            }
            if(isRed(node.right) && isRed(node.left)){
                this.flipColor(node);
            }
            return node;
        }
        
        //共有与私有方法查找节点
        search(key){
            return this.searchRBT(this.root, key);
        }
        searchRBT(node, key){
            if(node == null){
                return null;  
            }
            if(node.key == key){
                return node.val;
            }else if(node.key > key){
                return this.searchRBT(node.left, key);
            }else{
                return this.searchRBT(node.right, key);
            }
        }
    }
    
    window.RBTree = RBTree;
})(this);

