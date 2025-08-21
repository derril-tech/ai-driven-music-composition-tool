# Claude AI Collaboration Guidelines - AriaForge

This document outlines the guidelines for collaborating with Claude AI on the AriaForge project development.

## 🎯 Project Overview

AriaForge is an AI-driven music composition tool that combines:
- **AI Composition**: LangGraph orchestration with OpenAI/Claude
- **Real-time Collaboration**: WebSocket-based multi-user editing
- **Professional Audio**: FFmpeg-based rendering pipeline
- **Music Theory**: Theory-aware AI generation
- **Rights Management**: Content similarity detection

## 🤖 AI Integration Architecture

### LangGraph Orchestration

```python
# Example LangGraph workflow for composition
from langgraph.graph import StateGraph

class CompositionWorkflow:
    def __init__(self):
        self.graph = StateGraph(CompositionState)
        
        # Define nodes
        self.graph.add_node("analyze_prompt", self.analyze_prompt)
        self.graph.add_node("generate_melody", self.generate_melody)
        self.graph.add_node("generate_harmony", self.generate_harmony)
        self.graph.add_node("arrange_structure", self.arrange_structure)
        self.graph.add_node("human_approval", self.human_approval)
        
        # Define edges
        self.graph.add_edge("analyze_prompt", "generate_melody")
        self.graph.add_edge("generate_melody", "generate_harmony")
        self.graph.add_edge("generate_harmony", "arrange_structure")
        self.graph.add_edge("arrange_structure", "human_approval")
```

### Claude Integration Points

1. **Composition Generation**
   - Melody generation with theory constraints
   - Chord progression analysis
   - Arrangement suggestions
   - Style matching

2. **Lyrics Generation**
   - Phoneme-level timing
   - Stress pattern alignment
   - Rhyme scheme generation
   - Emotional tone matching

3. **Analysis & Feedback**
   - Music theory analysis
   - Style similarity detection
   - Quality assessment
   - Improvement suggestions

## 📋 Claude Prompt Guidelines

### Structured Output Requirements

All Claude interactions must use structured outputs with Pydantic schemas:

```python
from pydantic import BaseModel
from typing import List, Optional

class CompositionRequest(BaseModel):
    prompt: str
    style: str
    tempo: int
    key: str
    duration: int
    instruments: List[str]

class CompositionResponse(BaseModel):
    melody_notes: List[str]
    chord_progression: List[str]
    arrangement: dict
    confidence_score: float
    theory_notes: List[str]
```

### Prompt Engineering Principles

1. **Clear Constraints**
   - Specify exact output format
   - Define musical parameters
   - Set quality thresholds

2. **Context Provision**
   - Include relevant music theory
   - Provide style references
   - Share user preferences

3. **Iterative Refinement**
   - Human-in-the-loop approval
   - Feedback integration
   - Version control

### Example Prompts

#### Melody Generation
```
You are a music composition expert. Generate a melody for a pop song with these constraints:

- Key: C major
- Tempo: 120 BPM
- Duration: 16 bars
- Style: Contemporary pop
- Target audience: Young adults

Requirements:
- Use diatonic notes from C major scale
- Include rhythmic variety
- Create memorable hook
- Follow AABA structure

Output the melody as a structured JSON with:
- Note sequence (pitch and duration)
- Rhythm pattern
- Phrase structure
- Theory analysis
```

#### Chord Progression Analysis
```
Analyze this chord progression for a jazz composition:

Progression: Cmaj7 - Dm7 - G7 - Cmaj7

Provide:
- Roman numeral analysis
- Functional harmony explanation
- Tension and resolution points
- Substitution suggestions
- Voice leading recommendations

Format as structured JSON with theory details.
```

## 🔄 Human-in-the-Loop Workflow

### Approval Gates

1. **Initial Generation**
   - AI creates draft composition
   - System presents to user
   - User provides feedback

2. **Refinement Cycle**
   - AI incorporates feedback
   - Iterative improvements
   - Quality validation

3. **Final Approval**
   - Human review and approval
   - Version control
   - Rights verification

### Feedback Integration

```python
class FeedbackProcessor:
    def process_user_feedback(self, feedback: UserFeedback) -> CompositionUpdate:
        # Analyze feedback sentiment
        # Extract specific improvement requests
        # Generate updated composition
        # Validate against constraints
        pass
```

