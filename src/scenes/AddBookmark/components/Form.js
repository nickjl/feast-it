import React from 'react';

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
    this.setState({ title: '', url: '' });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { url, title, invalidTitle, invalidUrl } = this.state;

    return (
      <form onSubmit={this.validateForm}>
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
      </form>
    );
  }
}

export default Form;
