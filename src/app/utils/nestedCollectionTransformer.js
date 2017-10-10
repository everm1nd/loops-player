// TODO: extend it to accept key chains like 'foo.bar' and process
// them recursively
const transformNestedCollection = (object, key, transformation) => (
  {
    ...object,
    [key]: object[key].map((element) => (
      {
        ...element,
        ...transformation(element)
      }
    ))
  }
)

export default transformNestedCollection
