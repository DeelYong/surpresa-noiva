let currentEvent = 1;

function nextEvent(eventNumber) {
    document.getElementById(`event${currentEvent}`).style.display = 'none'; // Esconde o evento atual
    currentEvent = eventNumber;
    document.getElementById(`event${currentEvent}`).style.display = 'block'; // Mostra o próximo evento
}

// Inicializa o primeiro evento visível
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('event1').style.display = 'block';
});
