document.addEventListener('DOMContentLoaded', function() {
    console.log('Script carregado');
    
    let photos = Array(10).fill(null);
    let currentIndex = 0;

    const currentPhoto = document.getElementById('currentPhoto');
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    const caption = document.getElementById('caption');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const photoGrid = document.getElementById('photoGrid');
    const saveChangesBtn = document.getElementById('saveChanges');

    function createPhotoCard(index) {
        return `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Momento ${index + 1}</h5>
                    <div class="mb-3">
                        <label class="form-label">Foto</label>
                        <div class="preview-container mb-2 ${photos[index]?.url ? '' : 'd-none'}">
                            <img class="preview-image" src="${photos[index]?.url || ''}" alt="Preview">
                        </div>
                        <div class="d-flex gap-2">
                            <input type="file" 
                                class="form-control" 
                                accept="image/*" 
                                id="photo-${index}">
                            <button class="btn btn-danger btn-remove-photo ${photos[index]?.url ? '' : 'd-none'}" type="button">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Frase</label>
                        <textarea 
                            class="form-control" 
                            rows="2" 
                            id="caption-${index}"
                            placeholder="Digite a frase para este momento..."
                        >${photos[index]?.caption || ''}</textarea>
                    </div>
                </div>
            </div>
        `;
    }

    function initPhotoGrid() {
        if (!photoGrid) return;
        
        photoGrid.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            const slot = document.createElement('div');
            slot.className = 'photo-slot';
            slot.innerHTML = createPhotoCard(i);
            photoGrid.appendChild(slot);

            const fileInput = slot.querySelector(`#photo-${i}`);
            const textArea = slot.querySelector(`#caption-${i}`);
            const removeBtn = slot.querySelector('.btn-remove-photo');
            const previewContainer = slot.querySelector('.preview-container');

            if (fileInput) {
                fileInput.addEventListener('change', (e) => handleFileSelect(e, i, previewContainer, removeBtn));
            }
            if (textArea) {
                textArea.addEventListener('input', (e) => handleCaptionInput(e, i));
            }
            if (removeBtn) {
                removeBtn.addEventListener('click', () => handleRemovePhoto(i, fileInput, previewContainer, removeBtn));
            }
        }
    }

    function handleFileSelect(e, index, previewContainer, removeBtn) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                photos[index] = photos[index] || {};
                photos[index].url = e.target.result;
                
                const previewImg = previewContainer.querySelector('img');
                if (previewImg) {
                    previewImg.src = e.target.result;
                    previewContainer.classList.remove('d-none');
                    removeBtn.classList.remove('d-none');
                }
                updateDisplay();
                savePhotos();
            };
            reader.readAsDataURL(file);
        }
    }

    function handleCaptionInput(e, index) {
        photos[index] = photos[index] || {};
        photos[index].caption = e.target.value;
        updateDisplay();
        savePhotos();
    }

    function handleRemovePhoto(index, fileInput, previewContainer, removeBtn) {
        photos[index] = { caption: photos[index]?.caption || '' };
        if (fileInput) fileInput.value = '';
        previewContainer.classList.add('d-none');
        removeBtn.classList.add('d-none');
        updateDisplay();
        savePhotos();
    }

    function updateDisplay() {
        const currentSlide = photos[currentIndex];
        
        if (currentSlide?.url) {
            photoPlaceholder.style.display = 'none';
            currentPhoto.style.display = 'block';
            currentPhoto.src = currentSlide.url;
            caption.textContent = currentSlide.caption || '';
        } else {
            photoPlaceholder.style.display = 'flex';
            currentPhoto.style.display = 'none';
            caption.textContent = '';
        }

        const progress = ((currentIndex + 1) / photos.length) * 100;
        progressBar.style.width = `${progress}%`;

        const hasPhotos = photos.some(photo => photo?.url);
        prevBtn.style.display = hasPhotos ? 'flex' : 'none';
        nextBtn.style.display = hasPhotos ? 'flex' : 'none';
    }

    function savePhotos() {
        localStorage.setItem('photos', JSON.stringify(photos));
    }

    function loadPhotos() {
        const savedPhotos = localStorage.getItem('photos');
        if (savedPhotos) {
            photos = JSON.parse(savedPhotos);
            updateDisplay();
        }
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        updateDisplay();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % photos.length;
        updateDisplay();
    });

    saveChangesBtn.addEventListener('click', () => {
        savePhotos();
        const modalElement = document.getElementById('photoModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
    });

    // Inicialização
    loadPhotos();
    initPhotoGrid();
    updateDisplay();
}); 
