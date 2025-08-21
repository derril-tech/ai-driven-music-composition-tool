# Testing Framework - AriaForge

This document outlines the comprehensive testing framework for AriaForge, ensuring quality, reliability, and performance across all components.

## 🎯 Testing Strategy Overview

### Testing Pyramid
```
        E2E Tests (10%)
    ┌─────────────────┐
    │                 │
    │  Integration    │
    │    Tests        │ (20%)
    │                 │
┌───┴─────────────────┴───┐
│                         │
│     Unit Tests          │ (70%)
│                         │
└─────────────────────────┘
```

### Testing Levels
1. **Unit Tests** - Individual components and functions
2. **Integration Tests** - Component interactions and API endpoints
3. **E2E Tests** - Complete user workflows
4. **Performance Tests** - Load and stress testing
5. **Security Tests** - Vulnerability and penetration testing
6. **Music-Specific Tests** - Music theory and audio processing validation

## 🧪 Unit Testing Framework

### Frontend Unit Testing

#### Test Setup
```typescript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/test/**/*',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

#### Component Testing Pattern
```typescript
// Component.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Component } from './Component';
import { useAudioEngine } from '@/hooks/useAudioEngine';

// Mock audio engine hook
jest.mock('@/hooks/useAudioEngine');
const mockUseAudioEngine = useAudioEngine as jest.MockedFunction<typeof useAudioEngine>;

describe('Component', () => {
  beforeEach(() => {
    mockUseAudioEngine.mockReturnValue({
      audioContext: null,
      isInitialized: false,
      error: null,
      initialize: jest.fn(),
      playNote: jest.fn(),
    });
  });

  it('should render correctly', () => {
    render(<Component />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    render(<Component />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Expected text')).toBeInTheDocument();
    });
  });

  it('should handle music-specific functionality', () => {
    // Test music theory constraints
    // Test audio processing
    // Test real-time collaboration
  });

  it('should handle error states', () => {
    mockUseAudioEngine.mockReturnValue({
      audioContext: null,
      isInitialized: false,
      error: new Error('Audio context failed'),
      initialize: jest.fn(),
      playNote: jest.fn(),
    });

    render(<Component />);
    expect(screen.getByText('Audio context failed')).toBeInTheDocument();
  });
});
```

#### Hook Testing Pattern
```typescript
// useHook.test.ts
import { renderHook, act } from '@testing-library/react';
import { useHook } from './useHook';

describe('useHook', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useHook());
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle async operations', async () => {
    const { result } = renderHook(() => useHook());
    
    await act(async () => {
      await result.current.actions.fetchData();
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeDefined();
  });

  it('should handle errors gracefully', async () => {
    const { result } = renderHook(() => useHook());
    
    await act(async () => {
      await result.current.actions.fetchData();
    });
    
    expect(result.current.error).toBeDefined();
  });
});
```

### Backend Unit Testing

#### Test Setup
```python
# conftest.py
import pytest
from fastapi.testclient import TestClient
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from app.core.database import get_db
from app.main import app

# Test database setup
TEST_DATABASE_URL = "postgresql+asyncpg://test_user:test_pass@localhost:5432/ariaforge_test"

engine = create_async_engine(TEST_DATABASE_URL)
TestingSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

@pytest.fixture
async def db_session():
    async with TestingSessionLocal() as session:
        yield session
        await session.rollback()

@pytest.fixture
def client(db_session):
    def override_get_db():
        yield db_session
    
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
```

#### Service Testing Pattern
```python
# test_service.py
import pytest
from unittest.mock import Mock, patch
from app.services.composition_service import CompositionService
from app.schemas.composition import CompositionRequest

