import transformCollection from 'utils/collectionTransformer'

describe('transformCollection', () => {
  it('updates collection', () => {
    const collection = {
      elements: [
        { foo: 1, bar: 1 },
        { foo: 2, bar: 3 }
      ]
    }
    expect(transformCollection(collection, 'elements', (element) => (
      {
        foo: element.foo + 10
      }
    ))).toEqual({
      elements: [
        { foo: 11, bar: 1 },
        { foo: 12, bar: 3 }
      ]
    })
  })

  it('updates nested collections', () => {
    const collection = {
      elements: [
        {
          nestedElements: [
            { foo: 1, bar: 1 },
            { foo: 2, bar: 3 }
          ]
        }
      ]
    }
    expect(transformCollection(collection, 'elements', (element) => (
      transformCollection(element, 'nestedElements', e => ({ bar: e.bar + 100 }))
    ))).toEqual({
      elements: [
        {
          nestedElements: [
            { foo: 1, bar: 101 },
            { foo: 2, bar: 103 }
          ]
        }
      ]
    })
  })
})
