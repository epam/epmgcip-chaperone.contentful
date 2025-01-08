const languages = require('../languages.js');

module.exports = function (migration) {
  const exhibit = migration
    .createContentType("page")
    .name("Page")
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

  languages.forEach((lang) => {
    exhibit.changeFieldControl(`description${lang.code}`, "builtin", "richTextEditor", {});
  });

  exhibit.changeFieldControl("slug", "builtin", "slugEditor", {
    trackingFieldId: `name${languages.find((lang) => lang.primary).code}`,
  });
};
