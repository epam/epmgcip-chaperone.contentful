const languages = require('../languages.js');

module.exports = function (migration) {
  const exhibit = migration
    .createContentType("exhibit")
    .name("Exhibit")
    .description("")
    .displayField(`name${languages.find((lang) => lang.primary).code}`);

  languages.forEach((lang) => {
    exhibit
      .createField(`name${lang.code}`)
      .name(`Name ${lang.code.toUpperCase()}`)
      .type("Symbol")
      .localized(false)
      .required(lang.primary)
      .validations([])
      .disabled(false)
      .omitted(false);
  });
  
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

  languages.forEach((lang) => {
    exhibit
      .createField(`author${lang.code}`)
      .name(`Author ${lang.code.toUpperCase()}`)
      .type("Symbol")
      .localized(false)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false);
  });

  exhibit
    .createField("yearOfCreation")
    .name("Year of creation")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  languages.forEach((lang) => {
    exhibit
    .createField(`description${lang.code}`)
    .name(`Description ${lang.code.toUpperCase()}`)
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
  });

  languages.forEach((lang) => {
    exhibit
      .createField(`audioFile${lang.code}`)
      .name(`Audio File ${lang.code.toUpperCase()}`)
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
  });

  exhibit
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  languages.forEach((lang) => {
    exhibit.changeFieldControl(`name${lang.code}`, "builtin", "singleLine", {});
  });

  exhibit.changeFieldControl("images", "builtin", "assetLinksEditor", {
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  languages.forEach((lang) => {
    exhibit.changeFieldControl(`author${lang.code}`, "builtin", "singleLine", {});
  });

  exhibit.changeFieldControl("yearOfCreation", "builtin", "singleLine", {});

  languages.forEach((lang) => {
    exhibit.changeFieldControl(`description${lang.code}`, "builtin", "richTextEditor", {});
  });

  languages.forEach((lang) => {
    exhibit.changeFieldControl(`audioFile${lang.code}`, "builtin", "assetLinkEditor", lang.primary ? {
      showLinkEntityAction: true,
      showCreateEntityAction: true,
    } : {});
  });

  exhibit.changeFieldControl("slug", "builtin", "slugEditor", {
    trackingFieldId: `name${languages.find((lang) => lang.primary).code}`,
  });
};
