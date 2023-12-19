// //C:\Users\santi\Documents\Proyectos personales\tamplete-api-studentes
import fs from 'fs-extra'
import path from 'path'

fs.appendFileSync('./test', '', 'utf-8')

const processFolder = (
  folderPath: string,
  outputPath: string,
  structurePrefix: string = ''
) => {
  let structure = structurePrefix + path.basename(folderPath) + '/\n'
  const files = fs.readdirSync(folderPath)

  for (const file of files) {
    const filePath = path.join(folderPath, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      // Si es una carpeta, recorre recursivamente
      structure += processFolder(filePath, outputPath, structurePrefix + '│   ')
    } else {
      // Si es un archivo, lo añade a la estructura y guarda su contenido
      structure += structurePrefix + '├── ' + file + '\n'

      // Leer y guardar el contenido del archivo
      const data = fs.readFileSync(filePath, 'utf-8')
      const textFile = `El contenido de ${file} es:\n\n${data}\n\n`
      fs.appendFileSync(outputPath, textFile, 'utf-8')
    }
  }

  return structure
}

// Uso de la función
const folderPath = './test' // El directorio que deseas procesar
const outputPath = './src/index.txt' // El archivo donde se guardará el contenido
const structure = processFolder(folderPath, outputPath)
const infoStructure = `\n\n esta es la estructura del proyecto \n\n ${structure}`
fs.appendFileSync(outputPath, infoStructure, 'utf-8')
