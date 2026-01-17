/**
 * Extract data from streaming text
 * Looks for JSON arrays that could be data for charts
 */

export interface DataPoint {
  [key: string]: string | number | boolean;
}

/**
 * Extract data arrays from text
 * Returns the largest valid data array found
 */
export function extractDataFromText(text: string): DataPoint[] | null {
  if (!text) return null;

  // Try to find code blocks first (```json [ ... ] ``` or ```data [ ... ] ```)
  const codeBlockRegex = /```(?:json|data)?\s*(\[[\s\S]*?\])\s*```/g;
  let match;
  let largestData: DataPoint[] | null = null;
  let largestSize = 0;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    const jsonStr = match[1];
    try {
      const data = JSON.parse(jsonStr);
      if (isValidDataArray(data) && jsonStr.length > largestSize) {
        largestData = data;
        largestSize = jsonStr.length;
      }
    } catch {
      // Ignore parse errors
    }
  }

  // If found in code blocks, return it
  if (largestData) {
    return largestData;
  }

  // Otherwise, try to find any JSON array in the text
  const jsonRegex = /\[[\s\S]*?\]/g;
  while ((match = jsonRegex.exec(text)) !== null) {
    const jsonStr = match[0];
    try {
      const data = JSON.parse(jsonStr);
      if (isValidDataArray(data) && jsonStr.length > largestSize) {
        largestData = data;
        largestSize = jsonStr.length;
      }
    } catch {
      // Ignore parse errors
    }
  }

  return largestData;
}

/**
 * Check if an object is a valid data array
 * Must be an array with at least one object containing key-value pairs
 */
export function isValidDataArray(obj: any): obj is DataPoint[] {
  return (
    Array.isArray(obj) &&
    obj.length > 0 &&
    typeof obj[0] === 'object' &&
    obj[0] !== null &&
    Object.keys(obj[0]).length > 0
  );
}

/**
 * Merge extracted data with Vega spec
 * If spec doesn't have data, use extracted data
 */
export function mergeDataWithSpec(spec: any, extractedData: DataPoint[] | null): any {
  if (!spec) return null;

  // If spec already has data, keep it
  if (spec.data && spec.data.values) {
    return spec;
  }

  // If we have extracted data, use it
  if (extractedData && extractedData.length > 0) {
    return {
      ...spec,
      data: { values: extractedData },
    };
  }

  // Otherwise return spec as is (will use default data)
  return spec;
}
