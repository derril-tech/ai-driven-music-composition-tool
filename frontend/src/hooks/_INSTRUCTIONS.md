# Custom Hooks - Instructions for Claude

This folder contains custom React hooks for AriaForge frontend functionality.

## 🎣 Hooks to Implement

### Audio Hooks
- `useAudioEngine.ts` - WebAudio API and Tone.js integration
- `useMIDI.ts` - MIDI device connection and handling
- `useMetronome.ts` - Tempo and timing management
- `useRecording.ts` - Audio recording functionality
- `usePlayback.ts` - Audio playback controls

### State Management Hooks
- `useProject.ts` - Project state management
- `useTracks.ts` - Track state and operations
- `useComposition.ts` - Composition state management
- `useSession.ts` - AI session state
- `useCollaboration.ts` - Real-time collaboration state

### UI Hooks
- `useKeyboard.ts` - Keyboard shortcuts and navigation
- `useDragAndDrop.ts` - Drag and drop functionality
- `useResize.ts` - Component resizing
- `useScroll.ts` - Custom scroll behavior
- `useModal.ts` - Modal state management

### API Hooks
- `useAPI.ts` - API client and request management
- `useWebSocket.ts` - WebSocket connection management
- `useAuth.ts` - Authentication state
- `useUpload.ts` - File upload functionality
- `useExport.ts` - Export functionality

## 🎯 Key Requirements

### Hook Patterns
- Use TypeScript with proper typing
- Follow React hooks best practices
- Include proper error handling
- Support cleanup and memory management
- Provide comprehensive documentation

### Audio Integration
- Integrate with WebAudio API
- Support Tone.js for synthesis
- Handle MIDI input/output
- Manage audio context lifecycle
- Support real-time processing

### State Management
- Integrate with Zustand stores
- Support React Query for server state
- Handle optimistic updates
- Support undo/redo functionality
- Manage complex state transitions

## 📋 Implementation Guidelines

1. **Hook Structure**: Use functional components with proper typing
2. **Error Handling**: Include try-catch blocks and error states
3. **Cleanup**: Implement proper cleanup in useEffect
4. **Performance**: Use useMemo and useCallback where appropriate
5. **Testing**: Write unit tests for all hooks

## 🔧 Technical Specifications

### Hook Pattern
```typescript
import { useState, useEffect, useCallback, useMemo } from 'react'

interface UseHookOptions {
  // Hook-specific options
}

interface UseHookReturn {
  // Hook return values
  data: any
  loading: boolean
  error: Error | null
  actions: {
    // Hook actions
  }
}

export const useHook = (options: UseHookOptions): UseHookReturn => {
  // State management
  // Effect handling
  // Action definitions
  // Return values
}
```

### Audio Hook Example
```typescript
export const useAudioEngine = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const initialize = useCallback(async () => {
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)()
      await context.resume()
      setAudioContext(context)
      setIsInitialized(true)
    } catch (err) {
      setError(err as Error)
    }
  }, [])

  const playNote = useCallback((frequency: number, duration: number) => {
    if (!audioContext) return
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration)
  }, [audioContext])

  useEffect(() => {
    return () => {
      if (audioContext) {
        audioContext.close()
      }
    }
  }, [audioContext])

  return {
    audioContext,
    isInitialized,
    error,
    initialize,
    playNote
  }
}
```

### State Management Hook Example
```typescript
export const useProject = (projectId: string) => {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProject = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/projects/${projectId}`)
      if (!response.ok) throw new Error('Failed to fetch project')
      const data = await response.json()
      setProject(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [projectId])

  const updateProject = useCallback(async (updates: Partial<Project>) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      if (!response.ok) throw new Error('Failed to update project')
      const data = await response.json()
      setProject(data)
    } catch (err) {
      setError(err as Error)
    }
  }, [projectId])

  useEffect(() => {
    fetchProject()
  }, [fetchProject])

  return {
    project,
    loading,
    error,
    fetchProject,
    updateProject
  }
}
```

## 📝 TODO Markers

Look for these TODO markers in the codebase:
- `TODO: Implement audio engine hook`
- `TODO: Add MIDI device hook`
- `TODO: Create project state hook`
- `TODO: Implement collaboration hook`
- `TODO: Add keyboard shortcuts hook`
- `TODO: Create drag and drop hook`
- `TODO: Implement API client hook`
- `TODO: Add WebSocket connection hook`
- `TODO: Create authentication hook`
- `TODO: Implement file upload hook`
- `TODO: Add export functionality hook`
- `TODO: Create metronome hook`
- `TODO: Implement recording hook`
- `TODO: Add playback controls hook`
- `TODO: Create resize and scroll hooks`
