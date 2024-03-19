module.exports = function (migration) {
  const exhibit = migration
    .createContentType("exhibit")
    .name("Exhibit")
    .description("")
    .displayField("nameEn");
  exhibit
    .createField("nameEn")
    .name("Name EN")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  exhibit
    .createField("nameRu")
    .name("Name RU")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  exhibit
    .createField("nameUz")
    .name("Name UZ")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  exhibit
    .createField("nameKa")
    .name("Name KA")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  exhibit
    .createField("images")
    .name("Images")
    .type("Array")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: "Link",

      validations: [
        {
          linkMimetypeGroup: ["image"],
        },
      ],

      linkType: "Asset",
    });

  exhibit
    .createField("authorEn")
    .name("Author EN")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  exhibit
    .createField("authorRu")
    .name("Author RU")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  exhibit
    .createField("authorUz")
    .name("Author UZ")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  exhibit
    .createField("authorKa")
    .name("Author KA")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  exhibit
    .createField("yearOfCreation")
    .name("Year of creation")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  exhibit
    .createField("descriptionEn")
    .name("Description EN")
    .type("RichText")
    .localized(false)
    .required(false)
    .validations([
      {
        enabledMarks: [
          "bold",
          "italic",
          "underline",
          "code",
          "superscript",
          "subscript",
        ],
        message:
          "Only bold, italic, underline, code, superscript, and subscript marks are allowed",
      },
      {
        enabledNodeTypes: [
          "heading-1",
          "heading-2",
          "heading-3",
          "heading-4",
          "heading-5",
          "heading-6",
          "ordered-list",
          "unordered-list",
          "hr",
          "blockquote",
          "embedded-entry-block",
          "embedded-asset-block",
          "table",
          "hyperlink",
          "entry-hyperlink",
          "asset-hyperlink",
          "embedded-entry-inline",
        ],

        message:
          "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, table, link to Url, link to entry, link to asset, and inline entry nodes are allowed",
      },
      {
        nodes: {},
      },
    ])
    .disabled(false)
    .omitted(false);

  exhibit
    .createField("descriptionRu")
    .name("Description RU")
    .type("RichText")
    .localized(false)
    .required(false)
    .validations([
      {
        enabledMarks: [
          "bold",
          "italic",
          "underline",
          "code",
          "superscript",
          "subscript",
        ],
        message:
          "Only bold, italic, underline, code, superscript, and subscript marks are allowed",
      },
      {
        enabledNodeTypes: [
          "heading-1",
          "heading-2",
          "heading-3",
          "heading-4",
          "heading-5",
          "heading-6",
          "ordered-list",
          "unordered-list",
          "hr",
          "blockquote",
          "embedded-entry-block",
          "embedded-asset-block",
          "table",
          "hyperlink",
          "entry-hyperlink",
          "asset-hyperlink",
          "embedded-entry-inline",
        ],

        message:
          "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, table, link to Url, link to entry, link to asset, and inline entry nodes are allowed",
      },
      {
        nodes: {},
      },
    ])
    .disabled(false)
    .omitted(false);

  exhibit
    .createField("descriptionUz")
    .name("Description UZ")
    .type("RichText")
    .localized(false)
    .required(false)
    .validations([
      {
        enabledMarks: [
          "bold",
          "italic",
          "underline",
          "code",
          "superscript",
          "subscript",
        ],
        message:
          "Only bold, italic, underline, code, superscript, and subscript marks are allowed",
      },
      {
        enabledNodeTypes: [
          "heading-1",
          "heading-2",
          "heading-3",
          "heading-4",
          "heading-5",
          "heading-6",
          "ordered-list",
          "unordered-list",
          "hr",
          "blockquote",
          "embedded-entry-block",
          "embedded-asset-block",
          "table",
          "hyperlink",
          "entry-hyperlink",
          "asset-hyperlink",
          "embedded-entry-inline",
        ],

        message:
          "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, table, link to Url, link to entry, link to asset, and inline entry nodes are allowed",
      },
      {
        nodes: {},
      },
    ])
    .disabled(false)
    .omitted(false);

  exhibit
    .createField("descriptionKa")
    .name("Description KA")
    .type("RichText")
    .localized(false)
    .required(false)
    .validations([
      {
        enabledMarks: [
          "bold",
          "italic",
          "underline",
          "code",
          "superscript",
          "subscript",
        ],
        message:
          "Only bold, italic, underline, code, superscript, and subscript marks are allowed",
      },
      {
        enabledNodeTypes: [
          "heading-1",
          "heading-2",
          "heading-3",
          "heading-4",
          "heading-5",
          "heading-6",
          "ordered-list",
          "unordered-list",
          "hr",
          "blockquote",
          "embedded-entry-block",
          "embedded-asset-block",
          "table",
          "hyperlink",
          "entry-hyperlink",
          "asset-hyperlink",
          "embedded-entry-inline",
        ],

        message:
          "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, table, link to Url, link to entry, link to asset, and inline entry nodes are allowed",
      },
      {
        nodes: {},
      },
    ])
    .disabled(false)
    .omitted(false);

  exhibit
    .createField("audioFileEn")
    .name("Audio File EN")
    .type("Link")
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ["audio"],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType("Asset");

  exhibit
    .createField("audioFileRu")
    .name("Audio File RU")
    .type("Link")
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ["audio"],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType("Asset");

  exhibit
    .createField("audioFileUz")
    .name("Audio File UZ")
    .type("Link")
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ["audio"],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType("Asset");

  exhibit
    .createField("audioFileKa")
    .name("Audio File KA")
    .type("Link")
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ["audio"],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType("Asset");

  exhibit
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  exhibit.changeFieldControl("nameEn", "builtin", "singleLine", {});
  exhibit.changeFieldControl("nameRu", "builtin", "singleLine", {});
  exhibit.changeFieldControl("nameUz", "builtin", "singleLine", {});
  exhibit.changeFieldControl("nameKa", "builtin", "singleLine", {});

  exhibit.changeFieldControl("images", "builtin", "assetLinksEditor", {
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  exhibit.changeFieldControl("authorEn", "builtin", "singleLine", {});
  exhibit.changeFieldControl("authorRu", "builtin", "singleLine", {});
  exhibit.changeFieldControl("authorUz", "builtin", "singleLine", {});
  exhibit.changeFieldControl("authorKa", "builtin", "singleLine", {});
  exhibit.changeFieldControl("yearOfCreation", "builtin", "singleLine", {});
  exhibit.changeFieldControl("descriptionEn", "builtin", "richTextEditor", {});
  exhibit.changeFieldControl("descriptionRu", "builtin", "richTextEditor", {});
  exhibit.changeFieldControl("descriptionUz", "builtin", "richTextEditor", {});
  exhibit.changeFieldControl("descriptionKa", "builtin", "richTextEditor", {});

  exhibit.changeFieldControl("audioFileEn", "builtin", "assetLinkEditor", {
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  exhibit.changeFieldControl("audioFileRu", "builtin", "assetLinkEditor", {});
  exhibit.changeFieldControl("audioFileUz", "builtin", "assetLinkEditor", {});
  exhibit.changeFieldControl("audioFileKa", "builtin", "assetLinkEditor", {});

  exhibit.changeFieldControl("slug", "builtin", "slugEditor", {
    trackingFieldId: "nameEn",
  });
};
