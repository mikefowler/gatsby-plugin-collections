export default async function getAvailableFrontmatterFields({ graphql }: any) {
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

  const markdownRemarkFrontmatterField = markdownRemarkType.fields.find(
    (field: any) => field.name === 'frontmatter',
  );

  const {
    data: { frontmatterType },
  } = await graphql(`
    {
      frontmatterType: __type(name: "${markdownRemarkFrontmatterField.type.name}") {
        fields {
          name
        }
      }
    }
  `);

  const frontmatterFields: string[] = frontmatterType.fields.map((field: any) => field.name);

  return frontmatterFields;
}
