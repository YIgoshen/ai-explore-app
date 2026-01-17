# AI Explore

A modern React + TypeScript application for streaming AI-generated content with real-time Vega-Lite chart visualization and automatic data extraction.



## Video:

https://www.loom.com/share/4cd841c358be487bbe4b9e8b92a9ac04



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

## 🔄 How Stream and Vega Spec are Processed

### Stream Processing Flow

```
1. Load JSONL File
   ↓
2. Parse Events (parseStreamEvents)
   - Split by lines
   - Parse each line as JSON
   - Validate event structure
   ↓
3. Playback (useStreamPlayer)
   - Process events one by one
   - Add random delays (50-150ms)
   - Accumulate text tokens
   ↓
4. Parallel Extraction (in App.tsx)
   ├→ Extract Vega Spec (extractVegaSpec)
   │  - Search in code blocks: ```json {...}```
   │  - Search in plain text
   │  - Validate: must have "mark" and "encoding"
   │  - Select largest valid spec
   │
   └→ Extract Data (extractDataFromText)
      - Search in code blocks: ```json [...]```
      - Search in plain text
      - Validate: must be array of objects
      - Select largest valid array
   ↓
5. Chart Rendering (VegaChart)
   - Combine spec + data
   - Apply selected chart type
   - Render with vegaEmbed
```

**Example:**
```json
{
  "mark": "bar",
  "encoding": {
    "x": {"field": "region", "type": "nominal"},
    "y": {"field": "revenue", "type": "quantitative"}
  }
}
```

## Charts

Charts are rendered with **real data extracted from the stream**, not hardcoded sample data.


## jsonl data
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
