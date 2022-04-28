class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.libros = libros;
      this.mascotas = mascotas;
    }
    
    getFullName () {
      return `${this.nombre} ${this.apellido}`
    }
    
    addMascota (mascota) {
      this.mascotas.push(mascota);
    }
    
    getMascotas () {
      return this.mascotas.length;
    }
    
    addBook (libro, autor) {
      this.libros.push({name: libro, autor: autor});
    }
    
    getBooks () {
      const resp = [];
      this.libros.forEach(libro => resp.push(libro.name));
      return resp;
    }
  }
  
  let prueba = new Usuario('Laura', 'Aguilar', [{name: 'mujercitas', autor: 'anonimo'}, {name:'Fahrenheit 451', autor:'Ray Bradbury'}], ['perro', 'gato', 'otroPerro']);
  
  console.log(prueba);  
  //console.log(prueba.getFullName());
  //console.log(prueba.getMascotas());

  //prueba.addMascota('tiburon');
  //console.log(prueba.mascotas);

  prueba.addBook('100 años de soledad', 'Gabriel Garcia Marquez');
  //console.log(prueba.libros);

  console.log(prueba.getBooks());
  console.log(prueba); 