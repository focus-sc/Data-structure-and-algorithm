/*
  第642题 设计搜索自动补全系统
  为搜索引擎设计一个搜索自动完成系统。用户可以输入一个句子(至少一个单词，并以一个特殊的字符'#'结尾)。
  对于除'#'之外的每个字符，您需要返回与已输入的句子部分前缀相同的前3个历史热门句子。具体规则如下:
  一个句子的热度定义为用户输入完全相同句子的次数。 
  返回的前3个热门句子应该按照热门程度排序(第一个是最热的)。
  如果几个句子的热度相同，则需要使用ascii代码顺序(先显示较小的一个)。 
  如果少于3个热门句子，那么就尽可能多地返回。 
  当输入是一个特殊字符时，它意味着句子结束，在这种情况下，您需要返回一个空列表。 
*/
//使用前缀树实现自动补全系统
var Node = function(){
    this.end = false;
    this.freq = 0;
    this.sent = "";
    this.next = new Map();
};
class Dictionary{
    constructor(){
        this.root = new Node();
    }
    insert(word, freq) {
        let cur = this.root;
        for(let str of word){
            if(!cur.next.has(str)){
                cur.next.set(str, new Node());  
            }
            cur = cur.next.get(str);
        }
        cur.freq += freq;
        cur.end = true; 
        cur.sent = word;
    }
    find(prefix){
        let cur = this.root;
        let res = [];
        var match = function(node, index){
            if(index < prefix.length){
                let c = prefix.charAt(index);
                if(!node.next.has(c)) return false;
                return match(node.next.get(c), index+1);        
            }else{
                if(node.end){
                    res.push([node.sent,node.freq]);
                }
                for(let [key, value] of node.next){
                    match(node.next.get(key), index+1);
                }
            }
        }
        match(this.root, 0);
        return res;
    }
};

/**
 * @param {string[]} sentences
 * @param {number[]} times
 */
function AutocompleteSystem(sentences, times) {
    this.trie = new Dictionary();
    this.cur = "";
    this.next = true;
    for(let i = 0, len = sentences.length; i < len; i++){
        this.trie.insert(sentences[i],times[i]);
    }
};

/** 
 * @param {character} c
 * @return {string[]}
 */
AutocompleteSystem.prototype.input = function(c) {
    if(c != "#"){
        this.cur += c;
        if(!this.next){
            return [];
        }else{
            let res = this.trie.find(this.cur);
            let prompt = res.sort((pre,cur)=>(cur[1]-pre[1]) || pre[0].localeCompare(cur[0]))
                            .slice(0,3).map(value=>value[0]);
            if(prompt.length == 0){
                this.next = false;
            }
            return prompt;
        }
    }else{
        this.trie.insert(this.cur,1);
        this.cur = "";
        this.next = true;
        return [];
    }
};
