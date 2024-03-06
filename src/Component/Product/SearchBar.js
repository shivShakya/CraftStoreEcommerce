import React, { useState, useEffect , useRef } from 'react';

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(word) {
    let current = this.root;
    for (let char of word) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    current.isEndOfWord = true;
  }

  search(prefix) {
    let current = this.root;
    for (let char of prefix) {
      if (!current.children[char]) {
        return [];
      }
      current = current.children[char];
    }
    return this._getAllWordsFromNode(current, prefix);
  }

  _getAllWordsFromNode(node, prefix) {
    let results = [];
    if (node.isEndOfWord) {
      results.push(prefix);
    }
    for (let char in node.children) {
      results = results.concat(this._getAllWordsFromNode(node.children[char], prefix + char));
    }
    return results;
  }
}




function SearchBar({ handleSearch }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const trie = useRef(new Trie());
  const URL = process.env.REACT_APP_API_KEY; 



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const names = data.map(product => product.name.toLowerCase());
        names.forEach(name => trie.current.insert(name));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const value = input.trim().toLowerCase();
      if (value === '') {
        setSuggestions([]);
        return;
      }
      const suggestionsLowerCase = trie.current.search(value).slice(0, 5);
      const suggestionsUpperCase = trie.current.search(value.toUpperCase()).slice(0, 5);
      const combinedSuggestions = [...new Set([...suggestionsLowerCase, ...suggestionsUpperCase])];
      setSuggestions(combinedSuggestions);
    }
  }, [input, loading]);

  const handleChange = (e) => {
    handleSearch(e);
    setInput(e.target.value);
  };


  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        suggestions.length > 1 ? (
          <ul className='bg-themeColor fixed top-32 p-2'>
            {suggestions.map((suggestion, index) => (
              <li onClick={() => handleSuggestionClick(suggestion)} className="text-white text-left hover:bg-white hover:text-black" key={index}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <div></div>
        )
      )}
      <input type="text" className="search-product-box" value={input} onChange={handleChange} placeholder="Search..." />
    </div>
  );
  
}

export default SearchBar;
