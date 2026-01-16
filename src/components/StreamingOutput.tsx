import { useEffect, useRef } from 'react';
import './StreamingOutput.css';

interface StreamingOutputProps {
  text: string;
}

/**
 * Component to display accumulated streaming text
 * Auto-scrolls to bottom as new text arrives
 */
export function StreamingOutput({ text }: StreamingOutputProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when text changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [text]);

  return (
    <div className="streaming-output">
      <h3>Streaming Output</h3>
      <div className="output-container" ref={containerRef}>
        {text ? (
          <pre className="output-text">{text}</pre>
        ) : (
          <p className="placeholder">Waiting for stream...</p>
        )}
      </div>
    </div>
  );
}
