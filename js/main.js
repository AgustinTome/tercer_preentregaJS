// Crear arrays de Primer y Segundo Cuatrimestre
let pCuatri = [];
let sCuatri = [];
let contadorMateriasPCuatri = 0;
let contadorMateriasSCuatri = 0;

// Agregar Materias a un Cuatrimestre
function agregarMateria(cuatrimestre, descripcionInput, notaInput) {
    if (descripcionInput === '' || isNaN(notaInput) || notaInput < 0 || notaInput > 10) {
        Swal.fire({
            title: "Oopps",
            text: "Ingresa una nota válida entre 0 y 10",
            icon: "warning",
            confirmButtonText: "OK"
        });
        return;
    }

    cuatrimestre.push({ descripcion: descripcionInput, monto: notaInput });

    if (cuatrimestre === pCuatri) {
        contadorMateriasPCuatri = cuatrimestre.length;
    } else if (cuatrimestre === sCuatri) {
        contadorMateriasSCuatri = cuatrimestre.length;
    }

    actualizarPromedio(cuatrimestre, cuatrimestre === pCuatri ? 'promedioPCuatri' : 'promedioSCuatri');
    mostrarMaterias(cuatrimestre, cuatrimestre === pCuatri ? 'listaMaterias01' : 'listaMaterias02');
}

// Actualizar Promedio de un Cuatrimestre
function actualizarPromedio(cuatrimestre, promedioElementId) {
    if (cuatrimestre.length === 0) {
        document.getElementById(promedioElementId).textContent = "0.00";
    } else {
        let total = cuatrimestre.reduce((sum, materia) => sum + materia.monto, 0);
        let promedio = total / cuatrimestre.length;
        document.getElementById(promedioElementId).textContent = promedio.toFixed(2);
    }
}

// Mostrar Materias de un Cuatrimestre
function mostrarMaterias(cuatrimestre, listaElementId) {
    const listaElement = document.getElementById(listaElementId);
    const cuatrimestreHtml = cuatrimestre.map(item => `<li class="lista">${item.descripcion}: ${item.monto.toFixed(2)}</li>`).join('');
    listaElement.innerHTML = cuatrimestreHtml;
}

// Evento de botón para agregar Materias al Primer Cuatrimestre
let btnMaterias01 = document.getElementById('btnMaterias01');
btnMaterias01.addEventListener('click', function (event) {
    event.preventDefault();
    let descripcion = document.getElementById('nombreMateria01').value;
    let monto = parseFloat(document.getElementById('notaMateria01').value);
    agregarMateria(pCuatri, descripcion, monto);
    mostrarMaterias(pCuatri, 'listaMaterias01');
});

// Evento de botón para agregar Materias al Segundo Cuatrimestre
let btnMateria02 = document.getElementById('btnMateria02');
btnMateria02.addEventListener('click', function (event) {
    event.preventDefault();
    let descripcion = document.getElementById('nombreMateria02').value;
    let monto = parseFloat(document.getElementById('notaMateria02').value);
    agregarMateria(sCuatri, descripcion, monto);
    mostrarMaterias(sCuatri, 'listaMaterias02');
});

// Boton para guardar datos en el Local Storage
let botonGuardar = document.getElementById('guardarDatos');
botonGuardar.addEventListener("click", function () {
    localStorage.setItem('pCuatri', JSON.stringify(pCuatri));
    localStorage.setItem('sCuatri', JSON.stringify(sCuatri));
    Swal.fire({
        title: "Guardado",
        text: "Acabas de guardar los datos",
        icon: "success",
        confirmButtonText: "OK"
    });
});

// Tomar el evento del boton para Cargar datos
let botonCargar = document.getElementById('cargarDatos');
botonCargar.addEventListener('click', function () {
    cargarDatosDesdeLocalStorage();
    Swal.fire({
        title: "Cargado",
        text: "Acabas de cargar los datos anteriormente guardados",
        icon: "success",
        confirmButtonText: "OK"
    });
});

// Esta funcion trae los datos guardados al Dom
function cargarDatosDesdeLocalStorage() {
    const pCuatriGuardado = JSON.parse(localStorage.getItem('pCuatri'));
    const sCuatriGuardado = JSON.parse(localStorage.getItem('sCuatri'));

    if (pCuatriGuardado) {
        pCuatri = pCuatriGuardado;
        contadorMateriasPCuatri = pCuatri.length;
        actualizarPromedio(pCuatri, 'promedioPCuatri');
        mostrarMaterias(pCuatri, 'listaMaterias01');
    }

    if (sCuatriGuardado) {
        sCuatri = sCuatriGuardado;
        contadorMateriasSCuatri = sCuatri.length;
        actualizarPromedio(sCuatri, 'promedioSCuatri');
        mostrarMaterias(sCuatri, 'listaMaterias02');
    }
}

// Boton para borrar los datos tanto del local Storage como del DOM
let botonBorrarDatos = document.getElementById('borrarDatos');
botonBorrarDatos.addEventListener('click', function () {
    Swal.fire({
        title: '¿Quieres Reiniciar?',
        text: "Este paso es Irreversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Borrado!',
                'Acabas de reiniciar todos los datos',
                'success'
            )
            localStorage.removeItem('pCuatri');
            localStorage.removeItem('sCuatri');
            pCuatri = [];
            sCuatri = [];
            contadorMateriasPCuatri = 0;
            contadorMateriasSCuatri = 0;
            actualizarPromedio(pCuatri, 'promedioPCuatri');
            actualizarPromedio(sCuatri, 'promedioSCuatri');
            mostrarMaterias(pCuatri, 'listaMaterias01');
            mostrarMaterias(sCuatri, 'listaMaterias02');
        }
    })

});

function calcularTotal(items) {
    return items.reduce((total, item) => total + item.monto, 0);
}
