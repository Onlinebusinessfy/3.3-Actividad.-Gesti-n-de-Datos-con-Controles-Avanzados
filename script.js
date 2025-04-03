



function agregarTabla(){
    const tabla=document.getElementById("productos");
    tableBody.innerHTML="";
    productos.forEach(producto => {
        const fila = document.createElement("tr");
        fila.innerHTML=`
        <td>${producto.id}<td>
        <td contenteditable="true" onBlur="updateProduct(${producto.id}, 'nombre', this.innerText)">${producto.nombre}</td>
        <td contenteditable="true" onBlur="updateProduct(${producto.id}, 'precio', this.innerText)">${producto.precio}</td>
        <td contenteditable="true" onBlur="updateProduct(${producto.id}, 'cantidad', this.innerText)">${producto.cantidad}</td>
        <td><button onclick="eliminarProducto(${producto.id})">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
    });
}

document.getElementById("FormularioProductos").addEventListener("submit", function(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
    products.push({ id: nextId++, nombre, precio, cantidad });
    renderTable();
    this.reset();
});

function actualizarProducto(id, campo, valor) {
    const producto = products.find(p => p.id === id);
    if (producto) {
        producto[campo] = campo === "nombre" ? valor : parseFloat(valor);
    }
  }

function eliminarProducto(id) {
    products = products.filter(p => p.id !== id);
    renderTable();
}

renderTable();