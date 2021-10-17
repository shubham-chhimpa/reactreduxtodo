// Author : Shubham Chhimpa

/** Class representing a TrieNode. */
class TrieNode {
  /**
   * Create a TrieNode.
   * This Trie supports only lowercase english letters
   */
  constructor() {
    this.children = new Array(26);
    for (let i = 0; i < 26; i++) {
      this.children[i] = null;
    }
    this.isEnd = false;
  }
}

/** Class representing a Trie. */
class Trie {
  /**
   * Create a Trie.
   */
  constructor() {
    //initializing root node
    this.root = new TrieNode();
  }

  /**
   * Add a keyword into the trie.
   * @param {string} word - The keyword to be inserted.
   */
  insert(word) {
    // converting the word to lowercase english letter
    // since this trie class support only lowercase english letters
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


  /**
   * Search all keywords that matches the given keyword.
   * @param {string} word - The keyword for matching.
   * @return {Array} suggestions - Array of all the matching keywords
   */
  search(word) {
    // converting the word to lowercase english letter
    // since this trie class support only lowercase english letters
    word = word.toLowerCase();
    let curr = this.root;
    let wordLen = word.length;
    let suggestions = [];
    if (word.length === 0) return suggestions;
    for (let i = 0; i < wordLen; i++) {
      let index = parseInt(word.charCodeAt(i)) - parseInt("a".charCodeAt(0));
      if (curr.children[index] !== null) {
        curr = curr.children[index];
      } else {
        if (i !== 0) {
          return this.search(word.slice(0, i));
        }
        return suggestions;
      }
    }

    this._searchRecursive(curr, suggestions, word);
    return suggestions;
  }


  /**
   * Recursive helper function for search function.
   * @param {TrieNode} curr - Trie node to be processed
   * @param {Array} suggestions - Array of all the matching keywords
   * @param {string} word - The prefix for matching.
   */
  _searchRecursive(curr, suggestions, word) {
    if (curr === null) {
      return;
    }

    if (curr.isEnd) {
      suggestions.push(word);
    }

    let children = curr.children;

    for (let i = 0; i < children.length; i++) {
      this._searchRecursive(
        children[i],
        suggestions,
        word + String.fromCharCode(i + parseInt("a".charCodeAt(0)))
      );
    }
  }
}

export default Trie;