class TestCompositionService:
    @pytest.fixture
    async def service(self, db_session):
        return CompositionService(db_session)
    
    async def test_create_composition_success(self, service):
        # Arrange
        request = CompositionRequest(
            prompt="Create a pop song",
            style="pop",
            tempo=120,
            key="C",
            duration=180,
            instruments=["piano", "guitar"]
        )
        
        # Act
        result = await service.create_composition(request, user_id="test_user")
        
        # Assert
        assert result is not None
        assert result.style == "pop"
        assert result.tempo == 120
        assert len(result.melody_notes) > 0
    
    async def test_create_composition_invalid_tempo(self, service):
        # Arrange
        request = CompositionRequest(
            prompt="Create a song",
            style="pop",
            tempo=300,  # Invalid tempo
            key="C",
            duration=180,
            instruments=["piano"]
        )
        
        # Act & Assert
        with pytest.raises(ValueError, match="Tempo must be between 40 and 200"):
            await service.create_composition(request, user_id="test_user")
    
    async def test_music_theory_validation(self, service):
        # Test music theory constraints
        # Test scale validation
        # Test chord progression logic
        pass
    
    async def test_audio_processing(self, service):
        # Test audio file processing
        # Test MIDI generation
        # Test audio quality validation
        pass
```

#### API Endpoint Testing Pattern
```python
# test_endpoints.py
import pytest
from fastapi.testclient import TestClient
from app.schemas.composition import CompositionRequest

class TestCompositionEndpoints:
    async def test_create_composition_success(self, client: TestClient):
        # Arrange
        request_data = {
            "prompt": "Create a pop song",
            "style": "pop",
            "tempo": 120,
            "key": "C",
            "duration": 180,
            "instruments": ["piano", "guitar"]
        }
        
        # Act
        response = client.post("/api/v1/compositions/", json=request_data)
        
        # Assert
        assert response.status_code == 201
        data = response.json()
        assert data["style"] == "pop"
        assert data["tempo"] == 120
    
    async def test_create_composition_validation_error(self, client: TestClient):
        # Arrange
        request_data = {
            "prompt": "Create a song",
            "style": "pop",
            "tempo": 300,  # Invalid tempo
            "key": "C",
            "duration": 180,
            "instruments": ["piano"]
        }
        
        # Act
        response = client.post("/api/v1/compositions/", json=request_data)
        
        # Assert
        assert response.status_code == 422
        assert "tempo" in response.json()["detail"][0]["loc"]
    
    async def test_get_composition_not_found(self, client: TestClient):
        # Act
        response = client.get("/api/v1/compositions/nonexistent-id")
        
        # Assert
        assert response.status_code == 404
```

## 🔗 Integration Testing Framework

### API Integration Testing
```python
# test_api_integration.py
import pytest
from fastapi.testclient import TestClient
from app.main import app

class TestAPIIntegration:
    @pytest.fixture
    def client(self):
        return TestClient(app)
    
    async def test_composition_workflow(self, client: TestClient):
        """Test complete composition workflow from creation to export"""
        
        # 1. Create composition
        create_response = client.post("/api/v1/compositions/", json={
            "prompt": "Create a jazz song",
            "style": "jazz",
            "tempo": 140,
            "key": "F",
            "duration": 240,
            "instruments": ["piano", "bass", "drums"]
        })
        assert create_response.status_code == 201
        composition_id = create_response.json()["id"]
        
        # 2. Get composition
        get_response = client.get(f"/api/v1/compositions/{composition_id}")
        assert get_response.status_code == 200
        
        # 3. Update composition
        update_response = client.put(f"/api/v1/compositions/{composition_id}", json={
            "tempo": 150
        })
        assert update_response.status_code == 200
        
        # 4. Export composition
        export_response = client.post(f"/api/v1/compositions/{composition_id}/export", json={
            "format": "wav",
            "quality": "high"
        })
        assert export_response.status_code == 202
    
    async def test_real_time_collaboration(self, client: TestClient):
        """Test real-time collaboration features"""
        # Test WebSocket connections
        # Test simultaneous editing
        # Test conflict resolution
        pass
    
    async def test_audio_processing_pipeline(self, client: TestClient):
        """Test complete audio processing pipeline"""
        # Test file upload
        # Test audio analysis
        # Test MIDI generation
        # Test audio rendering
        pass
```

### Database Integration Testing
```python
# test_database_integration.py
import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.composition import Composition
from app.services.composition_service import CompositionService

