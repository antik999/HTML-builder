const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');

// Считываем список файлов в папке styles
fs.readdir(stylesDir, (err, files) => {
  if (err) throw err;

  // Фильтруем файлы с расширением .css
  const cssFiles = files.filter((file) => path.extname(file) === '.css');

  // Читаем содержимое файлов и записываем в новый файл
  const bundlePath = path.join(distDir, 'bundle.css');
  const cssContents = cssFiles.map((file) => {
    const filePath = path.join(stylesDir, file);
    return fs.promises.readFile(filePath, 'utf8');
  });

  Promise.all(cssContents)
    .then((contents) => {
      const allContents = contents.join('\n');
      return fs.promises.writeFile(bundlePath, allContents, 'utf8');
    })
    .then(() => console.log('Bundle.css успешно создан'))
    .catch((err) => console.error(err));
});
