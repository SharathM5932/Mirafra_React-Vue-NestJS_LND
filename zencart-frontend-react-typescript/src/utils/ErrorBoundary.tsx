import React, { type ReactNode } from "react";

import { ErrorFallback } from "./ErrorFallback";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// whenever application went wrong it will render the UI, but we're not use this because react router will have a other way to do.
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // when error occurs it trigger the state hasError to true
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  // It catches the error, and it display in the console log for tracking purpose
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
