# MEA Library Portal

## Current State
HomePage.tsx has:
- Hero slider (working, overlay, arrows outside)
- MEA Reading Room cards (4 cards, no hover effects)
- Resources section (3-column static layout: IR Databases, Archival Databases, Online Newspapers)
- Digital Services cards (no hover effects)
- Announcements section (65/35 layout with Library Hours + Latest Tenders right panel)
- New Arrivals carousel (arrows outside the container)
- No tricolor strip at top

## Requested Changes (Diff)

### Add
- Tricolor strip (5px, full-width: saffron #FF9933 / white / green #138808) as absolute topmost element above utility bar
- Tab UI for Announcements (tabs: Announcements | News) with ARIA, keyboard nav, fade transition
- News tab content (same card structure as Announcements)
- Hover effects on MEA Reading Room cards: shadow increase, scale(1.03), saffron border, light saffron bg tint
- Hover effects on Digital Services cards: same as above
- 6-tab Resources section: IR Databases/Data Sources, Archival Databases, Online Newspapers & Magazines, Online Journals, E-Books, Print Books

### Modify
- Announcements section: remove Library Hours card and Latest Tenders & Notices from right panel; replace right panel with News tab content inside the tab UI
- Resources section: replace static 3-column layout with tabbed layout (6 tabs with specific content per spec)
- New Arrivals carousel: move arrows inside carousel (absolute positioned, left 12px / right 12px, vertically centered)

### Remove
- Library Hours card from announcements sidebar
- Latest Tenders & Notices card from announcements sidebar
- Static 3-column resources grid

## Implementation Plan
1. Add tricolor strip div at very top of HomePage return (above hero section)
2. Replace Resources section with 6-tab tabbed layout with all content
3. Replace Announcements 65/35 layout with full-width tab UI (Announcements | News)
4. Add hover classes to MEA Reading Room and Digital Services cards
5. Move New Arrivals carousel arrows inside the container (absolute positioned)
