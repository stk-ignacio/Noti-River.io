function mostrarTarjeta(id) {
    document.getElementById(id).classList.add("mostrar");
    document.getElementById("overlay").classList.add("mostrar");
}

function cerrarTarjeta(id) {
    document.getElementById(id).classList.remove("mostrar");
    document.getElementById("overlay").classList.remove("mostrar");
}
document.getElementById("overlay").addEventListener("click", function() {
    document.querySelectorAll(".mostrar").forEach(elemento => {
        elemento.classList.remove("mostrar");
    });
});