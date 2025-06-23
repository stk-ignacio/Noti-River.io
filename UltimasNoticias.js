window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const isAdmin = params.get('admin') === '1';
  
    const btn = document.getElementById('addNewsBtn');
    if (isAdmin) {
      btn.style.display = 'inline-block';
    }
  });//necesito poner ?admin=1 al final del URL para verlo

//vinculacion con Supabase
const supabaseUrl = 'https://gdmayfuxcexwdsarzyor.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkbWF5ZnV4Y2V4d2RzYXJ6eW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MzcxNjAsImV4cCI6MjA2NjIxMzE2MH0.F6_TcnC3wi6mao4CrZa9L337l7FNwhPapuhp1A9UcYM';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Función para cargar las noticias guardadas
async function loadNews() {
    const nt = document.getElementById('nt');

    const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error al cargar noticias:', error.message);
        return;
    }

    //nt.innerHTML = ''; // Limpiar por si se recarga

    data.forEach(item => {
        const article = document.createElement('article');
        article.innerHTML = `<h3>${item.title}</h3><img src="${item.image}" alt="not" style="width:100%"><p>${item.content}</p>`;
        nt.appendChild(article);
    });
}

document.addEventListener('DOMContentLoaded', loadNews);

function openModal() {
    document.getElementById('newsModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('newsModal').style.display = 'none';
}

async function addNews() {
    const nt = document.getElementById('nt');
    const title = document.getElementById('title').value;
    const imageInput = document.getElementById('image');
    const content = document.getElementById('content').value;

    if (title && content && imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const fileName = `noticia-${Date.now()}-${file.name}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('imagenes')
            .upload(fileName, file);

        if (uploadError) {
            alert("Error al subir imagen: " + uploadError.message);
            return;
        }

        const { data: urlData } = supabase.storage
            .from('imagenes')
            .getPublicUrl(fileName);

        const imageUrl = urlData.publicUrl;

        // Insertar noticia en la tabla
        const { error: insertError } = await supabase
            .from('noticias')
            .insert([{ title, image: imageUrl, content }]);

        if (insertError) {
            alert("Error al guardar noticia: " + insertError.message);
            return;
        }

        closeModal();
        loadNews(); // Volver a cargar todo
    } else {
        alert('Completa todos los campos y seleccioná una imagen');
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