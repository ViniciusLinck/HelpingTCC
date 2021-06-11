// Importando os arquivos e bibliotecas
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OngsController from './controllers/OngsController';

// Usando a Arquitetura MVC

const routes = Router();
const upload = multer(uploadConfig);

// Rotas da aplicação

routes.get('/ongs', OngsController.index);
routes.get('/ongs/:id', OngsController.show);

routes.post('/ongs', upload.array('images'), OngsController.create);

export default routes;