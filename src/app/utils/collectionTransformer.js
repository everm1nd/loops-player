// TODO: extend it to accept key chains like 'foo.bar' and process
// them recursively
const transformCollection = (collection, key, transformation) => (
  {
    ...collection,
    [key]: collection[key].map((element) => (
      {
        ...element,
        ...transformation(element)
      }
    ))
  }
)

export default transformCollection
