const API_BASE = "http://localhost:5000";

const eventList = document.querySelector("#event-list");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");

function renderEvent(event) {
  const li = document.createElement("li");
  li.textContent = event.title;
  eventList.appendChild(li);
}

function loadEvents() {
  fetch(`${API_BASE}/events`)
    .then((response) => response.json())
    .then((events) => events.forEach(renderEvent))
    .catch((error) => console.error("Failed to load events:", error));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  if (!title) return;

  fetch(`${API_BASE}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  })
    .then((response) => response.json())
    .then((newEvent) => {
      renderEvent(newEvent);
      form.reset();
    })
    .catch((error) => console.error("Failed to add event:", error));
});

loadEvents();