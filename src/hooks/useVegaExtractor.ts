import { useState, useCallback, useRef } from 'react';
import { VegaSpec } from '../types';
import { extractVegaSpec } from '../utils/vegaExtractor';

/**
 * Custom hook to extract and manage Vega specs from streaming text
 * Only updates when a new valid spec is found
 */
export function useVegaExtractor() {
  const [spec, setSpec] = useState<VegaSpec | null>(null);
  const lastSpecRef = useRef<string>('');

  const updateFromText = useCallback((text: string) => {
    const newSpec = extractVegaSpec(text);
    const newSpecStr = JSON.stringify(newSpec);

    // Only update if the spec actually changed
    if (newSpecStr !== lastSpecRef.current) {
      setSpec(newSpec);
      lastSpecRef.current = newSpecStr;
    }
  }, []);

  const reset = useCallback(() => {
    setSpec(null);
    lastSpecRef.current = '';
  }, []);

  return {
    spec,
    updateFromText,
    reset,
  };
}
