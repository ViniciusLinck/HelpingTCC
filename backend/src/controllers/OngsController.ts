import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ongView from '../views/ongs_views';
import * as Yup from 'yup';

import Ongs from '../models/Ongs';

export default {

    // Função para Listar os estabelecimentos criados.
    async index(request: Request, response: Response) {
        const ongsRepository = getRepository(Ongs);

        const ongs = await ongsRepository.find({
            relations: ['images']
        });

        return response.json(ongView.renderMany(ongs));
    },

    // Função para pegar 1 estabelecimento apenas
    async show(request: Request, response: Response) {
        const { id } = request.params; // Pegando o id

        const ongsRepository = getRepository(Ongs);

        // Metodo para encontrar um estabelecimento com aquele ID ou ele vai dar Fail
        const ong = await ongsRepository.findOneOrFail(id, {
            relations: ['images']
        }); 

        return response.json(ongView.render(ong));
    },

    // Função para criar Estabelecimento ou Ongs
    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body;

        const ongsRepository = getRepository(Ongs);

        const requestImages = request.file as unknown as Express.Multer.File[];

        

        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hour: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const ong = ongsRepository.create(data);

        await ongsRepository.save(ong);

        return response.status(201).json(ong);
    }
};