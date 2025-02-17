import { faker } from "@faker-js/faker";

export function fakeLoginData() {
    return {
        username : faker.internet.username(),
        password : faker.internet.password(),
    }
}