const resultado = document.querySelector('#resultado')

const formulario = document.querySelector('#formulario')


window.onload = () => {
    formulario.addEventListener('submit',validarFormulario)
}

function validarFormulario(e){
    e.preventDefault();
    const terminoBusqueda = document.querySelector('#termino').value;

    if(terminoBusqueda === ''){
        mostrarAlerta('Agrega el termino de busqueda')
        return
    }

    buscarImagenes(terminoBusqueda)
}


function buscarImagenes(termino){
    const key = '32809509-37cc96e1db6942ab03c4ef693'
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}`
    fetch(url)
        .then(resp => resp.json())
        .then(data => mostrarImagenes(data.hits))

}
 function mostrarImagenes(imagenes){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }

    //Iterar en arreglo
    imagenes.forEach(imagen => {
        const {previewURL,likes,views,largeImageURL} = imagen
        resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
            <div class="bg-white">
             <img class="w-full" src="${previewURL}"/>
            <div class="p-4">
                <p class="font-bold">${likes}<span > Me gusta</span></p>
                <p class="font-bold">${views}<span > Veces vista</span></p>

                <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                
                href="${largeImageURL}" target="_blank" rel="noopener noreferrer">Ver Imagen</a>
            </div>
            </div>
       
        </div>
           


        `
        
    });

 }

function mostrarAlerta(mensaje){
    const existeAlerta = document.querySelector('.bg-red-100');
    if(!existeAlerta){
        const alerta = document.createElement('p')

        alerta.classList.add('bg-red-100','border-red-100','text-red-700','px-4','py-3',
        'rounded','max-w-lg','mx-auto','mt-6','text-center')
        alerta.innerHTML = `
            <strong class="font-bold">Error</strong>
            <span class="block sm:inline">${mensaje}</span>
        
        `
    
        formulario.appendChild(alerta)
    
        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }
   
}