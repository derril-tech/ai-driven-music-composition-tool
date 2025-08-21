# API Specification - AriaForge

This document outlines the complete API specification for the AriaForge music composition tool.

## 🔗 Base URL

- **Development**: `http://localhost:8000`
- **Production**: `https://api.ariaforge.com`

## 📋 API Versioning

All endpoints are prefixed with `/api/v1/`

## 🔐 Authentication

### JWT Token Authentication

```http
Authorization: Bearer <access_token>
```

### Token Endpoints

#### POST `/api/v1/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

#### POST `/api/v1/auth/refresh`
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

#### POST `/api/v1/auth/logout`
Logout and invalidate tokens.

## 📁 Projects

### GET `/api/v1/projects`
List all projects for the authenticated user.

**Query Parameters:**
- `page` (int): Page number (default: 1)
- `limit` (int): Items per page (default: 20)
- `search` (string): Search term
- `status` (string): Filter by status (draft, active, archived)

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "My Song",
      "description": "A beautiful composition",
      "status": "active",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z",
      "tempo": 120,
      "key": "C",
      "meter": {"numerator": 4, "denominator": 4}
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 20
}
```

### POST `/api/v1/projects`
Create a new project.

**Request Body:**
```json
{
  "name": "New Project",
  "description": "Project description",
  "tempo": 120,
  "key": "C",
  "meter": {"numerator": 4, "denominator": 4},
  "genre": "pop"
}
```

### GET `/api/v1/projects/{project_id}`
Get project details.

**Response:**
```json
{
  "id": "uuid",
  "name": "My Song",
  "description": "A beautiful composition",
  "status": "active",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "tempo": 120,
  "key": "C",
  "meter": {"numerator": 4, "denominator": 4},
  "genre": "pop",
  "tracks": [...],
  "sections": [...]
}
```

### PUT `/api/v1/projects/{project_id}`
Update project details.

### DELETE `/api/v1/projects/{project_id}`
Delete project.

## 🎵 Tracks

### GET `/api/v1/projects/{project_id}/tracks`
List all tracks in a project.

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "Drums",
      "type": "drums",
      "color": "#FF0000",
      "muted": false,
      "solo": false,
      "volume": 0.8,
      "pan": 0.0,
      "clips": [...]
    }
  ]
}
```

### POST `/api/v1/projects/{project_id}/tracks`
Create a new track.

**Request Body:**
```json
{
  "name": "Bass",
  "type": "bass",
  "color": "#00FF00"
}
```

### PUT `/api/v1/tracks/{track_id}`
Update track properties.

### DELETE `/api/v1/tracks/{track_id}`
Delete track.

## 🎼 Clips

### GET `/api/v1/tracks/{track_id}/clips`
List all clips in a track.

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "Verse 1",
      "start_time": 0.0,
      "end_time": 16.0,
      "type": "midi",
      "data": {...}
    }
  ]
}
```

### POST `/api/v1/tracks/{track_id}/clips`
Create a new clip.

**Request Body:**
```json
{
  "name": "Chorus",
  "start_time": 16.0,
  "end_time": 32.0,
  "type": "midi",
  "data": {
    "notes": [...],
    "velocity": 100,
    "channel": 0
  }
}
```

## 🎤 Sessions

### GET `/api/v1/projects/{project_id}/sessions`
List composition sessions.

### POST `/api/v1/projects/{project_id}/sessions`
Start a new AI composition session.

**Request Body:**
```json
{
  "prompt": "Create a pop song with catchy melody",
  "style": "pop",
  "mood": "upbeat",
  "instruments": ["piano", "drums", "bass"]
}
```

**Response:**
```json
{
  "session_id": "uuid",
  "status": "processing",
  "progress": 0.25,
  "estimated_completion": "2024-01-01T00:05:00Z"
}
```

### GET `/api/v1/sessions/{session_id}`
Get session status and results.

### WebSocket `/api/v1/sessions/{session_id}/ws`
Real-time session updates.

## 🎚️ Mixing

### GET `/api/v1/projects/{project_id}/mix`
Get current mix settings.

### PUT `/api/v1/projects/{project_id}/mix`
Update mix settings.

**Request Body:**
```json
{
  "master_volume": 0.8,
  "master_pan": 0.0,
  "fx_chain": [
    {
      "type": "eq",
      "settings": {...}
    },
    {
      "type": "compressor",
      "settings": {...}
    }
  ]
}
```

## 📤 Exports

### POST `/api/v1/projects/{project_id}/exports`
Request an export.

**Request Body:**
```json
{
  "format": "wav",
  "quality": "high",
  "include_stems": true,
  "include_midi": true,
  "include_musicxml": true,
  "start_time": 0.0,
  "end_time": 180.0
}
```

**Response:**
```json
{
  "export_id": "uuid",
  "status": "queued",
  "estimated_completion": "2024-01-01T00:10:00Z"
}
```

### GET `/api/v1/exports/{export_id}`
Get export status and download links.

**Response:**
```json
{
  "id": "uuid",
  "status": "completed",
  "download_url": "https://storage.example.com/exports/uuid.zip",
  "files": [
    {
      "name": "master.wav",
      "url": "https://storage.example.com/exports/master.wav",
      "size": 10485760
    }
  ]
}
```

## 📚 Library

### GET `/api/v1/library/samples`
List available samples.

**Query Parameters:**
- `category` (string): Sample category
- `bpm` (int): Target BPM
- `key` (string): Target key
- `search` (string): Search term

### GET `/api/v1/library/presets`
List available presets.

### POST `/api/v1/library/upload`
Upload sample or preset.

## 🔍 Similarity & Rights

### POST `/api/v1/similarity/check`
Check content similarity.

**Request Body:**
```json
{
  "audio_data": "base64_encoded_audio",
  "threshold": 0.85
}
```

**Response:**
```json
{
  "similarity_score": 0.23,
  "is_safe": true,
  "warnings": [],
  "recommendations": []
}
```

## 📊 Analytics

### GET `/api/v1/analytics/projects/{project_id}`
Get project analytics.

**Response:**
```json
{
  "render_time": 45.2,
  "revision_count": 12,
  "collaboration_hours": 8.5,
  "export_count": 5
}
```

## 🚨 Error Responses

### Standard Error Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  }
}
```

### Common Error Codes
- `AUTHENTICATION_ERROR` - Invalid or missing authentication
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `VALIDATION_ERROR` - Invalid input data
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource conflict
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Server error

## 📈 Rate Limiting

- **Standard**: 1000 requests per hour
- **Export**: 10 requests per hour
- **Upload**: 50 requests per hour

## 🔄 WebSocket Events

### Session Updates
```json
{
  "type": "session_update",
  "session_id": "uuid",
  "progress": 0.75,
  "status": "processing"
}
```

### Collaboration
```json
{
  "type": "collaboration_update",
  "user_id": "uuid",
  "action": "note_added",
  "data": {...}
}
```

### Real-time Mixing
```json
{
  "type": "mix_update",
  "track_id": "uuid",
  "volume": 0.8,
  "pan": 0.0
}
```
