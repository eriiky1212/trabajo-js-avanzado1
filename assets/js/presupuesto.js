document.addEventListener("DOMContentLoaded", () => {
  const PRICES = { web: 650, landing: 420, tienda: 950 };
  const DEADLINE_MULT = { normal: 1.0, rapido: 1.2, express: 1.5 };
  const EXTRA_PRICES = { seo: 120, mantenimiento: 90, contenido: 150 };

  const form = document.getElementById("budgetForm");

  const nombre = document.getElementById("nombre");
  const apellidos = document.getElementById("apellidos");
  const email = document.getElementById("email");
  const telefono = document.getElementById("telefono");

  const producto = document.getElementById("producto");
  const plazo = document.getElementById("plazo");
  const descuento = document.getElementById("descuento");

  const extraSeo = document.getElementById("extraSeo");
  const extraMantenimiento = document.getElementById("extraMantenimiento");
  const extraContenido = document.getElementById("extraContenido");

  const condiciones = document.getElementById("condiciones");
  const status = document.getElementById("formStatus");

  const outBase = document.getElementById("outBase");
  const outPlazo = document.getElementById("outPlazo");
  const outExtras = document.getElementById("outExtras");
  const outDesc = document.getElementById("outDesc");
  const outSubtotal = document.getElementById("outSubtotal");
  const outIva = document.getElementById("outIva");
  const outTotal = document.getElementById("outTotal");

  const errNombre = document.getElementById("errNombre");
  const errApellidos = document.getElementById("errApellidos");
  const errEmail = document.getElementById("errEmail");
  const errTelefono = document.getElementById("errTelefono");
  const errCondiciones = document.getElementById("errCondiciones");

  const euros = (n) => `${n.toFixed(2)}€`;

  function setError(elSmall, msg) { elSmall.textContent = msg || ""; }
  function onlyLettersSpaces(str) { return /^[A-Za-zÀ-ÿ\s'-]{2,}$/.test(str.trim()); }
  function validEmail(str) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str.trim()); }
  function validPhone(str) {
    const digits = str.replace(/\s+/g, "");
    return /^[0-9]{9,15}$/.test(digits);
  }

  function validateForm() {
    let ok = true;

    if (!onlyLettersSpaces(nombre.value)) { setError(errNombre, "Nombre inválido (mín. 2 letras)."); ok = false; }
    else setError(errNombre, "");

    if (!onlyLettersSpaces(apellidos.value)) { setError(errApellidos, "Apellidos inválidos (mín. 2 letras)."); ok = false; }
    else setError(errApellidos, "");

    if (!validEmail(email.value)) { setError(errEmail, "Email inválido."); ok = false; }
    else setError(errEmail, "");

    if (!validPhone(telefono.value)) { setError(errTelefono, "Teléfono inválido (9-15 dígitos)."); ok = false; }
    else setError(errTelefono, "");

    if (!condiciones.checked) { setError(errCondiciones, "Debes aceptar la política/condiciones."); ok = false; }
    else setError(errCondiciones, "");

    return ok;
  }

  function calc() {
    const base = PRICES[producto.value] ?? 0;
    const mult = DEADLINE_MULT[plazo.value] ?? 1;

    let extras = 0;
    if (extraSeo.checked) extras += EXTRA_PRICES.seo;
    if (extraMantenimiento.checked) extras += EXTRA_PRICES.mantenimiento;
    if (extraContenido.checked) extras += EXTRA_PRICES.contenido;

    const beforeDiscount = base * mult + extras;

    let discount = 0;
    const code = descuento.value.trim().toUpperCase();
    if (code === "PROMO10") discount = beforeDiscount * 0.10;

    const subtotal = Math.max(0, beforeDiscount - discount);
    const iva = subtotal * 0.21;
    const total = subtotal + iva;

    outBase.textContent = euros(base);
    outPlazo.textContent = `x${mult.toFixed(2)}`;
    outExtras.textContent = euros(extras);
    outDesc.textContent = `- ${euros(discount)}`;
    outSubtotal.textContent = euros(subtotal);
    outIva.textContent = euros(iva);
    outTotal.textContent = euros(total);
  }

  [producto, plazo, descuento, extraSeo, extraMantenimiento, extraContenido].forEach(el => {
    el.addEventListener("input", calc);
  });

  [nombre, apellidos, email, telefono, condiciones].forEach(el => {
    el.addEventListener("input", () => { status.textContent = ""; });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";

    if (!validateForm()) {
      status.textContent = "Revisa los campos marcados en rojo.";
      return;
    }
function validateForm() {
  let ok = true;
  let firstInvalid = null;

  const mark = (inputEl, errEl, msg) => {
    setError(errEl, msg);
    const invalid = Boolean(msg);
    inputEl.setAttribute("aria-invalid", invalid ? "true" : "false");
    if (invalid && !firstInvalid) firstInvalid = inputEl;
    if (invalid) ok = false;
  };

  mark(nombre, errNombre, onlyLettersSpaces(nombre.value) ? "" : "Nombre inválido (mín. 2 letras).");
  mark(apellidos, errApellidos, onlyLettersSpaces(apellidos.value) ? "" : "Apellidos inválidos (mín. 2 letras).");
  mark(email, errEmail, validEmail(email.value) ? "" : "Email inválido.");
  mark(telefono, errTelefono, validPhone(telefono.value) ? "" : "Teléfono inválido (9-15 dígitos).");

  // Checkbox (no es input normal, pero también suma accesibilidad)
  setError(errCondiciones, condiciones.checked ? "" : "Debes aceptar la política/condiciones.");
  condiciones.setAttribute("aria-invalid", condiciones.checked ? "false" : "true");
  if (!condiciones.checked && !firstInvalid) firstInvalid = condiciones, ok = false;

  if (!ok && firstInvalid) firstInvalid.focus();
  return ok;
}

    status.textContent = "Formulario correcto. Envío simulado (OK).";
  });

  calc();
});
