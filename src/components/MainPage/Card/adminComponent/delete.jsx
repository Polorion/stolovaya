import React, {useState} from 'react';

const DeleteFolder = () => {
    const [folderName, setFolderName] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        if (!folderName.trim()) {
            alert('Введите имя папки для удаления');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/delete-folder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({folderName}),
            });

            if (response.ok) {
                setMessage(await response.text());
            } else {
                setMessage('Произошла ошибка при удалении папки');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            setMessage('Произошла ошибка при отправке данных');
        }
    };

    return (
        <div style={{padding: '20px'}}>
            <h2>Удаление папки</h2>
            <div>
                <label htmlFor="folderName">Имя папки:</label>
                <input
                    type="text"
                    id="folderName"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                />
            </div>
            <button onClick={handleDelete}>Удалить папку</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default DeleteFolder;