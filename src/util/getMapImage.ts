import adlernest from '@/assets/maps/adlernest.jpg'
import delivery from '@/assets/maps/delivery.jpg'
import frostbite from '@/assets/maps/frostbite.jpg'
import type { ImageMetadata } from 'astro'

const mapUrls: Record<string, ImageMetadata> = {
  adlernest,
  delivery,
  frostbite,
}

export function getMapImageUrl(map: string) {
  const mapUrl = mapUrls[map]

  if (!mapUrl) {
    const allMaps = Object.values(mapUrls)

    const random = allMaps[Math.floor(Math.random() * allMaps.length)]

    return random as ImageMetadata
  }

  return mapUrl
}
