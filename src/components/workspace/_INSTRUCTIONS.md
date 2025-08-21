# Workspace Components - Instructions for Claude

This folder contains the core music composition workspace components for AriaForge.

## 🎵 Components to Implement

### Core Workspace Components
- `ComposerWorkspace.tsx` - Main AI composition interface
- `ArrangerWorkspace.tsx` - Arrangement and structure editor
- `MixerWorkspace.tsx` - Mixing and effects interface
- `LyricsWorkspace.tsx` - Lyrics editor with phoneme alignment
- `TimelineWorkspace.tsx` - Timeline and arrangement view

### Music Editing Components
- `PianoRoll.tsx` - Piano roll editor for MIDI notes
- `DrumGrid.tsx` - Drum pattern editor
- `NotationView.tsx` - Musical notation display
- `ChordTrack.tsx` - Chord progression editor
- `FXChain.tsx` - Effects chain editor
- `WaveformDisplay.tsx` - Audio waveform visualization

### Control Components
- `TransportControls.tsx` - Play, stop, record controls
- `TempoControl.tsx` - BPM and time signature controls
- `KeyControl.tsx` - Key and scale controls
- `QuantizeControl.tsx` - Quantization settings
- `HumanizeControl.tsx` - Humanization settings

## 🎯 Key Requirements

### Real-time Collaboration
- WebSocket integration for live updates
- Multi-cursor presence indicators
- Conflict resolution for simultaneous edits
- Version control and undo/redo

### Audio Integration
- WebAudio API for real-time playback
- Tone.js for synthesis and effects
- Latency compensation
- Offline rendering support

### AI Integration
- Prompt input for AI composition
- Progress indicators for AI processing
- Theory-aware controls
- Style and mood selectors

### Accessibility
- Full keyboard navigation
- Screen reader support
- High contrast mode
- Reduced motion support

## 📋 Implementation Guidelines

1. **Component Structure**: Use functional components with TypeScript
2. **State Management**: Use Zustand for global state, React state for local state
3. **Styling**: Use Tailwind CSS with music-specific design tokens
4. **Performance**: Implement virtualization for large datasets
5. **Error Handling**: Graceful error states with user feedback
6. **Testing**: Unit tests for logic, integration tests for workflows

## 🔧 Technical Specifications

### Audio Engine Integration
```typescript
// Example audio engine integration
import * as Tone from 'tone'

interface AudioEngine {
  playNote(note: string, duration: number): void
  stopNote(note: string): void
  setTempo(bpm: number): void
  setVolume(volume: number): void
}
```

### WebSocket Events
```typescript
// Example WebSocket event types
interface WorkspaceEvent {
  type: 'note_added' | 'note_removed' | 'track_updated'
  userId: string
  timestamp: number
  data: any
}
```

### AI Session Integration
```typescript
// Example AI session interface
interface AISession {
  sessionId: string
  status: 'idle' | 'processing' | 'completed' | 'error'
  progress: number
  result?: CompositionResult
}
```

## 🎨 Design Tokens

Use the music-specific color tokens defined in `tailwind.config.js`:
- `track-drums`, `track-bass`, `track-keys`, etc.
- `waveform-positive`, `waveform-negative`
- Custom animations for music-specific interactions

## 📝 TODO Markers

Look for these TODO markers in the codebase:
- `TODO: Implement piano roll editor`
- `TODO: Add WebSocket real-time updates`
- `TODO: Integrate AI composition API`
- `TODO: Add audio engine controls`
- `TODO: Implement collaboration features`
- `TODO: Add accessibility features`
- `TODO: Create music-specific animations`
- `TODO: Add undo/redo functionality`
- `TODO: Implement quantization controls`
- `TODO: Add humanization settings`
