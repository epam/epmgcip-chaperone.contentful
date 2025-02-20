import React, { ChangeEvent, useEffect, useState } from "react";
import TurndownService from "turndown";
import {
  Button,
  FormControl,
  Select,
  Notification,
} from "@contentful/f36-components";
import { useSDK } from "@contentful/react-apps-toolkit";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { FieldAppSDK } from "@contentful/app-sdk";
import LanguagesEnum from "../LanguagesEnum";
import styles from "./Field.module.css";

const fieldName = "description";

const languages = Object.keys(LanguagesEnum).filter((key) =>
  isNaN(Number(key))
);

function getKeyByValue(value: string): string | undefined {
  const entries = Object.entries(LanguagesEnum);
  for (let [key, val] of entries) {
    if (val === value) {
      return key;
    }
  }
  return undefined;
}

function getEnumValueByKey(key: string): string | undefined {
  if (key in LanguagesEnum) {
    return LanguagesEnum[key as keyof typeof LanguagesEnum];
  }
  return undefined;
}

const Field: React.FC = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [languageFrom, setLanguageFrom] = useState<string>(
    getKeyByValue(LanguagesEnum.Russian) || ""
  );
  const [isTranslating, setIsTranslating] = useState(false);
  const languagesExceptFrom = languages.filter((lang) => lang !== languageFrom);
  const languagesTo = [languagesExceptFrom.join(", "), ...languagesExceptFrom];
  const [languageTo, setLanguageTo] = useState(languagesTo[0]);
  const handleOnChangeLanguageFrom = (event: ChangeEvent<HTMLSelectElement>) =>
    setLanguageFrom(event.target.value);
  const handleOnChangeLanguageTo = (event: ChangeEvent<HTMLSelectElement>) =>
    setLanguageTo(event.target.value);

  const toBeTranslatedField =
    sdk.entry.fields[`${fieldName}${getEnumValueByKey(languageFrom)}`];

  const turndownService = new TurndownService();

  const emulatedWorkingWithInput = documentToHtmlString(
    toBeTranslatedField.getValue()
  );

  const callApi = async () => {
    setIsTranslating(true);

    try {
      const languageToArray = languageTo.split(",").map((lang) => lang.trim());
      const responses = await Promise.all(
        languageToArray.map((lang) =>
          fetch(
            `${process.env.REACT_APP_AI_TRANSLATE_FUNCTION_URL}?language=${lang}&code=${process.env.REACT_APP_AI_TRANSLATE_FUNCTION_CODE}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                text: emulatedWorkingWithInput,
              }),
            }
          )
            .then((response) => response.json())
            .then((response) => ({
              lang,
              text: response["LLM Response"]
                .replace("```html\n", "")
                .replace("\n```", ""),
            }))
        )
      );

      const markdownContents = responses.map(({ lang, text }) => {
        return { lang, text: turndownService.turndown(text) };
      });

      markdownContents.forEach(async ({ lang, text }) => {
        const document = await richTextFromMarkdown(text);
        const targetTranslatedField =
          sdk.entry.fields[`${fieldName}${getEnumValueByKey(lang)}`];
        targetTranslatedField.setValue(document);
      });

      await sdk.entry.save();
      Notification.success("Translation has completed.");
    } catch {
      Notification.error("Can't translate");
    }

    setIsTranslating(false);
  };

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, [sdk]);

  return (
    <div className={styles.wrapper}>
      <FormControl>
        <FormControl.Label>Translate from</FormControl.Label>
        <Select
          id="languageFrom"
          name="languageFrom"
          value={languageFrom}
          onChange={handleOnChangeLanguageFrom}
          className={styles.select}
          isDisabled={isTranslating}
        >
          {languages.map((lang) => (
            <Select.Option value={lang} key={lang}>
              {lang}
            </Select.Option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormControl.Label>Translate To</FormControl.Label>
        <Select
          id="languageFrom"
          name="languageFrom"
          value={languageTo}
          onChange={handleOnChangeLanguageTo}
          className={styles.select}
          isDisabled={isTranslating}
        >
          {languagesTo.map((lang) => (
            <Select.Option value={lang} key={lang}>
              {lang}
            </Select.Option>
          ))}
        </Select>
      </FormControl>

      <Button onClick={callApi} isLoading={isTranslating}>
        Translate
      </Button>
    </div>
  );
};

export default Field;
