import { faker } from "@faker-js/faker";

export default function createRandomUser() {
  return {
    stAddressFrom: faker.location.cardinalDirection(),
    cityFrom: faker.location.city(),
    clientCity: faker.location.city(),

    clientName: faker.person.fullName(),
    clientStAddress: faker.location.cardinalDirection(),
    countryFrom: faker.location.country(),
    clientEmail: faker.internet.email(),
    clientPostCode: faker.location.zipCode(),
    clientCountry: faker.location.country(),
    // date: faker.date.anytime(),
    description: faker.lorem.words(),
    items: [
      {
        itemName: faker.lorem.word(),
        quantity: faker.number.int(55),
        price: faker.number.int(54),
      },
    ],
  };
}
