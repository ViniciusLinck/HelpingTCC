import Ong from '../models/Ongs';
import imagesView from './images_view';

export default {
    render(ong: Ong) {          
        // O render vai pegar o Estabelecimento e retornar na maneira que ele 
        // preciSa ser exibido para o Front-Ed

        return {
            id: ong.id,
            name: ong.name,
            latitude: ong.latitude,
            longitude: ong.longitude,
            about: ong.about,
            instructions: ong.instructions,
            opening_hours: ong.opening_hours,
            open_on_weekends: ong.open_on_weekends,
            images: imagesView.renderMany(ong.images)
        };
    },

    renderMany(ongs: Ong[]) {
        return ongs.map(ong => this.render(ong))
    }
};