# 🌺 Proyecto Azure – Clasificación de Flores con Inteligencia Artificial  
**Caso Jardín Botánico Nacional 

---

## 📘 Descripción General  
Este proyecto implementa un sistema de clasificación automática de imágenes de flores utilizando **Azure Custom Vision**, consumido desde una **aplicación web** desarrollada con JavaScript.  
El objetivo principal es automatizar la organización de las imágenes enviadas por los usuarios de una encuesta del Jardín Botánico Nacional.

---

## 🎯 Objetivo  
Clasificar imágenes en cinco categorías principales:  
**daisy, dandelion, rose, sunflower, tulip**,  
reduciendo el trabajo manual y estandarizando el manejo de datos.

---

## 🧩 Problemática  
El Jardín Botánico recibe imágenes sin etiquetar, con variaciones de calidad y sin clasificación previa.  
Se requiere:

- Organizar automáticamente las imágenes.
- Validar si realmente contienen una flor.
- Facilitar el almacenamiento ordenado.
- Reducir errores humanos y costos operativos.

---

## Tecnologías utilizadas:
  - HTML  
  - CSS  
  - JavaScript  
  - Bootstrap  

---

# 📥 Dataset y Preparación de Datos  

### **Proceso aplicado**
1. Descarga del dataset desde Kaggle.  
2. Revisión manual de imágenes.  
3. Eliminación de imágenes borrosas o duplicadas.  
4. Carga del dataset en Custom Vision.  
5. Etiquetado por categoría.  
6. Balanceo de clases para un entrenamiento uniforme.

---

# 📊 Métricas del Modelo  

- **Precisión:** Porcentaje de predicciones correctas.  
- **Recall:** Capacidad de detectar todas las instancias positivas.  
- **Uso de recursos:** Monitoreo del consumo dentro de Azure.  
- **Tiempo de respuesta:** Duración promedio para procesar la imagen.

---

# 🛠️ Tecnologías Utilizadas  

- Azure Custom Vision  
- HTML / CSS / JavaScript  
- Bootstrap  
- Netlify  
- GitHub  

---

# ▶️ Guía de Uso  

1. Abrir la aplicación web.  
2. Subir una imagen o pegar un enlace.  
3. Presionar el botón **"Detectar flor"**.  
4. Ver el resultado:  
   - Clase detectada  
   - Probabilidad  
   - Predicciones alternativas  
   - Advertencia si la imagen no contiene una flor

---

# Imagenes de ejemplo

<img width="975" height="304" alt="image" src="https://github.com/user-attachments/assets/8a76280c-eef6-4af2-9d23-d2746bca7171" />
<img width="807" height="631" alt="image" src="https://github.com/user-attachments/assets/938236bd-d29f-4f5b-9565-bf45fcbc8a3a" />
<img width="975" height="325" alt="image" src="https://github.com/user-attachments/assets/a1137ed1-9f9c-4242-82a8-2d231fdaa607" />


---

# 🚀 Posibles Mejoras  

- Incrementar el volumen de datos por clase.  
- Implementar detección múltiple de flores en una sola imagen.  

---

# 📉 Riesgos y Limitaciones  

- Dependencia de la calidad visual: imágenes borrosas reducen precisión.  
- Diferencias de formato o tamaño pueden generar errores.  
- Costos en la nube deben gestionarse con cuidado.

---

# Desarrolladores Del Proyecto:

- Anthony Guzman
- Alberth cornelo
- Mario Suero

---

# Demo en vivo

-https://jardinbotanicoai.netlify.app/

---

