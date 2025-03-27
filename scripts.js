<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nossa História</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            min-height: 100vh;
        }

        .timeline-card {
            background-color: white;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .photo-section {
            position: relative;
            background-color: #f8f9fa;
        }

        .photo-container {
            position: relative;
            aspect-ratio: 16/9;
            overflow: hidden;
        }

        #currentPhoto {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .nav-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(255, 255, 255, 0.8);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
            transition: all 0.3s;
        }

        .nav-arrow:hover {
            background-color: white;
        }

        .nav-prev {
            left: 20px;
        }

        .nav-next {
            right: 20px;
        }

        .caption-container {
            padding: 20px;
        }

        .caption {
            font-size: 1.2rem;
            text-align: center;
            margin-bottom: 15px;
        }

        .photo-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            background-color: #e9ecef;
        }

        .progress {
            height: 5px;
        }

        .progress-bar {
            background-color: #ff6b6b;
            transition: width 0.3s ease;
        }

        .photo-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 20px;
        }

        .photo-slot {
            margin-bottom: 20px;
        }

        .preview-container {
            width: 100%;
            height: 200px;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 10px;
        }

        .preview-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .btn-remove-photo {
            width: 40px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        @media (min-width: 768px) {
            .photo-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .photo-slot {
                margin-bottom: 0;
            }
        }

        .card {
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .card-body {
            padding: 1rem;
        }

        .card-title {
            margin-bottom: 1rem;
            color: #333;
            font-size: 1.1rem;
        }

        @media (max-width: 768px) {
            .nav-arrow {
                width: 35px;
                height: 35px;
            }
            
            .caption {
                font-size: 1rem;
            }
        }

        .modal-dialog {
            max-width: 90%;
            margin: 1.75rem auto;
        }

        @media (min-width: 992px) {
            .modal-dialog {
                max-width: 800px;
            }
        }

        .modal-content {
            background-color: white;
            border-radius: 15px;
        }
    </style>
</head>
<body>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
                <div class="timeline-card">
                    <div class="photo-section position-relative">
                        <!-- Seta Anterior -->
                        <button class="nav-arrow nav-prev" id="prevBtn">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        
                        <!-- Container da Foto -->
                        <div class="photo-container">
                            <div id="photoPlaceholder" class="photo-placeholder">
                                <p>Adicione suas fotos e frases especiais</p>
                                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#photoModal">
                                    Gerenciar Fotos e Frases
                                </button>
                            </div>
                            <img id="currentPhoto" src="" alt="Foto do nosso relacionamento" style="display: none;">
                        </div>

                        <!-- Seta Próxima -->
                        <button class="nav-arrow nav-next" id="nextBtn">
                            <i class="bi bi-chevron-right"></i>
                        </button>
                    </div>
                    
                    <!-- Legenda -->
                    <div class="caption-container">
                        <p id="caption" class="caption"></p>
                        <div class="progress mt-3">
                            <div id="progressBar" class="progress-bar" role="progressbar" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para Gerenciar Fotos -->
    <div class="modal fade" id="photoModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Gerenciar Fotos e Frases</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div id="photoGrid" class="photo-grid">
                        <!-- Slots serão gerados via JavaScript -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" id="saveChanges">Salvar Alterações</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap 5 JS e Popper -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
    
    <script>
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
    </script>
</body>
</html> 
