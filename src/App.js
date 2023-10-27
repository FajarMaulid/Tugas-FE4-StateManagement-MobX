import React from 'react';
import './App.css';
import { observable, action, makeObservable, computed, autorun } from 'mobx';
import { observer } from 'mobx-react';

class Store {
  greenClicked = false;
  blueColor = 'blue';

  constructor() {
    makeObservable(this, {
      greenClicked: observable,
      blueColor: observable,
      changeBlueColor: action,
      resetBlue: action,
      blueStatus: computed,
    });

    autorun(() => {
      if (this.greenClicked) {
        this.changeBlueColor('red');
      }
    });
  }

  changeBlueColor(color) {
    this.blueColor = color;
  }

  resetBlue() {
    this.blueColor = 'blue';
    this.greenClicked = false;
  }

  get blueStatus() {
    return this.blueColor === 'red';
  }
}

const store = new Store();

const App = observer(() => {
  const handleGreenClick = () => {
    store.greenClicked = true;
  };

  const handleBlueClick = () => {
    if (store.blueStatus) {
      store.resetBlue();
    }
  };

  return (
    <div className="App">
      <div
        className={`box green`}
        onClick={handleGreenClick}
      >
        Green
      </div>
      <div
        className={`box ${store.blueStatus ? 'red' : 'blue'}`}
        onClick={handleBlueClick}
      >
        Blue
      </div>
    </div>
  );
});

export default App;