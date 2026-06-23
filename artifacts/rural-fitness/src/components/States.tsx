import React from "react";

export function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

export function ErrorState({ message, retry }: { message?: string, retry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <h3 className="text-xl font-display font-bold text-foreground mb-2">Something went wrong</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {message || "We encountered an issue loading this data. Please try again."}
      </p>
      {retry && (
        <button 
          onClick={retry}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string, description: string, action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center bg-muted/30 border border-border rounded-xl">
      <h3 className="text-2xl font-display font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground mb-8 max-w-md text-lg">
        {description}
      </p>
      {action}
    </div>
  );
}
