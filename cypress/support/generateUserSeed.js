import path from "path";
import fs from "fs";
import shortid from "shortid";
import faker from "faker";
import bcrypt from "bcryptjs";
import { times } from "lodash";

const passwordHash = bcrypt.hashSync("s3cret", 10);

const createFakeUser = () => ({
  id: shortid(),
  email: faker.name.email(),
  emailVerified: faker.datatype.number(1),
  password: passwordHash,
  pseudo: faker.lorem.word(),
  name: faker.name.firstName('female'),
  lastName: faker.name.lastName(),
  bio: faker.lorem.words(6),
  profilePictureUrl: faker.image.cats(),
});

export const createSeedUsers = (numberOfUsers) =>
  times(numberOfUsers, () => createFakeUser());

export const saveUsersSeed = (numberOfUsers) => {
  const seedUsers = createSeedUsers(numberOfUsers);
  // write seed users to seedUsers.json
  fs.writeFile(path.join(process.cwd(), "seedUsers.json"), seedUsers);
};
