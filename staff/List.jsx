import React from 'react';
import ListItem from './ListItem';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.generate();
  }

  generate() {
    const list = [];

    for (let i = 0; i < 10; i += 1) {
      list.push({
        id: i,
        value: i * 100,
      });
    }
    this.setState({ list });
  }

  regenerate = () => {
    this.setState({
      list: [{ id: 1, value: 100 }],
    });
  };

  render() {
    const { list } = this.state;

    return (
      <div>
        <button onClick={this.regenerate}>regenerate</button>
        <ul>{list.map(item => <ListItem key={item.id} item={item} />)}</ul>
      </div>
    );
  }
}
