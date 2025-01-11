export const product ={
    title: 'Product',
    name: 'product',
    type: 'document',
    fields: [
        {
        title: 'Name',
        name: 'name',
        type: 'string',
        },
        {
        title: 'Slug',
        name: 'slug',
        type: 'slug',
        options: {
            source: 'name',

        }
       },
        {
        title: 'Price',
        name: 'price',
        type: 'number',
        },
        {
        title: 'Image',
        name: 'image',
        type: 'array',
        of: [{type: 'image'}],
        },
        {
        title: 'Description',
        name: 'description',
        type: 'text',
        },

    ],
}