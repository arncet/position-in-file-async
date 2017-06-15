'use strict'

const include = require('./utils').include
const DEFAULT_OPTIONS = require('./utils').DEFAULT_OPTIONS
const parseOptions = require('./utils').parseOptions
const isADirectory = require('./directory').isADirectory
const findInDirectory = require('./directory').findInDirectory
const findInFile = require('./file').findInFile

/**
 * PositionInFileAsync main method.
 * @param  {string}  needle   The element to search.
 * @param  {string}  haystack Where the research will be executed.
 * @param  {object}  options  Some aditionnals options.
 * @return {Promise} The search result promise.
 */
const positionInFile = (needle, haystack = '.', options = DEFAULT_OPTIONS) => {
  return new Promise(resolve => {
    const parsedOptions = parseOptions(options)
    const ignore = parsedOptions.ignore

    if (!needle) return console.log('A valid `needle` parameter is required')

    if (include(haystack, ignore)) resolve([])
    if (isADirectory(haystack)) findInDirectory(needle, haystack, parsedOptions).then(result => resolve(result))
    else findInFile(needle, haystack).then(result => resolve([result]))
  })
}

module.exports = positionInFile
