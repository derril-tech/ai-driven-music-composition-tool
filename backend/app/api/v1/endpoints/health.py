from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
import structlog

from app.core.database import get_db

logger = structlog.get_logger()
router = APIRouter()

@router.get("/")
async def health_check():
    """Basic health check"""
    return {
        "status": "healthy",
        "service": "ariaforge-api",
        "version": "0.1.0"
    }

@router.get("/db")
async def database_health_check(db: AsyncSession = Depends(get_db)):
    """Database health check"""
    try:
        result = await db.execute(text("SELECT 1"))
        await result.fetchone()
        return {
            "status": "healthy",
            "database": "connected"
        }
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }
