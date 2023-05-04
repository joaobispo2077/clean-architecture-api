import 'module-alias/register';
import { app } from './configs/app';

const port = Number(process.env.PORT ?? 3333);

app.listen(port, () => console.info(`Server is running at por ${port}`));
