import React, {useState} from 'react';
import DeleteFolder from "./delete.jsx";

const UploadComponent = () => {
    const [image, setImage] = useState(null); // Состояние для изображения
    const [text, setText] = useState(''); // Состояние для текста
    const [folderName, setFolderName] = useState(''); // Необязательное имя папки
    const [responseMessage, setResponseMessage] = useState(''); // Сообщение от сервера

    // Обработчик выбора файла
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    // Функция для преобразования файла в base64
    const convertFileToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]); // Убираем префикс base64
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image || !text) {
            alert('Пожалуйста, выберите изображение и введите текст.');
            return;
        }

        try {
            // Преобразуем файл в base64
            const base64Image = await convertFileToBase64(image);

            // Формируем данные для отправки
            const formData = {
                image: {
                    name: image.name,
                    data: base64Image, // Отправляем base64-представление изображения
                },
                text,
                folderName,
            };

            // Отправляем данные на сервер
            const response = await fetch('http://localhost:3000/upload-with-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setResponseMessage(`Успешно загружено! Изображение: ${data.image}, Текст: ${data.textFile}`);
            } else {
                const errorData = await response.json(); // Получаем детали ошибки
                console.error('Ошибка сервера:', errorData);
                setResponseMessage(`Ошибка: ${errorData.message || 'Произошла ошибка при загрузке.'}`);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            setResponseMessage('Произошла ошибка при отправке данных.');
        }
    };

    return (
        <div style={{padding: '20px'}}>
            <h2>Загрузка изображения и текста</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="image">Выберите изображение:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="text">Введите текст:</label>
                    <textarea
                        id="text"
                        name="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="folderName">Имя папки (необязательно):</label>
                    <input
                        type="text"
                        id="folderName"
                        name="folderName"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                    />
                </div>
                <button type="submit">Загрузить</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
            <DeleteFolder/>
        </div>
    );
};

export default UploadComponent;