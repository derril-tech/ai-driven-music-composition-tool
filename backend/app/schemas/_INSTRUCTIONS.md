# Pydantic Schemas - Instructions for Claude

This folder contains Pydantic schemas for API request/response validation in AriaForge.

## 📋 Schemas to Implement

### Authentication Schemas
- `auth.py` - Login, registration, token management
- `user.py` - User profile and settings

### Project Schemas
- `project.py` - Project creation, updates, listing
- `track.py` - Track management and metadata
- `composition.py` - Composition data and AI results

### Music Schemas
- `midi.py` - MIDI data structures
- `audio.py` - Audio metadata and analysis
- `theory.py` - Music theory information
- `arrangement.py` - Song structure and sections

### Collaboration Schemas
- `session.py` - AI session management
- `collaboration.py` - Multi-user editing
- `approval.py` - Approval workflow
- `comment.py` - User feedback and comments

### Export Schemas
- `export.py` - Export job management
- `render.py` - Rendering parameters
- `format.py` - Output format specifications

## 🎯 Key Requirements

### Validation Rules
- Strict type checking with Pydantic v2
- Custom validators for music-specific data
- Comprehensive error messages
- Nested schema support
- Optional vs required field handling

### Music Data Validation
- MIDI note validation (pitch, velocity, duration)
- Audio format validation
- Music theory constraints (key, tempo, meter)
- File size and format limits
- Security validation for uploads

### API Consistency
- Consistent naming conventions
- Proper HTTP status codes
- Error response standardization
- Pagination support
- Filtering and sorting options

## 📋 Implementation Guidelines

1. **Schema Structure**: Use Pydantic v2 syntax
2. **Validation**: Implement custom validators where needed
3. **Documentation**: Add comprehensive docstrings
4. **Testing**: Write validation tests
5. **Versioning**: Support API versioning

## 🔧 Technical Specifications

### Base Schema Pattern
```python
from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime
import uuid

class BaseSchema(BaseModel):
    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda v: v.isoformat(),
            uuid.UUID: lambda v: str(v)
        }

class TimestampedSchema(BaseSchema):
    created_at: datetime
    updated_at: datetime
```

### Music Data Schemas
```python
from pydantic import BaseModel, Field, validator
from typing import List, Dict, Any
from enum import Enum

class Note(BaseModel):
    pitch: int = Field(..., ge=0, le=127)  # MIDI pitch
    velocity: int = Field(..., ge=0, le=127)  # MIDI velocity
    start_time: float = Field(..., ge=0)  # Start time in seconds
    duration: float = Field(..., gt=0)  # Duration in seconds
    channel: int = Field(0, ge=0, le=15)  # MIDI channel

class Chord(BaseModel):
    root: str = Field(..., regex=r'^[A-G][#b]?$')  # Chord root
    quality: str = Field(..., regex=r'^(maj|min|dim|aug|sus[24])?$')  # Chord quality
    extensions: List[str] = Field(default_factory=list)  # Chord extensions
    bass: Optional[str] = Field(None, regex=r'^[A-G][#b]?$')  # Bass note

class CompositionRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=1000)
    style: str = Field(..., min_length=1, max_length=100)
    tempo: int = Field(..., ge=40, le=200)
    key: str = Field(..., regex=r'^[A-G][#b]?(maj|min)?$')
    duration: int = Field(..., ge=1, le=600)  # Duration in seconds
    instruments: List[str] = Field(default_factory=list)
    
    @validator('instruments')
    def validate_instruments(cls, v):
        valid_instruments = ['piano', 'guitar', 'bass', 'drums', 'vocals']
        for instrument in v:
            if instrument not in valid_instruments:
                raise ValueError(f'Invalid instrument: {instrument}')
        return v
```

### API Response Schemas
```python
from pydantic import BaseModel, Field
from typing import Generic, TypeVar, List, Optional

T = TypeVar('T')

class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    limit: int
    has_next: bool
    has_prev: bool

class ErrorResponse(BaseModel):
    error: str
    code: str
    details: Optional[Dict[str, Any]] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class SuccessResponse(BaseModel):
    message: str
    data: Optional[Dict[str, Any]] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
```

### WebSocket Event Schemas
```python
from pydantic import BaseModel, Field
from typing import Literal, Dict, Any

class WebSocketEvent(BaseModel):
    type: Literal['session_update', 'collaboration', 'mixing', 'presence']
    user_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    data: Dict[str, Any]

class SessionUpdateEvent(WebSocketEvent):
    type: Literal['session_update'] = 'session_update'
    session_id: str
    progress: float = Field(..., ge=0, le=1)
    status: Literal['processing', 'completed', 'error']
    result: Optional[Dict[str, Any]] = None
```

## 📝 TODO Markers

Look for these TODO markers in the codebase:
- `TODO: Implement authentication schemas`
- `TODO: Add project management schemas`
- `TODO: Create music data validation schemas`
- `TODO: Implement collaboration schemas`
- `TODO: Add export and rendering schemas`
- `TODO: Create WebSocket event schemas`
- `TODO: Add custom validators for music data`
- `TODO: Implement pagination schemas`
- `TODO: Create error response schemas`
- `TODO: Add file upload validation schemas`
- `TODO: Implement API versioning schemas`
- `TODO: Create comprehensive test coverage`
- `TODO: Add schema documentation`
- `TODO: Implement nested schema support`
- `TODO: Add security validation schemas`
