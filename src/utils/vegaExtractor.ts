import { VegaSpec } from '../types';

/**
 * Extract JSON objects from text, handling markdown code blocks
 * Returns the largest valid JSON object that looks like a Vega spec
 */
export function extractVegaSpec(text: string): VegaSpec | null {
  // Try to find code blocks first (```json { ... } ``` or ```vega { ... } ```)
  const codeBlockRegex = /```(?:json|vega)?\s*(\{[\s\S]*?\})\s*```/g;
  let match;
  let largestSpec: VegaSpec | null = null;
  let largestSize = 0;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    const jsonStr = match[1];
    try {
      const spec = JSON.parse(jsonStr);
      if (isValidVegaSpec(spec) && jsonStr.length > largestSize) {
        largestSpec = spec;
        largestSize = jsonStr.length;
      }
    } catch {
      // Ignore parse errors
      console.error("Parsing error")
    }
  }


  // If found in code blocks, return it
  if (largestSpec) {
    return largestSpec;
  }

  // Otherwise, try to find any JSON object in the text
  // Look for patterns like { ... } that might be Vega specs
  const jsonRegex = /\{[\s\S]*?\}/g;
  while ((match = jsonRegex.exec(text)) !== null) {
    const jsonStr = match[0];
    try {
      const spec = JSON.parse(jsonStr);
      if (isValidVegaSpec(spec) && jsonStr.length > largestSize) {
        largestSpec = spec;
        largestSize = jsonStr.length;
      }
    } catch {
      // Ignore parse errors
    }
  }

  return largestSpec;
}

/**
 * Check if an object is a valid Vega-Lite spec
 * Must have both "mark" and "encoding" properties
 */
export function isValidVegaSpec(obj: any): obj is VegaSpec {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'mark' in obj &&
    'encoding' in obj
  );
}
