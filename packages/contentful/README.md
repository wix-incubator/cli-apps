## Contentful Integration with Wix

Using this app, you can connect your Wix site to Contentful account and use the content you create in Contentful to populate your Wix site.

## How to use
1. Install the app and connect your Contentful account to your Wix site.
2. Go to CMS tab in your business manager and see that under "External Collections" you have a new namespace called "contentful-on-wix
   " and all your content models and data are there.
3. Go to the editor and enable dev mode if not already enabled.
4. Add dataset to your page and choose one of the models you have in Contentful.
5. Bind fields from your dataset to elements in your page.

## Dynamic Pages
A dynamic page is a type of web page created to display content from a CMS collection. They allow you to create websites that can efficiently handle a large amount of content while maintaining a consistent design and user experience.

### How to use
1. In your content model, add a field for the slug of type "Symbol" and in the Appearance section set it to "Slug".
2. In your content model, add a field called "route" of type "Symbol". The value of this field will be the concatenation of the slug and the page prefix. For example, if the slug is "shirt" and the page prefix is "products", the route will be "/products/shirt".
3. In the editor you should now be able to add a dynamic page to the collection.

## Known Limitations

1. You can connect only one account to your Wix site. Need more? talk with us.
2. For now we support only one language even though Contentful supports multiple languages. It's in our roadmap.
3. We don't support multi reference fields between different content types. It's in our roadmap.
4. We don't support embedded entries in rich text fields. Need it? talk with us.
5. If you have a media field and in the data you have mixes types, the type of the field in Wix will be the type of the first item in the data.
   For example, if the first item is an image, the type of the field will be an image. It's better to separate the fields in Contentful to different fields according to the media type.
6. If you have a reference field and in the data you have mixes types, the type of the field in Wix will be the type of the first item in the data.
   It's better to separate the fields in Contentful to different fields according to the reference type.
7. Changing the settings of the connection in the editor will break the integration. You will need to reconnect the site to Contentful.
8. Only published entries will be available in Wix. Drafts will not be available.
9. It's not possible to add/update/delete data stored in Contentful using Wix.
