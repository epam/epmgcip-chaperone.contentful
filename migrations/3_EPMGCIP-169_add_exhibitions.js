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
}
