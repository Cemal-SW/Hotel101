export const roomsPageHeroImage = "/media/site/rooms-hero.jpeg";

export const roomCatalog = [
  {
    slug: "junior-suite-king",
    coverImage: "/media/rooms/junior-suite-king/cover.jpeg",
    gallery: [
      "/media/rooms/junior-suite-king/gallery-1.jpeg",
      "/media/rooms/junior-suite-king/gallery-2.jpeg",
      "/media/rooms/junior-suite-king/gallery-3.jpeg",
      "/media/rooms/junior-suite-king/gallery-4.jpeg",
      "/media/rooms/junior-suite-king/gallery-5.jpeg",
      "/media/rooms/junior-suite-king/gallery-6.jpeg",
      "/media/rooms/junior-suite-king/gallery-7.jpeg",
    ],
  },
  {
    slug: "junior-suite-twin",
    coverImage: "/media/rooms/junior-suite-twin/cover.jpeg",
    gallery: [
      "/media/rooms/junior-suite-twin/gallery-1.jpeg",
      "/media/rooms/junior-suite-twin/gallery-2.jpeg",
      "/media/rooms/junior-suite-twin/gallery-3.jpeg",
      "/media/rooms/junior-suite-twin/gallery-4.jpeg",
      "/media/rooms/junior-suite-twin/gallery-5.jpeg",
      "/media/rooms/junior-suite-twin/gallery-6.jpeg",
      "/media/rooms/junior-suite-twin/gallery-7.jpeg",
    ],
  },
  {
    slug: "superior-king",
    coverImage: "/media/rooms/superior-king/cover.jpeg",
    gallery: [
      "/media/rooms/superior-king/gallery-1.jpeg",
      "/media/rooms/superior-king/gallery-2.jpeg",
      "/media/rooms/superior-king/gallery-3.jpeg",
      "/media/rooms/superior-king/gallery-4.jpeg",
      "/media/rooms/superior-king/gallery-5.jpeg",
      "/media/rooms/superior-king/gallery-6.jpeg",
      "/media/rooms/superior-king/gallery-7.jpeg",
    ],
  },
  {
    slug: "deluxe-suite",
    coverImage: "/media/rooms/deluxe-suite/cover.jpeg",
    gallery: [
      "/media/rooms/deluxe-suite/gallery-1.jpeg",
      "/media/rooms/deluxe-suite/gallery-2.jpeg",
      "/media/rooms/deluxe-suite/gallery-3.jpeg",
      "/media/rooms/deluxe-suite/gallery-4.jpeg",
      "/media/rooms/deluxe-suite/gallery-5.jpeg",
      "/media/rooms/deluxe-suite/gallery-6.jpeg",
      "/media/rooms/deluxe-suite/gallery-7.jpeg",
    ],
  },
];

export const roomImages = roomCatalog.map((room) => room.coverImage);

export function getRoomMedia(slug: string) {
  return roomCatalog.find((room) => room.slug === slug);
}
