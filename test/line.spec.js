const expect = require('chai').expect

const findInLine = require('../src/line').findInLine

describe('line findInLine', () => {
  it('return some results (string)', () => {
    expect(findInLine('foobar', 'var foobar = \'foobar\'')).to.be.eql([5, 15])
  })

  it('return noting results (string)', () => {
    expect(findInLine('test', 'var foobar = \'foobar\'')).to.be.eql([])
  })

  it('return some results (regExp)', () => {
    expect(findInLine(/foobar/, 'var foobar = \'foobar\'')).to.be.eql([5, 15])
  })

  it('return noting results (regExp)', () => {
    expect(findInLine(/test/, 'var foobar = \'foobar\'')).to.be.eql([])
  })
})
