import React, { ErrorInfo } from 'react';
import { Link, Redirect } from '@reach/router';

class ErrorBoundary extends React.Component {
  public state = { hasError: false, redirect: false };

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
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

  public componentDidUpdate() {
    // i do not need to use this here. componentDidCatch() would be enough
    if (this.state.hasError) {
      setTimeout(() => {
        this.setState({ redirect: true });
      }, 5000);
    }
  }

  public render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
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
