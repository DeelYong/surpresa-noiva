document.addEventListener('DOMContentLoaded', function() {
    console.log('Script carregado');
    
    // Variáveis globais
    let photos = [];
    // Inicializar array com 10 objetos vazios
    for (let i = 0; i < 10; i++) {
        photos.push({
            url: null,
            caption: ''
        });
    }
    
    let currentIndex = 0;
    
    // Elementos DOM
    const currentPhoto = document.getElementById('currentPhoto');
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    const caption = document.getElementById('caption');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const photoGrid = document.getElementById('photoGrid');
    const saveChangesBtn = document.getElementById('saveChanges');
    
    // Carregar fotos do localStorage
    function loadPhotos() {
        const savedPhotos = localStorage.getItem('ourPhotos');
        if (savedPhotos) {
            try {
                photos = JSON.parse(savedPhotos);
                console.log('Fotos carregadas:', photos);
            } catch (e) {
                console.error('Erro ao carregar fotos:', e);
            }
        }
    }
    
    // Salvar fotos no localStorage
    function savePhotos() {
        try {
            localStorage.setItem('ourPhotos', JSON.stringify(photos));
            console.log('Fotos salvas');
        } catch (e) {
            console.error('Erro ao salvar fotos:', e);
        }
    }
    
    // Atualizar exibição principal
    function updateDisplay() {
        const photo = photos[currentIndex];
        
        if (photo && photo.url) {
            photoPlaceholder.style.display = 'none';
            currentPhoto.style.display = 'block';
            currentPhoto.src = photo.url;
            caption.textContent = photo.caption || '';
        } else {
            photoPlaceholder.style.display = 'flex';
            currentPhoto.style.display = 'none';
            caption.textContent = '';
        }
        
        // Atualizar progresso
        const progress = ((currentIndex + 1) / photos.length) * 100;
        progressBar.style.width = progress + '%';
        
        // Verificar se há fotos para mostrar as setas
        const hasPhotos = photos.some(p => p.url);
        prevBtn.style.display = hasPhotos ? 'flex' : 'none';
        nextBtn.style.display = hasPhotos ? 'flex' : 'none';
    }
    
    // Inicializar grid de fotos no modal
    function initPhotoGrid() {
        if (!photoGrid) {
            console.error('Elemento photoGrid não encontrado');
            return;
        }
        
        // Limpar grid
        photoGrid.innerHTML = '';
        
        // Criar card para cada foto
        for (let i = 0; i < 10; i++) {
            // Criar elementos manualmente ao invés de usar template string
            const slot = document.createElement('div');
            slot.className = 'photo-slot';
            
            const card = document.createElement('div');
            card.className = 'card';
            slot.appendChild(card);
            
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            card.appendChild(cardBody);
            
            // Título
            const title = document.createElement('h5');
            title.className = 'card-title';
            title.textContent = 'Momento ' + (i + 1);
            cardBody.appendChild(title);
            
            // Container para foto
            const photoContainer = document.createElement('div');
            photoContainer.className = 'mb-3';
            cardBody.appendChild(photoContainer);
            
            const photoLabel = document.createElement('label');
            photoLabel.className = 'form-label';
            photoLabel.textContent = 'Foto';
            photoContainer.appendChild(photoLabel);
            
            // Preview da imagem
            const previewContainer = document.createElement('div');
            previewContainer.className = 'preview-container mb-2';
            if (!photos[i].url) {
                previewContainer.classList.add('d-none');
            }
            photoContainer.appendChild(previewContainer);
            
            const previewImg = document.createElement('img');
            previewImg.className = 'preview-image';
            previewImg.alt = 'Preview';
            if (photos[i].url) {
                previewImg.src = photos[i].url;
            }
            previewContainer.appendChild(previewImg);
            
            // Input de arquivo e botão de remover
            const inputGroup = document.createElement('div');
            inputGroup.className = 'd-flex gap-2';
            photoContainer.appendChild(inputGroup);
            
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.className = 'form-control';
            fileInput.accept = 'image/*';
            fileInput.id = 'photo-' + i;
            inputGroup.appendChild(fileInput);
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'btn btn-danger btn-remove-photo';
            if (!photos[i].url) {
                removeBtn.classList.add('d-none');
            }
            removeBtn.type = 'button';
            removeBtn.innerHTML = '<i class="bi bi-trash"></i>';
            inputGroup.appendChild(removeBtn);
            
            // Container para frase
            const captionContainer = document.createElement('div');
            captionContainer.className = 'mb-3';
            cardBody.appendChild(captionContainer);
            
            const captionLabel = document.createElement('label');
            captionLabel.className = 'form-label';
            captionLabel.textContent = 'Frase';
            captionContainer.appendChild(captionLabel);
            
            const textarea = document.createElement('textarea');
            textarea.className = 'form-control';
            textarea.rows = 2;
            textarea.id = 'caption-' + i;
            textarea.placeholder = 'Digite a frase para este momento...';
            textarea.value = photos[i].caption || '';
            captionContainer.appendChild(textarea);
            
            // Adicionar slot ao grid
            photoGrid.appendChild(slot);
            
            // Adicionar event listeners
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        photos[i].url = e.target.result;
                        previewImg.src = e.target.result;
                        previewContainer.classList.remove('d-none');
                        removeBtn.classList.remove('d-none');
                        updateDisplay();
                        savePhotos();
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            textarea.addEventListener('input', function(e) {
                photos[i].caption = e.target.value;
                updateDisplay();
                savePhotos();
            });
            
            removeBtn.addEventListener('click', function() {
                photos[i].url = null;
                fileInput.value = '';
                previewContainer.classList.add('d-none');
                removeBtn.classList.add('d-none');
                updateDisplay();
                savePhotos();
            });
        }
    }
    
    // Event listeners para navegação
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        updateDisplay();
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % photos.length;
        updateDisplay();
    });
    
    // Event listener para salvar
    if (saveChangesBtn) {
        saveChangesBtn.addEventListener('click', function() {
            savePhotos();
            try {
                const modalElement = document.getElementById('photoModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) {
                    modal.hide();
                }
            } catch (e) {
                console.error('Erro ao fechar modal:', e);
            }
        });
    }
    
    // Inicialização
    loadPhotos();
    initPhotoGrid();
    updateDisplay();
}); 
