import React from 'react';
import TurndownService from 'turndown';
import { Button } from '@contentful/f36-components';
import { useSDK } from '@contentful/react-apps-toolkit';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown';
import { FieldAppSDK  } from '@contentful/app-sdk';

const toBeTransaltedDescription = 'descriptionEn';
const targetTranslatedDescription = 'descriptionRu';

interface CatFactResponse {
  fact: string;
  length: number;
}

const Field: React.FC = () => {
  const sdk = useSDK<FieldAppSDK >();

  const toBeTranslatedDescriptionField = sdk.entry.fields[toBeTransaltedDescription];
  const targetTranslatedDescriptionField = sdk.entry.fields[targetTranslatedDescription];

  const turndownService = new TurndownService();

  // TODO: as soon as the ai api will be available, replace this with passing it as parameter to api
  const emulatedWorkingWithInput = documentToHtmlString(toBeTranslatedDescriptionField.getValue());
  const aiFunctionUrl = process.env.REACT_APP_AI_TRANSLATE_FUNCTION_URL;

  const callApi = async () => {
    const response = await fetch(aiFunctionUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = (await response.json()) as CatFactResponse;

    const markdownContent = turndownService.turndown(emulatedWorkingWithInput + '\n' + data.fact);

    const document = await richTextFromMarkdown(markdownContent);
    targetTranslatedDescriptionField.setValue(document);
    await sdk.entry.save();
  };

  return <Button onClick={callApi}>Translate</Button>;
};

export default Field;