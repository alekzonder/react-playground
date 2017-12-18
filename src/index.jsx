import React from 'react';
import ReactDOM from 'react-dom';

import AddForm from './AddForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'test',
    };
  }

  onChangeText = (text) => {
    this.setState({ text });
  };

  render() {
    return (
      <div>
        <AddForm value={this.state.text} onChangeValue={this.onChangeText} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
