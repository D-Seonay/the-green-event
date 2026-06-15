import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { STRAPI_TAG } from '@/lib/strapi';

/**
 * Route cible du webhook Strapi (publish/unpublish).
 * Vérifie un secret partagé puis invalide le cache des données Strapi.
 * Secret accepté via header `Authorization: Bearer <secret>`, `x-revalidate-secret`,
 * ou query `?secret=` (selon la config du webhook côté Strapi).
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const provided =
    req.headers.get('authorization')?.replace('Bearer ', '') ||
    req.headers.get('x-revalidate-secret') ||
    req.nextUrl.searchParams.get('secret');

  if (!secret || provided !== secret) {
    return NextResponse.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 });
  }

  // Invalide toutes les données issues de Strapi (tag commun) + les chemins clés.
  revalidateTag(STRAPI_TAG, 'max');
  revalidatePath('/');
  revalidatePath('/programmation');
  revalidatePath('/programmation/[slug]', 'page');
  revalidatePath('/sitemap.xml');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
