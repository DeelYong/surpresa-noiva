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
                    <button type="button" class="btn btn-primary" id="saveChangesBtn">Salvar Alterações</button>
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
            
            // Elementos DOM
            const currentPhoto = document.getElementById('currentPhoto');
            const photoPlaceholder = document.getElementById('photoPlaceholder');
            const caption = document.getElementById('caption');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const progressBar = document.getElementById('progressBar');
            const photoGrid = document.getElementById('photoGrid');
            const saveChangesBtn = document.getElementById('saveChangesBtn');
            
            // Variáveis globais
            let photos = Array(10).fill().map(() => ({ url: null, caption: '' }));
            let currentIndex = 0;
            
            // Carregar fotos do localStorage
            function loadPhotos() {
                const savedPhotos = localStorage.getItem('nossaHistoria');
                if (savedPhotos) {
                    try {
                        photos = JSON.parse(savedPhotos);
                        console.log('Fotos carregadas');
                    } catch (e) {
                        console.error('Erro ao carregar fotos:', e);
                    }
                }
            }
            
            // Salvar fotos no localStorage
            function savePhotos() {
                try {
                    localStorage.setItem('nossaHistoria', JSON.stringify(photos));
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
                
                // Atualizar barra de progresso
                const progress = ((currentIndex + 1) / photos.length) * 100;
                progressBar.style.width = progress + '%';
                
                // Atualizar visibilidade das setas
                const hasPhotos = photos.some(p => p && p.url);
                prevBtn.style.display = hasPhotos ? 'flex' : 'none';
                nextBtn.style.display = hasPhotos ? 'flex' : 'none';
            }
            
            // Criar grid de fotos para o modal
            function createPhotoGrid() {
                if (!photoGrid) return;
                
                photoGrid.innerHTML = '';
                
                for (let i = 0; i < photos.length; i++) {
                    const photoCard = document.createElement('div');
                    photoCard.className = 'photo-card';
                    
                    const cardTitle = document.createElement('div');
                    cardTitle.className = 'card-title';
                    cardTitle.textContent = 'Momento ' + (i + 1);
                    photoCard.appendChild(cardTitle);
                    
                    // Área de preview da foto
                    const previewContainer = document.createElement('div');
                    previewContainer.className = 'preview-container';
                    photoCard.appendChild(previewContainer);
                    
                    const previewImage = document.createElement('img');
                    previewImage.className = 'preview-image';
                    previewImage.style.display = photos[i].url ? 'block' : 'none';
                    if (photos[i].url) {
                        previewImage.src = photos[i].url;
                    }
                    previewContainer.appendChild(previewImage);
                    
                    const placeholderText = document.createElement('p');
                    placeholderText.textContent = 'Sem imagem';
                    placeholderText.style.display = photos[i].url ? 'none' : 'block';
                    placeholderText.style.color = '#adb5bd';
                    previewContainer.appendChild(placeholderText);
                    
                    // Input para selecionar arquivo
                    const fileInputGroup = document.createElement('div');
                    fileInputGroup.className = 'input-group mb-3';
                    photoCard.appendChild(fileInputGroup);
                    
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.className = 'form-control';
                    fileInput.accept = 'image/*';
                    fileInputGroup.appendChild(fileInput);
                    
                    const removeButton = document.createElement('button');
                    removeButton.className = 'btn btn-outline-danger';
                    removeButton.innerHTML = '<i class="bi bi-trash"></i>';
                    removeButton.type = 'button';
                    fileInputGroup.appendChild(removeButton);
                    
                    // Textarea para legenda
                    const textLabel = document.createElement('label');
                    textLabel.className = 'form-label';
                    textLabel.textContent = 'Frase';
                    photoCard.appendChild(textLabel);
                    
                    const textarea = document.createElement('textarea');
                    textarea.className = 'form-control';
                    textarea.rows = 2;
                    textarea.value = photos[i].caption || '';
                    textarea.placeholder = 'Digite uma frase especial...';
                    photoCard.appendChild(textarea);
                    
                    // Adicionar ao grid
                    photoGrid.appendChild(photoCard);
                    
                    // Event listeners
                    fileInput.addEventListener('change', function(e) {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = function(e) {
                                photos[i].url = e.target.result;
                                previewImage.src = e.target.result;
                                previewImage.style.display = 'block';
                                placeholderText.style.display = 'none';
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                    
                    textarea.addEventListener('input', function(e) {
                        photos[i].caption = e.target.value;
                    });
                    
                    removeButton.addEventListener('click', function() {
                        photos[i].url = null;
                        fileInput.value = '';
                        previewImage.style.display = 'none';
                        placeholderText.style.display = 'block';
                    });
                }
            }
            
            // Event listeners
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + photos.length) % photos.length;
                updateDisplay();
            });
            
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % photos.length;
                updateDisplay();
            });
            
            saveChangesBtn.addEventListener('click', function() {
                savePhotos();
                updateDisplay();
                
                // Fechar o modal
                const modalElement = document.getElementById('photoModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                modal.hide();
            });
            
            // Inicialização
            loadPhotos();
            createPhotoGrid();
            updateDisplay();
        });
    </script>
</body>
</html> 
