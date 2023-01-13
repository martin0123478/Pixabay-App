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
    console.log(imagenes)

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