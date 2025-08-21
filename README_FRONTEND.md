# AriaForge Frontend

The frontend application for AriaForge - AI-Driven Music Composition Tool.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp env.example .env.local
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: Zustand + React Query
- **Audio**: Tone.js + WebAudio API
- **Real-time**: WebSocket (Socket.io)

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── workspace/        # Music workspace components
│   └── providers.tsx     # App providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── store/                # Zustand stores
├── types/                # TypeScript types
└── utils/                # Helper functions
```

## 🎵 Music Components

### Core Workspace Components

- **ComposerWorkspace** - AI composition interface
- **ArrangerWorkspace** - Arrangement editor
- **MixerWorkspace** - Mixing interface
- **LyricsWorkspace** - Lyrics editor with phoneme alignment
- **TimelineWorkspace** - Timeline and arrangement view

### Music Editing Components

- **PianoRoll** - MIDI note editor
- **DrumGrid** - Drum pattern editor
- **NotationView** - Musical notation display
- **ChordTrack** - Chord progression editor
- **FXChain** - Effects chain editor
- **WaveformDisplay** - Audio waveform visualization

### Control Components

- **TransportControls** - Play, stop, record controls
- **TempoControl** - BPM and time signature controls
- **KeyControl** - Key and scale controls
- **QuantizeControl** - Quantization settings
- **HumanizeControl** - Humanization settings

## 🎨 Design System

### Color Tokens

Music-specific colors are defined in `tailwind.config.js`:

```css
/* Track colors */
--track-drums: 0 0% 60%;
--track-bass: 120 100% 40%;
--track-keys: 240 100% 50%;
--track-guitar: 30 100% 50%;
--track-lead: 280 100% 60%;
--track-vocals: 340 100% 60%;

/* Waveform colors */
--waveform-positive: 120 100% 50%;
--waveform-negative: 0 100% 50%;
```

### Component Classes

```css
.piano-roll-grid {
  @apply grid gap-1;
  grid-template-columns: repeat(12, 1fr);
}

.track-header {
  @apply flex items-center justify-between p-2 bg-muted/50 border-b;
}

.timeline-ruler {
  @apply flex items-center h-8 bg-muted/30 border-b text-xs text-muted-foreground;
}
```

## 🔧 Development

### Adding New Components

1. Create component in appropriate folder
2. Use TypeScript interfaces for props
3. Follow shadcn/ui patterns for styling
4. Add accessibility attributes
5. Write unit tests

### State Management

- **Global State**: Zustand stores in `src/store/`
- **Server State**: React Query for API calls
- **Local State**: React useState for component state

### Audio Integration

```typescript
import * as Tone from 'tone'

// Initialize audio context
await Tone.start()

// Create synthesizer
const synth = new Tone.Synth().toDestination()

// Play note
synth.triggerAttackRelease("C4", "8n")
```

### Real-time Collaboration

```typescript
import { io } from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_WS_URL)

// Listen for updates
socket.on('workspace_update', (data) => {
  // Handle real-time updates
})
```

## 🧪 Testing

### Unit Tests

```bash
npm test
```

### Integration Tests

```bash
npm run test:integration
```

### E2E Tests

```bash
npm run test:e2e
```

## 📱 Responsive Design

The application is designed with a mobile-first approach:

- **Mobile**: Simplified interface with touch-friendly controls
- **Tablet**: Enhanced workspace with side panels
- **Desktop**: Full-featured workspace with multiple panels

## ♿ Accessibility

- WCAG 2.1 AA compliance
- Full keyboard navigation
- Screen reader support
- High contrast mode
- Reduced motion support

## 🚀 Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Set environment variables
3. Deploy automatically on push

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm run start
```

## 🔗 API Integration

The frontend communicates with the backend API:

- **Base URL**: `process.env.NEXT_PUBLIC_API_URL`
- **WebSocket**: `process.env.NEXT_PUBLIC_WS_URL`
- **Authentication**: JWT tokens
- **Real-time**: WebSocket connections

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tone.js](https://tonejs.github.io/)
- [WebAudio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
