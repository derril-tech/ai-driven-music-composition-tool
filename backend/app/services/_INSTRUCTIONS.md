# Backend Services - Instructions for Claude

This folder contains the core business logic services for the AriaForge backend.

## 🔧 Services to Implement

### AI Services (`ai/`)
- `composition_service.py` - AI composition orchestration
- `arrangement_service.py` - Arrangement generation
- `lyrics_service.py` - Lyrics generation with phoneme alignment
- `similarity_service.py` - Content similarity detection
- `style_service.py` - Style analysis and matching

### Audio Services (`audio/`)
- `midi_service.py` - MIDI file processing
- `score_service.py` - MusicXML handling
- `analysis_service.py` - Audio analysis (librosa/essentia)
- `fingerprint_service.py` - Audio fingerprinting
- `chroma_service.py` - Chroma feature extraction

### Render Services (`render/`)
- `render_service.py` - Audio rendering pipeline
- `dsp_service.py` - Digital signal processing
- `mastering_service.py` - Mastering and loudness normalization
- `stem_service.py` - Multi-track stem generation
- `export_service.py` - Multi-format export

### Library Services (`library/`)
- `sample_service.py` - Sample management and tagging
- `preset_service.py` - Preset management
- `upload_service.py` - File upload and processing
- `search_service.py` - Vector search and recommendations

### Collaboration Services (`collaboration/`)
- `session_service.py` - Real-time session management
- `presence_service.py` - User presence tracking
- `approval_service.py` - Approval workflow management
- `version_service.py` - Version control and history

## 🎯 Key Requirements

### AI Integration
- LangGraph orchestration for deterministic flows
- OpenAI + Claude integration via LangChain
- RAG over user stylebooks and theory guides
- Structured outputs with Pydantic schemas
- Human-in-the-loop approval gates

### Audio Processing
- FFmpeg integration for audio processing
- Real-time and offline rendering
- Multiple audio format support
- Loudness normalization (EBU R128/LUFS)
- True-peak limiting

### Database Integration
- Async SQLAlchemy 2.0 operations
- pgvector for embeddings and similarity search
- Redis for caching and queues
- Event sourcing for audit trails

### Security & Compliance
- Content similarity detection
- Rights management and licensing
- Provenance tracking
- Audit logging

## 📋 Implementation Guidelines

1. **Service Structure**: Use dependency injection pattern
2. **Error Handling**: Comprehensive error handling with logging
3. **Async Operations**: Use async/await for I/O operations
4. **Caching**: Implement Redis caching for expensive operations
5. **Monitoring**: Add metrics and health checks
6. **Testing**: Unit tests with mocked dependencies

## 🔧 Technical Specifications

### Service Base Class
```python
from abc import ABC, abstractmethod
from typing import Any, Dict, Optional
import structlog

class BaseService(ABC):
    def __init__(self):
        self.logger = structlog.get_logger(self.__class__.__name__)
    
    @abstractmethod
    async def process(self, data: Dict[str, Any]) -> Dict[str, Any]:
        pass
    
    async def validate_input(self, data: Dict[str, Any]) -> bool:
        # Common validation logic
        pass
```

### AI Service Integration
```python
from langchain.schema import BaseMessage
from langgraph.graph import StateGraph

class CompositionService:
    def __init__(self, llm_client, graph: StateGraph):
        self.llm_client = llm_client
        self.graph = graph
    
    async def compose(self, prompt: str, style: str) -> CompositionResult:
        # LangGraph orchestration
        pass
```

### Audio Service Integration
```python
import librosa
import essentia.standard as es
import mido

class AudioService:
    def __init__(self, ffmpeg_path: str):
        self.ffmpeg_path = ffmpeg_path
    
    async def analyze_audio(self, audio_path: str) -> AudioAnalysis:
        # Audio analysis with librosa/essentia
        pass
```

### Render Service Integration
```python
import asyncio
from typing import List

class RenderService:
    def __init__(self, dsp_engine, render_queue):
        self.dsp_engine = dsp_engine
        self.render_queue = render_queue
    
    async def render_project(self, project_id: str) -> RenderResult:
        # Async rendering pipeline
        pass
```

## 🔄 Event Handling

### Domain Events
```python
from dataclasses import dataclass
from datetime import datetime
from typing import Any

@dataclass
class DomainEvent:
    event_type: str
    aggregate_id: str
    data: Dict[str, Any]
    timestamp: datetime
    version: int
```

### Event Handlers
```python
class EventHandler:
    async def handle_composition_completed(self, event: DomainEvent):
        # Handle composition completion
        pass
    
    async def handle_render_requested(self, event: DomainEvent):
        # Handle render request
        pass
```

## 📊 Monitoring & Metrics

### Health Checks
```python
class ServiceHealth:
    async def check_ai_service(self) -> HealthStatus:
        # Check AI service health
        pass
    
    async def check_audio_service(self) -> HealthStatus:
        # Check audio service health
        pass
```

### Metrics Collection
```python
from prometheus_client import Counter, Histogram

class Metrics:
    composition_requests = Counter('composition_requests_total', 'Total composition requests')
    render_duration = Histogram('render_duration_seconds', 'Render duration in seconds')
```

## 📝 TODO Markers

Look for these TODO markers in the codebase:
- `TODO: Implement LangGraph orchestration`
- `TODO: Add OpenAI/Claude integration`
- `TODO: Implement audio analysis pipeline`
- `TODO: Add render queue management`
- `TODO: Implement similarity detection`
- `TODO: Add WebSocket event handling`
- `TODO: Implement approval workflow`
- `TODO: Add vector search capabilities`
- `TODO: Implement export pipeline`
- `TODO: Add monitoring and metrics`
- `TODO: Implement caching strategy`
- `TODO: Add error recovery mechanisms`
- `TODO: Implement rate limiting`
- `TODO: Add audit logging`
- `TODO: Implement security checks`
