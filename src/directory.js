const fs = require('fs')
const include = require('./utils').include
const includeMimeType = require('./file').includeMimeType
const findInFile = require('./file').findInFile

/**
 * All elements that always ignored
 */
const ALWAYS_IGNORED = ['.git', 'node_modules', '.DS_Store']

/**
 * Check of an element is a directory.
 * @param  {string}  element The element to check.
 * @return {boolean} The result.
 */
const isADirectory = (element) => {
  return fs.statSync(element).isDirectory()
}

/**
 * Find a needle in a folder.
 * @param  {string}  needle    The element to search.
 * @param  {string}  directory Where the research will be executed.
 * @param  {object}  options  Some aditionnals options.
 * @return {Promise} The search result promise.
 */
const findInDirectory = (needle, directory, options) => {
  return new Promise(resolve => {
    fs.readdir(directory, (err, content) => {
      if (err) throw err
      else {
        const promises = []
        const deep = options.deep
        const ignore = options.ignore
        const fullPathRequired = options.fullPathRequired

        content.forEach((element, i) => {
          const path = directory + '/' + element
          const ignored = fullPathRequired ? include(path, ignore) : include(element, ignore)
          const alwaysIgnored = include(element, ALWAYS_IGNORED)
          const mimeTypeIgnored = includeMimeType(element)

          if (ignored || alwaysIgnored || mimeTypeIgnored) return
          if (isADirectory(path)) {
            if (!deep) return
            promises.push(findInDirectory(needle, path, options))
          } else {
            promises.push(findInFile(needle, path))
          }
        })

        Promise.all(promises)
          .then(values => {
            const results = []
            values.forEach(value => {
              if (!value) return
              if (Array.isArray(value)) Array.prototype.push.apply(results, value)
              else results.push(value)
            })
            resolve(results)
          })
      }
    })
  })
}

module.exports = {findInDirectory, isADirectory}
