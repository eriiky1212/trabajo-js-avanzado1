document.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("mapStatus");

  // Coordenadas de ejemplo (Girona)
  const empresa = { lat: 41.9794, lng: 2.8214 };

  const map = L.map("map").setView([empresa.lat, empresa.lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const empresaMarker = L.marker([empresa.lat, empresa.lng]).addTo(map)
    .bindPopup("NovaWeb Studio (Empresa)").openPopup();

  let clienteMarker = null;
  let routeLine = null;

  function drawRoute(toLatLng) {
    if (routeLine) map.removeLayer(routeLine);
    routeLine = L.polyline([[empresa.lat, empresa.lng], [toLatLng.lat, toLatLng.lng]], { }).addTo(map);
    map.fitBounds(routeLine.getBounds(), { padding: [30, 30] });
  }

  const btn = document.getElementById("btnRuta");
  btn.addEventListener("click", () => {
    status.textContent = "Calculando ruta… (geolocalización)";

    if (!navigator.geolocation) {
      status.textContent = "Tu navegador no soporta geolocalización.";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const cliente = { lat: pos.coords.latitude, lng: pos.coords.longitude };

        if (clienteMarker) map.removeLayer(clienteMarker);
        clienteMarker = L.marker([cliente.lat, cliente.lng]).addTo(map)
          .bindPopup("Tu ubicación (Cliente)").openPopup();

        drawRoute(cliente);
        status.textContent = "Ruta mostrada (línea) desde la empresa hasta tu ubicación.";
      },
      () => {
        status.textContent = "No se pudo obtener tu ubicación. Permite el acceso a ubicación en el navegador.";
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
});
