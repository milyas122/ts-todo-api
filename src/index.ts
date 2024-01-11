import { runSeeders } from "typeorm-extension";
import app from "./app";
import dataSource from "./db";
import swaggerDocs from "@/utils/swagger";

async function bootstrap() {
  await dataSource.initialize();

  await swaggerDocs(app);
  await runSeeders(dataSource);

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`App is listening on the PORT ${PORT} ..`);
  });
}

bootstrap();
