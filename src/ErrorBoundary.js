// ErrorBoundary.js
import React, { Component } from 'react'

class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  componentDidCatch (error, errorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo
    })
    // You can also log the error to a service like Sentry
    // logErrorToMyService(error, errorInfo);
  }

  render () {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>Please Reload the browser</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
