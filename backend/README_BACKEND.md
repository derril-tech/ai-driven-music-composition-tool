# AriaForge Backend

The backend API for AriaForge - AI-Driven Music Composition Tool.

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- PostgreSQL 15+ with pgvector extension
- Redis 6+
- FFmpeg

### Installation

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Copy environment variables:
```bash
cp ../env.example .env
```

4. Set up database:
```bash
# Create database
createdb ariaforge

# Run migrations (when available)
alembic upgrade head
```

5. Start development server:
```bash
python main.py
```

6. API will be available at [http://localhost:8000](http://localhost:8000)
7. API documentation at [http://localhost:8000/docs](http://localhost:8000/docs)

## 🛠️ Available Scripts

- `python main.py` - Start development server
- `uvicorn main:app --reload` - Start with auto-reload
- `pytest` - Run tests
- `black .` - Format code
- `isort .` - Sort imports
- `flake8 .` - Lint code
- `mypy .` - Type checking

## 🏗️ Architecture

### Tech Stack

- **Framework**: FastAPI with async support
- **Language**: Python 3.11+
- **Database**: PostgreSQL with pgvector
- **ORM**: SQLAlchemy 2.0 (async)
- **Validation**: Pydantic v2
- **Authentication**: JWT with refresh tokens
- **Caching**: Redis
- **AI**: LangChain + LangGraph
- **Audio**: FFmpeg, librosa, essentia
- **Monitoring**: Structured logging with structlog

### Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application entry point
│   ├── core/                # Core configurations
│   │   ├── config.py        # Settings and environment
│   │   ├── database.py      # Database configuration
│   │   └── logging.py       # Logging setup
│   ├── api/                 # API endpoints
│   │   └── v1/             # API version 1
│   │       ├── api.py      # Main router
│   │       └── endpoints/  # Endpoint modules
│   ├── models/             # SQLAlchemy models
│   ├── schemas/            # Pydantic schemas
│   ├── services/           # Business logic services
│   │   ├── ai/            # AI services
│   │   ├── audio/         # Audio processing
│   │   ├── render/        # Rendering pipeline
│   │   └── collaboration/ # Real-time features
│   └── utils/             # Utility functions
├── requirements.txt        # Python dependencies
└── alembic/               # Database migrations
```

## 🎵 Music Services

### AI Services

- **CompositionService** - AI composition orchestration
- **ArrangementService** - Arrangement generation
- **LyricsService** - Lyrics with phoneme alignment
- **SimilarityService** - Content similarity detection
- **StyleService** - Style analysis and matching

### Audio Services

- **MIDIService** - MIDI file processing
- **ScoreService** - MusicXML handling
- **AnalysisService** - Audio analysis (librosa/essentia)
- **FingerprintService** - Audio fingerprinting
- **ChromaService** - Chroma feature extraction

### Render Services

- **RenderService** - Audio rendering pipeline
- **DSPService** - Digital signal processing
- **MasteringService** - Mastering and loudness normalization
- **StemService** - Multi-track stem generation
- **ExportService** - Multi-format export

## 🔧 Development

### Adding New Endpoints

1. Create endpoint in `app/api/v1/endpoints/`
2. Add to router in `app/api/v1/api.py`
3. Create schemas in `app/schemas/`
4. Add business logic in `app/services/`
5. Write tests

### Database Models

```python
from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)
```

### Pydantic Schemas

```python
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    tempo: int = 120
    key: str = "C"
```

### Service Pattern

```python
from abc import ABC, abstractmethod
import structlog

class BaseService(ABC):
    def __init__(self):
        self.logger = structlog.get_logger(self.__class__.__name__)
    
    @abstractmethod
    async def process(self, data: dict) -> dict:
        pass
```

## 🔐 Authentication

### JWT Token Flow

1. **Login**: POST `/api/v1/auth/login`
2. **Access**: Use access token in Authorization header
3. **Refresh**: POST `/api/v1/auth/refresh` when token expires
4. **Logout**: POST `/api/v1/auth/logout`

### Role-Based Access Control

- **Owner**: Full project access
- **Admin**: Project management
- **Producer**: Composition and arrangement
- **Artist**: Performance and editing
- **Reviewer**: Approval and feedback

## 🎚️ Audio Processing

### Supported Formats

- **Input**: WAV, MP3, FLAC, AIFF
- **Output**: WAV, MP3, FLAC, MIDI, MusicXML
- **Stems**: Individual track exports
- **Masters**: Final mixed versions

### Processing Pipeline

1. **Analysis**: Extract features (tempo, key, chords)
2. **Composition**: AI-generated content
3. **Arrangement**: Structure and organization
4. **Rendering**: Audio generation
5. **Mastering**: Loudness normalization
6. **Export**: Multi-format output

## 🔄 Real-time Features

### WebSocket Events

- **Session Updates**: AI composition progress
- **Collaboration**: Multi-user editing
- **Mixing**: Real-time parameter changes
- **Presence**: User activity indicators

### Event Types

```python
class WorkspaceEvent(BaseModel):
    type: str  # session_update, collaboration, mixing, presence
    user_id: str
    timestamp: datetime
    data: dict
```

## 📊 Monitoring

### Health Checks

- **API Health**: `/health`
- **Database Health**: `/health/db`
- **Redis Health**: `/health/redis`
- **AI Service Health**: `/health/ai`

### Metrics

- **Request Count**: Total API requests
- **Response Time**: API latency
- **Error Rate**: Failed requests
- **Render Duration**: Audio processing time

### Logging

```python
import structlog

logger = structlog.get_logger()
logger.info("Processing composition", project_id=project_id, user_id=user_id)
```

## 🧪 Testing

### Unit Tests

```bash
pytest tests/unit/
```

### Integration Tests

```bash
pytest tests/integration/
```

### E2E Tests

```bash
pytest tests/e2e/
```

### Test Database

```bash
# Use test database
DATABASE_URL=postgresql://user:password@localhost:5432/ariaforge_test
```

## 🚀 Deployment

### Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables

- **DATABASE_URL**: PostgreSQL connection string
- **REDIS_URL**: Redis connection string
- **SECRET_KEY**: JWT signing key
- **OPENAI_API_KEY**: OpenAI API key
- **ANTHROPIC_API_KEY**: Anthropic API key

### Production Checklist

- [ ] Set `ENVIRONMENT=production`
- [ ] Configure secure `SECRET_KEY`
- [ ] Set up SSL/TLS certificates
- [ ] Configure rate limiting
- [ ] Set up monitoring and alerting
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline

## 📚 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Pydantic Documentation](https://pydantic-docs.helpmanual.io/)
- [LangChain Documentation](https://python.langchain.com/)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
