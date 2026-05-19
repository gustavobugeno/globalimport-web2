const formulario = document.querySelector(".formulario-registro");

const nombre = document.getElementById("nombre");
const fechaNacimiento = document.getElementById("fechaNacimiento");
const rut = document.getElementById("rut");
const genero = document.getElementById("genero");
const nacionalidad = document.getElementById("nacionalidad");

const email = document.getElementById("email");
const confirmarEmail = document.getElementById("confirmarEmail");
const password = document.getElementById("password");
const confirmarPassword = document.getElementById("confirmarPassword");
const telefono = document.getElementById("telefono");

const pais = document.getElementById("pais");
const provincia = document.getElementById("provincia");
const ciudad = document.getElementById("ciudad");
const calle = document.getElementById("calle");
const codigoPostal = document.getElementById("codigoPostal");
const referencia = document.getElementById("referencia");

function mostrarError(campo, mensaje) {
  campo.classList.add("campo-error");
  campo.classList.remove("campo-ok");

  let error = campo.parentElement.querySelector(".mensaje-error");

  if (!error) {
    error = document.createElement("p");
    error.classList.add("mensaje-error");
    campo.parentElement.appendChild(error);
  }

  error.textContent = mensaje;
}

function mostrarOk(campo) {
  campo.classList.remove("campo-error");
  campo.classList.add("campo-ok");

  const error = campo.parentElement.querySelector(".mensaje-error");

  if (error) {
    error.remove();
  }
}

function validarRutChileno(rutTexto) {
  const rutLimpio = rutTexto.replace(/\./g, "").replace("-", "");

  if (!/^[0-9]{7,8}[0-9kK]$/.test(rutLimpio)) {
    return false;
  }

  const cuerpo = rutLimpio.slice(0, -1);
  let dv = rutLimpio.slice(-1).toUpperCase();

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplicador;
    multiplicador++;

    if (multiplicador > 7) {
      multiplicador = 2;
    }
  }

  const resto = suma % 11;
  const resultado = 11 - resto;

  let dvEsperado;

  if (resultado === 11) {
    dvEsperado = "0";
  } else if (resultado === 10) {
    dvEsperado = "K";
  } else {
    dvEsperado = resultado.toString();
  }

  return dv === dvEsperado;
}

function validarEdad(fecha) {
  const nacimiento = new Date(fecha);
  const hoy = new Date();

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad >= 18;
}

