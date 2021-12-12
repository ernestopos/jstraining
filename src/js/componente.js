
import '../css/componente.css';
import webpackLogo from '../assets/img/webpack-logo.png';

export const saludar = (nombre) => {
    console.log('Creando etiqueta h1');
    const h1 = document.createElement('h1');
    h1.innerText = `Hola, ${nombre}`;
    document.body.append(h1);

    const logo = document.createElement('img');
    logo.src = webpackLogo;
    document.body.append(logo);
}

