// client/src/App.jsx
import React from 'react';
import SearchData from './components/SearchData';
import Search from './components/Search';
import Apps from './components/SearchData';
import SearchStudent from './components/SearchStudent';
import './App.css';

const App = () => {
  return (
    <div className="app">
      
      {/* <SearchBar />  */}
      {/* <SearchData/> */}
      {/* <Search/>  */}
      <SearchStudent/>
     
    </div>
  );
};

export default App;
