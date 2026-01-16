/**
 * SSE Event types for streaming
 */
export type StreamEvent =
  | { event: 'token'; data: { delta: string } }
  | { event: 'done'; data: any }
  | { event: 'error'; data: { message: string } };

/**
 * Vega-Lite spec (simplified type)
 */
export interface VegaSpec {
  mark?: string | object;
  encoding?: Record<string, any>;
  [key: string]: any;
}

/**
 * Status of the streaming player
 */
export type StreamStatus = 'idle' | 'streaming' | 'done' | 'error';

/**
 * Playback speed multiplier
 */
export type PlaybackSpeed = 0.5 | 1 | 1.5 | 2;
