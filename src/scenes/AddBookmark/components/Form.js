import React from 'react';
import styled from 'styled-components';

const urlRegex = require('url-regex');

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.validateForm = this.validateForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      title: '',
      url: '',
      invalidTitle: false,
      invalidUrl: false,
      success: false,
    };
  }

  validateForm(e) {
    e.preventDefault();
    const { title, url } = this.state;
    this.setState({ invalidTitle: false, invalidUrl: false });

    if (!title || title.length < 3) {
      this.setState({ invalidTitle: true });
    } else if (!url || !urlRegex({ exact: true }).test(url)) {
      this.setState({ invalidUrl: true });
    } else {
      this.handleFormSubmit();
    }
  }

  handleFormSubmit() {
    let newBookmarks = [];
    const { title, url } = this.state;
    const currentBookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // if I had more time I would validate here that the bookmark being
    // added hasn't already been added

    if (currentBookmarks) {
      newBookmarks = newBookmarks.concat(currentBookmarks);
    }
    newBookmarks.push({ title, url });
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    this.setState({ title: '', url: '', success: true });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value, success: false });

    // I probably wouldnt change success to false in here but time limited.
  }

  render() {
    const { url, title, invalidTitle, invalidUrl, success } = this.state;

    // I would split the below into reusable shared components (input & button)
    return (
      <React.Fragment>
        <BookmarkFormSC onSubmit={this.validateForm}>
          <label htmlFor="title">
            Enter site title
            <input
              value={title}
              onChange={this.handleChange}
              id="title"
              name="title"
              type="text"
              placeholder="Google"
            />
          </label>
          {invalidTitle && <p>Please enter a title (min. 3 character)</p>}
          <label htmlFor="url">
            Enter site url
            <input
              value={url}
              onChange={this.handleChange}
              id="url"
              name="url"
              type="text"
              placeholder="www.google.com"
            />
          </label>
          {invalidUrl && <p>Please enter valid Url</p>}
          <button type="submit">Add</button>
        </BookmarkFormSC>
        {success && (
          <BookmarkSuccessSC>
            <p>Bookmark has been added</p>
          </BookmarkSuccessSC>
        )}
      </React.Fragment>
    );
  }
}

const BookmarkFormSC = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    font-size: 14px;
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 40px;
    }
  }

  button {
    width: 250px;
    font-size: 16px;
    padding: 10px 25px;
  }

  input {
    margin-left: 20px;
    font-size: 12px;

    :focus {
      outline: none;
    }
  }

  p {
    font-size: 12px;
    letter-spacing: 0.3px;
    line-height: 16px;
    color: red;
    margin: 0 0 20px;
  }
`;

const BookmarkSuccessSC = styled.div`
  color: green;
`;

export default Form;
