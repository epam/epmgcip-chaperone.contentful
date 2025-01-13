const languages = require('../languages');

module.exports = function (migration) {
  const exhibitions = migration
    .createContentType("exhibitions")
    .name("Exhibitions")
    .description("")
    .displayField(`name${languages.find((lang) => lang.primary).code}`);

  languages.forEach((lang) => {
    exhibitions
      .createField(`name${lang.code}`)
      .name(`Name ${lang.code.toUpperCase()}`)
      .type("Symbol")
      .required(lang.primary)
      .validations([])
      .disabled(false)
      .omitted(false);
  });

  languages.forEach((lang) => {
    exhibitions
      .createField(`description${lang.code}`)
      .name(`Description ${lang.code.toUpperCase()}`)
      .type("RichText")
      .required(lang.primary)
      .validations([])
        .disabled(false)
        .omitted(false);
  });

  exhibitions
    .createField("references")
    .name("References")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{
        linkContentType: ['exhibit'],
      }]
    })

  languages.forEach((lang) => {
    exhibitions.changeFieldControl(
      `name${lang.code}`,
      "builtin",
      "singleLine",
      {
        helpText: 'A text field to store the name of exhibition'
      });

    exhibitions.changeFieldControl(
      `description${lang.code}`,
      "builtin",
      "richTextEditor",
      {
        helpText: "A rich text field to store a detailed description of exhibition"
      });
  });

  exhibitions.changeFieldControl(
    "references",
    "builtin",
    "entryLinksEditor",
    {
      helpText: "Set of references to the existing exhibitions",
      showLinkEntityAction: true,
      showCreateEntityAction: true,
  })
}