class TestDatabaseIntegration:
    async def test_composition_persistence(self, db_session: AsyncSession):
        # Arrange
        service = CompositionService(db_session)
        
        # Act
        composition = await service.create_composition(
            CompositionRequest(
                prompt="Test composition",
                style="pop",
                tempo=120,
                key="C",
                duration=180,
                instruments=["piano"]
            ),
            user_id="test_user"
        )
        
        # Assert
        assert composition.id is not None
        
        # Verify persistence
        saved_composition = await service.get_by_id(composition.id)
        assert saved_composition is not None
        assert saved_composition.prompt == "Test composition"
    
    async def test_music_data_storage(self, db_session: AsyncSession):
        """Test storage and retrieval of music-specific data"""
        # Test MIDI data storage
        # Test audio metadata storage
        # Test music theory information storage
        pass
```

## 🌐 E2E Testing Framework

### Playwright E2E Testing
```typescript
// e2e/composition-workflow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Composition Workflow', () => {
  test('should create and export a composition', async ({ page }) => {
    // Navigate to composition page
    await page.goto('/compose');
    
    // Fill composition form
    await page.fill('[data-testid="prompt-input"]', 'Create a pop song');
    await page.selectOption('[data-testid="style-select"]', 'pop');
    await page.fill('[data-testid="tempo-input"]', '120');
    await page.selectOption('[data-testid="key-select"]', 'C');
    await page.fill('[data-testid="duration-input"]', '180');
    
    // Submit form
    await page.click('[data-testid="create-composition-btn"]');
    
    // Wait for composition to be generated
    await page.waitForSelector('[data-testid="composition-ready"]');
    
    // Verify composition details
    await expect(page.locator('[data-testid="composition-style"]')).toHaveText('pop');
    await expect(page.locator('[data-testid="composition-tempo"]')).toHaveText('120');
    
    // Export composition
    await page.click('[data-testid="export-btn"]');
    await page.selectOption('[data-testid="export-format"]', 'wav');
    await page.click('[data-testid="start-export-btn"]');
    
    // Wait for export to complete
    await page.waitForSelector('[data-testid="export-complete"]');
    
    // Verify download
    const downloadPromise = page.waitForEvent('download');
    await page.click('[data-testid="download-btn"]');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.wav$/);
  });

  test('should handle real-time collaboration', async ({ page, context }) => {
    // Create second browser context for collaboration
    const page2 = await context.newPage();
    
    // Both users navigate to same composition
    await page.goto('/compose/test-composition');
    await page2.goto('/compose/test-composition');
    
    // User 1 makes changes
    await page.click('[data-testid="add-note-btn"]');
    await page.click('[data-testid="piano-key-C4"]');
    
    // Verify User 2 sees changes in real-time
    await expect(page2.locator('[data-testid="note-C4"]')).toBeVisible();
  });

  test('should handle audio recording and playback', async ({ page }) => {
    // Navigate to recording page
    await page.goto('/record');
    
    // Start recording
    await page.click('[data-testid="start-recording-btn"]');
    
    // Simulate audio input (would need actual audio in real test)
    await page.waitForTimeout(3000);
    
    // Stop recording
    await page.click('[data-testid="stop-recording-btn"]');
    
    // Verify recording was captured
    await expect(page.locator('[data-testid="recording-waveform"]')).toBeVisible();
    
    // Play back recording
    await page.click('[data-testid="play-recording-btn"]');
    
    // Verify playback is working
    await expect(page.locator('[data-testid="playback-progress"]')).toBeVisible();
  });
});
```

## 🎵 Music-Specific Testing

### Music Theory Testing
```python
# test_music_theory.py
import pytest
from app.services.music_theory_service import MusicTheoryService

