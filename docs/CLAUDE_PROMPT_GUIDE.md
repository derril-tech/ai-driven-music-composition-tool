# Claude Prompt Engineering Guide - AriaForge

This guide provides comprehensive prompt engineering templates and examples for effective Claude Code collaboration on AriaForge.

## 🎯 Prompt Engineering Principles

### 1. Clarity and Specificity
- **Be explicit** about requirements and constraints
- **Provide context** for music-specific functionality
- **Specify output format** with exact structure
- **Include examples** where helpful

### 2. Technical Precision
- **Use exact technology names** (Next.js 14, FastAPI, etc.)
- **Specify version requirements** (React 18, TypeScript 5.2, etc.)
- **Include architecture patterns** (App Router, async/await, etc.)
- **Reference established patterns** from the codebase

### 3. Music Domain Expertise
- **Include music theory constraints** (scales, chords, tempo)
- **Specify audio processing requirements** (sample rate, bit depth)
- **Define MIDI data structures** (notes, velocity, timing)
- **Reference industry standards** (EBU R128, DAW compatibility)

## 📋 Prompt Templates

### Template 1: Frontend Component Development

```
You are an expert React/TypeScript developer specializing in music production interfaces.

TECHNICAL CONTEXT:
- Next.js 14 with App Router
- React 18 with TypeScript 5.2
- Tailwind CSS with music-specific design tokens
- shadcn/ui component library
- WebAudio API and Tone.js for audio processing

REQUIREMENTS:
[Specific component requirements]

MUSIC-SPECIFIC REQUIREMENTS:
- Follow music industry UI/UX patterns
- Implement proper audio timing and synchronization
- Use color-coded track indicators
- Support real-time collaboration features
- Include accessibility for musicians

CONSTRAINTS:
- Must be fully typed with TypeScript
- Follow WCAG 2.1 AA accessibility standards
- Use established design tokens from tailwind.config.js
- Implement proper error boundaries
- Support keyboard navigation

OUTPUT FORMAT:
- Complete React component with TypeScript interfaces
- Proper prop validation and default values
- Comprehensive JSDoc documentation
- Unit test structure
- Usage examples

EXAMPLE USAGE:
[Include example of how the component should be used]
```

### Template 2: Backend Service Development

```
You are an expert Python/FastAPI developer specializing in AI-driven music composition.

TECHNICAL CONTEXT:
- FastAPI with async/await patterns
- SQLAlchemy 2.0 with async session management
- Pydantic v2 for data validation
- PostgreSQL with pgvector for embeddings
- Redis for caching and real-time features

REQUIREMENTS:
[Specific service requirements]

MUSIC-SPECIFIC REQUIREMENTS:
- Handle MIDI data with proper validation
- Process audio files with FFmpeg integration
- Implement music theory constraints
- Support real-time collaboration
- Include content similarity detection

CONSTRAINTS:
- Use async/await throughout
- Implement comprehensive error handling
- Follow established service patterns
- Include structured logging
- Add proper database transaction management

OUTPUT FORMAT:
- Complete service class with async methods
- Pydantic schemas for input/output validation
- Database model integration
- Error handling and logging
- Unit test structure

EXAMPLE USAGE:
[Include example of how the service should be used]
```

### Template 3: AI Integration Development

```
You are an expert AI/ML engineer specializing in music composition and analysis.

TECHNICAL CONTEXT:
- LangChain for AI orchestration
- LangGraph for deterministic workflows
- OpenAI GPT-4 and Claude APIs
- Pydantic for structured outputs
- Music theory validation systems

REQUIREMENTS:
[Specific AI integration requirements]

MUSIC-SPECIFIC REQUIREMENTS:
- Generate music following theory constraints
- Analyze harmonic progressions
- Create melodies with proper scale validation
- Implement style-aware composition
- Include confidence scoring

CONSTRAINTS:
- Use structured outputs with Pydantic schemas
- Implement human-in-the-loop approval gates
- Include theory validation for all outputs
- Add proper error handling for AI failures
- Support iterative refinement

OUTPUT FORMAT:
- LangGraph workflow definition
- Pydantic schemas for AI inputs/outputs
- Claude prompt engineering
- Error handling and fallback strategies
- Integration with existing services

EXAMPLE USAGE:
[Include example of how the AI integration should be used]
```

