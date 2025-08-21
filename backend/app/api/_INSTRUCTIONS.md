# API Endpoints - Instructions for Claude

This folder contains the FastAPI API endpoints for AriaForge backend functionality.

## 🚀 Endpoints to Implement

### Authentication Endpoints
- `auth.py` - Login, registration, token management
- `users.py` - User profile and settings management

### Project Management Endpoints
- `projects.py` - Project CRUD operations
- `tracks.py` - Track management within projects
- `compositions.py` - AI-generated compositions
- `arrangements.py` - Song arrangements and structure

### AI Services Endpoints
- `ai/compose.py` - AI composition generation
- `ai/arrange.py` - AI arrangement suggestions
- `ai/lyrics.py` - AI lyrics generation
- `ai/analyze.py` - Music analysis and feedback

### Audio Processing Endpoints
- `audio/upload.py` - Audio file upload and processing
- `audio/analyze.py` - Audio analysis and feature extraction
- `audio/render.py` - Audio rendering and export
- `audio/midi.py` - MIDI file processing

### Collaboration Endpoints
- `collaboration/sessions.py` - Real-time session management
- `collaboration/presence.py` - User presence and activity
- `collaboration/comments.py` - User comments and feedback
- `collaboration/approvals.py` - Approval workflow management

### Export and Rendering Endpoints
- `export/jobs.py` - Export job management
- `export/formats.py` - Multi-format export options
- `export/stems.py` - Individual track exports
- `export/masters.py` - Final mixed versions

## 🎯 Key Requirements

### API Design Principles
- RESTful API design with proper HTTP methods
- Consistent response formats and error handling
- Proper authentication and authorization
- Rate limiting and request validation
- Comprehensive API documentation

### Music-Specific Requirements
- Handle MIDI data with proper validation
- Support audio file uploads and processing
- Implement music theory constraints
- Support real-time collaboration
- Include content similarity detection

### Performance Requirements
- Async/await throughout for scalability
- Proper database connection pooling
- Caching with Redis for frequently accessed data
- Optimized queries with proper indexing
- Background task processing for heavy operations

## 📋 Implementation Guidelines

1. **Endpoint Structure**: Use FastAPI with proper routing
2. **Validation**: Use Pydantic schemas for request/response validation
3. **Authentication**: Implement JWT-based authentication
4. **Error Handling**: Comprehensive error responses with proper HTTP codes
5. **Documentation**: Include OpenAPI/Swagger documentation

## 🔧 Technical Specifications

### Endpoint Pattern
```python
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
import structlog

from app.core.database import get_db
from app.core.auth import get_current_user
from app.schemas import RequestSchema, ResponseSchema
from app.services import ServiceClass

logger = structlog.get_logger()
router = APIRouter()
security = HTTPBearer()

@router.post("/", response_model=ResponseSchema, status_code=status.HTTP_201_CREATED)
async def create_resource(
    request: RequestSchema,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> ResponseSchema:
    """
    Create a new resource.
    
    Args:
        request: The request data
        db: Database session
        current_user: Authenticated user
        
    Returns:
        The created resource
        
    Raises:
        HTTPException: If creation fails
    """
    try:
        service = ServiceClass(db)
        result = await service.create(request, current_user.id)
        logger.info("Resource created", resource_id=result.id, user_id=current_user.id)
        return result
    except Exception as e:
        logger.error("Failed to create resource", error=str(e), user_id=current_user.id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create resource"
        )

@router.get("/{resource_id}", response_model=ResponseSchema)
async def get_resource(
    resource_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> ResponseSchema:
    """Get a resource by ID."""
    try:
        service = ServiceClass(db)
        result = await service.get_by_id(resource_id, current_user.id)
        if not result:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Resource not found"
            )
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to get resource", error=str(e), resource_id=resource_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get resource"
        )
```

