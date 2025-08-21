# UI Components - Instructions for Claude

This folder contains the base UI components for AriaForge, built with shadcn/ui and Radix UI.

## 🎨 Components to Implement

### Form Components
- `input.tsx` - Text input with validation
- `textarea.tsx` - Multi-line text input
- `select.tsx` - Dropdown selection
- `checkbox.tsx` - Checkbox input
- `radio-group.tsx` - Radio button group
- `form.tsx` - Form wrapper with validation

### Layout Components
- `container.tsx` - Responsive container
- `grid.tsx` - CSS Grid layout
- `flex.tsx` - Flexbox layout
- `separator.tsx` - Visual separator
- `divider.tsx` - Section divider

### Feedback Components
- `alert.tsx` - Alert messages
- `badge.tsx` - Status badges
- `progress.tsx` - Progress indicators
- `skeleton.tsx` - Loading skeletons
- `spinner.tsx` - Loading spinner

### Navigation Components
- `breadcrumb.tsx` - Breadcrumb navigation
- `pagination.tsx` - Page navigation
- `tabs.tsx` - Tab navigation
- `accordion.tsx` - Collapsible sections
- `navigation-menu.tsx` - Navigation menu

### Overlay Components
- `modal.tsx` - Modal dialogs
- `popover.tsx` - Popover content
- `tooltip.tsx` - Tooltip hints
- `drawer.tsx` - Slide-out drawer
- `context-menu.tsx` - Context menus

## 🎯 Key Requirements

### Accessibility
- WCAG 2.1 AA compliance
- Full keyboard navigation
- Screen reader support
- Focus management
- ARIA attributes

### Design System
- Consistent with music-themed design
- Dark/light theme support
- Responsive design
- Touch-friendly interactions
- Performance optimized

### Music-Specific Features
- Color-coded track indicators
- Waveform visualization components
- Piano roll grid components
- Timeline ruler components
- Audio control components

## 📋 Implementation Guidelines

1. **Component Structure**: Use functional components with TypeScript
2. **Styling**: Use Tailwind CSS with design tokens
3. **Accessibility**: Implement proper ARIA attributes
4. **Performance**: Use React.memo and useMemo where appropriate
5. **Testing**: Write unit tests for all components

## 🔧 Technical Specifications

### Component Pattern
```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        default: "default-size",
        sm: "small-size",
        lg: "large-size",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Additional props
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component, componentVariants }
```

### Music-Specific Components
```typescript
// Piano Roll Grid Component
interface PianoRollGridProps {
  notes: Note[]
  resolution: number
  onNoteClick: (note: Note) => void
  onNoteDrag: (note: Note, newPosition: Position) => void
}

const PianoRollGrid: React.FC<PianoRollGridProps> = ({
  notes,
  resolution,
  onNoteClick,
  onNoteDrag,
}) => {
  return (
    <div className="piano-roll-grid">
      {/* Grid implementation */}
    </div>
  )
}

// Waveform Display Component
interface WaveformDisplayProps {
  audioData: Float32Array
  width: number
  height: number
  color?: string
}

const WaveformDisplay: React.FC<WaveformDisplayProps> = ({
  audioData,
  width,
  height,
  color = "hsl(var(--waveform-positive))",
}) => {
  return (
    <div className="waveform-display">
      {/* Waveform implementation */}
    </div>
  )
}
```

### Form Components
```typescript
// Form Input Component
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="form-input-wrapper">
        {label && <label className="form-label">{label}</label>}
        <input
          className={cn("form-input", error && "form-input-error", className)}
          ref={ref}
          {...props}
        />
        {error && <span className="form-error">{error}</span>}
        {helperText && <span className="form-helper">{helperText}</span>}
      </div>
    )
  }
)
```

## 📝 TODO Markers

Look for these TODO markers in the codebase:
- `TODO: Implement form input components`
- `TODO: Add layout components`
- `TODO: Create feedback components`
- `TODO: Implement navigation components`
- `TODO: Add overlay components`
- `TODO: Create music-specific components`
- `TODO: Add accessibility features`
- `TODO: Implement dark/light theme`
- `TODO: Add responsive design`
- `TODO: Create loading states`
- `TODO: Implement error boundaries`
- `TODO: Add keyboard navigation`
- `TODO: Create touch interactions`
- `TODO: Add performance optimizations`
- `TODO: Write component tests`
