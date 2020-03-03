//实现平衡二叉树
(function(){
    //平衡二叉树节点
    function Node(key,value=0){
        this.key = key;
        this.val = value;
        this.height = 1;
        this.left = this.right = null;
    }
    class AVL{
        constructor(){
            this.root = null;
            this.size = 0;
        }
        isEmpty(){
            return this.size === 0;
        }
        getSize(){
            return this.size;
        }
        getHeight(node){
            if(node == null) return 0;
            return node.height;
        }
        updateHeight(node){
            return 1 + Math.max(this.getHeight(node.left),this.getHeight(node.right));
        }
        getBalanceFactor(node){
            if(node == null) return 0;
            return this.getHeight(node.left) - this.getHeight(node.right);
        }
        //RR
        rightRotate(y){
            let x = y.left;
            [x.right,y.left] = [y,x.right];
            y.height = this.updateHeight(y);
            x.height = this.updateHeight(x);
            return x;
        }
        //LL
        leftRotate(y){
            let x = y.right;
            [x.left, y.right] = [y, x.left];
            y.height = this.updateHeight(y);
            x.height = this.updateHeight(x);
            return x;
        }
        avl(node){
            node.height = this.updateHeight(node);

            let balance = this.getBalanceFactor(node);

            if(balance>1 && this.getBalanceFactor(node.left)>=0){   //LL
                return this.rightRotate(node);
            }else if(balance<-1 && this.getBalanceFactor(node.right)<=0){ //RR
                return this.leftRotate(node);
            }else if(balance>1 && this.getBalanceFactor(node.left)<0){ //LR
                node.left = this.leftRotate(node.left);
                return this.rightRotate(node);   
            }else if(balance<-1 && this.getBalanceFactor(node.right)>0){ //RL
                node.right = this.rightRotate(node.right);
                return this.leftRotate(node); 
            }

            return node;
        }
        add (key, value = 0){
            this.root = this.insert(this.root, key, value);
        }
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
            return this.avl(node);
        }
        delete(key,root=this.root){
            if(root == null) return null;
            let ret;
            if(root.key == key){
                this.size--;
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
                    ret = temp;
                }else if(root.left){
                    ret = root.left;
                }else if(root.right){
                    ret = root.right;
                }else{
                    return null;
                }
            }else if(root.key > key){
                root.left = this.delete(key, root.left);
                ret = root;
            }else{
                root.right = this.delete(key, root.right);
                ret = root;
            }
            console.log(ret.key)
            return this.avl(ret);
        };
    };
})();
