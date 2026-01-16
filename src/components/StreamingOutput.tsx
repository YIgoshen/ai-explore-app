import { useEffect, useRef } from 'react';
import { parseTextWithJSON, highlightJSON } from '../utils/jsonHighlighter';
import './StreamingOutput.css';

interface StreamingOutputProps {
  text: string;
}

/**
 * Component to display accumulated streaming text with JSON syntax highlighting
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

  // Parse text and highlight JSON
  const segments = parseTextWithJSON(text);

  return (
    <div className="streaming-output">
      <h3>Streaming Output</h3>
      <div className="output-container" ref={containerRef}>
        {text ? (
          <pre className="output-text">
            {segments.map((segment, idx) => {
              if (segment.type === 'code-block') {
                const highlighted = highlightJSON(segment.content);
                return (
                  <code
                    key={idx}
                    className={`json-block json-${segment.language}`}
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                  />
                );
              }
              return <span key={idx}>{segment.content}</span>;
            })}
          </pre>
        ) : (
          <p className="placeholder">Waiting for stream...</p>
        )}
      </div>
    </div>
  );
}
