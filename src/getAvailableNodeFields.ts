export default async function getAvailableNodeFields({ graphql }: any) {
  const {
    data: { markdownRemarkType },
  } = await graphql(`
    {
      markdownRemarkType: __type(name: "MarkdownRemark") {
        fields {
          name
          type {
            name
          }
        }
      }
    }
  `);

  const markdownRemarkFields = markdownRemarkType.fields.find(
    (field: any) => field.name === 'fields',
  );

  const {
    data: { fieldsType },
  } = await graphql(`
    {
      fieldsType: __type(name: "${markdownRemarkFields.type.name}") {
        fields {
          name
        }
      }
    }
  `);

  const nodeFields: string[] = fieldsType.fields.map((field: any) => field.name);

  return nodeFields;
}
