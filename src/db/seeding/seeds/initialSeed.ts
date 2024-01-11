// @/src/db/seeding/seeds/initialSeed.ts
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "@/db/entities";

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const usersRepository = dataSource.getRepository(User);
    const userFactory = factoryManager.get(User);
    const existingAdminUser = await usersRepository.findOne({
      where: { isAdmin: true },
    });
    if (!existingAdminUser) {
      const adminUser = await userFactory.make();
      await usersRepository.save(adminUser);
    }
  }
}