function validarFormulario() {
  let valido = true;

  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,60}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  const regexTelefono = /^[+\-\s0-9]+$/;
  const regexCiudad = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
  const regexCodigoPostal = /^[A-Za-z0-9]{4,10}$/;

  if (!regexNombre.test(nombre.value.trim())) {
    mostrarError(nombre, "El nombre debe tener solo letras y entre 3 y 60 caracteres.");
    valido = false;
  } else {
    mostrarOk(nombre);
  }

  if (fechaNacimiento.value === "" || !validarEdad(fechaNacimiento.value)) {
    mostrarError(fechaNacimiento, "Debes ser mayor de 18 años.");
    valido = false;
  } else {
    mostrarOk(fechaNacimiento);
  }

  if (!validarRutChileno(rut.value.trim())) {
    mostrarError(rut, "El RUT no es válido.");
    valido = false;
  } else {
    mostrarOk(rut);
  }

  if (genero.value === "") {
    mostrarError(genero, "Debes seleccionar un género.");
    valido = false;
  } else {
    mostrarOk(genero);
  }

  if (nacionalidad.value === "") {
    mostrarError(nacionalidad, "Debes seleccionar una nacionalidad.");
    valido = false;
  } else {
    mostrarOk(nacionalidad);
  }

  if (!regexEmail.test(email.value.trim())) {
    mostrarError(email, "El email no tiene un formato válido.");
    valido = false;
  } else {
    mostrarOk(email);
  }

  if (confirmarEmail.value.trim() !== email.value.trim()) {
    mostrarError(confirmarEmail, "Los correos no coinciden.");
    valido = false;
  } else {
    mostrarOk(confirmarEmail);
  }

  if (!regexPassword.test(password.value)) {
    mostrarError(password, "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un carácter especial.");
    valido = false;
  } else {
    mostrarOk(password);
  }

  if (confirmarPassword.value !== password.value) {
    mostrarError(confirmarPassword, "Las contraseñas no coinciden.");
    valido = false;
  } else {
    mostrarOk(confirmarPassword);
  }

  const soloNumerosTelefono = telefono.value.replace(/\D/g, "");

  if (!regexTelefono.test(telefono.value) || soloNumerosTelefono.length < 8) {
    mostrarError(telefono, "El teléfono debe tener mínimo 8 dígitos.");
    valido = false;
  } else {
    mostrarOk(telefono);
  }

  if (pais.value === "") {
    mostrarError(pais, "Debes seleccionar un país.");
    valido = false;
  } else {
    mostrarOk(pais);
  }

  if (provincia.value.trim() === "") {
    mostrarError(provincia, "La provincia no puede estar vacía.");
    valido = false;
  } else {
    mostrarOk(provincia);
  }

  if (!regexCiudad.test(ciudad.value.trim())) {
    mostrarError(ciudad, "La ciudad debe tener solo letras y mínimo 2 caracteres.");
    valido = false;
  } else {
    mostrarOk(ciudad);
  }

  if (calle.value.trim().length < 5) {
    mostrarError(calle, "La calle y número debe tener mínimo 5 caracteres.");
    valido = false;
  } else {
    mostrarOk(calle);
  }

  if (!regexCodigoPostal.test(codigoPostal.value.trim())) {
    mostrarError(codigoPostal, "El código postal debe ser alfanumérico y tener entre 4 y 10 caracteres.");
    valido = false;
  } else {
    mostrarOk(codigoPostal);
  }

  const categorias = document.querySelectorAll('input[name="categorias"]:checked');

  if (categorias.length === 0) {
    alert("Debes seleccionar al menos una categoría de interés.");
    valido = false;
  }

  const tipoCliente = document.querySelector('input[name="tipoCliente"]:checked');

  if (!tipoCliente) {
    alert("Debes seleccionar un tipo de cliente.");
    valido = false;
  }

  const terminos = document.getElementById("terminos");
  const privacidad = document.getElementById("privacidad");

  if (!terminos.checked || !privacidad.checked) {
    alert("Debes aceptar los términos y la política de privacidad.");
    valido = false;
  }

  return valido;
}

formulario.addEventListener("submit", function(event) {
  event.preventDefault();

  const formularioValido = validarFormulario();

  if (formularioValido) {
    formulario.style.display = "none";

    const mensajeExito = document.createElement("div");
    mensajeExito.classList.add("mensaje-exito");

    mensajeExito.innerHTML = `
      <h2>Registro exitoso</h2>
      <p>Bienvenido/a, ${nombre.value}. Tu registro en GlobalImport S.A. fue completado correctamente.</p>
      <a href="index.html" class="btn-principal">Volver al inicio</a>
    `;

    document.querySelector(".registro-contenedor").appendChild(mensajeExito);
  }
});

const campos = document.querySelectorAll("input, select, textarea");

campos.forEach(function(campo) {
  campo.addEventListener("blur", function() {
    validarFormulario();
  });

  campo.addEventListener("input", function() {
    campo.classList.remove("campo-error");

    const error = campo.parentElement.querySelector(".mensaje-error");

    if (error) {
      error.remove();
    }
  });
});

referencia.addEventListener("input", function() {
  let contador = document.getElementById("contador-referencia");

  if (!contador) {
    contador = document.createElement("small");
    contador.id = "contador-referencia";
    referencia.parentElement.appendChild(contador);
  }

  contador.textContent = referencia.value.length + " / 200 caracteres";
});