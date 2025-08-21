# Repository Map - AriaForge

This document provides a comprehensive overview of the AriaForge repository structure and the purpose of each directory and file.

## 📁 Root Structure

```
ariaforge/
├── frontend/                 # Next.js 14 frontend application
├── backend/                  # FastAPI backend application
├── docs/                     # Documentation files
├── scripts/                  # Development and deployment scripts
├── .env.example             # Environment variables template
├── README.md                # Main project README
└── PROJECT_BRIEF           # Detailed project requirements
```

## 🎨 Frontend Structure (`frontend/`)

### Core Application
- `src/app/` - Next.js 14 App Router pages and layouts
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions and configurations
- `src/hooks/` - Custom React hooks
- `src/store/` - State management (Zustand)
- `src/types/` - TypeScript type definitions
- `src/utils/` - Helper functions

### Key Components
- `src/components/ui/` - shadcn/ui base components
- `src/components/workspace/` - Music composition workspace components
- `src/components/audio/` - Audio processing and playback components
- `src/components/controls/` - Music control components

### Pages
- `/` - Landing page
- `/projects` - Project management
- `/projects/[id]/composer` - AI composition workspace
- `/projects/[id]/arranger` - Arrangement workspace
- `/projects/[id]/mixer` - Mixing workspace
- `/projects/[id]/lyrics` - Lyrics editor
- `/projects/[id]/library` - Sample and preset library
- `/projects/[id]/timeline` - Timeline and arrangement view
- `/projects/[id]/approvals` - Approval workflow
- `/projects/[id]/exports` - Export management

## 🔧 Backend Structure (`backend/`)

### Core Application
- `app/main.py` - FastAPI application entry point
- `app/core/` - Core configurations and utilities
- `app/api/` - API endpoints and routers
- `app/models/` - SQLAlchemy database models
- `app/services/` - Business logic services
- `app/schemas/` - Pydantic schemas for API

### Key Modules
- `app/core/config.py` - Application settings
- `app/core/database.py` - Database configuration
- `app/core/logging.py` - Structured logging setup
- `app/api/v1/` - API version 1 endpoints
- `app/services/ai/` - AI integration services
- `app/services/audio/` - Audio processing services
- `app/services/render/` - Rendering pipeline services

### API Endpoints
- `/api/v1/health` - Health checks
- `/api/v1/auth` - Authentication endpoints
- `/api/v1/projects` - Project management
- `/api/v1/tracks` - Track management
- `/api/v1/sessions` - Session management
- `/api/v1/exports` - Export management
- `/api/v1/library` - Library management

## 📚 Documentation (`docs/`)

- `REPO_MAP.md` - This file (repository structure)
- `API_SPEC.md` - API specification and endpoints
- `CLAUDE.md` - AI collaboration guidelines
- `PROMPT_DECLARATION.md` - Claude prompt specifications
- `DEPLOYMENT.md` - Deployment instructions
- `ARCHITECTURE.md` - System architecture overview

## 🛠️ Scripts (`scripts/`)

- `dev.sh` - Development environment setup
- `deploy.sh` - Deployment automation
- `test.sh` - Test execution
- `lint.sh` - Code linting and formatting

## 🔐 Configuration Files

- `.env.example` - Environment variables template
- `package.json` - Frontend dependencies
- `requirements.txt` - Backend dependencies
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js configuration

## 🎵 Music-Specific Components

### Frontend Music Components
- `PianoRoll` - Piano roll editor
- `DrumGrid` - Drum pattern editor
- `NotationView` - Musical notation display
- `ChordTrack` - Chord progression editor
- `Timeline` - Arrangement timeline
- `FXChain` - Effects chain editor
- `LyricsEditor` - Lyrics with phoneme alignment
- `LibraryManager` - Sample and preset management

### Backend Music Services
- `MIDIService` - MIDI file processing
- `ScoreService` - MusicXML handling
- `RenderService` - Audio rendering pipeline
- `DSPService` - Digital signal processing
- `SimilarityService` - Content similarity detection
- `ExportService` - Multi-format export

## 🔄 Data Flow

1. **User Input** → Frontend components
2. **API Calls** → Backend endpoints
3. **AI Processing** → LangGraph orchestration
4. **Audio Processing** → Render pipeline
5. **Storage** → PostgreSQL + S3
6. **Real-time Updates** → WebSocket connections

## 🏗️ Architecture Patterns

- **Frontend**: Component-based architecture with React 18
- **Backend**: Service-oriented architecture with FastAPI
- **Database**: PostgreSQL with pgvector for embeddings
- **Caching**: Redis for session and queue management
- **AI**: LangGraph for deterministic agent orchestration
- **Audio**: Pluggable render engines with FFmpeg
- **Storage**: S3-compatible object storage
- **Real-time**: WebSocket for collaboration

## 📋 Development Guidelines

- **Frontend**: TypeScript, React 18, Next.js 14, Tailwind CSS
- **Backend**: Python 3.11+, FastAPI, SQLAlchemy 2.0, Pydantic v2
- **Database**: PostgreSQL 15+, pgvector extension
- **Testing**: Jest (frontend), pytest (backend)
- **Linting**: ESLint + Prettier (frontend), Black + isort (backend)
- **CI/CD**: GitHub Actions with automated testing and deployment

## 🚀 Deployment

- **Frontend**: Vercel deployment
- **Backend**: Render or similar container platform
- **Database**: Managed PostgreSQL service
- **Storage**: AWS S3 or compatible service
- **Monitoring**: Structured logging with Prometheus metrics
