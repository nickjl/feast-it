import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import AddBookmark from './scenes/AddBookmark';
import EditBookmark from './scenes/EditBookmark';

function App() {
  return (
    <Router>
      <AppStylingSC>
        <NavigationSC>
          <ul>
            <li>
              <Link to="/">Current Bookmarks</Link>
            </li>
            <li>
              <Link to="/add">Add New Bookmark</Link>
            </li>
          </ul>
        </NavigationSC>

        <Route path="/" exact component={EditBookmark} />
        <Route path="/add" component={AddBookmark} />
      </AppStylingSC>
    </Router>
  );
}

const NavigationSC = styled.nav`
  ul {
    display: flex;
    justify-content: center;
    margin: 0 0 50px;
    padding: 20px 0;
    border-bottom: 1px solid grey;
    list-style-type: none;

    li {
      padding: 0 10px;

      a {
        color: grey;
        text-decoration: none;
        border-bottom: 1px solid grey;
      }
    }
  }
`;

const AppStylingSC = styled.div`
  text-align: center;
  font-size: 18px;
  letter-spacing: 0.45px;
  line-height: 22px;
  font-family: Helvetica;

  h2 {
    font-size: 28px;
  }

  a {
    color: grey;
    text-decoration: none;
    border-bottom: 1px solid grey;
  }

  button {
    border-radius: 0;
    background: #f2f2f2;
    border: 1px solid #1a1a1a;
    font-weight: bold;
    text-transform: uppercase;

    :focus {
      outline: none;
    }
  }
`;

export default App;
