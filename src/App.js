import React, { Component } from 'react';
import { default as localforage } from 'localforage';

class App extends Component {
  constructor(props) {
    super(props);

    this.p = null;
    this.img = null;

    this.state = {
      value: ''
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.retrieveCatImage = this.retrieveCatImage.bind(this);
    this.storeCatImage = this.storeCatImage.bind(this);
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label>Favorite Color</label>
          <input onChange={ this.handleChange } type='text' />
          <input type='submit' />
        </form>
        <button onClick={ this.handleOnClick }>Retrieve data</button>
        <button onClick={ this.storeCatImage }>store cat image</button>
        <button onClick={ this.retrieveCatImage }>Retrieve cat image</button>
        <p ref={ elem => this.p = elem }></p>
        <img ref={ elem => this.img = elem } />
      </div>
    );
  }

  handleChange (e) {
    this.setState({value: e.target.value});
  }

  handleOnClick () {
      localforage.getItem('somekey').then(value => {
        // This code runs once the value has been loaded from the offline store.
        this.p.innerText = value;
    }).catch(err => {
        // This code runs if there were any errors
        console.log(err);
    });
  }

  handleSubmit (e) {
    e.preventDefault();

    localforage.setItem('somekey', this.state.value).then(value => {
        // Do other things once the value has been saved.
    }).catch(err => {
        // This code runs if there were any errors
        console.log(err);
    });
  }

  storeCatImage () {
    fetch('http://localhost:5000/cat.png').then(response => {
      response.blob().then(image => {
        localforage.setItem('photo', image).then(value => {
           // Do other things once the value has been saved.
        });
      });
    });
  }

  retrieveCatImage () {
      localforage.getItem('photo').then(value => {
        // This code runs once the value has been loaded from the offline store.
        var blob = new Blob([value]);
        var imageURI = window.URL.createObjectURL(blob);
        // this.img.src = imageURI;
        document.querySelector('img').src = imageURI;
    }).catch(err => {
        // This code runs if there were any errors
        console.log(err);
    });
  }

}

export default App;
