const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised)
const expect = chai.expect

const positionInFileAsync = require('../src')
const DEFAULT_OPTIONS = require('../src/utils').DEFAULT_OPTIONS

describe('positionInFileAsync', () => {
  it('default options (string), search on folder', () =>
    positionInFileAsync('foobar', 'test/directoryTest', DEFAULT_OPTIONS).then(results => {
      expect(results).to.be.eql([
        {file: 'test/directoryTest/directoryTest2/file1.js', lines: {2: [5]}},
        {file: 'test/directoryTest/directoryTest2/file3.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file1.js', lines: {3: [5]}},
        {file: 'test/directoryTest/file2.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file3.html', lines: {1: [2], 4: [3]}}
      ])
    })
  )

  it('default options (regExp), search on folder', () =>
    positionInFileAsync(/foobar/, 'test/directoryTest', DEFAULT_OPTIONS).then(results => {
      expect(results).to.be.eql([
        {file: 'test/directoryTest/directoryTest2/file1.js', lines: {2: [5]}},
        {file: 'test/directoryTest/directoryTest2/file3.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file1.js', lines: {3: [5]}},
        {file: 'test/directoryTest/file2.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file3.html', lines: {1: [2], 4: [3]}}
      ])
    })
  )

  it('default options (string), search on file', () => 
    positionInFileAsync('foobar', 'test/directoryTest/file1.js', DEFAULT_OPTIONS).then(results => {
      expect(results).to.be.eql([{file: 'test/directoryTest/file1.js', lines: {3: [5]}}])
    })
  )

  it('default options (regExp), search on file', () =>
    positionInFileAsync(/foobar/, 'test/directoryTest/file1.js', DEFAULT_OPTIONS).then(results => {
      expect(results).to.be.eql([{file: 'test/directoryTest/file1.js', lines: {3: [5]}}])
    })
  )

  it('custom options (no deep) (string), search on folder', () => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {deep: false})
    positionInFileAsync('foobar', 'test/directoryTest', options).then(results => {
      expect(results).to.be.eql([
        {file: 'test/directoryTest/file1.js', lines: {3: [5]}},
        {file: 'test/directoryTest/file2.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file3.html', lines: {1: [2], 4: [3]}}
      ])
    })
  })

  it('custom options (no deep) (regExp), search on folder', () => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {deep: false})
    return positionInFileAsync(/foobar/, 'test/directoryTest', options).then(results => {
      expect(results).to.be.eql([
        {file: 'test/directoryTest/file1.js', lines: {3: [5]}},
        {file: 'test/directoryTest/file2.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file3.html', lines: {1: [2], 4: [3]}}
      ])
    })
  })

  it('custom options (ignore folder test/directoryTest/directoryTest2)', () => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {ignore: ['test/directoryTest/directoryTest2']})
    return positionInFileAsync('foobar', 'test/directoryTest', options).then(results => {
      expect(results).to.be.eql([
        {file: 'test/directoryTest/file1.js', lines: {3: [5]}},
        {file: 'test/directoryTest/file2.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file3.html', lines: {1: [2], 4: [3]}}
      ])
    })
  })

  it('custom options (ignore folder directoryTest2 and no fullPathRequired)', () => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {ignore: ['directoryTest2'], fullPathRequired: false})
    return positionInFileAsync('foobar', 'test/directoryTest', options).then(results => {
      expect(results).to.be.eql([
        {file: 'test/directoryTest/file1.js', lines: {3: [5]}},
        {file: 'test/directoryTest/file2.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file3.html', lines: {1: [2], 4: [3]}}
      ])
    })
  })

  it('custom options (ignore file test/directoryTest/directoryTest2/file1.js)', () => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {ignore: ['test/directoryTest/directoryTest2/file1.js']})
    return positionInFileAsync('foobar', 'test/directoryTest', options).then(results => {
      expect(results).to.be.eql([
        {file: 'test/directoryTest/directoryTest2/file3.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file1.js', lines: {3: [5]}},
        {file: 'test/directoryTest/file2.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file3.html', lines: {1: [2], 4: [3]}}
      ])
    })
  })

  it('custom options (ignore file file1.js and no fullPathRequired)', () => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {ignore: ['file1.js'], fullPathRequired: false})
    return positionInFileAsync('foobar', 'test/directoryTest', options).then(results => {
      expect(results).to.be.eql([
        {file: 'test/directoryTest/directoryTest2/file3.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file2.css', lines: {1: [2]}},
        {file: 'test/directoryTest/file3.html', lines: {1: [2], 4: [3]}}
      ])
    })
  })

  it('custom options (ignore all CSS file)', () => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {ignore: [/.css$/]})
    return positionInFileAsync('foobar', 'test/directoryTest', options).then(results => {
      expect(results).to.be.eql([
        {file: 'test/directoryTest/directoryTest2/file1.js', lines: {2: [5]}},
        {file: 'test/directoryTest/file1.js', lines: {3: [5]}},
        {file: 'test/directoryTest/file3.html', lines: {1: [2], 4: [3]}}
      ])
    })
  })

  it('custom options (ignore all CSS and JS files)', () => {
    const options = Object.assign({}, DEFAULT_OPTIONS, {ignore: [/.css$/, /.js$/]})
    return positionInFileAsync('foobar', 'test/directoryTest', options).then(results => {
      expect(results).to.be.eql([{file: 'test/directoryTest/file3.html', lines: {1: [2], 4: [3]}}])
    })
  })
})
