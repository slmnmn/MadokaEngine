document.addEventListener("DOMContentLoaded", function () {
    // Verifica si hay un parámetro de id en la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // Si hay id, carga los datos para editar
    if (id) {
        fetch(`http://127.0.0.1:5000/monas/${id}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("name").value = data.name;
                document.getElementById("age").value = data.age;
                document.getElementById("city").value = data.city;
                document.getElementById("status").value = data.status;
                document.getElementById("contract_date").value = data.contract_date;
                document.getElementById("image_url").value = data.image_url;

            })
            .catch(error => console.error("Error al cargar los datos:", error));
    }

    // Guardar o editar a la chica
    document.getElementById("guardarMona").addEventListener("click", function () {
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const city = document.getElementById("city").value;
        const status = document.getElementById("status").value;
        const contract_date = document.getElementById("contract_date").value;
        const image_url = document.getElementById("image_url").value;

        const method = id ? "PUT" : "POST";
        const url = id ? `http://127.0.0.1:5000/monas/${id}` : "http://127.0.0.1:5000/monas";

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, age, city, status, contract_date, image_url })
        })
        .then(response => response.json())
        .then(() => {
            alert("Chica mágica guardada");
            window.location.href = "index.html";
        })
        .catch(error => console.error("Error al guardar:", error));
    });
});
