const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  const srcDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files-copy');

  try {
    // Создание папки files-copy в случае если она ещё не существует
    await fs.mkdir(destDir, { recursive: true });
    
    // получаем содержимое папки-источника
    const files = await fs.readdir(srcDir, { withFileTypes: true });
    
    // копирование каждого файла из папки-источника в папку назначения
    for (const file of files) {
      const srcPath = path.join(srcDir, file.name);
      const destPath = path.join(destDir, file.name);
      
      if (file.isDirectory()) {
        // рекурсивное копирование, если есть подпапки
        await copyDir(srcPath, destPath);
      } else {
        // копирование файлов
        await fs.copyFile(srcPath, destPath);
      }
    }
    
    console.log('Папка успешно скопирована');
  } catch (error) {
    console.error(`Ошибка: ${error}`);
  }
}

copyDir();

