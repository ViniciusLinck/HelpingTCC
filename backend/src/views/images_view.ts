import Image from '../models/Image';

export default {
    render(image: Image) {          
        // O render vai pegar o Estabelecimento e retornar na maneira que ele 
        // preciSa ser exibido para o Front-Ed, no caso este é para as IMAGENS

        return {
            id: image.id,
            url: `http://192.168.0.10:3333/uploads/${image.path}`,
        };
    },
    renderMany(images: Image[]) {
        return images.map(image => this.render(image))
    }
};