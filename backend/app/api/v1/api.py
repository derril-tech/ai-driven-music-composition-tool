from fastapi import APIRouter

from app.api.v1.endpoints import health, projects, tracks, sessions, exports, auth

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(tracks.router, prefix="/tracks", tags=["tracks"])
api_router.include_router(sessions.router, prefix="/sessions", tags=["sessions"])
api_router.include_router(exports.router, prefix="/exports", tags=["exports"])
