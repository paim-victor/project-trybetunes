import { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <>
      <Header />
      <div data-testid="page-profile">
        <div data-testid="page-profile-edit" />
      </div>
      </>
    );
  }
}

export default Profile;
