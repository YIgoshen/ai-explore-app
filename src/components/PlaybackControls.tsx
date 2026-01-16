import { StreamStatus, PlaybackSpeed } from '../types';
import './PlaybackControls.css';

interface PlaybackControlsProps {
  status: StreamStatus;
  speed: PlaybackSpeed;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onSpeedChange: (speed: PlaybackSpeed) => void;
  disabled?: boolean;
}

/**
 * Component for playback controls (play, pause, stop, speed)
 */
export function PlaybackControls({
  status,
  speed,
  onPlay,
  onPause,
  onStop,
  onSpeedChange,
  disabled = false,
}: PlaybackControlsProps) {
  return (
    <div className="playback-controls">
      <div className="button-group">
        <button
          onClick={onPlay}
          disabled={disabled || status === 'streaming'}
          className="control-btn play-btn"
          title="Start playback"
        >
          ▶ Play
        </button>
        <button
          onClick={onPause}
          disabled={disabled || status !== 'streaming'}
          className="control-btn pause-btn"
          title="Pause playback"
        >
          ⏸ Pause
        </button>
        <button
          onClick={onStop}
          disabled={disabled || status === 'idle'}
          className="control-btn stop-btn"
          title="Stop and reset"
        >
          ⏹ Stop
        </button>
      </div>

      <div className="speed-control">
        <label htmlFor="speed-select">Speed:</label>
        <select
          id="speed-select"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value) as PlaybackSpeed)}
          disabled={disabled}
          className="speed-select"
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
      </div>
    </div>
  );
}
