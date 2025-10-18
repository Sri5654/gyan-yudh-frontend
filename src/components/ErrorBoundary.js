import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          background: '#1a1a2e', 
          color: '#fff',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1 style={{ color: '#00d2ff', marginBottom: '20px' }}>
            🎮 Gyan Yudh - Loading Error
          </h1>
          <p style={{ marginBottom: '20px' }}>
            Something went wrong while loading the app.
          </p>
          <p style={{ marginBottom: '20px', color: '#ff6b35' }}>
            Error: {this.state.error?.message}
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#00d2ff',
              color: '#000',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;