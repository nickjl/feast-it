import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AddBookmark from './scenes/AddBookmark';
import EditBookmark from './scenes/EditBookmark';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Current Bookmarks</Link>
            </li>
            <li>
              <Link to="/add">Add New Bookmark</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={EditBookmark} />
        <Route path="/add" component={AddBookmark} />
      </div>
    </Router>
  );
}

export default App;
