type RawAdvocateData = {
  advocates: {
    id: number;
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    yearsOfExperience: number;
    phoneNumber: number;
    createdAt: string;
  };
  advocates_specialties: {
    advocateId: number;
    specialtyId: number;
  };
  specialties: {
    id: number;
    name: string;
    createdAt: string;
  };
};

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: string;
  phoneNumber: string;
};

export function mapAdvocatesPublic(rawData: RawAdvocateData[]): Advocate[] {
  const advocateMap = new Map<number, Advocate>();

  rawData.forEach((row) => {
    const advocateId = row.advocates.id;

    if (!advocateMap.has(advocateId)) {
      advocateMap.set(advocateId, {
        firstName: row.advocates.firstName,
        lastName: row.advocates.lastName,
        city: row.advocates.city,
        degree: row.advocates.degree,
        specialties: [],
        yearsOfExperience: row.advocates.yearsOfExperience.toString(),
        phoneNumber: row.advocates.phoneNumber.toString(),
      });
    }

    const advocate = advocateMap.get(advocateId)!;
    if (!advocate.specialties.includes(row.specialties.name)) {
      advocate.specialties.push(row.specialties.name);
    }
  });

  return Array.from(advocateMap.values());
}
