/**
 * Utility to parse text and extract JSON blocks with syntax highlighting
 */

export interface TextSegment {
  type: 'text' | 'json' | 'code-block';
  content: string;
  language?: string;
}

/**
 * Parse text and identify JSON code blocks and inline JSON
 * Returns segments with type information for rendering
 */
export function parseTextWithJSON(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let lastIndex = 0;

  // Pattern to match markdown code blocks (```json ... ``` or ```vega ... ```)
  const codeBlockPattern = /```(json|vega)?\s*([\s\S]*?)```/g;
  let match;

  while ((match = codeBlockPattern.exec(text)) !== null) {
    // Add text before the code block
    if (match.index > lastIndex) {
      const textBefore = text.substring(lastIndex, match.index);
      if (textBefore.trim()) {
        segments.push({ type: 'text', content: textBefore });
      }
    }

    // Add the code block
    const language = match[1] || 'json';
    const code = match[2].trim();
    segments.push({
      type: 'code-block',
      content: code,
      language,
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    const textAfter = text.substring(lastIndex);
    if (textAfter.trim()) {
      segments.push({ type: 'text', content: textAfter });
    }
  }

  // If no code blocks found, return the whole text as plain text
  if (segments.length === 0) {
    return [{ type: 'text', content: text }];
  }

  return segments;
}

/**
 * Highlight JSON syntax
 * Returns HTML string with span elements for different token types
 */
export function highlightJSON(jsonString: string): string {
  // Escape HTML special characters first
  let html = jsonString
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  // Highlight different JSON elements
  // Keys (quoted strings followed by colon)
  html = html.replace(
    /&quot;([^&]*?)&quot;(\s*):/g,
    '<span class="json-key">&quot;$1&quot;</span>$2:'
  );

  // String values (quoted strings not followed by colon)
  html = html.replace(
    /:\s*&quot;([^&]*?)&quot;/g,
    ': <span class="json-string">&quot;$1&quot;</span>'
  );

  // Numbers
  html = html.replace(
    /:\s*(-?\d+\.?\d*(?:[eE][+-]?\d+)?)/g,
    ': <span class="json-number">$1</span>'
  );

  // Booleans
  html = html.replace(
    /\b(true|false)\b/g,
    '<span class="json-boolean">$1</span>'
  );

  // Null
  html = html.replace(/\bnull\b/g, '<span class="json-null">null</span>');

  // Brackets and braces
  html = html.replace(/([{}[\]])/g, '<span class="json-bracket">$1</span>');

  // Commas
  html = html.replace(/,/g, '<span class="json-comma">,</span>');

  return html;
}
