import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class BookmarkList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBookmarks: '',
    };

    this.deleteBookmark = this.deleteBookmark.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentBookmarks: JSON.parse(localStorage.getItem('bookmarks')),
    });
  }

  deleteBookmark(title, bookmarks) {
    const newBookmarks = bookmarks.filter(bookmark => bookmark.title !== title);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    this.setState({ currentBookmarks: newBookmarks });
  }

  render() {
    const { currentBookmarks } = this.state;
    if (currentBookmarks && currentBookmarks.length) {
      return currentBookmarks.map(x => {
        return (
          <BookmarkContainerSC key={x.url}>
            <a href={x.url} target="_blank" rel="noopener noreferrer">
              {x.title}
            </a>
            <button type="submit" onClick={() => this.deleteBookmark(x.title, currentBookmarks)}>
              Delete
            </button>
          </BookmarkContainerSC>
        );
      });
    }
    return (
      <p>
        You currently have no bookmarks. Please <Link to="/add">add</Link> a new one.
      </p>
    );
  }
}

const BookmarkContainerSC = styled.div`
  margin-top: 40px;

  a {
    margin-right: 20px;
    font-size: 20px;
    text-transform: capitalize;
  }

  button {
    padding: 5px 10px;
    font-size: 10px;
  }
`;

export default BookmarkList;
