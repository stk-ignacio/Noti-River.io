// Función para cargar las noticias guardadas
function loadNews() {
    const nt = document.getElementById('nt');
    const news = JSON.parse(localStorage.getItem('news')) || [];
    
    // Cargar las noticias guardadas desde localStorage al inicio de la página
    news.forEach(item => { //((item, index =>) caso de emergencia para borrar
        const article = document.createElement('article');
        article.innerHTML = `<h3>${item.title}</h3><img src="${item.image}" alt="not" style="width:100%"><p>${item.content}</p>`;
        nt.insertBefore(article, nt.firstChild); // Insertar en la parte superior de #nt--------------------------- //<button class="delete-btn" onclick="deleteNews(${index})">Eliminar</button>
    });
}

document.addEventListener('DOMContentLoaded', loadNews);

function openModal() {
    document.getElementById('newsModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('newsModal').style.display = 'none';
}

function addNews() {
    const nt = document.getElementById('nt');
    const title = document.getElementById('title').value;
    const image = document.getElementById('image').value;
    const content = document.getElementById('content').value;
    if (title && content) {
        const news = JSON.parse(localStorage.getItem('news')) || [];
        const newNews = { title, image, content };
        news.push(newNews);
        localStorage.setItem('news', JSON.stringify(news));

        const newsContainer = document.getElementById('newsContainer');
        const article = document.createElement('article');
        article.innerHTML = `<h3>${title}</h3 style="font-size:2px"><img src="${image}" alt="not" style="width:100%"><p>${content}</p>`;
        nt.insertBefore(article, nt.firstChild);

        closeModal();
    } else {
        alert('Completa todos los campos');
    }
}

// Función para eliminar una noticia en caso de EMERGENCIA
function deleteNews(index) {
    const news = JSON.parse(localStorage.getItem('news')) || [];
    news.splice(index, 1); // Eliminar la noticia en el índice correspondiente
    localStorage.setItem('news', JSON.stringify(news)); // Guardar de nuevo en localStorage

     //Volver a cargar las noticias actualizadas
    document.getElementById('nt').innerHTML = ''; // Limpiar el contenedor de noticias
    loadNews(); // Recargar las noticias restantes
}