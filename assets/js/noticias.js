document.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("newsStatus");
  const container = document.getElementById("news");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "assets/data/noticias.json", true);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const items = JSON.parse(xhr.responseText);
      status.textContent = "";
      container.innerHTML = items.map(n => `
        <article class="news-item">
          <h3>${n.titulo}</h3>
          <small>${n.fecha}</small>
          <p>${n.texto}</p>
        </article>
      `).join("");
    } else {
      status.textContent = "Error cargando noticias";
    }
  };

  xhr.onerror = function () {
    status.textContent = "Error de red cargando noticias";
  };

  xhr.send();
});
