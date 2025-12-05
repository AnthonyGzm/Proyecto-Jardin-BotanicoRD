// CONFIGURACIÓN AZURE CUSTOM VISION
const predictionKey = "BZj2Zw65Lj6mA0sn7hkjY3MeT5YyCpKd6m5swtk9DAOJeWmKZn8QJQQJ99BLACYeBjFXJ3w3AAAIACOGX4Z3";
const endpoint = "https://jardinbotanico-prediction.cognitiveservices.azure.com/";
const projectId = "6c323cbc-b3bb-432f-b8a5-389e7c12124f";
const publishedName = "JardinBotanico_Model";

const endpointFile =
    `${endpoint}customvision/v3.0/Prediction/${projectId}/classify/iterations/${publishedName}/image`;

const endpointUrl =
    `${endpoint}customvision/v3.0/Prediction/${projectId}/classify/iterations/${publishedName}/url`;


const validFlowerTags = [
    "daisy",
    "dandelion",
    "rose",
    "sunflower",
    "tulip"
];

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


function displayResults(data) {
    const box = document.getElementById("results");
    const preview = document.getElementById("previewImage");
    box.style.display = "block";

    // Ordenar por probabilidad (primero la más alta)
    data.predictions.sort((a, b) => b.probability - a.probability);

    const top = data.predictions[0];
    const detectedLabel = top.tagName.toLowerCase();


    if (!validFlowerTags.includes(detectedLabel) || top.probability < 0.40) {
        preview.src = "img/no_flor.png";
        box.innerHTML = `
            <h3 class="fw-bold text-danger">La ERROR: Imagen No Es Una Flor</h3>
            <p>La imagen no coincide con ninguna flor del sistema.</p>
        `;
        return; 
    }

    
    // SI ES UNA FLOR → MOSTRAR RESULTADOS NORMALES
    let html = `<h3 class="fw-bold">Resultados:</h3>`;

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

    box.innerHTML = html;
}
