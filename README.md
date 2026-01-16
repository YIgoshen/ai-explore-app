# AI Explore

A modern React + TypeScript application for streaming AI-generated content with real-time Vega-Lite chart visualization.

## 🚀 Features

- **File Upload**: Load `.jsonl` files containing streaming events
- **Real-time Streaming**: Simulate SSE (Server-Sent Events) playback with configurable speed
- **Chart Visualization**: Automatic Vega-Lite chart extraction and rendering
- **Multiple Chart Types**: Switch between Bar, Line, and Scatter plots
- **JSON Syntax Highlighting**: Beautiful syntax highlighting for JSON code blocks
- **Export Functionality**: Save charts as PNG/SVG and copy Vega specs to clipboard
- **Modern UI**: Clean, responsive design with professional styling
- **Speed Control**: Adjustable playback speed (0.5x to 2x)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Visualization**: Vega-Lite + Vega-Embed
- **Styling**: CSS3 with modern design patterns
- **Development**: ESLint + TypeScript strict mode

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-explore

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Usage

1. **Load Data**: Click "📁 Load .jsonl File" to upload your streaming data file
2. **Control Playback**: Use Play/Pause/Stop buttons to control the stream
3. **Adjust Speed**: Change playback speed from 0.5x to 2x
4. **View Charts**: Watch as Vega-Lite charts are automatically extracted and rendered
5. **Switch Chart Types**: Toggle between Bar (📊), Line (📈), and Scatter (⚫) visualizations
6. **Export**: Copy Vega specs or save charts as images

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── FileUploader.tsx    # File upload functionality
│   ├── PlaybackControls.tsx # Stream playback controls
│   ├── StatusIndicator.tsx  # Status display
│   ├── StreamingOutput.tsx  # Text output with JSON highlighting
│   ├── VegaChart.tsx       # Chart visualization
│   └── Logo.tsx           # App logo component
├── hooks/              # Custom React hooks
│   ├── useStreamPlayer.ts  # Stream playback logic
│   └── useVegaExtractor.ts # Vega spec extraction
├── utils/              # Utility functions
│   ├── eventParser.ts     # JSONL event parsing
│   ├── vegaExtractor.ts   # Vega spec extraction logic
│   └── jsonHighlighter.ts # JSON syntax highlighting
├── types/              # TypeScript type definitions
└── App.tsx            # Main application component
```

## 🔧 Development

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Quality
- TypeScript strict mode enabled
- Comprehensive error handling
- Performance optimizations with React hooks
- Responsive design for all devices

## 📊 Data Format

The application expects `.jsonl` files with streaming events:

```json
{"event": "token", "data": {"delta": "Hello "}}
{"event": "token", "data": {"delta": "world!"}}
{"event": "done", "data": {}}
```

Supported event types:
- `token` - Text content with `delta` field
- `done` - Stream completion
- `error` - Error with `message` field

## 🎨 Chart Types

The application automatically detects Vega-Lite specifications in the streaming text and supports:

- **Bar Charts** (📊) - Default visualization
- **Line Charts** (📈) - Time series and continuous data
- **Scatter Plots** (⚫) - Point-based visualizations

Charts can be exported as PNG or SVG formats, and Vega specifications can be copied to clipboard.

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

MIT License - see LICENSE file for details.