## Contentful Integration with Wix

This application facilitates the seamless connection between your Wix site and Contentful account, allowing you to utilize the content created in Contentful to populate your Wix site effortlessly.

## How to use
1. Enable dev mode in your Wix site.
1. Install the application and establish the connection between your Contentful account and Wix site.   
    1. Using [API Key](https://www.contentful.com/blog/api-key/) is not mandatory, but it's recommended for better performance and stability. Check https://www.contentful.com/developers/docs/technical-limits/ for more details.
1. Navigate to the CMS tab in your business manager. Under "External Collections," you will find a new namespace named "contentful-on-wix," housing all your content models and data.
1. Add dataset to your page and choose one of the models you have in Contentful.
1. Bind fields from your dataset to elements on your page.

## Dynamic Pages
Dynamic pages are a type of web page designed to showcase content from a CMS collection. They enable the creation of websites capable of efficiently managing extensive content while maintaining a consistent design and user experience.

### How to use
1. Within your content model, include a field for the slug of type "Symbol" and set it to "Slug" in the Appearance section.
2. Introduce a field called "route" of type "Symbol" in your content model. The value of this field should be the concatenation of the slug and the page prefix. For instance, if the slug is "shirt" and the page prefix is "products," the route will be "/products/shirt."
3. In the editor, you can now add a dynamic page to the collection.

## Known Limitations

1. You can connect only one account to your Wix site. If you require additional connections, please contact us.
2. Currently, we support only one language, although Contentful supports multiple languages. Multilingual support is in our roadmap.
3. Multi-reference fields between different content types are not supported at the moment but are on our roadmap.
4. Embedded entries in rich text fields are not supported. If you need this feature, please contact us.
5. In cases where a media field contains mixed types, the field type in Wix will be determined by the type of the first item in the data. It is advisable to separate fields in Contentful based on media type.
6. Similarly, if a reference field contains mixed types in the data, the field type in Wix will be determined by the type of the first item in the data. It is recommended to segregate fields in Contentful based on reference type.
7. Altering the connection settings in the editor may break the integration. In such cases, you will need to reconnect the site to Contentful.
8. Only published entries will be accessible in Wix; drafts will not be available.
9. It is not possible to add, update, or delete data stored in Contentful using Wix.
