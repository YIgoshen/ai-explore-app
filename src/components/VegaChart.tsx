import { useEffect, useRef } from 'react';
import vegaEmbed, { VisualizationSpec } from 'vega-embed';
import { VegaSpec } from '../types';
import './VegaChart.css';

interface VegaChartProps {
  spec: VegaSpec | null;
}

// Sample data for the chart
const SAMPLE_DATA = [
  { region: 'Almaty', revenue: 120 },
  { region: 'Astana', revenue: 90 },
  { region: 'Shymkent', revenue: 70 },
];

/**
 * Component to render Vega-Lite charts
 * Uses vega-embed to render specs with sample data
 */
export function VegaChart({ spec }: VegaChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spec || !containerRef.current) {
      return;
    }

    // Render the chart with sample data
    vegaEmbed(containerRef.current, spec as VisualizationSpec, {
      actions: {
        export: true,
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
  }, [spec]);

  return (
    <div className="vega-chart">
      <h3>Vega Chart Preview</h3>
      <div className="chart-container" ref={containerRef}>
        {!spec && <p className="placeholder">Waiting for valid Vega spec...</p>}
      </div>
    </div>
  );
}

// Export sample data for use in other components if needed
export { SAMPLE_DATA };
