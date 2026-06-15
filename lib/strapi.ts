import type { Artist, Sponsor, EventInfo, AccessItem } from '@/types';
import { FALLBACK_ARTISTS, FALLBACK_PARTNERS, FALLBACK_EVENT, ARTIST_ROTATIONS } from '@/lib/fallback';

// On retire un éventuel slash final pour éviter les URLs en `//api/...` (rejetées en 400).
const STRAPI_URL = (process.env.STRAPI_URL || 'http://localhost:1337').replace(/\/+$/, '');
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Tag de cache commun : la route /api/revalidate invalide ce tag au webhook Strapi.
export const STRAPI_TAG = 'strapi';

// ---------------------------------------------------------------------------
// Fetch helper (ISR on-demand via tag de cache)
// ---------------------------------------------------------------------------

// Récupère une ressource de l'API Strapi ; renvoie null en cas d'échec (fallback géré par l'appelant).
async function strapiFetch<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
      headers: STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {},
      cache: 'force-cache',
      next: { tags: [STRAPI_TAG] },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// Construit l'URL absolue d'un média (Cloudinary renvoie déjà une URL absolue).
function mediaUrl(file: any): string | null {
  const url = file?.url;
  if (!url) return null;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

// Formate une datetime ISO en "HH:MM" sur le fuseau Europe/Paris.
function formatTime(iso: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Paris',
  }).format(new Date(iso));
}

// Construit la chaîne "16:00 - 17:00" à partir des créneaux d'un artiste (le plus tôt).
function earliestSlot(slots: any[]): { label: string; start: number } {
  if (!slots || slots.length === 0) return { label: '', start: Number.POSITIVE_INFINITY };
  const sorted = [...slots].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  const first = sorted[0];
  const label = first.end ? `${formatTime(first.start)} - ${formatTime(first.end)}` : formatTime(first.start);
  return { label, start: new Date(first.start).getTime() };
}

// ---------------------------------------------------------------------------
// Mappers Strapi -> types frontend
// ---------------------------------------------------------------------------

// Transforme une entrée Artist de Strapi vers le type frontend, en dérivant image/timeSlot/rotation.
function mapArtist(entry: any, index: number): Artist & { _start: number } {
  const galleryFiles: any[] = Array.isArray(entry.gallery) ? entry.gallery : [];
  const galleryUrls = galleryFiles.map(mediaUrl).filter(Boolean) as string[];
  const slot = earliestSlot(entry.slots);

  return {
    name: entry.name,
    slug: entry.slug,
    image: galleryUrls[0] ?? '/placeholder.svg',
    imageAlt: galleryFiles[0]?.alternativeText || entry.name,
    rotation: ARTIST_ROTATIONS[index % ARTIST_ROTATIONS.length],
    bio: entry.description ?? '',
    genre: entry.style ?? '',
    style: entry.style ?? '',
    experience: entry.experience ?? '',
    timeSlot: slot.label,
    gallery: galleryUrls.length > 0 ? galleryUrls : undefined,
    socials: {
      instagram: entry.socials?.instagram || undefined,
      spotify: entry.socials?.spotify || undefined,
      soundcloud: entry.socials?.soundcloud || undefined,
    },
    keywords: Array.isArray(entry.keywords) ? entry.keywords : undefined,
    seoDescription: entry.seoDescription || undefined,
    isMystery: entry.isMystery ?? false,
    _start: slot.start,
  };
}

// ---------------------------------------------------------------------------
// API publique
// ---------------------------------------------------------------------------

// Récupère tous les artistes triés par créneau (programmés d'abord), avec repli statique.
export async function getArtists(): Promise<Artist[]> {
  const json = await strapiFetch<{ data: any[] }>('/artists?populate=*&pagination[pageSize]=100');
  if (!json?.data?.length) return FALLBACK_ARTISTS;

  // Tri : artistes avec créneau le plus tôt en premier, puis les autres (mystère / sans créneau).
  const sorted = [...json.data].sort((a, b) => {
    const sa = earliestSlot(a.slots).start;
    const sb = earliestSlot(b.slots).start;
    return sa - sb;
  });

  return sorted.map((entry, index) => {
    const { _start, ...artist } = mapArtist(entry, index);
    return artist;
  });
}

// Récupère un artiste par son slug, avec repli statique.
export async function getArtistBySlug(slug: string): Promise<Artist | undefined> {
  const json = await strapiFetch<{ data: any[] }>(
    `/artists?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );
  if (!json?.data?.length) {
    return FALLBACK_ARTISTS.find((a) => a.slug === slug);
  }
  const { _start, ...artist } = mapArtist(json.data[0], 0);
  return artist;
}

// Récupère les infos de l'événement courant (single type), avec repli statique.
export async function getEventInfo(): Promise<EventInfo> {
  const json = await strapiFetch<{ data: any }>('/event?populate=*');
  const e = json?.data;
  if (!e) return FALLBACK_EVENT;

  const accessItems: AccessItem[] = Array.isArray(e.accessItems)
    ? e.accessItems.map((it: any) => ({
        icon: it.icon,
        title: it.title,
        detail: it.detail,
        subtitle: it.subtitle || undefined,
      }))
    : [];

  return {
    name: e.name ?? FALLBACK_EVENT.name,
    startDate: e.startDate ?? FALLBACK_EVENT.startDate,
    endDate: e.endDate || undefined,
    locationName: e.locationName || undefined,
    address: e.address || undefined,
    mapEmbedUrl: e.mapEmbedUrl || undefined,
    description: e.description || undefined,
    accessItems: accessItems.length > 0 ? accessItems : FALLBACK_EVENT.accessItems,
  };
}

// Récupère les partenaires (mappés vers le type Sponsor existant), avec repli statique.
export async function getPartners(): Promise<Sponsor[]> {
  const json = await strapiFetch<{ data: any[] }>('/partners?populate=*&pagination[pageSize]=100');
  if (!json?.data?.length) return FALLBACK_PARTNERS;

  return json.data.map((entry: any, index: number) => ({
    id: entry.id ?? index + 1,
    name: entry.name,
    logoSrc: mediaUrl(entry.logo) ?? '/placeholder.svg',
    alt: entry.logo?.alternativeText || `Logo de ${entry.name}, partenaire du festival.`,
  }));
}
