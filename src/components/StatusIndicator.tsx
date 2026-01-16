import { StreamStatus } from '../types';
import './StatusIndicator.css';

interface StatusIndicatorProps {
  status: StreamStatus;
  errorMessage?: string;
}

/**
 * Component to display current streaming status
 */
export function StatusIndicator({ status, errorMessage }: StatusIndicatorProps) {
  const getStatusDisplay = (): { label: string; icon: string; className: string } => {
    switch (status) {
      case 'idle':
        return { label: 'Idle', icon: '⭕', className: 'status-idle' };
      case 'streaming':
        return { label: 'Streaming...', icon: '🔴', className: 'status-streaming' };
      case 'done':
        return { label: 'Done', icon: '✅', className: 'status-done' };
      case 'error':
        return { label: 'Error', icon: '❌', className: 'status-error' };
    }
  };

  const display = getStatusDisplay();

  return (
    <div className={`status-indicator ${display.className}`}>
      <span className="status-icon">{display.icon}</span>
      <span className="status-label">{display.label}</span>
      {status === 'error' && errorMessage && (
        <span className="error-message">{errorMessage}</span>
      )}
    </div>
  );
}
