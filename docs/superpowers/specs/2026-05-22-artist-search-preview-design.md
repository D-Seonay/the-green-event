# Design Spec: Artist Search Preview (404 Page)

## 1. Overview
Enhancement of the 404 page's search bar to provide a dynamic, integrated preview of artists. Instead of a simple dropdown, the entire error message area will fade out to reveal a grid of artists matching the user's search query.

## 2. User Interaction & Transitions
- **Trigger:** Typing in the search bar.
- **Transition:** `AnimatePresence` (Framer Motion) will handle a cross-fade between two states:
    - **State A (Default):** The "404 Perdu dans la forêt" message and description.
    - **State B (Searching):** A responsive grid of artist cards.
- **Empty State:** If no artists match, a friendly "Aucun artiste trouvé" message will appear with a suggestion to try another keyword.

## 3. Visual Components
- **Artist Result Cards:**
    - Miniaturized version of the project's `ArtistCard`.
    - Signature "Tilted" style (rotation between -3 and +3 degrees).
    - Image, Artist Name, and Genre tag.
    - Clickable link to the artist's detail page (`/programmation/[slug]`).
- **Search Bar UI:** 
    - Remains fixed or stays at the top of the content area during search.
    - Visual feedback (e.g., green border highlight) when active.

## 4. Technical Implementation
- **Data Source:** Import `ARTISTS` from `@/lib/data`.
- **Logic:** 
    - React `useState` for `searchTerm`.
    - Computed `filteredArtists` based on name and genre (case-insensitive).
    - Responsive grid (1 col mobile, 2-3 cols desktop).
- **Performance:** Local filtering on the `ARTISTS` array (small dataset, no API call needed for now).

## 5. Success Criteria
- Seamless transition between error message and search results.
- Visual consistency with the rest of the site's "tilted card" aesthetic.
- Functional links from search results to artist profiles.
