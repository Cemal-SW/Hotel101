export type Language = "tr" | "en";

export const translations = {
  tr: {
    nav: {
      rooms: "Odalar",
      amenities: "Hizmetler",
      location: "Konum",
      bookNow: "Rezervasyon",
    },
    hero: {
      subtitle: "Akdeniz Butik Resort",
      tagline: "Zamansız zarafetin Akdeniz sıcaklığıyla buluştuğu yer. Unutulmaz bir konaklama sizi bekliyor.",
      exploreRooms: "Odaları Keşfet",
      bookNow: "Rezervasyon",
      scroll: "Kaydır",
    },
    welcome: {
      tag: "Hikayemiz",
      title: "Hoş Geldiniz,",
      titleHighlight: "Olağanüstü Bir Masala",
      p1: "Saros Vadi'de doğa ve lüksün mükemmel uyumunu keşfedin. Akdeniz'in kalbinde konumlanan biz, sadece bir tatil köyü değil — yüzyıllık misafirperverlik mirasının modern yorumuyuz.",
      p2: "Her detayıyla özenle tasarlanmış odalarımız, sizi zamansız bir zarafetin içine alırken günümüzün tüm konforlarını sunuyor. Her konaklama, değerli bir anıya dönüşmek üzere tasarlanmıştır.",
      statRooms: "Lüks Oda",
      statYears: "Yıllık Mükemmellik",
      statExp: "Deneyim",
    },
    rooms: {
      tag: "Konaklama",
      title: "Odalar & Süitler",
      viewAll: "Tüm Odaları Gör →",
      bookRoom: "Bu Odayı Rezerve Et",
      items: [
        {
          name: "Junior Süit King",
          description: "Panoramik deniz manzarası ve premium olanaklarla donatılmış şık king oda.",
          features: ["King Yatak", "Deniz Manzarası", "Mini Bar", "Yağmur Duşu"],
        },
        {
          name: "Junior Süit Twin",
          description: "Birlikte seyahat eden arkadaşlar veya iş arkadaşları için ideal, geniş twin oda.",
          features: ["İki Ayrı Yatak", "Bahçe Manzarası", "Çalışma Masası", "Jakuzi"],
        },
        {
          name: "Superior King",
          description: "King yatak ve özenle seçilmiş iç mekan tasarım detaylarıyla rafine konfor.",
          features: ["King Yatak", "Mermer Banyo", "Akıllı TV", "Espresso Makinesi"],
        },
        {
          name: "Delüks Süit",
          description: "Ayrı oturma alanı ve özel teras ile en geniş süitimiz.",
          features: ["King Yatak", "Özel Teras", "Oturma Odası", "Butler Hizmeti"],
        },
      ],
    },
    amenities: {
      tag: "Hizmetler",
      title1: "Özel Tatlar &",
      title2: "Kişisel Concierge",
      items: [
        { title: "Gurme Kahvaltı", description: "Odanıza veya yemek salonumuza servis edilen özenle hazırlanmış kahvaltı ve özel lezzetler." },
        { title: "Yüksek Hızlı Wi-Fi", description: "Tesisin tüm alanlarında ücretsiz ultra hızlı internet erişimi." },
        { title: "VIP Transfer", description: "Havalimanından tesisinize özel, konforlu ve güvenli ulaşım hizmeti." },
        { title: "Kişisel Concierge", description: "Tüm konaklamanızı planlamak ve kişiselleştirmek için 7/24 özel asistan hizmetleri." },
        { title: "Spa & Wellness", description: "Premium spa tedavileri, sauna ve wellness programlarımızla kendinizi yenileyin." },
        { title: "Çok Dilli Personel", description: "Ekibimiz dilinizi konuşuyor — kesintisiz bir deneyim için 7/24 hizmetinizde." },
      ],
    },
    location: {
      tag: "Konum",
      title: "Tarihin",
      titleHighlight: "Kalbinde",
      description: "Saros Körfezi'nin bakir kıyılarında konumlanan Saros Vadi, sizi kristal berraklığındaki sulardan ve kadim manzaralardan yalnızca birkaç adım uzakta buluşturuyor. Kapımızdan doğayı keşfedin.",
      highlights: ["Saros Körfezi", "Deniz & Doğa", "Fine Dining", "Antik Kalıntılar"],
      bookNow: "Rezervasyon Yap",
    },
    footer: {
      tagline: "Zamansız zarafetin Akdeniz sıcaklığıyla buluştuğu yer. Unutulmaz bir konaklama sizi bekliyor.",
      nav: "Navigasyon",
      contact: "İletişim",
      copyright: "Tüm hakları saklıdır.",
    },
  },

  en: {
    nav: {
      rooms: "Rooms",
      amenities: "Amenities",
      location: "Location",
      bookNow: "Book Now",
    },
    hero: {
      subtitle: "Mediterranean Boutique Resort",
      tagline: "Where timeless elegance meets Mediterranean warmth. An unforgettable stay awaits you.",
      exploreRooms: "Explore Rooms",
      bookNow: "Book Now",
      scroll: "Scroll",
    },
    welcome: {
      tag: "Our Story",
      title: "Welcome to",
      titleHighlight: "An Extraordinary Tale",
      p1: "Discover the perfect harmony of nature and luxury at Saros Vadi. Nestled in the heart of the Mediterranean, we are not just a resort — we are a modern interpretation of a century-old legacy of hospitality.",
      p2: "Carefully designed in every detail, our rooms envelop you in timeless elegance while offering all the comforts of today. Every stay is crafted to become a cherished memory.",
      statRooms: "Luxury Rooms",
      statYears: "Years of Excellence",
      statExp: "Experience",
    },
    rooms: {
      tag: "Accommodation",
      title: "Rooms & Suites",
      viewAll: "View All Rooms →",
      bookRoom: "Book This Room",
      items: [
        {
          name: "Junior Suite King",
          description: "Elegant king room with panoramic sea views and premium amenities.",
          features: ["King Bed", "Sea View", "Mini Bar", "Rainfall Shower"],
        },
        {
          name: "Junior Suite Twin",
          description: "Spacious twin room ideal for friends or colleagues traveling together.",
          features: ["Twin Beds", "Garden View", "Work Desk", "Soaking Tub"],
        },
        {
          name: "Superior King",
          description: "Refined comfort with a king bed and curated interior design details.",
          features: ["King Bed", "Marble Bath", "Smart TV", "Espresso Machine"],
        },
        {
          name: "Deluxe Suite",
          description: "Our most spacious suite with a separate living area and private terrace.",
          features: ["King Bed", "Private Terrace", "Living Room", "Butler Service"],
        },
      ],
    },
    amenities: {
      tag: "Services",
      title1: "Special Tastes &",
      title2: "Personal Concierge",
      items: [
        { title: "Gourmet Breakfast", description: "Curated breakfast and special treats served in our dining room or directly to your suite." },
        { title: "High-Speed Wi-Fi", description: "Complimentary ultra-fast internet access throughout all areas of the resort." },
        { title: "VIP Transfer", description: "Comfortable and safe private transportation from the airport directly to our resort." },
        { title: "Personal Concierge", description: "Dedicated 24/7 personal assistant service to help plan and curate your entire stay." },
        { title: "Spa & Wellness", description: "Rejuvenate with our premium spa treatments, sauna, and wellness programs." },
        { title: "Multilingual Staff", description: "Our team speaks your language — available 24/7 to ensure a seamless experience." },
      ],
    },
    location: {
      tag: "Location",
      title: "Center of",
      titleHighlight: "History",
      description: "Positioned on the pristine shores of Saros Bay, Saros Vadi places you moments away from crystal-clear waters and ancient landscapes. Experience nature from our doorstep.",
      highlights: ["Saros Bay", "Sea & Nature", "Fine Dining", "Ancient Ruins"],
      bookNow: "Book Now",
    },
    footer: {
      tagline: "Where timeless elegance meets Mediterranean warmth. An unforgettable stay awaits.",
      nav: "Navigation",
      contact: "Contact",
      copyright: "All rights reserved.",
    },
  },
};

export type Translations = typeof translations.tr;
