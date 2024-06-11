class Node{
    constructor(value,parent){
        this.value = value
        this.parent = parent || null
        this.left = null
        this.right = null
        this.color = "red"
    }
}


class Tree{
    constructor(value){
        this.root = value ? new Node(value) : null
        if(value){
            this.root.color = "black"
        }
    }
    
    insert(value){
        if(!this.root){
            this.root = new Node(value)
            return
        }
        
        let cur = this.root
        
        while(cur){
            if(cur.value > value){
                if(!cur.left){
                    cur.left = new Node(value,cur)
                    return
                }
                cur = cur.left
                
            } else {
                if(!cur.right){
                    cur.right = new Node(value,cur)
                    return
                }
                cur = cur.right
            }
        }
    }
    
    find(value){
        if(!this.root){
            return null
        }
        
        let cur = this.root
        while(cur && cur.value !== value){
            if(cur.value > value){
                       cur = cur.left
            } else {
                 cur = cur.right
            }
        }
        
        return cur
    }
    
    min(root = this.root){
        while(root.left){
            root = root.left
        }
        return root
    }
    max(root = this.root){
        while(root.right){
            root = root.right
        }
        return root
    }
    
    
    successor(value){
        const node = this.find(value)
        if(node.right){
            return this.min(node.right)
        }
        
        let succ = null
        let ancest = this.root
        
        while(ancest !== node){
            if(ancest.value > node.value ){
                 succ = ancest
                ancest = ancest.left
            } else {
               
                ancest = ancest.right
            }
        }
        
        return succ
    }
    
    transplant(u,v){
        if(u.parent === null){
            this.root = v
        } else if(u.parent.left === u){
            u.parent.left = v
        } else  {
            u.parent.right = v
        }
        
        if(v!== null){
            v.parent = u.parent
        }
    }
    
    deleteNode(value){
        const node = this.find(value)
        if(!node){
            return null
        }
        
        if(!node.right){
            this.transplant(node,node.left)
        }
        else if(!node.left){
            this.transplant(node,node.right)
        } else {
            const min = this.min(node.right)
            if(min.parent !== node){
                this.transplant(min,min.right)
                min.right = node.right
                node.right.parent = min
            }
            this.transplant(node,min)
            min.left = node.left
            node.left.parent = min
        }
    }
    
    
    RBInsert(value){
        if(!this.root){
            this.root = new Node(value)
            this.root.color = "black"
            return
        }
        
        let cur = this.root
        
        while(cur){
            if(cur.value > value){
                if(!cur.left){
                    cur.left = new Node(value,cur)
                      this.RBFixup(cur.left)
                    return
                }
                cur = cur.left
                
            } else {
                if(!cur.right){
                    cur.right = new Node(value,cur)
                     this.RBFixup(cur.right)
                    return
                }
                cur = cur.right
            }
        }
    }
    
    RBFixup(node){
        while(node.parent && node.parent.color === "red"){
            if(node.parent === node.parent.parent.left){
                let y = node.parent.parent.right
                if(y && y.color === "red"){
                    node.parent.color = 'black'
                    y.color = 'black'
                    node.parent.parent.color = 'red'
                    node = node.parent.parent
                } else {
                    if(node === node.parent.right){
                    node = node.parent
                    this.leftRotate(node)
                    }
                    node.parent.color = 'black'
                    node.parent.parent.color = 'red'
                    this.rightRotate(node.parent.parent)
                }
            } else {
                let y = node.parent.parent.left
                if(y && y.color === "red"){
                    node.parent.color = 'black'
                    y.color = 'black'
                    node.parent.parent.color = 'red'
                    node = node.parent.parent
                } else {
                    if(node === node.parent.left){
                        node = node.parent
                        this.rightRotate(node)
                    }
                    node.parent.color = 'black'
                    node.parent.parent.color = 'red'
                    this.leftRotate(node.parent.parent)
                }
            }
        }
        this.root.color = 'black'
    }


	    RBDelete(value){
        const node = this.find(value)
        if(!node){return null}
        let x;
        let y = node
        const originalColor = node.color
        if(!node.left){
            x = node.right
            this.transplant(node,node.right)
            
        } else if(!node.right){
                 x = node.left
            this.transplant(node,node.left)
        } else {
            const minNode = this.minimum(node.right)
            originalColor = minNode.color
            x = minNode.right
            
            if(minNode.parent !== node){
                this.transplant(minNode,minNode.right)
                  minNode.right = node.right
                node.right.parent = minNode
            } else {
                x.parent = minNode
            }
            this.transplant(node,minNode)
            minNode.left = node.left
            node.left.parent =minNode
            minNode.color = node.color
        }
        if(originalColor === "black"){
            this.RBDeleteFixup(x)
        }
    }
    
    RBDeleteFixup(node){
        while(node.color === "black" && node.parent !== this.root){
            if(node.parent.left === node){
                let uncle = node.parent.right
                if(uncle.color === "red"){
                    uncle.color = "black"
                    node.parent.color="red"
                    this.leftRotate(node.parent)
                    uncle = node.parent.right
                }
                
                if(uncle.left.color === "black" && uncle.right.color==="black"){
                    uncle.color = "red"
                    node = node.parent
                } 
                else {
                if(uncle.right.color ==="black"){
                    uncle.left.color = "black"
                    uncle.color="red"
                    this.rightRotate(uncle)
                    uncle = node.parent.right
                }
                    uncle.color = node.parent.color
                    node.parent.color = 'black'
                    uncle.right.color = "black"
                    this.leftRotate(node.parent)
                    node = this.root
                    
                }
                
            } else {
                  let uncle = node.parent.left
                  if(uncle.color === 'red'){
                      uncle.color = 'black'
                      node.parent.color = 'red'
                      this.rightRotate(node.parent)
                      uncle = node.parent.left
                  }
                if(uncle.left.color === "black" && uncle.right.color==="black"){
                    uncle.color = "red"
                    node = node.parent
                }        else {
                if(uncle.left.color ==="black"){
                    uncle.right.color = "black"
                    uncle.color="red"
                    this.leftRotate(uncle)
                    uncle = node.parent.left
                }
                    uncle.color = node.parent.color
                    node.parent.color = 'black'
                    uncle.left.color = "black"
                    this.rightRotate(node.parent)
                    node = this.root
                    
                }
            }
            
            node.color = "black"
        }
    }
    
    
    leftRotate(node){
        let y= node.right
        node.right  = y.left
        if(y.left !== null){
            y.left.parent = node
        }
        y.parent = node.parent
        if(!node.parent){
            this.root = y
        } else if( node === node.parent.left){
            node.parent.left = y
        } else {
            node.parent.right = y
        }
        y.left = node
        node.parent = y
    }
    
    rightRotate(node){
        let y = node.left
        node.left = y.right
        if(y.right !== null){
            y.right.parent = node
        }
        y.parent = node.parent
        if(!node.parent){
            this.root = y
        } else if(node.parent.left === node){
            node.parent.left = y
        } else {
             node.parent.right = y
        }
        y.right = node
         node.parent = y

    }
    
}