class TestMusicTheory:
    @pytest.fixture
    def theory_service(self):
        return MusicTheoryService()
    
    def test_scale_validation(self, theory_service):
        """Test that generated notes follow specified scale"""
        # Test C major scale
        scale_notes = theory_service.get_scale_notes("C", "major")
        assert "C" in scale_notes
        assert "D" in scale_notes
        assert "E" in scale_notes
        assert "F" in scale_notes
        assert "G" in scale_notes
        assert "A" in scale_notes
        assert "B" in scale_notes
        assert "C#" not in scale_notes  # Not in C major
    
    def test_chord_progression_validation(self, theory_service):
        """Test chord progression follows functional harmony"""
        progression = ["C", "Am", "F", "G"]
        is_valid = theory_service.validate_chord_progression(progression, "C")
        assert is_valid is True
        
        # Test invalid progression
        invalid_progression = ["C", "C#", "D", "D#"]
        is_valid = theory_service.validate_chord_progression(invalid_progression, "C")
        assert is_valid is False
    
    def test_melody_scale_compliance(self, theory_service):
        """Test melody notes follow specified scale"""
        melody_notes = ["C4", "E4", "G4", "C5"]
        is_compliant = theory_service.validate_melody_scale(melody_notes, "C", "major")
        assert is_compliant is True
        
        # Test non-compliant melody
        non_compliant_notes = ["C4", "C#4", "D4", "D#4"]
        is_compliant = theory_service.validate_melody_scale(non_compliant_notes, "C", "major")
        assert is_compliant is False
```

### Audio Processing Testing
```python
# test_audio_processing.py
import pytest
import numpy as np
from app.services.audio_service import AudioService

class TestAudioProcessing:
    @pytest.fixture
    def audio_service(self):
        return AudioService()
    
    def test_audio_analysis(self, audio_service):
        """Test audio feature extraction"""
        # Create test audio data
        sample_rate = 44100
        duration = 1.0  # 1 second
        frequency = 440  # A4 note
        t = np.linspace(0, duration, int(sample_rate * duration))
        audio_data = np.sin(2 * np.pi * frequency * t)
        
        # Analyze audio
        features = audio_service.extract_features(audio_data, sample_rate)
        
        # Verify features
        assert features["tempo"] is not None
        assert features["key"] is not None
        assert features["chords"] is not None
        assert len(features["chords"]) > 0
    
    def test_midi_generation(self, audio_service):
        """Test MIDI file generation"""
        # Create test composition data
        composition_data = {
            "notes": [
                {"pitch": 60, "velocity": 80, "start_time": 0.0, "duration": 0.5},
                {"pitch": 62, "velocity": 80, "start_time": 0.5, "duration": 0.5},
                {"pitch": 64, "velocity": 80, "start_time": 1.0, "duration": 0.5},
            ],
            "tempo": 120,
            "time_signature": "4/4"
        }
        
        # Generate MIDI
        midi_data = audio_service.generate_midi(composition_data)
        
        # Verify MIDI data
        assert midi_data is not None
        assert len(midi_data) > 0
    
    def test_audio_quality_validation(self, audio_service):
        """Test audio quality standards"""
        # Test sample rate validation
        assert audio_service.validate_sample_rate(44100) is True
        assert audio_service.validate_sample_rate(22050) is False
        
        # Test bit depth validation
        assert audio_service.validate_bit_depth(24) is True
        assert audio_service.validate_bit_depth(8) is False
        
        # Test loudness normalization
        audio_data = np.random.rand(44100)  # 1 second of random audio
        normalized_audio = audio_service.normalize_loudness(audio_data, target_lufs=-14.0)
        assert normalized_audio is not None
```

## ⚡ Performance Testing Framework

### Load Testing
```python
# test_performance.py
import pytest
import asyncio
import time
from locust import HttpUser, task, between
from app.services.performance_service import PerformanceService