### AI Service Endpoint Example
```python
@router.post("/compose", response_model=CompositionResponse)
async def create_composition(
    request: CompositionRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> CompositionResponse:
    """
    Generate an AI composition based on user requirements.
    
    This endpoint orchestrates the AI composition workflow using LangGraph.
    """
    try:
        # Validate user permissions
        if not current_user.can_compose:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions for composition"
            )
        
        # Initialize AI service
        ai_service = AIService(db)
        
        # Start composition workflow
        composition = await ai_service.compose(
            prompt=request.prompt,
            style=request.style,
            tempo=request.tempo,
            key=request.key,
            duration=request.duration,
            instruments=request.instruments,
            user_id=current_user.id
        )
        
        logger.info(
            "Composition created",
            composition_id=composition.id,
            user_id=current_user.id,
            style=request.style
        )
        
        return composition
        
    except ValidationError as e:
        logger.warning("Invalid composition request", error=str(e), user_id=current_user.id)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid request: {str(e)}"
        )
    except AIError as e:
        logger.error("AI composition failed", error=str(e), user_id=current_user.id)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI service temporarily unavailable"
        )
    except Exception as e:
        logger.error("Unexpected error in composition", error=str(e), user_id=current_user.id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )
```

### Real-time Collaboration Endpoint Example
```python
@router.websocket("/{session_id}/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    session_id: str,
    token: str = Query(...),
    db: AsyncSession = Depends(get_db)
):
    """
    WebSocket endpoint for real-time collaboration.
    
    Handles real-time updates for multi-user music composition.
    """
    try:
        # Authenticate user
        user = await authenticate_websocket(token, db)
        if not user:
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            return
        
        # Join collaboration session
        await websocket.accept()
        collaboration_service = CollaborationService(db)
        session = await collaboration_service.join_session(session_id, user.id, websocket)
        
        logger.info("User joined collaboration session", user_id=user.id, session_id=session_id)
        
        try:
            while True:
                # Receive message from client
                data = await websocket.receive_json()
                
                # Process collaboration event
                event = CollaborationEvent(**data)
                result = await collaboration_service.process_event(event, session)
                
                # Broadcast to other users in session
                await collaboration_service.broadcast_event(result, session, exclude_user=user.id)
                
        except WebSocketDisconnect:
            logger.info("User disconnected from session", user_id=user.id, session_id=session_id)
        finally:
            await collaboration_service.leave_session(session_id, user.id)
            
    except Exception as e:
        logger.error("WebSocket error", error=str(e), session_id=session_id)
        await websocket.close(code=status.WS_1011_INTERNAL_ERROR)
```

### File Upload Endpoint Example
```python
@router.post("/upload", response_model=UploadResponse)
async def upload_audio_file(
    file: UploadFile = File(...),
    project_id: str = Form(...),
    track_id: Optional[str] = Form(None),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> UploadResponse:
    """
    Upload an audio file for processing.
    
    Supports WAV, MP3, FLAC, and AIFF formats.
    """
    try:
        # Validate file type
        if not file.content_type.startswith('audio/'):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid file type. Only audio files are allowed."
            )
        
        # Validate file size (max 100MB)
        if file.size > 100 * 1024 * 1024:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File too large. Maximum size is 100MB."
            )
        
        # Process upload
        upload_service = UploadService(db)
        result = await upload_service.process_audio_upload(
            file=file,
            project_id=project_id,
            track_id=track_id,
            user_id=current_user.id
        )
        
        logger.info(
            "Audio file uploaded",
            file_id=result.id,
            project_id=project_id,
            user_id=current_user.id
        )
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Upload failed", error=str(e), user_id=current_user.id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process upload"
        )
```

## 📝 TODO Markers

Look for these TODO markers in the codebase:
- `TODO: Implement authentication endpoints`
- `TODO: Add project management endpoints`
- `TODO: Create AI service endpoints`
- `TODO: Implement audio processing endpoints`
- `TODO: Add collaboration endpoints`
- `TODO: Create export and rendering endpoints`
- `TODO: Implement file upload endpoints`
- `TODO: Add WebSocket endpoints`
- `TODO: Create user management endpoints`
- `TODO: Implement search and filtering endpoints`
- `TODO: Add analytics and reporting endpoints`
- `TODO: Create notification endpoints`
- `TODO: Implement backup and restore endpoints`
- `TODO: Add system health and monitoring endpoints`
- `TODO: Create admin and management endpoints`
