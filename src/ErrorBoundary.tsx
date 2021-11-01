// Reference: https://reactjs.org/docs/error-boundaries.html

import React, { ErrorInfo, ReactNode, Component } from 'react';

import { sendReport } from 'services/system';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

const initialState: State = {
  hasError: false,
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    sendReport(error.message).finally(() => {
      window.location.replace('/');
    });
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}