### Template 4: Database Model Development

```
You are an expert database engineer specializing in music data modeling.

TECHNICAL CONTEXT:
- PostgreSQL 15+ with pgvector extension
- SQLAlchemy 2.0 declarative syntax
- Async session management
- UUID primary keys for security
- JSONB fields for flexible music data

REQUIREMENTS:
[Specific model requirements]

MUSIC-SPECIFIC REQUIREMENTS:
- Store MIDI data efficiently
- Support audio metadata and analysis
- Include music theory information
- Enable similarity search with embeddings
- Support version control for compositions

CONSTRAINTS:
- Use UUID primary keys
- Include created_at/updated_at timestamps
- Implement soft delete where appropriate
- Add proper indexing for performance
- Include foreign key relationships

OUTPUT FORMAT:
- Complete SQLAlchemy model class
- Pydantic schemas for API integration
- Database migration structure
- Index definitions for performance
- Relationship definitions

EXAMPLE USAGE:
[Include example of how the model should be used]
```

## 🎵 Music-Specific Prompt Examples

### Example 1: Piano Roll Component

```
Create a piano roll component for AriaForge with the following specifications:

COMPONENT: PianoRoll
PURPOSE: MIDI note editing interface for music composition

TECHNICAL REQUIREMENTS:
- React 18 with TypeScript
- Canvas-based rendering for performance
- Real-time note editing (add, move, delete)
- Grid snapping and quantization
- Zoom and scroll functionality
- Color-coded tracks

MUSIC REQUIREMENTS:
- Display 88-key piano keyboard (A0 to C8)
- Support MIDI note data structure
- Implement proper note timing and duration
- Show velocity information
- Support multiple tracks
- Include measure/beat grid

INTERFACE:
interface PianoRollProps {
  notes: MIDINote[];
  resolution: number; // ticks per beat
  onNoteClick: (note: MIDINote) => void;
  onNoteDrag: (note: MIDINote, newPosition: Position) => void;
  onNoteDelete: (noteId: string) => void;
  gridSnap: boolean;
  quantization: number;
}

ACCESSIBILITY:
- Full keyboard navigation
- Screen reader support
- High contrast mode
- Reduced motion support

OUTPUT: Complete React component with TypeScript, styling, and accessibility features.
```

### Example 2: AI Composition Service

```
Create an AI composition service for AriaForge with the following specifications:

SERVICE: CompositionService
PURPOSE: Generate musical compositions using AI

TECHNICAL REQUIREMENTS:
- FastAPI async service
- LangGraph workflow orchestration
- Claude API integration
- Structured output validation
- Error handling and logging

MUSIC REQUIREMENTS:
- Generate melodies following music theory
- Create chord progressions with functional harmony
- Support multiple musical styles
- Include arrangement suggestions
- Validate against user constraints

WORKFLOW:
1. Analyze user prompt and constraints
2. Generate chord progression
3. Create melody over chords
4. Suggest arrangement structure
5. Validate against theory rules
6. Return structured composition

INPUT SCHEMA:
class CompositionRequest(BaseModel):
    prompt: str
    style: str
    tempo: int = Field(..., ge=40, le=200)
    key: str
    duration: int = Field(..., ge=1, le=600)
    instruments: List[str]

OUTPUT SCHEMA:
class CompositionResponse(BaseModel):
    melody_notes: List[MIDINote]
    chord_progression: List[Chord]
    arrangement: ArrangementStructure
    confidence_score: float
    theory_analysis: TheoryAnalysis

OUTPUT: Complete service implementation with LangGraph workflow, Claude integration, and validation.
```

### Example 3: Real-time Collaboration

```
Create a real-time collaboration system for AriaForge with the following specifications:

SYSTEM: CollaborationService
PURPOSE: Enable multi-user real-time music composition

TECHNICAL REQUIREMENTS:
- WebSocket connections with Socket.io
- Redis for session management
- Conflict resolution for simultaneous edits
- Presence indicators
- Version control integration

MUSIC REQUIREMENTS:
- Real-time note editing synchronization
- Track-level collaboration
- Mixing parameter sharing
- Session state management
- Undo/redo support

EVENTS:
- note_added, note_modified, note_deleted
- track_created, track_updated, track_deleted
- user_joined, user_left, cursor_moved
- session_started, session_ended

CONSTRAINTS:
- Handle network latency gracefully
- Implement optimistic updates
- Resolve conflicts automatically
- Maintain data consistency
- Support offline editing

OUTPUT: Complete WebSocket service with event handling, conflict resolution, and session management.
```

