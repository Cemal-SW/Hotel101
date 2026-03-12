export type HotelGalleryCategory =
  | "all"
  | "architecture"
  | "interiors"
  | "details"
  | "outdoor";

export interface HotelGalleryImage {
  src: string;
  category: Exclude<HotelGalleryCategory, "all">;
}

export const hotelGalleryImages: HotelGalleryImage[] = [
  { src: "/media/hotel/hotel-01.jpeg", category: "architecture" },
  { src: "/media/hotel/hotel-02.jpeg", category: "interiors" },
  { src: "/media/hotel/hotel-03.jpeg", category: "details" },
  { src: "/media/hotel/hotel-04.jpeg", category: "outdoor" },
  { src: "/media/hotel/hotel-05.jpeg", category: "architecture" },
  { src: "/media/hotel/hotel-06.jpeg", category: "interiors" },
  { src: "/media/hotel/hotel-07.jpeg", category: "details" },
  { src: "/media/hotel/hotel-08.jpeg", category: "outdoor" },
  { src: "/media/hotel/hotel-09.jpeg", category: "architecture" },
  { src: "/media/hotel/hotel-10.jpeg", category: "interiors" },
  { src: "/media/hotel/hotel-11.jpeg", category: "details" },
  { src: "/media/hotel/hotel-12.jpeg", category: "outdoor" },
  { src: "/media/hotel/hotel-13.jpeg", category: "architecture" },
  { src: "/media/hotel/hotel-14.jpeg", category: "interiors" },
  { src: "/media/hotel/hotel-15.jpeg", category: "details" },
  { src: "/media/hotel/hotel-16.jpg", category: "outdoor" },
  { src: "/media/hotel/hotel-17.jpeg", category: "architecture" },
  { src: "/media/hotel/hotel-18.jpeg", category: "interiors" },
  { src: "/media/hotel/hotel-19.jpeg", category: "details" },
  { src: "/media/hotel/hotel-20.jpeg", category: "outdoor" },
  { src: "/media/hotel/hotel-21.jpeg", category: "architecture" },
  { src: "/media/hotel/hotel-22.jpeg", category: "interiors" },
  { src: "/media/hotel/hotel-23.jpeg", category: "details" },
  { src: "/media/hotel/hotel-24.jpeg", category: "outdoor" },
  { src: "/media/hotel/hotel-25.jpeg", category: "architecture" },
  { src: "/media/hotel/hotel-26.jpeg", category: "interiors" },
  { src: "/media/hotel/hotel-27.jpeg", category: "details" },
  { src: "/media/hotel/hotel-28.jpeg", category: "outdoor" },
  { src: "/media/hotel/hotel-29.jpeg", category: "architecture" },
];
