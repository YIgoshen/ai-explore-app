# AI Explore

A modern React + TypeScript application for streaming AI-generated content with real-time Vega-Lite chart visualization and automatic data extraction.

## 🚀 Features

- **File Upload**: Load `.jsonl` files containing streaming events
- **Real-time Streaming**: Simulate SSE (Server-Sent Events) playback with configurable speed
- **Automatic Data Extraction**: Extract data arrays from streaming text
- **Chart Visualization**: Automatic Vega-Lite chart extraction and rendering with real data
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
git clone https://github.com/YIgoshen/ai-explore-app
cd ai-explore


### Prerequisites
- Node.js 16+ 
- npm or yarn

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
4. **View Charts**: Watch as Vega-Lite charts are automatically extracted and rendered with real data
5. **Switch Chart Types**: Toggle between Bar (📊), Line (📈), and Scatter (⚫) visualizations
6. **Export**: Copy Vega specs or save charts as images

## 📥 Example Files

The project includes example JSONL files you can use to test the application:

### example_stream.jsonl
A complete example with:
- Text description
- Data array (6 regions with revenue)
- Vega-Lite bar chart specification

**How to use:**
1. Run `npm run dev`
2. Click "📁 Load .jsonl File"
3. Select `example_stream.jsonl` from the project root
4. Click "▶ Play"
5. Watch the chart render with real data

### llm_stream_dump.jsonl
Another example with:
- Russian text description
- Data array (6 regions with revenue)
- Vega-Lite bar chart specification

**Both files demonstrate:**
- How to structure streaming events
- How to include data arrays in JSON code blocks
- How to include Vega-Lite specifications
- How the app extracts and visualizes data automatically

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── FileUploader.tsx    # File upload functionality
│   ├── PlaybackControls.tsx # Stream playback controls
│   ├── StatusIndicator.tsx  # Status display
│   ├── StreamingOutput.tsx  # Text output with JSON highlighting
│   ├── VegaChart.tsx       # Chart visualization with real data
│   └── Logo.tsx           # App logo component
├── hooks/              # Custom React hooks
│   ├── useStreamPlayer.ts  # Stream playback logic
│   └── useVegaExtractor.ts # Vega spec extraction
├── utils/              # Utility functions
│   ├── eventParser.ts     # JSONL event parsing
│   ├── vegaExtractor.ts   # Vega spec extraction logic
│   ├── dataExtractor.ts   # Data array extraction from stream
│   └── jsonHighlighter.ts # JSON syntax highlighting
├── types/              # TypeScript type definitions
└── App.tsx            # Main application component
```

## 📊 Data Format

The application expects `.jsonl` files with streaming events:

```json
{"event": "token", "data": {"delta": "Some text "}}
{"event": "token", "data": {"delta": "more text"}}
{"event": "done", "data": {}}
```

Supported event types:
- `token` - Text content with `delta` field
- `done` - Stream completion
- `error` - Error with `message` field

## 🎨 Chart Types and Data

The application automatically detects and extracts:

1. **Data Arrays** - JSON arrays with objects containing key-value pairs
   ```json
   [
     {"region": "Almaty", "revenue": 150},
     {"region": "Astana", "revenue": 120}
   ]
   ```

2. **Vega-Lite Specifications** - JSON objects with `mark` and `encoding` properties
   ```json
   {
     "mark": "bar",
     "encoding": {
       "x": {"field": "region", "type": "nominal"},
       "y": {"field": "revenue", "type": "quantitative"}
     }
   }
   ```

The application supports:
- **Bar Charts** (📊) - Default visualization
- **Line Charts** (📈) - Time series and continuous data
- **Scatter Plots** (⚫) - Point-based visualizations

Charts are rendered with **real data extracted from the stream**, not hardcoded sample data.


This .jsonl should be downloaded to use it in the app. Also the file is in the root of the project (llm_stream_dump.jsonl):

```jsonl
{"event":"token","data":{"delta":"Давайте построим график выручки по регионам.\n"}}
{"event":"token","data":{"delta":"Для этого используем столбчатую диаграмму (bar chart).\n"}}
{"event":"token","data":{"delta":"По оси X будут регионы, по оси Y — сумма выручки.\n\n"}}

