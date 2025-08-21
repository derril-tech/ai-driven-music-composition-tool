import structlog
import logging
import sys
from typing import Any, Dict

from app.core.config import settings

def setup_logging():
    """Setup structured logging configuration"""
    
    # Configure standard library logging
    logging.basicConfig(
        format="%(message)s",
        stream=sys.stdout,
        level=getattr(logging, settings.LOG_LEVEL.upper()),
    )
    
    # Configure structlog
    structlog.configure(
        processors=[
            structlog.stdlib.filter_by_level,
            structlog.stdlib.add_logger_name,
            structlog.stdlib.add_log_level,
            structlog.stdlib.PositionalArgumentsFormatter(),
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.StackInfoRenderer(),
            structlog.processors.format_exc_info,
            structlog.processors.UnicodeDecoder(),
            structlog.processors.JSONRenderer() if settings.LOG_FORMAT == "json" else structlog.dev.ConsoleRenderer(),
        ],
        context_class=dict,
        logger_factory=structlog.stdlib.LoggerFactory(),
        wrapper_class=structlog.stdlib.BoundLogger,
        cache_logger_on_first_use=True,
    )

def get_logger(name: str = None) -> structlog.BoundLogger:
    """Get a structured logger instance"""
    return structlog.get_logger(name)

def log_request(request_id: str, method: str, path: str, **kwargs):
    """Log HTTP request details"""
    logger = get_logger("http.request")
    logger.info(
        "HTTP request",
        request_id=request_id,
        method=method,
        path=path,
        **kwargs
    )

def log_response(request_id: str, status_code: int, duration_ms: float, **kwargs):
    """Log HTTP response details"""
    logger = get_logger("http.response")
    logger.info(
        "HTTP response",
        request_id=request_id,
        status_code=status_code,
        duration_ms=duration_ms,
        **kwargs
    )