## 🔧 Advanced Prompt Techniques

### 1. Chain-of-Thought Prompting

```
You are implementing a complex music composition feature. Let's break this down step by step:

STEP 1: Analyze the requirements
- What are the core musical concepts involved?
- What technical constraints must be considered?
- What user experience requirements exist?

STEP 2: Design the architecture
- How should the data flow through the system?
- What interfaces and abstractions are needed?
- How will different components interact?

STEP 3: Implement the solution
- Create the necessary components/services
- Implement proper error handling
- Add comprehensive testing

STEP 4: Validate the implementation
- Does it meet all requirements?
- Is it performant and scalable?
- Does it follow best practices?

Please implement this feature following this structured approach.
```

### 2. Few-Shot Learning Prompts

```
Here are examples of well-implemented music components in AriaForge:

EXAMPLE 1 - Track Component:
```typescript
interface TrackProps {
  id: string;
  name: string;
  type: TrackType;
  color: string;
  volume: number;
  muted: boolean;
  solo: boolean;
}

const Track: React.FC<TrackProps> = ({ id, name, type, color, volume, muted, solo }) => {
  // Implementation with proper TypeScript, accessibility, and music-specific features
};
```

EXAMPLE 2 - Audio Processing Service:
```python
class AudioService:
    async def process_audio(self, audio_data: bytes, format: str) -> AudioResult:
        # Implementation with proper async handling, error management, and audio processing
        pass
```

Now implement a similar component/service following these patterns and conventions.
```

### 3. Constraint-Based Prompting

```
Create a music composition feature with these strict constraints:

CONSTRAINTS:
- Must use TypeScript with strict typing
- Must follow established naming conventions
- Must include comprehensive error handling
- Must be accessible (WCAG 2.1 AA)
- Must support real-time collaboration
- Must validate music theory rules
- Must be performant (< 100ms response time)
- Must include unit tests
- Must follow security best practices

REQUIREMENTS:
[Specific feature requirements]

OUTPUT: Implementation that satisfies ALL constraints while meeting requirements.
```

## 📊 Prompt Optimization Tips

### 1. Context Provision
- **Include relevant code snippets** from existing codebase
- **Reference established patterns** and conventions
- **Provide domain-specific examples** for music concepts
- **Specify exact technology versions** and requirements

### 2. Output Specification
- **Define exact file structure** and naming conventions
- **Specify required imports** and dependencies
- **Include expected error handling** patterns
- **Define testing requirements** and coverage expectations

### 3. Quality Assurance
- **Request code review** and validation steps
- **Specify performance benchmarks** and requirements
- **Include security considerations** and best practices
- **Define accessibility requirements** and testing

### 4. Iterative Refinement
- **Request incremental implementation** for complex features
- **Ask for specific improvements** based on feedback
- **Include validation steps** at each iteration
- **Specify rollback strategies** for failed implementations

## 🎯 Success Metrics

### Code Quality Indicators
- **Type Safety**: 100% TypeScript/Python type coverage
- **Test Coverage**: >80% unit test coverage
- **Documentation**: Complete API and function documentation
- **Performance**: Meets specified response time requirements
- **Accessibility**: Passes WCAG 2.1 AA compliance tests

### Music-Specific Validation
- **Theory Compliance**: All generated music follows theory rules
- **Audio Quality**: Meets professional audio standards
- **Real-time Performance**: Sub-100ms latency for collaboration
- **Scalability**: Supports specified concurrent user load

### User Experience Standards
- **Intuitiveness**: Music-first interface design
- **Responsiveness**: Works on all target device sizes
- **Reliability**: 99.9% uptime requirement
- **Security**: Passes security audit requirements

---

**This guide serves as the definitive reference for Claude prompt engineering on AriaForge. Use these templates and techniques to ensure consistent, high-quality code generation that meets all project requirements.**
