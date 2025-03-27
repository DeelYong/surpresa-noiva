const photos = Array(10).fill(null); // Array para 10 fotos
let currentIndex = 0;

const currentPhoto = document.getElementById('currentPhoto');
const photoPlaceholder = document.getElementById('photoPlaceholder');
const caption = document.getElementById('caption');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const photoGrid = document.getElementById('photoGrid');

// Inicializar grid de fotos no modal
function initPhotoGrid() {
    photoGrid.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const slot = document.createElement('div');
        slot.className = 'photo-slot';
        slot.innerHTML = `
            <div class="mb-3">
                <label class="form-label">Foto ${i + 1}</label>
                <input type="file" class="form-control" accept="image/*" data-index="${i}">
            </div>
            <div class="mb-3">
                <label class="form-label">Frase ${i + 1}</label>
                <textarea class="form-control" rows="2" data-index="${i}"></textarea>
            </div>
        `;
        photoGrid.appendChild(slot);

        // Eventos para os inputs
        const fileInput = slot.querySelector('input[type="file"]');
        const textArea = slot.querySelector('textarea');

        fileInput.addEventListener('change', (e) => handleFileSelect(e, i));
        textArea.addEventListener('input', (e) => handleCaptionInput(e, i));

        // Preencher texto se já existir
        if (photos[i]) {
            textArea.value = photos[i].caption;
        }
    }
}

function handleFileSelect(e, index) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photos[index] = photos[index] || {};
            photos[index].url = e.target.result;
            updateDisplay();
        };
        reader.readAsDataURL(file);
    }
}

function handleCaptionInput(e, index) {
    photos[index] = photos[index] || {};
    photos[index].caption = e.target.value;
    updateDisplay();
}

function updateDisplay() {
    const currentSlide = photos[currentIndex];
    
    if (currentSlide && currentSlide.url) {
        photoPlaceholder.style.display = 'none';
        currentPhoto.style.display = 'block';
        currentPhoto.src = currentSlide.url;
        caption.textContent = currentSlide.caption || '';
    } else {
        photoPlaceholder.style.display = 'flex';
        currentPhoto.style.display = 'none';
        caption.textContent = '';
    }

    // Atualizar barra de progresso
    const progress = ((currentIndex + 1) / photos.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Atualizar visibilidade das setas
    const hasPhotos = photos.some(photo => photo !== null);
    prevBtn.style.display = hasPhotos ? 'flex' : 'none';
    nextBtn.style.display = hasPhotos ? 'flex' : 'none';
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    updateDisplay();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % photos.length;
    updateDisplay();
});

// Inicializar
initPhotoGrid();
updateDisplay(); 
