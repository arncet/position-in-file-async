const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised)
const expect = chai.expect

const findInDirectory = require('../src/directory').findInDirectory
const isADirectory = require('../src/directory').isADirectory
const DEFAULT_OPTIONS = require('../src/utils').DEFAULT_OPTIONS

describe('directory : findInDirectory', () => {
  it('default options', () => 
    findInDirectory('foobar', 'test/directoryTest', DEFAULT_OPTIONS).then(results => {
      expect(results).to.be.eql([
        {file: 'test/directoryTest/directoryTest2/file1.js', lines: {2: [5]}},
        {file: 'test/directoryTest/directoryTest2/file3.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file1.js', lines: {3: [5]}},
        {file: 'test/directoryTest/file2.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file3.html', lines: {1: [2], 4: [3]}}
      ])
    })
  )

  it('custom options (no deep)', () => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {deep: false})
    return findInDirectory('foobar', 'test/directoryTest', options).then(results => {
      expect(results).to.be.eql([
        {file: 'test/directoryTest/file1.js', lines: {3: [5]}},
        {file: 'test/directoryTest/file2.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file3.html', lines: {1: [2], 4: [3]}}
      ])
    })
  })

  it('custom options (ignore test/directoryTest/file1.js)', () => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {ignore: ['test/directoryTest/file1.js']})
    return findInDirectory('foobar', 'test/directoryTest', options).then(results => {
      expect(results).to.be.eql([
        {file: 'test/directoryTest/directoryTest2/file1.js', lines: {2: [5]}},
        {file: 'test/directoryTest/directoryTest2/file3.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file2.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file3.html', lines: {1: [2], 4: [3]}}
      ])
    })
  })

  it('custom options (no fullPathRequired, ignore file1.js)', () => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {ignore: ['file1.js'], fullPathRequired: false})
    return findInDirectory('foobar', 'test/directoryTest', options).then(results => {
      expect(results).to.be.eql([
        {file: 'test/directoryTest/directoryTest2/file3.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file2.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file3.html', lines: {1: [2], 4: [3]}}
      ])
    })
  })
})

describe('directory : isADirectory', () => {
  it('is a directory', () => {
    expect(isADirectory('test/directoryTest')).to.be.true
  })

  it('is not a directory', () => {
    expect(isADirectory('test/directoryTest/file1.js')).to.be.false
  })
})
