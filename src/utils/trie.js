class TrieNode {
  constructor() {
    this.children = new Array(26);
    for (let i = 0; i < 26; i++) {
      this.children[i] = null;
    }
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    word = word.toLowerCase();    
    let curr = this.root;
    let wordLen = word.length;
    for (let i = 0; i < wordLen; i++) {
      let index = parseInt(word.charCodeAt(i)) - parseInt("a".charCodeAt(0));
      if (curr.children[index] === null) {
        curr.children[index] = new TrieNode();
      }

      curr = curr.children[index];
    }

    curr.isEnd = true;
  }

  search(word) {
    word = word.toLowerCase();    
    let curr = this.root;
    let wordLen = word.length;
    let suggestions = [];
    if (word.length ===0) return suggestions;
    for (let i = 0; i < wordLen; i++) {
      let index = parseInt(word.charCodeAt(i)) - parseInt('a'.charCodeAt(0));
      if (curr.children[index] !== null) {
        curr = curr.children[index];
      } else {
          if(i!==0){
            return this.search(word.slice(0,i));
          }
          return suggestions;
      }
    }

    this.searchRecursive(curr,suggestions,word)
    return suggestions;

  }

  searchRecursive(curr,suggestions,word){
    if(curr === null){
        return;
    }

    if(curr.isEnd){
        suggestions.push(word);
    }

    let children = curr.children;

    for(let i =0;i<children.length;i++){
        this.searchRecursive(children[i],suggestions,word+String.fromCharCode(i+parseInt('a'.charCodeAt(0))));
    }
  }
}

export default Trie;
