export default {
  name: 'category',
  title: 'Menu Category',
  type: 'document',
  fields: [
    {
      name:"name",
      type: "string",
      title: "Category Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name:"image",
      type: "image",
      title: "Image of the Category",
    },
  ],
}
