const fs = require('fs')
const extName = require('ext-name')
const include = require('./utils').include
const findInLine = require('./line').findInLine

/**
 * All ignored mimes types
 */
const MIME_TYPES_IGNORED = [/audio/, /video/, /image/]

/**
 * Find if a file's mime type is contained on the MIME_TYPES_IGNORED array.
 * @params {string}  file The file to look for.
 * @return {boolean} If MIME_TYPES_IGNORED contain file's mime type.
 */
const includeMimeType = file => {
  const ext = extName(file)
  if (!ext) return false
  return !!include(ext.mime, MIME_TYPES_IGNORED)
}

/**
 * Find a needle in a file.
 * @param  {string}  needle    The element to search.
 * @param  {string}  file Where the research will be executed.
 * @return {Promise} The search result promise.
 */
const findInFile = (needle, file) => {
  return new Promise(resolve => {
    fs.readFile(file, (err, bufferString) => {
      if (err) throw err
      else {
        if (!bufferString.length) resolve(null)
        const results = {}
        const END_OF_LINE = 10
        const allEOFIndex = bufferString.reduce((prev, element, i) => {
          return element === END_OF_LINE ? Array.from(prev).concat(i) : prev
        }, [])
        allEOFIndex.forEach((EOFIndex, i, EOFIndexes) => {
          const lastEOFIndex = i === 0 ? 0 : (EOFIndexes[i - 1] + 1)
          const line = bufferString.slice(lastEOFIndex, EOFIndex)
          const columns = findInLine(needle, Buffer.from(line).toString())
          if (columns.length) results[i + 1] = columns
        })
        const result = Object.keys(results).length ? {file, lines: results} : null
        resolve(result)
      }
    })
  })
}

module.exports = {includeMimeType, findInFile}
