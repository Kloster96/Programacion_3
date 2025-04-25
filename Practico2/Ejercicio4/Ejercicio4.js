document.addEventListener('DOMContentLoaded', function(){
    const formulario = document.getElementById("formulario");
    const lista = document.getElementById("lista");
    const nueva_tarea = document.getElementById("tarea_nueva");
    formulario.addEventListener("submit", function(event){
    event.preventDefault();
    const tarea = nueva_tarea.value.trim();
    if (tarea !== "") {
        const nuevoItem = document.createElement("li");
        nuevoItem.textContent = tarea;
        lista.appendChild(nuevoItem);
        nueva_tarea.value = ""; 
    }
    });   

});