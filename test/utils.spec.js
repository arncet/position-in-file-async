const expect = require('chai').expect

const include = require('../src/utils').include
const getGitIgnoreContent = require('../src/utils').getGitIgnoreContent
const parseOptions = require('../src/utils').parseOptions
const parseRegExp = require('../src/utils').parseRegExp
const DEFAULT_OPTIONS = require('../src/utils').DEFAULT_OPTIONS

describe('utils : include', () => {
  it('array contain element (string)', () => {
    const element = 'find me'
    const array = ['foo', 'find me', 'bar']
    expect(include(element, array)).to.be.true
  })

  it('array not contain element (string)', () => {
    const element = 'find me'
    const array = ['foo', 'bar']
    expect(include(element, array)).to.be.false
  })

  it('array contain element (regExp)', () => {
    const element = 'find me'
    const array = ['foo', /find/, 'bar']
    expect(include(element, array)).to.be.true
  })

  it('array not contain element (regExp)', () => {
    const element = 'find me'
    const array = ['foo', /fid/, 'bar']
    expect(include(element, array)).to.be.false
  })
})

describe('utils : getGitIgnoreContent', () => {
  it('will display the .gitignore content', () => {
    const gitIgnoreContent = getGitIgnoreContent()
    expect(gitIgnoreContent).to.have.lengthOf(4)
    expect(gitIgnoreContent[0]).to.be.eql('node_modules')
    expect(gitIgnoreContent[1]).to.be.eql('dist')
    expect(gitIgnoreContent[2]).to.be.eql('.DS_Store')
    expect(gitIgnoreContent[3]).to.be.eql('')
  })
})

describe('utils : parseOptions', () => {
  it('default options', () => {
    const options = {}
    const parsedOptions = parseOptions(options)

    expect(parsedOptions).to.be.an('object')

    expect(parsedOptions).to.have.property('deep')
    expect(parsedOptions.deep).to.be.eql(DEFAULT_OPTIONS.deep)

    expect(parsedOptions).to.have.property('ignore')
    expect(parsedOptions.ignore).to.be.eql(DEFAULT_OPTIONS.ignore)

    expect(parsedOptions).to.have.property('fullPathRequired')
    expect(parsedOptions.fullPathRequired).to.be.eql(DEFAULT_OPTIONS.fullPathRequired)

    expect(parsedOptions).to.have.property('gitIgnore')
    expect(parsedOptions.gitIgnore).to.be.eql(DEFAULT_OPTIONS.gitIgnore)
  })

  it('no options', () => {
    const parsedOptions = parseOptions()

    expect(parsedOptions).to.be.an('object')

    expect(parsedOptions).to.have.property('deep')
    expect(parsedOptions.deep).to.be.eql(DEFAULT_OPTIONS.deep)

    expect(parsedOptions).to.have.property('ignore')
    expect(parsedOptions.ignore).to.be.eql(DEFAULT_OPTIONS.ignore)

    expect(parsedOptions).to.have.property('fullPathRequired')
    expect(parsedOptions.fullPathRequired).to.be.eql(DEFAULT_OPTIONS.fullPathRequired)

    expect(parsedOptions).to.have.property('gitIgnore')
    expect(parsedOptions.gitIgnore).to.be.eql(DEFAULT_OPTIONS.gitIgnore)
  })

  it('custom options', () => {
    const options = {
      deep: false,
      ignore: ['ignore.file'],
      fullPathRequired: true,
      gitIgnore: false
    }
    const parsedOptions = parseOptions(options)

    expect(parsedOptions).to.be.an('object')

    expect(parsedOptions).to.have.property('deep')
    expect(parsedOptions.deep).to.be.false

    expect(parsedOptions).to.have.property('ignore')
    expect(parsedOptions.ignore).to.be.eql(['ignore.file'])

    expect(parsedOptions).to.have.property('fullPathRequired')
    expect(parsedOptions.fullPathRequired).to.be.true

    expect(parsedOptions).to.have.property('gitIgnore')
    expect(parsedOptions.gitIgnore).to.be.false
  })
})

describe('utils : parseRegExp', () => {
  it('string to regexp', () => {
    const regexp = parseRegExp('test')
    expect(regexp).to.be.instanceof(RegExp)
    expect(regexp.flags).to.be.eql('g')
  })

  it('add global flag', () => {
    const regexp = parseRegExp(/test/)
    expect(regexp.flags).to.be.eql('g')
  })

  it('don\'t change flag', () => {
    const regexp = parseRegExp(/test/g)
    expect(regexp.flags).to.be.eql('g')
  })

  it('stack flags', () => {
    const regexp = parseRegExp(/test/i)
    expect(regexp.flags).to.be.eql('gi')
  })
})