## 🎵 Music Theory Integration

### Theory-Aware Generation

- **Scale Constraints**: Ensure notes fit specified scale
- **Chord Functions**: Use proper harmonic progression
- **Rhythm Patterns**: Follow time signature rules
- **Form Structure**: Apply standard song forms

### Style Matching

- **Genre Analysis**: Identify style characteristics
- **Reference Matching**: Compare to similar works
- **Quality Assessment**: Evaluate musical coherence
- **Improvement Suggestions**: Provide specific recommendations

## 🔍 Content Safety & Rights

### Similarity Detection

```python
class SimilarityService:
    def check_similarity(self, composition: Composition) -> SimilarityReport:
        # Audio fingerprinting
        # Melodic similarity analysis
        # Harmonic pattern matching
        # Style comparison
        pass
```

### Rights Management

- **Provenance Tracking**: Record AI contribution sources
- **License Verification**: Check usage rights
- **Content ID**: Detect copyrighted material
- **Safe Harbor**: Implement takedown procedures

## 📊 Quality Assurance

### Automated Validation

1. **Theory Compliance**
   - Scale validation
   - Chord progression logic
   - Rhythm consistency

2. **Style Consistency**
   - Genre adherence
   - Instrumentation matching
   - Production quality

3. **Technical Quality**
   - Audio format standards
   - Performance optimization
   - Error handling

### Human Review

- **Musical Judgment**: Subjective quality assessment
- **Creative Direction**: Artistic vision alignment
- **Market Fit**: Target audience appropriateness
- **Technical Feasibility**: Implementation practicality

## 🚀 Implementation Roadmap

### Phase 1: Core AI Integration
- [ ] LangGraph workflow setup
- [ ] Claude API integration
- [ ] Basic composition generation
- [ ] Structured output validation

### Phase 2: Advanced Features
- [ ] Multi-instrument composition
- [ ] Real-time collaboration
- [ ] Style transfer capabilities
- [ ] Advanced theory analysis

### Phase 3: Production Features
- [ ] Rights management system
- [ ] Quality assurance pipeline
- [ ] Performance optimization
- [ ] Scalability improvements

## 📚 Resources

### Music Theory References
- [Music Theory for Computer Musicians](https://www.amazon.com/Music-Theory-Computer-Musicians-ebook/dp/B00B8ZQK8E)
- [The Jazz Theory Book](https://www.amazon.com/Jazz-Theory-Book-Mark-Levine/dp/1883217040)
- [Harmony and Voice Leading](https://www.amazon.com/Harmony-Voice-Leading-Edward-Aldwell/dp/0495189758)

### AI/ML Resources
- [LangChain Documentation](https://python.langchain.com/)
- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic Claude Documentation](https://docs.anthropic.com/)

### Audio Processing
- [librosa Documentation](https://librosa.org/doc/latest/)
- [Essentia Documentation](https://essentia.upf.edu/)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)

## 🤝 Collaboration Guidelines

### Code Review Process
1. **AI-Generated Code**: Always review for correctness
2. **Integration Testing**: Verify AI-human interaction
3. **Performance Testing**: Ensure scalability
4. **Security Review**: Validate safety measures

### Documentation Standards
- **Prompt Documentation**: Record all AI prompts
- **Version Control**: Track AI model versions
- **Change Logging**: Document all modifications
- **User Feedback**: Archive improvement requests

### Quality Metrics
- **Composition Quality**: User satisfaction scores
- **Generation Speed**: Response time measurements
- **Accuracy**: Theory compliance rates
- **Safety**: Rights violation incidents

## 🔮 Future Enhancements

### Advanced AI Features
- **Emotional Analysis**: Mood-based composition
- **Cultural Adaptation**: Regional style integration
- **Learning Systems**: User preference adaptation
- **Creative Collaboration**: AI-human co-creation

### Technical Improvements
- **Real-time Generation**: Live composition
- **Multi-modal Input**: Text, audio, visual cues
- **Advanced Rendering**: High-fidelity audio output
- **Distributed Processing**: Scalable AI infrastructure

---

*This document serves as a living guide for AI collaboration on AriaForge. Regular updates will reflect evolving best practices and new capabilities.*
