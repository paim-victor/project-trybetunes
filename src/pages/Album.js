import { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <>
      <Header />
      <div data-testid="page-album">
      </div>
      </>
    );
  }
}

export default Album;
