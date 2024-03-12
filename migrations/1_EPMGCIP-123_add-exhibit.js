module.exports = function(migration) {
  const mainNameField = 'nameEn';

  const contentType = migration.createContentType('exhibit')
  contentType.name('Exhibit')

  function createNameField(id, name, isRequred) {
    contentType
      .createField(id)
      .name(name)
      .type('Symbol')
      .required(isRequred)
  }

  function createImageField() {
    contentType
      .createField('images')
      .name('Images')
      .type('Array')
      .required(true)
      .items({
        "type": "Link",
        "validations": [
          {
            "linkMimetypeGroup": [
              "image"
            ]
          }
        ],
        "linkType": "Asset"
      })
  }

  function createAuthorField(id, name) {
    contentType
      .createField(id)
      .name(name)
      .type('Symbol')
      .required(false)
  }

  function createYearField() {
    contentType
      .createField('yearOfCreation')
      .name('Year of creation')
      .type('Symbol')
      .required(false)
  }

  function createDescriptionField(id, name) {
    contentType
      .createField(id)
      .name(name)
      .type('RichText')
      .required(false)
      .validations([
        {
          "enabledMarks": [
            "bold",
            "italic",
            "underline",
            "code",
            "superscript",
            "subscript"
          ],
          "message": "Only bold, italic, underline, code, superscript, and subscript marks are allowed"
        },
        {
          "enabledNodeTypes": [
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
            "embedded-entry-inline"
          ],
          "message": "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, table, link to Url, link to entry, link to asset, and inline entry nodes are allowed"
        },
        {
          "nodes": {
          }
        }
      ])
  }

  function createAudioField(id, name) {
    contentType
      .createField(id)
      .name(name)
      .type('Link')
      .required(false)
      .linkType('Asset')
      .validations([
        {
          "linkMimetypeGroup": [
            "audio"
          ]
        }
      ])
  }

  function createSlugField() {
    contentType
      .createField('slug')
      .name('Slug')
      .type('Symbol')
      .required(true)

    contentType.changeFieldControl('slug', 'builtin', 'slugEditor', {
      trackingFieldId: mainNameField
    })
  }

  createNameField(mainNameField, 'Name EN', true);
  createNameField('nameRu', 'Name RU', false)
  createNameField('nameUz', 'Name UZ', false)
  createNameField('nameKa', 'Name KA', false)

  createImageField()

  createAuthorField('authorEn', 'Author EN')
  createAuthorField('authorRu', 'Author RU')
  createAuthorField('authorUz', 'Author UZ')
  createAuthorField('authorKa', 'Author KA')

  createYearField()

  createDescriptionField('descriptionEn', 'Description EN')
  createDescriptionField('descriptionRu', 'Description RU')
  createDescriptionField('descriptionUz', 'Description UZ')
  createDescriptionField('descriptionKa', 'Description KA')

  createAudioField('audioFileEn', 'Audio File EN');
  createAudioField('audioFileRU', 'Audio File RU');
  createAudioField('audioFileUz', 'Audio File UZ');
  createAudioField('audioFileKa', 'Audio File KA');

  createSlugField()
}