import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { dbEnvVars } from "@/utils/env-vars";
import { SeederOptions } from "typeorm-extension";
import { UsersFactory } from "./seeding/factories/user.factory";
import { MainSeeder } from "./seeding/seeds/initialSeed";

const options: DataSourceOptions & SeederOptions = {
  type: "mysql",
  host: dbEnvVars.host,
  username: dbEnvVars.username,
  password: dbEnvVars.password,
  port: +dbEnvVars.port,
  synchronize: true,
  database: dbEnvVars.database,
  entities: [path.join(__dirname, "./entities/**/*.{ts,js}")],
  migrations: [path.join(__dirname, "./migrations/**/*.{ts,js}")],

  //Seeding
  factories: [UsersFactory],
  seeds: [MainSeeder],
};
const dataSource = new DataSource(options);

export default dataSource;
