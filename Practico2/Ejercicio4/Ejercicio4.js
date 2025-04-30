document.addEventListener('DOMContentLoaded', function(){
    const lista = document.getElementById("lista");
    const nueva_tarea = document.getElementById("tarea_nueva");
    const boton = document.getElementById("boton");
    boton.addEventListener("click", function(event){
        event.preventDefault();
        const tarea = nueva_tarea.value.trim();
        if (tarea !== "") {
            const nuevoItem = document.createElement("li");
            nuevoItem.textContent = tarea;
            nuevoItem.classList.add("tarea");
            lista.appendChild(nuevoItem);
            nueva_tarea.value = ""; 
        }   
    });   
    lista.addEventListener("click", function(evento){
        if(evento.target.classList.contains("tarea")){
            evento.target.classList.toggle("completado");
        }
            
    });
});