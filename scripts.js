let currentEvent = 1;

function nextEvent(eventNumber) {
    // Esconde o evento atual
    document.getElementById(`event${currentEvent}`).style.display = 'none';
    
    // Atualiza o número do evento atual
    currentEvent = eventNumber;
    
    // Mostra o próximo evento
    document.getElementById(`event${currentEvent}`).style.display = 'block';
}

// Inicializa o primeiro evento visível
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('event1').style.display = 'block';
});
