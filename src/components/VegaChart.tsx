import { useEffect, useRef, useCallback, useState } from 'react';
import vegaEmbed, { VisualizationSpec } from 'vega-embed';
import { VegaSpec } from '../types';
import './VegaChart.css';

interface VegaChartProps {
  spec: VegaSpec | null;
}

type ChartType = 'bar' | 'line' | 'scatter';

// Sample data for the chart
const SAMPLE_DATA = [
  { region: 'Almaty', revenue: 120 },
  { region: 'Astana', revenue: 90 },
  { region: 'Shymkent', revenue: 70 },
  { region: 'Karaganda', revenue: 50 },
  { region: 'Zhambyl', revenue: 80 },
  { region: 'Aktau', revenue: 30 },
  { region: 'Kyzylorda', revenue: 90 },
  { region: 'Uralsk', revenue: 50 },
  { region: 'Semey', revenue: 10 },
  { region: 'Aktobe', revenue: 100 },
];

/**
 * Component to render Vega-Lite charts
 * Uses vega-embed to render specs with sample data
 * Allows switching between different chart types
 */
export function VegaChart({ spec }: VegaChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [showSaveMenu, setShowSaveMenu] = useState(false);

  const handleCopySpec = useCallback(async () => {
    if (!spec) return;

    try {
      const specJson = JSON.stringify(spec, null, 2);
      await navigator.clipboard.writeText(specJson);
      
      // Show feedback
      setShowCopyFeedback(true);
      setTimeout(() => setShowCopyFeedback(false), 2000);
    } catch (err) {
      console.error('Failed to copy spec:', err);
      alert('Failed to copy spec to clipboard');
    }
  }, [spec]);

  const handleSaveImage = useCallback(async (format: 'png' | 'svg') => {
    if (!containerRef.current) return;

    try {
      // Get the SVG or canvas from vega-embed
      const svg = containerRef.current.querySelector('svg');
      const canvas = containerRef.current.querySelector('canvas');

      if (format === 'svg' && svg) {
        // Save as SVG
        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `chart.svg`;
        link.click();
        URL.revokeObjectURL(url);
      } else if (format === 'png' && canvas) {
        // Save as PNG
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `chart.png`;
            link.click();
            URL.revokeObjectURL(url);
          }
        });
      } else {
        alert(`Unable to save as ${format.toUpperCase()}`);
      }
      setShowSaveMenu(false);
    } catch (err) {
      console.error('Failed to save image:', err);
      alert('Failed to save image');
    }
  }, []);

  // Transform spec based on selected chart type
  const getTransformedSpec = useCallback((): VisualizationSpec | null => {
    if (!spec) return null;

    const baseSpec = {
      ...spec,
      data: spec.data || { values: SAMPLE_DATA },
    };

    // Override mark type based on selection
    let mark: any = chartType;

    // For scatter plots, we need to ensure proper configuration
    if (chartType === 'scatter') {
      mark = {
        type: 'point',
        filled: true,
        size: 100,
      };
    }

    return {
      ...baseSpec,
      mark,
    };
  }, [spec, chartType]);

  useEffect(() => {
    if (!spec || !containerRef.current) {
      return;
    }

    const specWithData = getTransformedSpec();
    if (!specWithData) return;

    // Render the chart with sample data
    vegaEmbed(containerRef.current, specWithData, {
      actions: {
        export: false,
        source: false,
        compiled: false,
        editor: false,
      },
    }).catch((err) => {
      console.error('Failed to render Vega chart:', err);
      if (containerRef.current) {
        containerRef.current.innerHTML = '<p class="error">Failed to render chart</p>';
      }
    });
  }, [spec, getTransformedSpec]);

  return (
    <div className="vega-chart">
      <div className="chart-header">
        <h3>Vega Chart Preview</h3>
        <div className="chart-controls">
          {spec && (
            <div className="chart-type-selector">
              <button
                onClick={() => setChartType('bar')}
                className={`chart-type-btn ${chartType === 'bar' ? 'active' : ''}`}
                title="Bar chart"
              >
                📊 Bar
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
                title="Line chart"
              >
                📈 Line
              </button>
              <button
                onClick={() => setChartType('scatter')}
                className={`chart-type-btn ${chartType === 'scatter' ? 'active' : ''}`}
                title="Scatter plot"
              >
                ⚫ Scatter
              </button>
            </div>
          )}
          {spec && (
            <div className="action-buttons">
              <button
                onClick={handleCopySpec}
                className="copy-btn"
                title="Copy Vega spec to clipboard"
              >
                {showCopyFeedback ? '✓ Copied!   ' : '📋 Copy Spec'}
              </button>
              <div className="save-dropdown">
                <button
                  onClick={() => setShowSaveMenu(!showSaveMenu)}
                  className="save-btn"
                  title="Save chart as image"
                >
                  💾 Save
                </button>
                {showSaveMenu && (
                  <div className="save-menu">
                    <button
                      onClick={() => handleSaveImage('png')}
                      className="save-option"
                    >
                      📥 Save as PNG
                    </button>
                    <button
                      onClick={() => handleSaveImage('svg')}
                      className="save-option"
                    >
                      📥 Save as SVG
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="chart-container" ref={containerRef}>
        {!spec && <p className="placeholder">Waiting for valid Vega spec...</p>}
      </div>
    </div>
  );
}

// Export sample data for use in other components if needed
export { SAMPLE_DATA };
