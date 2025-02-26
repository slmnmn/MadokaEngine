let perfiles = []; 

document.addEventListener("DOMContentLoaded", function () {
    // Cargar los datos desde Flask
    fetch("http://127.0.0.1:5000/monas")
        .then(response => response.json())
        .then(data => {
            perfiles = data;
            mostrarPerfiles(data);
        })
        .catch(error => console.error("Error al obtener los datos:", error));

    // Agrega eventos para la búsqueda y el filtro
    document.getElementById("search").addEventListener("input", filtrar);
    document.getElementById("statusFilter").addEventListener("change", filtrar);
});

// Mostrar perfiles en la página con botones para editar y eliminar
function mostrarPerfiles(data) {
    const container = document.getElementById("profiles");
    container.innerHTML = ""; 
    data.forEach(profile => {
        const div = document.createElement("div");
        div.className = "profile";
        div.innerHTML = `
            <img src="${profile.image_url}" alt="${profile.name}" onclick="verDetalles(${profile.id})">
            <h2 class="name">${profile.name}</h2>
            <button class="btn-edit" onclick="editarPerfil(${profile.id})">Editar</button>
            <button class="btn-delete" onclick="eliminarPerfil(${profile.id})">Eliminar</button>
        `;
        container.appendChild(div);
    });
}

// Filtro por nombre y estado
function filtrar() {
    const texto = document.getElementById("search").value.toLowerCase();
    const estado = document.getElementById("statusFilter").value;
    
    const resultados = perfiles.filter(profile => {
        return profile.name.toLowerCase().includes(texto) &&
               (estado === "" || profile.status === estado);
    });

    mostrarPerfiles(resultados);
}

// Redirigir a la página de detalles
function verDetalles(id) {
    window.location.href = `detalles.html?id=${id}`;
}

// Editar perfil
function editarPerfil(id) {
    window.location.href = `formulario.html?id=${id}`;
}

//Eliminar Perfil
function eliminarPerfil(id) {
    if (confirm("¿Seguro que quieres eliminar este perfil?")) {
        fetch(`http://127.0.0.1:5000/monas/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(() => {
            alert("Perfil eliminado");
            location.reload();
        })
        .catch(error => console.error("Error al eliminar:", error));
    }
}

