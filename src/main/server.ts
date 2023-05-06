import 'module-alias/register';
import { MongoDbHelper } from '@src/infra/repositories/helpers';

MongoDbHelper.connect(String(process.env.MONGO_URL))
  .then(async () => {
    const module = await import('./configs/app');

    const { app } = module;

    const port = Number(process.env.PORT ?? 3333);

    app.listen(port, () => console.info(`Server is running at por ${port}`));
  })
  .catch((err) => console.error(err));
