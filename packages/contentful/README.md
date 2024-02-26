<img src="docs/images/rectangle-logo.png" alt="contentful-wix.png" width="100"/><br>
# Contentful Integration with Wix

This guide explains how to link your Contentful account with your Wix site using the Contentful Integration with Wix application. This application makes it possible to populate your Wix site with data directly from Contentful, transforming Contentful models into Wix collections. In this guide, you'll learn how to intall the app, grant essential permissions for each platform, and effectively use Contentful models within your Wix site.

## Installation

1. In your Wix site, [enable dev mode](https://dev.wix.com/docs/develop-websites/articles/getting-started/resources/about-velo-by-wix#to-enable-velo-on-your-site).
1. Open the [Wix App Market](https://www.wix.com/app-market/search-result?query=contentful) and search for "Contentful".
1. Select the **Contentful Integration** app, and then click **Add to Site**. Then, select the Wix Site to which you want to connect your Contentful account.
1. When prompted to grant permissions to the app, select **Agree & Add**.
1. To establish the connection between your Contentful account and Wix site, provide the following information:

    <img alt="contentful-on-wix-config.png" src="docs/images/contentful-on-wix-config.png" style="margin-top: 16px; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;"/>

    * **Space**: The Contentful space to connect to your Wix site. A space is a workspace that contains all content and media for a project. 
    * **Environment**: The Contentful environment to connect to your Wix site. Environments are container entities within a space that allow you to create and maintain multiple versions of your content types, and make changes to them in isolation.
    * **Language**: The language to with your Wix site. Contentful supports multiple languages for localization.
    * **API Key** (Optional): A Contentful API Key, which helps improve performance and stability. This value is optional but recommended. For more information, see [Technical Limits](https://www.contentful.com/developers/docs/technical-limits/). To learn how to create a Contenful API key, see [Creating and managing API keys](https://training.contentful.com/student/page/1050378-creating-and-managing-api-keys). The value that you need is the **Content Delivery API - access token**:

       <img alt="contentful-api-key.png" src="docs/images/contentful-api-key.png" style="margin-top: 16px; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;"/>

1. Click **Connect**.

The connection between Contentful and Wix is now complete. To see your Contentful data in Wix, go to the **CMS** tab in your business manager. Under **External Collections**, you'll find a new namespace named **contentful-on-wix**, which contains all your content models and data.

<img alt="cms-external-connections.png" src="docs/images/cms-external-connections.png" style="margin-top: 16px; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;"/>

## Use Contentful models in your Wix site

To use the new Contentful data in your Wix site:

1. Open the Wix Editor.
1. Click **Add Panel**.
1. Within the panel options, select **CMS**. Then, click the **+** sign next to **Datasets**.

   <img alt="add-data-set.png" src="docs/images/add-data-set.png" style="margin-top: 16px; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;"/>

1. Choose from the available models within your Contentful account.
1. Connect relevant fields from your dataset to elements present on your website page.

This process adds a dataset into your page and integrates specific data sections into your site. You can repeat these steps as needed to include additional Contentful content within your Wix site.

## Create dynamic pages

Dynamic pages are a type of web page designed to showcase content from a Wix CMS collection. They enable the creation of websites capable of efficiently managing extensive content while maintaining a consistent design and user experience. To learn more about adding dynamic pages to your Wix site, see [CMS: About Dynamic Pages](https://support.wix.com/en/article/cms-about-dynamic-pages).

In order to create Wix dynamic pages with the ability to present list of items and a dedicated page for each item, follow these steps:

1. Within your Contentful model:
   
   1. Define a text field with the **Name** "Slug" and the **Field ID** of "slug".

         <img alt="Slug field details" src="docs/images/slug-field-details.png" style="margin-top: 16px; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;"/>
   
   1.  In the **Appearance** section, set the field appearance to "Slug".
          
         <img alt="Slug field appearance" src="docs/images/slug-field-appearance.png" style="margin-top: 16px; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;"/>
   
   1. Populate the field with a url friendly unique value for each entry (i.e. `"winter-2023-blue-dress"`).

1. In the Wix editor, you can now add a dynamic list page and item page. To do so, follow these steps:

   1. From the left menu in the Wix Editor, select **Databases**. If you don't see it, make sure [Dev Mode](https://dev.wix.com/docs/develop-websites/articles/getting-started/resources/about-velo-by-wix#to-enable-velo-on-your-site) is enabled in your site.

   1. Select the collection and, from the actions menu, select **Add Dynamic page**. Then, select **Item page** and **Add to Site**.

      <img alt="add-dynamic-page.png" src="docs/images/add-dynamic-page.png" style="margin-top: 16px; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;"/>
   
   1. Repeat the previous step to add a **List page**.

       <img alt="add-dynamic-page.png" src="docs/images/dynamic-page-select-type.png" style="margin-top: 16px; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;"/>

   1. In the list page, click the link or button to link to the item page in any of the items and select **Connect with CMS**.
   
      <img alt="add-dynamic-page.png" src="docs/images/dynamic-page-connect-with-cms.png" style="margin-top: 16px; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;"/>

   1. Then, select the item page that you created in the previous steps.
   
      <img alt="add-dynamic-page.png" src="docs/images/dynamic-page-select-item-page.png" style="margin-top: 16px; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;"/>

## Known Limitations

The following list covers known limitations of the Contentful Integration with Wix app:

* You can only connect one Contentful account to your Wix site. If you require additional connections, please contact us at spartans@wix.com.
* Currently, only one language is supported at a time in Wix even though Contentful supports multiple languages. Multilingual support is in our roadmap. For now, be sure to choose the language you want to connect to your Wix site during the [installation](#installation) process.
* Multi-reference fields between different content types aren't supported but are on our roadmap.
* Embedded entries in rich text fields aren't supported. If you need this feature, please contact us at spartans@wix.com.
* In case a media field contains mixed types, the field type in Wix will be determined by the type of the first item in the data. We recommend separating fields in Contentful based on media type.
* If a reference field contains mixed types in the data, the field type in Wix will be determined by the type of the first item in the data. We recommend segregating fields in Contentful based on reference type.
* Altering the connection settings in the editor may break the integration. In such cases, you will need to reconnect the site to Contentful.
* Only published entries will be accessible in Wix. Drafts will not be available.
* It's not possible to add, update, or delete data stored in Contentful using Wix CMS. All data manipulation should be done in Contentful.

## Integrate other CMS providers with Wix CMS

Contentful on Wix server is running on Wix Velo. In order to provide a reference as to how you can you create similar integrations with external CMS providers, we created a reference implementation of a Velo app that connects to Contentful. The code is available in the [velo-app-code](velo-app-code) folder of this repo, and the creation of external connections in Wix is described in the [external-connection-api service](velo-app-code/velo-code/backend/services/external-connection-api.js).
