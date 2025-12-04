// CONFIGURACIÓN AZURE CUSTOM VISION
const predictionKey = "BZj2Zw65Lj6mA0sn7hkjY3MeT5YyCpKd6m5swtk9DAOJeWmKZn8QJQQJ99BLACYeBjFXJ3w3AAAIACOGX4Z3";
const endpoint = "https://jardinbotanico-prediction.cognitiveservices.azure.com/";
const projectId = "6c323cbc-b3bb-432f-b8a5-389e7c12124f";
const publishedName = "JardinBotanico_Model";

const endpointFile =
    `${endpoint}customvision/v3.0/Prediction/${projectId}/classify/iterations/${publishedName}/image`;

const endpointUrl =
    `${endpoint}customvision/v3.0/Prediction/${projectId}/classify/iterations/${publishedName}/url`;


document.getElementById("imageUpload").addEventListener("change", function () {
    let file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = document.getElementById("previewImage");
        const box = document.getElementById("previewContainer");

        img.src = e.target.result;

        img.style.display = "block";
        box.style.display = "block";
    };

    reader.readAsDataURL(file);
});


document.getElementById("imageUrl").addEventListener("input", function () {
    const url = this.value.trim();
    const img = document.getElementById("previewImage");
    const box = document.getElementById("previewContainer");

    if (url === "") {
        img.style.display = "none";
        box.style.display = "none";
        return;
    }

    img.onload = function () {
        img.style.display = "block";
        box.style.display = "block";
    };

    img.onerror = function () {
        img.style.display = "none";
        box.style.display = "none";
    };

    img.src = url;
});

function analyzeImage() {
    let file = document.getElementById("imageUpload").files[0];

    if (!file) {
        alert("Selecciona una imagen primero.");
        return;
    }

    fetch(endpointFile, {
        method: "POST",
        headers: {
            "Prediction-Key": predictionKey,
            "Content-Type": "application/octet-stream"
        },
        body: file
    })
        .then(res => res.json())
        .then(data => displayResults(data))
        .catch(err => console.error(err));
}

function analyzeUrl() {
    const imageUrl = document.getElementById("imageUrl").value;

    if (!imageUrl) {
        alert("Escribe una URL válida.");
        return;
    }

    fetch(endpointUrl, {
        method: "POST",
        headers: {
            "Prediction-Key": predictionKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ Url: imageUrl })
    })
        .then(res => res.json())
        .then(data => displayResults(data))
        .catch(err => console.error(err));
}


// =============================
// MOSTRAR RESULTADOS
// =============================
function displayResults(data) {
    const box = document.getElementById("results");
    box.style.display = "block";

    let html = `<h3 class="fw-bold">Resultados:</h3>`;

    if (data.predictions && data.predictions.length > 0) {
        data.predictions.sort((a, b) => b.probability - a.probability);

        const top = data.predictions[0];

        html += `
            <p><strong>Flor Detectada:</strong> ${top.tagName.toUpperCase()}</p>
            <p><strong>Probabilidad:</strong> ${(top.probability * 100).toFixed(2)}%</p>
            <hr>
            <h4 class="fw-bold">Todas las predicciones:</h4>
            <ul>
        `;

        data.predictions.forEach(p => {
            html += `<li><strong>${p.tagName}</strong>: ${(p.probability * 100).toFixed(2)}%</li>`;
        });

        html += `</ul>`;
    }

    box.innerHTML = html;
}
