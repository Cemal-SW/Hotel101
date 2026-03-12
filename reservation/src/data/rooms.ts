export interface ReservationRoomBase {
  id: string;
  size: string;
  pricePerNight: number;
  image: string;
  capacity: number;
  roomCount: number;
  bedConfiguration: string;
  enabled: boolean;
}

export interface ReservationPlanRoom {
  roomId: string;
  quantity: number;
}

export interface ReservationPlanBase {
  id: string;
  rooms: ReservationPlanRoom[];
  totalCapacity: number;
  totalRooms: number;
  basePricePerNight: number;
  adultSupplementPerNight: number;
  childSupplementPerNight: number;
  extraAdults: number;
  extraChildren: number;
  totalPricePerNight: number;
  unusedCapacity: number;
  coverRoomId: string;
}

export const reservationRooms: ReservationRoomBase[] = [
  {
    id: "king-room",
    size: "28 m²",
    pricePerNight: 210,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    capacity: 2,
    roomCount: 12,
    bedConfiguration: "1 Double",
    enabled: true,
  },
  {
    id: "royal-room",
    size: "52 m²",
    pricePerNight: 390,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    capacity: 5,
    roomCount: 8,
    bedConfiguration: "1 Double, 3 Single",
    enabled: true,
  },
  {
    id: "family-room",
    size: "48 m²",
    pricePerNight: 340,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    capacity: 4,
    roomCount: 7,
    bedConfiguration: "1 Double, 2 Single",
    enabled: true,
  },
  {
    id: "group-room",
    size: "50 m²",
    pricePerNight: 360,
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
    capacity: 5,
    roomCount: 8,
    bedConfiguration: "1 Double, 3 Single",
    enabled: true,
  },
  {
    id: "suit-room",
    size: "35 m²",
    pricePerNight: 280,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    capacity: 3,
    roomCount: 38,
    bedConfiguration: "1 Double, 1 Single",
    enabled: true,
  },
  {
    id: "vip-room",
    size: "32 m²",
    pricePerNight: 260,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    capacity: 2,
    roomCount: 38,
    bedConfiguration: "1 Double",
    enabled: true,
  },
  {
    id: "villa",
    size: "58 m²",
    pricePerNight: 480,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    capacity: 4,
    roomCount: 2,
    bedConfiguration: "1 Double, 2 Single",
    enabled: true,
  },
];

export const reservationRoomIds = reservationRooms.map((room) => room.id);

const INCLUDED_GUESTS_PER_ROOM = 2;
const EXTRA_ADULT_FEE_PER_NIGHT = 35;
const EXTRA_CHILD_FEE_PER_NIGHT = 18;
const MAX_PLAN_RESULTS = 6;
const MAX_ROOMS_PER_PLAN = 6;

function getPlanPricing(totalRooms: number, adults: number, children: number) {
  const includedGuests = totalRooms * INCLUDED_GUESTS_PER_ROOM;
  const coveredAdults = Math.min(adults, includedGuests);
  const remainingIncluded = Math.max(0, includedGuests - coveredAdults);
  const coveredChildren = Math.min(children, remainingIncluded);
  const extraAdults = adults - coveredAdults;
  const extraChildren = children - coveredChildren;

  return {
    extraAdults,
    extraChildren,
    adultSupplementPerNight: extraAdults * EXTRA_ADULT_FEE_PER_NIGHT,
    childSupplementPerNight: extraChildren * EXTRA_CHILD_FEE_PER_NIGHT,
  };
}

export function buildReservationPlans(adults: number, children: number): ReservationPlanBase[] {
  const totalGuests = adults + children;
  const availableRooms = reservationRooms.filter((room) => room.enabled && room.roomCount > 1);
  const results: ReservationPlanBase[] = [];

  if (totalGuests <= 0 || !availableRooms.length) {
    return results;
  }

  const search = (
    index: number,
    currentRooms: ReservationPlanRoom[],
    totalCapacity: number,
    totalRooms: number,
    basePricePerNight: number
  ) => {
    if (totalRooms > MAX_ROOMS_PER_PLAN) {
      return;
    }

    if (totalCapacity >= totalGuests) {
      const pricing = getPlanPricing(totalRooms, adults, children);
      const sortedRooms = [...currentRooms].sort((a, b) => {
        const roomA = availableRooms.find((room) => room.id === a.roomId);
        const roomB = availableRooms.find((room) => room.id === b.roomId);

        if (!roomA || !roomB) return 0;
        if (roomB.capacity !== roomA.capacity) return roomB.capacity - roomA.capacity;
        return roomA.pricePerNight - roomB.pricePerNight;
      });

      results.push({
        id: sortedRooms.map((room) => `${room.roomId}:${room.quantity}`).join("|"),
        rooms: sortedRooms,
        totalCapacity,
        totalRooms,
        basePricePerNight,
        adultSupplementPerNight: pricing.adultSupplementPerNight,
        childSupplementPerNight: pricing.childSupplementPerNight,
        extraAdults: pricing.extraAdults,
        extraChildren: pricing.extraChildren,
        totalPricePerNight:
          basePricePerNight +
          pricing.adultSupplementPerNight +
          pricing.childSupplementPerNight,
        unusedCapacity: totalCapacity - totalGuests,
        coverRoomId: sortedRooms[0]?.roomId ?? availableRooms[0].id,
      });
      return;
    }

    if (index >= availableRooms.length) {
      return;
    }

    const room = availableRooms[index];
    const maxNeededForCapacity = Math.ceil((totalGuests - totalCapacity) / room.capacity);
    const maxQuantity = Math.min(room.roomCount, Math.max(0, maxNeededForCapacity));

    for (let quantity = maxQuantity; quantity >= 0; quantity -= 1) {
      const nextRooms =
        quantity > 0 ? [...currentRooms, { roomId: room.id, quantity }] : currentRooms;
      search(
        index + 1,
        nextRooms,
        totalCapacity + room.capacity * quantity,
        totalRooms + quantity,
        basePricePerNight + room.pricePerNight * quantity
      );
    }
  };

  search(0, [], 0, 0, 0);

  const uniquePlans = Array.from(
    new Map(results.map((plan) => [plan.id, plan])).values()
  );

  return uniquePlans
    .sort((a, b) => {
      if (a.totalPricePerNight !== b.totalPricePerNight) {
        return a.totalPricePerNight - b.totalPricePerNight;
      }
      if (a.totalRooms !== b.totalRooms) {
        return a.totalRooms - b.totalRooms;
      }
      return a.unusedCapacity - b.unusedCapacity;
    })
    .slice(0, MAX_PLAN_RESULTS);
}
