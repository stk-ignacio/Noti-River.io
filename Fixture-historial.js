document.addEventListener("DOMContentLoaded", function () {
    const detalles = document.querySelector(".calendario");
    const enlaces = document.querySelectorAll(".cal a");

    enlaces.forEach(enlace => {
        enlace.addEventListener("click", function () {
            detalles.removeAttribute("open"); // Cierra el desplegable
        });
    });
});