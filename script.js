let productos = JSON.parse(localStorage.getItem("productos")) || [];
let nextId = productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1;

function guardarEnLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function agregarTabla() {
    const tabla = document.getElementById("productos");
    tabla.innerHTML = "";

    productos.forEach(producto => {
        const fila = document.createElement("tr");
        fila.setAttribute("data-id", producto.id);

        fila.innerHTML = `
            <td>${producto.id}</td>
            <td class="editable">${producto.nombre}</td>
            <td class="editable">${producto.precio}</td>
            <td class="editable">${producto.cantidad}</td>
            <td>
                <button class="btn-editar btn btn-warning btn-sm">Editar</button>
                <button onclick="eliminarProducto(${producto.id})" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
        `;

        tabla.appendChild(fila);
    });

    document.querySelectorAll(".btn-editar").forEach(boton => {
        boton.addEventListener("click", function () {
            const fila = this.closest("tr");
            const celdas = fila.querySelectorAll(".editable");

            if (this.textContent === "Editar") {
                celdas.forEach(celda => {
                    celda.setAttribute("contenteditable", "true");
                    celda.classList.add("editing");
                });
                this.textContent = "Guardar";
            } else {
                const id = parseInt(fila.getAttribute("data-id"));
                const [nombre, precio, cantidad] = [...celdas].map(c => c.innerText.trim());

                actualizarProducto(id, "nombre", nombre);
                actualizarProducto(id, "precio", precio);
                actualizarProducto(id, "cantidad", cantidad);

                celdas.forEach(celda => {
                    celda.removeAttribute("contenteditable");
                    celda.classList.remove("editing");
                });
                this.textContent = "Editar";
                guardarEnLocalStorage();
            }
        });
    });
}

document.getElementById("FormularioProductos").addEventListener("submit", function(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);

    productos.push({ id: nextId++, nombre, precio, cantidad });
    guardarEnLocalStorage();
    agregarTabla();
    this.reset();
});

function actualizarProducto(id, campo, valor) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        producto[campo] = campo === "nombre" ? valor : parseFloat(valor);
        guardarEnLocalStorage();
    }
}

function eliminarProducto(id) {
    productos = productos.filter(p => p.id !== id);
    guardarEnLocalStorage();
    agregarTabla();
}

agregarTabla();