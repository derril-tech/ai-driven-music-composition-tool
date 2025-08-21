# Database Models - Instructions for Claude

This folder contains the SQLAlchemy database models for AriaForge.

## 🗄️ Models to Implement

### Core Models
- `user.py` - User accounts and authentication
- `project.py` - Music projects and metadata
- `track.py` - Individual tracks within projects
- `session.py` - AI composition sessions
- `export.py` - Export jobs and results

### Music-Specific Models
- `composition.py` - AI-generated compositions
- `arrangement.py` - Song arrangements and structure
- `lyrics.py` - Lyrics with phoneme alignment
- `sample.py` - Sample library items
- `preset.py` - Effect and instrument presets

### Collaboration Models
- `collaboration.py` - Multi-user collaboration data
- `approval.py` - Approval workflow data
- `version.py` - Version control for compositions
- `comment.py` - User comments and feedback

## 🎯 Key Requirements

### Database Design
- Use PostgreSQL with pgvector extension
- Implement proper relationships and constraints
- Support for JSONB fields for flexible data
- Vector embeddings for similarity search
- Audit trails for all changes

### Model Features
- UUID primary keys for security
- Timestamps for created/updated tracking
- Soft delete support where appropriate
- Proper indexing for performance
- Foreign key relationships

### Music Data Structure
- MIDI data storage and retrieval
- Audio metadata and analysis results
- Music theory information (key, tempo, etc.)
- Rendering parameters and settings
- Export history and results

## 📋 Implementation Guidelines

1. **Model Structure**: Use SQLAlchemy 2.0 declarative syntax
2. **Relationships**: Define proper foreign keys and relationships
3. **Validation**: Use Pydantic for data validation
4. **Migrations**: Create Alembic migration files
5. **Testing**: Write unit tests for all models

## 🔧 Technical Specifications

### Base Model Pattern
```python
from sqlalchemy import Column, String, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import uuid

Base = declarative_base()

class BaseModel(Base):
    __abstract__ = True
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, nullable=False)
```

### Music Data Storage
```python
from sqlalchemy import Column, JSON, Text, Integer, Float

class Composition(BaseModel):
    __tablename__ = "compositions"
    
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    name = Column(String, nullable=False)
    midi_data = Column(JSON, nullable=True)  # MIDI note data
    audio_metadata = Column(JSON, nullable=True)  # Audio analysis results
    theory_data = Column(JSON, nullable=True)  # Music theory information
    ai_prompt = Column(Text, nullable=True)  # Original AI prompt
    confidence_score = Column(Float, nullable=True)  # AI confidence
```

### Vector Embeddings
```python
from sqlalchemy.dialects.postgresql import VECTOR

class Sample(BaseModel):
    __tablename__ = "samples"
    
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    audio_features = Column(VECTOR(128), nullable=True)  # Audio feature vector
    style_embedding = Column(VECTOR(512), nullable=True)  # Style embedding
```

## 📝 TODO Markers

Look for these TODO markers in the codebase:
- `TODO: Implement user model with authentication`
- `TODO: Add project model with metadata`
- `TODO: Create track model with MIDI data`
- `TODO: Implement session model for AI workflows`
- `TODO: Add export model for rendering jobs`
- `TODO: Create composition model with theory data`
- `TODO: Implement collaboration models`
- `TODO: Add vector embeddings for similarity`
- `TODO: Create audit trail functionality`
- `TODO: Implement soft delete support`
- `TODO: Add proper indexing for performance`
- `TODO: Create Alembic migration files`
- `TODO: Write unit tests for models`
- `TODO: Add data validation with Pydantic`
- `TODO: Implement relationship constraints`
