import { useState, useCallback, useRef, useEffect } from 'react';
import { StreamEvent, StreamStatus, PlaybackSpeed } from '../types';

interface UseStreamPlayerOptions {
  events: StreamEvent[];
  onTokenReceived?: (delta: string) => void;
  onDone?: () => void;
  onError?: (message: string) => void;
}

/**
 * Custom hook to manage streaming playback
 * Handles play, pause, stop, and speed control
 */
export function useStreamPlayer({
  events,
  onTokenReceived,
  onDone,
  onError,
}: UseStreamPlayerOptions) {
  const [status, setStatus] = useState<StreamStatus>('idle');
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);
  const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const currentIndexRef = useRef(0);

  // Clean up all pending timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach(id => clearTimeout(id));
    timeoutIdsRef.current = [];
  }, []);

  // Play the stream
  const play = useCallback(() => {
    if (status === 'streaming') return; // Already playing
    if (events.length === 0) {
      setStatus('error');
      onError?.('No events to play');
      return;
    }

    setStatus('streaming');
    currentIndexRef.current = 0;
    clearAllTimeouts();

    const playNext = () => {
      if (currentIndexRef.current >= events.length) {
        setStatus('done');
        onDone?.();
        return;
      }

      const event = events[currentIndexRef.current];
      currentIndexRef.current += 1;

      if (event.event === 'token') {
        onTokenReceived?.(event.data.delta);
      } else if (event.event === 'error') {
        setStatus('error');
        onError?.(event.data.message);
        return;
      } else if (event.event === 'done') {
        setStatus('done');
        onDone?.();
        return;
      }

      // Schedule next event with random delay
      const baseDelay = 50 + Math.random() * 100; // 50-150ms
      const adjustedDelay = baseDelay / speed;
      const timeoutId = setTimeout(playNext, adjustedDelay);
      timeoutIdsRef.current.push(timeoutId);
    };

    playNext();
  }, [events, status, speed, onTokenReceived, onDone, onError, clearAllTimeouts]);

  // Pause the stream
  const pause = useCallback(() => {
    if (status === 'streaming') {
      clearAllTimeouts();
      setStatus('idle');
    }
  }, [status, clearAllTimeouts]);

  // Stop and reset
  const stop = useCallback(() => {
    clearAllTimeouts();
    currentIndexRef.current = 0;
    setStatus('idle');
  }, [clearAllTimeouts]);

  // Change playback speed
  const changeSpeed = useCallback((newSpeed: PlaybackSpeed) => {
    setSpeed(newSpeed);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  return {
    status,
    speed,
    play,
    pause,
    stop,
    changeSpeed,
  };
}
