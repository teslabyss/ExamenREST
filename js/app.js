const enviarDatos = () => {
  console.log("enviarDatos");
  let nombre = document.getElementById("nombre").value;
  let edad = document.getElementById("edad").value;
  let paisElement = document.getElementById("pais");
  let pais = paisElement.innerText;
  const formData = new FormData();

  formData.append("nombre", nombre);
  formData.append("edad", edad);
  formData.append("pais", pais);

  let apiUrl =
    "https://rmm-api-centralizada.000webhostapp.com/backend/apiPostRegistrosMundiales.php";
  if (pais.toLowerCase() === "argentina") {
    apiUrl =
      "https://rmm-api-argentina.000webhostapp.com/backend/apiPostRegistros.php";
  } else if (pais.toLowerCase() === "france") {
    apiUrl =
      "https://rmm-api-francia.000webhostapp.com/backend/apiPostRegistros.php";
  } else if (pais.toLowerCase() === "algeria") {
    apiUrl =
      "https://rmm-api-argelia.000webhostapp.com/backend/apiPostRegistros.php";
  }
  
  console.log(apiUrl);
  fetch(apiUrl, { body: formData, method: "POST" })
    .then(() => {
      fetch(
        "https://rmm-api-centralizada.000webhostapp.com/backend/apiPostRegistrosMundiales.php",
        { body: formData, method: "POST" }
      );
    })
    .then(function (response) {
      console.log(response.data);
      alert("Datos enviados");
    })
    .catch(function (error) {
      console.error("Error al enviar los datos:", error);
    });
};

const solicitudAPI = () => {
  console.log("solicitudAPI");
  axios    
    .get("https://rmm-api-centralizada.000webhostapp.com/php-geopais-api/")
    .then(function (response) {
      let paisElement = document.getElementById("pais");
      if (paisElement) {
        paisElement.innerText = response.data.Pais;
        console.log(response.data.Pais);      
      } else {
        console.error("Elemento HTML 'pais' no encontrado");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
window.addEventListener("DOMContentLoaded", solicitudAPI);
document.getElementById("formulario").addEventListener("click", enviarDatos);
