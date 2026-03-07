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
      title: "Saros'un",
      titleHighlight: "Ayrıcalıkları",
      description: "Saros Vadi, yalnızca huzurlu bir konaklama değil; deniz, doğa, gastronomi ve tarihle iç içe yaşayan özel bir kıyı deneyimi sunar.",
      cards: [
        {
          title: "Eşsiz Saros Suları",
          description:
            "Saros Körfezi, berrak ve temiz deniziyle Türkiye'nin en özel kıyılarından biridir. Bölgede sanayi faaliyetlerinin az olması sayesinde deniz doğal yapısını korur ve yüzme için mükemmel bir ortam sunar.",
        },
        {
          title: "Dalış İçin İdeal Nokta",
          description:
            "Saros Körfezi, Türkiye'nin önemli dalış bölgelerinden biridir. Yüksek su altı görüş mesafesi, zengin deniz yaşamı ve batık noktaları sayesinde hem amatör hem de profesyonel dalgıçlar için eşsiz bir deneyim sunar.",
        },
        {
          title: "Taze Deniz Ürünleri",
          description:
            "Enez ve çevresi, taze deniz ürünleri ve Ege mutfağıyla ünlüdür. Yerel restoranlarda günlük tutulan balıklar ve yöresel lezzetler misafirlere unutulmaz bir gastronomi deneyimi sunar.",
        },
        {
          title: "Tarihi Enez Keşfi",
          description:
            "Saros Körfezi'nin hemen yanında bulunan Enez, tarihi dokusuyla dikkat çeker. Antik kalıntılar, Enez Kalesi ve eski yerleşimler ziyaretçilere doğa ile tarihin iç içe olduğu özel bir keşif imkanı sunar.",
        },
      ],
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
      tag: "Saros Bay",
      title: "The Charms of",
      titleHighlight: "Saros",
      description: "Saros Vadi offers more than a peaceful stay. It opens the door to a distinctive coastal experience shaped by sea, nature, gastronomy, and history.",
      cards: [
        {
          title: "Unique Waters of Saros",
          description:
            "Saros Bay is one of Turkey's most remarkable coastlines thanks to its exceptionally clear waters. With limited industrial activity in the region, the sea preserves its natural character and provides an ideal setting for swimming.",
        },
        {
          title: "An Ideal Diving Destination",
          description:
            "Saros Bay is one of Turkey's notable diving destinations. Its high underwater visibility, rich marine life, and wreck sites create an exceptional experience for both amateur and professional divers.",
        },
        {
          title: "Fresh Seafood Experiences",
          description:
            "Enez and its surroundings are known for fresh seafood and Aegean cuisine. Daily-caught fish and regional flavors served in local restaurants offer guests a memorable gastronomic journey.",
        },
        {
          title: "Discover Historic Enez",
          description:
            "Located right beside Saros Bay, Enez draws attention with its historical texture. Ancient remains, Enez Castle, and old settlements offer a special sense of discovery where nature and history meet.",
        },
      ],
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
