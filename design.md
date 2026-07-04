# Editorial Design System

This document outlines the core aesthetic and design principles used across the *Editorial* web application. The goal is to create a cohesive, immersive 1930s noir newsroom experience.

## Theme & Aesthetic
- **Vibe:** 1930s Noir, Investigative Journalism, Mechanical Typewriters, Newsprint.
- **Key Characteristics:** Heavy solid shadows, thick borders, sharp corners (no border-radius), and vintage typography. The UI should feel like physical paper, folders, and mechanical buttons.

## Color Palette
The color palette is strictly limited to emulate aged paper and ink.

- **Primary Background (Paper):** `#f4ebd9` (Cream/Light Beige)
- **Secondary Background (Headers/Alt Paper):** `#e8e1d5` (Darker Beige)
- **Primary Ink (Text/Borders):** `#1a1715` (Charcoal/Almost Black)
- **Secondary Ink (Subtitles/Metadata):** `#5c534d` (Medium Brown)
- **Muted Ink (Dividers/Placeholders):** `#a89f91` (Light Brown/Grey)

## Typography
We rely on two primary font families (configured via Tailwind):

1. **`font-heading`**: Used for massive, impactful titles.
   - *Styling*: Always `uppercase`, `font-bold`, and usually `tracking-tighter`.
2. **`font-typewriter`**: Used for all body text, metadata, labels, and buttons.
   - *Styling*: For labels and buttons, always `uppercase`, `font-bold`, and `tracking-widest`. For body text, normal casing is acceptable.

## Component Architecture

### The "Card" (Menus, Case Files, Documents)
All primary content containers share this structure:
```html
<div className="paper-texture border-2 border-[#1a1715] shadow-[8px_8px_0_0_#1a1715] bg-[#f4ebd9]">
  <div className="border-b-4 border-[#1a1715] bg-[#e8e1d5] p-6 text-center">
    <h1 className="font-heading uppercase tracking-tighter">Title</h1>
    <p className="font-typewriter uppercase tracking-widest text-[#5c534d]">Subtitle</p>
  </div>
  <div className="p-8">
    <!-- Content -->
  </div>
</div>
```
- **Borders:** `border-2` for the container, `border-b-4` separating the header from the content.
- **Shadows:** Hard, unblurred shadows (`shadow-[8px_8px_0_0_#1a1715]`).

### Action Buttons
Buttons act like mechanical switches. When hovered/pressed, they physically move down and right, and their shadow shrinks.
```html
<button className="bg-[#1a1715] text-[#f4ebd9] border-2 border-[#1a1715] rounded-none font-typewriter font-bold uppercase tracking-widest shadow-[4px_4px_0_0_#1a1715] transition-all hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_#1a1715]">
  Start Game
</button>
```
- **Outline Buttons:** Use `bg-[#e8e1d5]` and `text-[#1a1715]`.
- **Primary Buttons:** Use `bg-[#1a1715]` and `text-[#f4ebd9]`.

### Dividers & Grouping
- Use thick dashed borders (`border-dashed border-2 border-[#a89f91]`) for internal visual separation.
- Use double borders (`border-double border-4 border-[#a89f91]`) to separate main content from footer actions.

### Animations & Overlays
- **Transitions:** Use `transition-all` on interactive elements to make the mechanical "press" feel smooth.
- **Overlays (like the End of Day Shutter):** Use heavy `border-y-[12px]` and extreme drop shadows (`shadow-[0_30px_0_0_rgba(26,23,21,0.8)]`) to give a sense of massive scale and weight to full-screen events.
