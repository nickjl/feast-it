import React from 'react';
import { Link } from 'react-router-dom';

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
    if (currentBookmarks) {
      return currentBookmarks.map(x => {
        return (
          <div key={x.url}>
            <a href={x.url} target="_blank" rel="noopener noreferrer">
              {x.title}
            </a>
            <button type="submit" onClick={() => this.deleteBookmark(x.title, currentBookmarks)}>
              Delete
            </button>
          </div>
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

export default BookmarkList;