class PerformanceTest:
    @pytest.fixture
    def performance_service(self):
        return PerformanceService()
    
    async def test_api_response_time(self, performance_service):
        """Test API response times under load"""
        start_time = time.time()
        
        # Simulate concurrent requests
        tasks = []
        for i in range(100):
            task = performance_service.test_api_endpoint("/api/v1/compositions/")
            tasks.append(task)
        
        results = await asyncio.gather(*tasks)
        end_time = time.time()
        
        # Calculate statistics
        response_times = [result["response_time"] for result in results]
        avg_response_time = sum(response_times) / len(response_times)
        max_response_time = max(response_times)
        
        # Assert performance requirements
        assert avg_response_time < 0.2  # 200ms average
        assert max_response_time < 1.0   # 1s maximum
        assert end_time - start_time < 30  # Complete within 30s
    
    async def test_audio_processing_performance(self, performance_service):
        """Test audio processing performance"""
        # Test audio rendering performance
        # Test MIDI processing performance
        # Test real-time collaboration performance
        pass

# Locust load testing
class CompositionUser(HttpUser):
    wait_time = between(1, 3)
    
    @task(3)
    def create_composition(self):
        self.client.post("/api/v1/compositions/", json={
            "prompt": "Create a test song",
            "style": "pop",
            "tempo": 120,
            "key": "C",
            "duration": 180,
            "instruments": ["piano"]
        })
    
    @task(1)
    def get_composition(self):
        self.client.get("/api/v1/compositions/test-id")
```

## 🔒 Security Testing Framework

### Security Testing
```python
# test_security.py
import pytest
from app.services.security_service import SecurityService

class TestSecurity:
    @pytest.fixture
    def security_service(self):
        return SecurityService()
    
    def test_authentication_validation(self, security_service):
        """Test authentication mechanisms"""
        # Test JWT token validation
        # Test password hashing
        # Test session management
        pass
    
    def test_authorization_checks(self, security_service):
        """Test authorization and access control"""
        # Test role-based access control
        # Test resource ownership validation
        # Test permission checks
        pass
    
    def test_input_validation(self, security_service):
        """Test input validation and sanitization"""
        # Test SQL injection prevention
        # Test XSS prevention
        # Test file upload validation
        pass
    
    def test_content_similarity_detection(self, security_service):
        """Test content similarity and rights management"""
        # Test audio fingerprinting
        # Test melody similarity detection
        # Test copyright violation detection
        pass
```

## 📊 Test Reporting and Monitoring

### Test Coverage Reporting
```yaml
# .github/workflows/test-coverage.yml
name: Test Coverage

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  coverage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: |
          npm install
          pip install -r backend/requirements.txt
      - name: Run tests with coverage
        run: |
          npm run test:coverage
          pytest --cov=app --cov-report=xml backend/tests/
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info,./backend/coverage.xml
          flags: frontend,backend
          name: codecov-umbrella
```

### Test Results Dashboard
```typescript
// test-dashboard.ts
interface TestMetrics {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  coverage: {
    statements: number;
    branches: number;
    functions: number;
    lines: number;
  };
  performance: {
    avgResponseTime: number;
    maxResponseTime: number;
    throughput: number;
  };
  security: {
    vulnerabilities: number;
    criticalIssues: number;
    complianceScore: number;
  };
}

class TestDashboard {
  async generateReport(): Promise<TestMetrics> {
    // Generate comprehensive test report
    // Include coverage metrics
    // Include performance benchmarks
    // Include security scan results
    return {} as TestMetrics;
  }
}
```

## 🚀 Continuous Testing Pipeline

### GitHub Actions Testing Workflow
```yaml
# .github/workflows/testing.yml
name: Comprehensive Testing

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Frontend Unit Tests
        run: npm test
      - name: Run Backend Unit Tests
        run: pytest backend/tests/unit/
  
  integration-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:6
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v3
      - name: Run Integration Tests
        run: pytest backend/tests/integration/
  
  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Playwright
        run: npx playwright install
      - name: Run E2E Tests
        run: npx playwright test
  
  performance-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Performance Tests
        run: |
          pytest backend/tests/performance/
          npx lighthouse --output=json --output-path=./lighthouse-report.json
  
  security-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Security Tests
        run: |
          npm audit
          bandit -r backend/
          safety check
```

---

**This comprehensive testing framework ensures quality, reliability, and performance across all AriaForge components, with special attention to music-specific requirements and real-time collaboration features.**