{"event":"token","data":{"delta":"Сначала вот данные по регионам:\n"}}
{"event":"token","data":{"delta":"```json\n"}}
{"event":"token","data":{"delta":"[\n"}}
{"event":"token","data":{"delta":"  { \"region\": \"Almaty\", \"revenue\": 100 },\n"}}
{"event":"token","data":{"delta":"  { \"region\": \"Astana\", \"revenue\": 120 },\n"}}
{"event":"token","data":{"delta":"  { \"region\": \"Shymkent\", \"revenue\": 95 },\n"}}
{"event":"token","data":{"delta":"  { \"region\": \"Karaganda\", \"revenue\": 80 },\n"}}
{"event":"token","data":{"delta":"  { \"region\": \"Aktobe\", \"revenue\": 110 },\n"}}
{"event":"token","data":{"delta":"  { \"region\": \"Kyzylorda\", \"revenue\": 75 }\n"}}
{"event":"token","data":{"delta":"]\n"}}
{"event":"token","data":{"delta":"```\n\n"}}

{"event":"token","data":{"delta":"Ниже приведён Vega-Lite spec:\n"}}
{"event":"token","data":{"delta":"```json\n"}}

{"event":"token","data":{"delta":"{\n"}}
{"event":"token","data":{"delta":"  \"mark\": \"bar\",\n"}}
{"event":"token","data":{"delta":"  \"encoding\": {\n"}}
{"event":"token","data":{"delta":"    \"x\": {\n"}}
{"event":"token","data":{"delta":"      \"field\": \"region\",\n"}}
{"event":"token","data":{"delta":"      \"type\": \"nominal\",\n"}}
{"event":"token","data":{"delta":"      \"title\": \"Регион\"\n"}}
{"event":"token","data":{"delta":"    },\n"}}
{"event":"token","data":{"delta":"    \"y\": {\n"}}
{"event":"token","data":{"delta":"      \"aggregate\": \"sum\",\n"}}
{"event":"token","data":{"delta":"      \"field\": \"revenue\",\n"}}
{"event":"token","data":{"delta":"      \"type\": \"quantitative\",\n"}}
{"event":"token","data":{"delta":"      \"title\": \"Выручка\"\n"}}
{"event":"token","data":{"delta":"    },\n"}}
{"event":"token","data":{"delta":"    \"tooltip\": [\n"}}
{"event":"token","data":{"delta":"      { \"field\": \"region\", \"type\": \"nominal\", \"title\": \"Регион\" },\n"}}
{"event":"token","data":{"delta":"      { \"aggregate\": \"sum\", \"field\": \"revenue\", \"type\": \"quantitative\", \"title\": \"Выручка\" }\n"}}
{"event":"token","data":{"delta":"    ]\n"}}
{"event":"token","data":{"delta":"  }\n"}}
{"event":"token","data":{"delta":"}\n"}}

{"event":"token","data":{"delta":"```\n"}}
{"event":"token","data":{"delta":"\nГрафик позволит быстро сравнить вклад каждого региона в общую выручку.\n"}}

{"event":"done","data":{"usage":{"input_tokens":142,"output_tokens":389}}}
```

**Key points:**
- Each line is a separate JSON object (JSONL format)
- Data arrays must be wrapped in ` ```json ... ``` ` code blocks
- Vega specs must be wrapped in ` ```json ... ``` ` code blocks
- The app extracts both automatically and renders the chart with real data

### Code Quality
- TypeScript strict mode enabled
- Comprehensive error handling
- Performance optimizations with React hooks
- Responsive design for all devices
