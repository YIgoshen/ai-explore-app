import { useState, useCallback } from 'react';
import { FileUploader } from './components/FileUploader';
import { PlaybackControls } from './components/PlaybackControls';
import { StatusIndicator } from './components/StatusIndicator';
import { StreamingOutput } from './components/StreamingOutput';
import { VegaChart } from './components/VegaChart';
import { useStreamPlayer } from './hooks/useStreamPlayer';
import { useVegaExtractor } from './hooks/useVegaExtractor';
import { parseStreamEvents } from './utils/eventParser';
import './App.css';

/**
 * Main App component - AI Explore
 * Manages file loading, streaming playback, and Vega chart extraction
 */
function App() {
  const [streamText, setStreamText] = useState('');
  const [events, setEvents] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileLoaded, setFileLoaded] = useState(false);

  const { spec, updateFromText, reset: resetVegaExtractor } = useVegaExtractor();

  const {
    status,
    speed,
    play,
    pause,
    stop,
    changeSpeed,
  } = useStreamPlayer({
    events,
    onTokenReceived: (delta) => {
      setStreamText((prev) => {
        const newText = prev + delta;
        // Update Vega spec extraction on every token
        updateFromText(newText);
        return newText;
      });
    },
    onDone: () => {
      setErrorMessage('');
    },
    onError: (message) => {
      setErrorMessage(message);
    },
  });

  // Handle file upload
  const handleFileLoaded = useCallback((content: string) => {
    try {
      const parsedEvents = parseStreamEvents(content);
      if (parsedEvents.length === 0) {
        setErrorMessage('No valid events found in file');
        return;
      }

      setEvents(parsedEvents);
      setStreamText('');
      setErrorMessage('');
      setFileLoaded(true);
      resetVegaExtractor();
    } catch (err) {
      console.error('Failed to parse events:', err);
      setErrorMessage('Failed to parse file');
    }
  }, [resetVegaExtractor]);

  // Handle stop button
  const handleStop = useCallback(() => {
    stop();
    setStreamText('');
    resetVegaExtractor();
  }, [stop, resetVegaExtractor]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 AI Explore</h1>
        <p>Stream and visualize AI-generated content with Vega charts</p>
      </header>

      <main className="app-main">
        {/* Control Panel */}
        <section className="control-panel">
          <div className="control-row">
            <FileUploader onFileLoaded={handleFileLoaded} disabled={status === 'streaming'} />
            <StatusIndicator status={status} errorMessage={errorMessage} />
          </div>

          {fileLoaded && (
            <PlaybackControls
              status={status}
              speed={speed}
              onPlay={play}
              onPause={pause}
              onStop={handleStop}
              onSpeedChange={changeSpeed}
            />
          )}
        </section>

        {/* Content Grid */}
        {fileLoaded && (
          <div className="content-grid">
            <StreamingOutput text={streamText} />
            <VegaChart spec={spec} />
          </div>
        )}

        {/* Empty State */}
        {!fileLoaded && (
          <div className="empty-state">
            <p>👆 Load a .jsonl file to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
