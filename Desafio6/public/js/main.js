const socket = io.connect();

// Update Tabla de Productos
Handlebars.registerHelper('isFalse', function (value) { 
    if (value.length === 0) {return true} else {return false}
})

const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {title: form[0].value, price: form[1].value, thumbnail: form[2].value}

    fetch('/', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(respuesta => respuesta.json())
    .then(productos => {
        form.reset();
        socket.emit('cargar');
    })
    .catch(error => console.error(error))
    
}) 

socket.on('listarProductos', async productos => {
    console.log(productos)
    productos.forEach(producto => {
        console.log(producto.title)
        console.log(producto.price)
        console.log(producto.thumbnail)
    });
    const archivo = await fetch('plantillas/lista.hbs');
    const template = await archivo.text();
    const tablaHtmlTemplate = Handlebars.compile(template);
    const tablaHtml = tablaHtmlTemplate({productos})
    document.getElementById('lista').innerHTML = tablaHtml;
})

// CHAT
socket.on('messages', data => {
    console.log(data);
    render(data); 
})

function render(data) {
    const html = data.map((elem, index) => {
        var d = new Date();
        const fyh = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        console.log(fyh)
        return(`
            <div>
                <strong style="color: blue">${elem.author}</strong>
                <span style="color: brown">${fyh}</span>
                <em style="color: green">${elem.text}</em
            </div> 
        `)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessages(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    }
    socket.emit('new-message', mensaje);

    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    return false
}