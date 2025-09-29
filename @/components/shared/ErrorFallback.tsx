import { RefreshCw, Home } from "lucide-react";
import { Button } from "../ui/button";

interface ErrorFallbackProps {
  error?: Error;
  onRetry?: () => void;
}

export function ErrorFallback({ error, onRetry }: ErrorFallbackProps = {}) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center font-sans bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Oops!</h1>
        <p className="text-xl text-gray-600 mb-6">
          Something went wrong while playing bingo
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <Button
            onClick={handleGoHome}
            variant="outline"
            className="w-full px-6 py-3"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>

        {/* Show error details in development */}
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mt-8 p-4 bg-red-50 rounded-lg text-left">
            <summary className="cursor-pointer text-red-800 font-semibold">
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 text-xs text-red-700 overflow-auto">
              {error.message}
              {error.stack && (
                <>
                  {'\n\n'}
                  {error.stack}
                </>
              )}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}