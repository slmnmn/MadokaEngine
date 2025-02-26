document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    fetch("http://127.0.0.1:5000/monas")

        .then(response => response.json())
        .then(data => {

            const profile = data.find(p => p.id == id);

            if (profile) {
                document.getElementById("profile-details").innerHTML = `
                    <h2>${profile.name}</h2>
                    <img src="${profile.image_url}" alt="${profile.name}">
                    <div class="info">
                        <p><strong>Edad:</strong> ${profile.age}</p>
                        <p><strong>Ciudad:</strong> ${profile.city}</p>
                        <p><strong>Estado:</strong> ${profile.status}</p>
                        <p><strong>Contrato:</strong> ${profile.contract_date}</p>
                        <p><strong>Actualizado el:</strong> ${formatFecha(profile.updated_at)}</p>
                    </div>
                    <a href="index.html" class="back-btn">← Volver a la lista</a>
                `;

            } else {
                document.getElementById("profile-details").innerHTML = "<p>Perfil no encontrado.</p>";
            }
        })
        
        .catch(error => console.error("Error al obtener los datos:", error));
});

// Función para formatear la fecha 
function formatFecha(fecha) {
    if (!fecha) return "Nunca actualizado";  //si no hay fecha (que en la base de datos no hay realmente)
    const date = new Date(fecha);
    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
}
