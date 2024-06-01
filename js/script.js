

// Función para cargar los jugadores desde el almacenamiento local
function cargarJugadoresDesdeLocalStorage() {
    let jugadoresGuardados = localStorage.getItem('jugadores');
    if (jugadoresGuardados) {
        jugadores = JSON.parse(jugadoresGuardados);
    }
}

// Función para guardar los jugadores en el almacenamiento local
function guardarJugadoresEnLocalStorage() {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
}


let jugadores = [];

// Función para eliminar un jugador del equipo



// Función para agregar un nuevo jugador
function agregarJugador(event) {
    event.preventDefault(); // Evitar que el formulario se envíe
    
    // Obtener los valores del formulario
    let nombre = document.getElementById('nombre').value;
    let edad = document.getElementById('edad').value;
    let posicion = document.getElementById('posicion').value;
    let estado = document.getElementById('estado').value;
    
    // Crear un objeto jugador
    let jugador = {
        nombre: nombre,
        edad: edad,
        posicion: posicion,
        estado:estado
    };
    
    // Agregar el jugador al array
    jugadores.push(jugador);
    
    guardarJugadoresEnLocalStorage();
    // Limpiar el formulario
    document.getElementById('nombre').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('posicion').value = '';
    document.getElementById('estado').value = '';
    
    // Mostrar mensaje de éxito
    alert('Jugador agregado correctamente');
}

cargarJugadoresDesdeLocalStorage();

// Función para listar jugadores
function listarJugadores() {
    let listaJugadores = document.getElementById('lista-jugadores');
    listaJugadores.innerHTML = ''; // Limpiar la lista antes de agregar los jugadores
    
    // Recorrer el array de jugadores y agregarlos a la lista
    jugadores.forEach(function(jugador) {
        let li = document.createElement('li');
        li.textContent = `Nombre: ${jugador.nombre}, Edad: ${jugador.edad}, Posición: ${jugador.posicion}, Estado:${jugador.estado}`;
        listaJugadores.appendChild(li);
    });
     // Mostrar los botones después de listar los jugadores
     document.getElementById('btn-asignar-posicion').style.display = 'inline';
     document.getElementById('btn-realizar-cambio').style.display = 'inline';
 }
 
 // Llamar a la función listarJugadores para que se muestren los jugadores y los botones




function asignarPosicion() {
    // Pedir al usuario el nombre del jugador y la nueva posición
    let nombreJugador = prompt("Ingrese el nombre del jugador al que desea asignar la posición:");
    let nuevaPosicion = prompt("Ingrese la nueva posición para el jugador:");

    // Buscar el jugador en la lista de jugadores
    let jugadorEncontrado = jugadores.find(jugador => jugador.nombre === nombreJugador);

    // Si se encuentra el jugador, actualizar su posición
    if (jugadorEncontrado) {
        jugadorEncontrado.posicion = nuevaPosicion;
        alert(`Se ha asignado la posición ${nuevaPosicion} al jugador ${nombreJugador}.`);
    } else {
        alert(`No se encontró ningún jugador con el nombre ${nombreJugador}.`);
    }
    guardarJugadoresEnLocalStorage(jugadores);
     // Actualizar la lista de jugadores en el DOM
     listarJugadores();
}


function realizarCambio() {
    // Pedir al usuario los nombres de los jugadores que harán el cambio
    let nombreJugadorSale = prompt("Ingrese el nombre del jugador que sale:");
    let nombreJugadorEntra = prompt("Ingrese el nombre del jugador que entra:");

    // Buscar los índices de los jugadores en la lista de jugadores
    let jugadorSaleIndex = jugadores.findIndex(jugador => jugador.nombre === nombreJugadorSale);
    let jugadorEntraIndex = jugadores.findIndex(jugador => jugador.nombre === nombreJugadorEntra);

    // Si se encuentran ambos jugadores, proceder con el cambio
    if (jugadorSaleIndex !== -1 && jugadorEntraIndex !== -1) {
        // Cambiar el estado de los jugadores
        let jugadorSale = jugadores[jugadorSaleIndex];
        let jugadorEntra = jugadores[jugadorEntraIndex];

        // Intercambiar los estados
        let tempEstado = jugadorSale.estado;
        jugadorSale.estado = jugadorEntra.estado;
        jugadorEntra.estado = tempEstado;

        // Eliminar al jugador que sale de la lista
        jugadores.splice(jugadorSaleIndex, 1);

        // Guardar los jugadores actualizados en el localStorage
        guardarJugadoresEnLocalStorage(jugadores);

        // Mostrar mensaje de éxito
        alert(`Cambio realizado: ${nombreJugadorSale} sale y ${nombreJugadorEntra} entra al partido.`);

        // Actualizar la lista de jugadores en el DOM
        listarJugadores();
    } else {
        alert("No se pudo realizar el cambio. Por favor, verifique los nombres de los jugadores.");
    }
}



// Agregar event listener al formulario para agregar jugador
document.getElementById('formulario-agregar').addEventListener('submit', agregarJugador);
