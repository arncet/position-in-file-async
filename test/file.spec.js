const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised)
const expect = chai.expect

const includeMimeType = require('../src/file').includeMimeType
const findInFile = require('../src/file').findInFile

describe('file : includeMimeType', () => {
  it('MIME_TYPES_IGNORED contain this mime type', () => {
    expect(includeMimeType('test/directoryTest/file2.png')).to.be.true
  })

  it('MIME_TYPES_IGNORED not contain this mime type', () => {
    expect(includeMimeType('test/directoryTest/file1.js')).to.be.false
  })
})

describe('file : findInFile', () => {
  it('will return some results (string)', () =>
    findInFile('foo', 'test/directoryTest/file1.js').then(results => {
      expect(results).to.be.eql({
        file: 'test/directoryTest/file1.js',
        lines: {
          1: [5],
          2: [12],
          3: [5, 18]
        }
      })
    })
  )

  it('will return some results (regExp)', () =>
    findInFile(/foo/, 'test/directoryTest/file1.js').then(results => {
      expect(results).to.be.eql({
        file: 'test/directoryTest/file1.js',
        lines: {
          1: [5],
          2: [12],
          3: [5, 18]
        }
      })
    })
  )

  it('will return nothing (string)', () =>
    findInFile('nothing', 'test/directoryTest/file1.js').then(results => {
      expect(results).to.be.eql(null)
    })
  )

  it('will return nothing (regExp)', () =>
    findInFile(/nothing/, 'test/directoryTest/file1.js').then(results => {
      expect(results).to.be.eql(null)
    })
  )
})
