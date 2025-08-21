import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Music, Mic, Settings, Download, Play, Plus } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-6">
            AriaForge
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            AI-Driven Music Composition Tool
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Create professional music with AI assistance. Generate melodies, harmonies, rhythms, 
            and full arrangements with theory-aware controls and human-in-the-loop approvals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/projects">
                <Plus className="mr-2 h-5 w-5" />
                Start New Project
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Music className="h-8 w-8 text-primary mb-2" />
              <CardTitle>AI Composition</CardTitle>
              <CardDescription>
                Generate chord progressions, melodies, drum patterns, and full arrangements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Theory-aware controls</li>
                <li>• Style-based generation</li>
                <li>• Real-time collaboration</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Mic className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Lyrics & Vocals</CardTitle>
              <CardDescription>
                Create lyrics with syllable alignment and vocal timing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Phoneme-level timing</li>
                <li>• Stress alignment</li>
                <li>• TTS integration ready</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Settings className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Professional Mixing</CardTitle>
              <CardDescription>
                Advanced DSP pipeline with stems and mastering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Multi-track stems</li>
                <li>• LUFS normalization</li>
                <li>• Export to DAW</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Download className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Multiple Formats</CardTitle>
              <CardDescription>
                Export in various formats for different workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• WAV, MP3, FLAC</li>
                <li>• MIDI & MusicXML</li>
                <li>• Stems & loop packs</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-blue-500 rounded mb-2" />
              <CardTitle>Rights & Safety</CardTitle>
              <CardDescription>
                Built-in similarity checks and provenance tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Style similarity detection</li>
                <li>• Content ID checks</li>
                <li>• Provenance bundles</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded mb-2" />
              <CardTitle>Collaboration</CardTitle>
              <CardDescription>
                Real-time collaboration with approval workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Multi-user editing</li>
                <li>• Approval gates</li>
                <li>• Version control</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Create?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of musicians and producers using AriaForge to create amazing music.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/projects">
              <Plus className="mr-2 h-5 w-5" />
              Start Your First Project
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
