import React from 'react';
import { Link, Redirect } from '@reach/router';

class ErrorBoundary extends React.Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error Boundary caught an error', error, info);

    /*
      if (this.state.hasError) {
        setTimeout(() => {
          this.setState({ redirect: true });
        }, 5000);
      }
    */

    /*
      * i can use navigate method from reach-router also
      if (this.state.hasError) {
        setTimeout(() => {
          navigate('/');
        }, 5000);
      }
    */
  }

  componentDidUpdate() {
    // i do not need to use this here. componentDidCatch() would be enough
    if (this.state.hasError) {
      setTimeout(() => {
        this.setState({ redirect: true });
      }, 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' noThrow />;
    }

    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing. <Link to='/'>Click here</Link>{' '}
          to back to the home page or wait five seconds.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
