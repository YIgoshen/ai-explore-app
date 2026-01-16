import { StreamEvent } from '../types';

/**
 * Parse a single line of JSONL into a StreamEvent
 * Handles errors gracefully
 */
export function parseStreamEvent(line: string): StreamEvent | null {
  if (!line.trim()) {
    return null;
  }

  try {
    const parsed = JSON.parse(line);
    
    // Validate event structure
    if (!parsed.event) {
      console.warn('Invalid event: missing "event" field', parsed);
      return null;
    }

    if (parsed.event === 'token') {
      if (!parsed.data || typeof parsed.data.delta !== 'string') {
        console.warn('Invalid token event: missing or invalid delta', parsed);
        return null;
      }
      return parsed as StreamEvent;
    }

    if (parsed.event === 'done') {
      return parsed as StreamEvent;
    }

    if (parsed.event === 'error') {
      if (!parsed.data || typeof parsed.data.message !== 'string') {
        console.warn('Invalid error event: missing or invalid message', parsed);
        return null;
      }
      return parsed as StreamEvent;
    }

    console.warn('Unknown event type:', parsed.event);
    return null;
  } catch (err) {
    console.warn('Failed to parse event line:', line, err);
    return null;
  }
}

/**
 * Parse JSONL content into an array of StreamEvents
 */
export function parseStreamEvents(content: string): StreamEvent[] {
  const lines = content.split('\n');
  const events: StreamEvent[] = [];

  for (const line of lines) {
    const event = parseStreamEvent(line);
    if (event) {
      events.push(event);
    }
  }

  return events;
}
