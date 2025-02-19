import { faker } from "@faker-js/faker";

export function fakeCheckoutInformation() {
    return {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        zipcode: faker.location.zipCode(),
    };
}