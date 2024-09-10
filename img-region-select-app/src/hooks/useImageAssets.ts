import { useCallback, useEffect, useState } from "react";
import { useSDK } from "@contentful/react-apps-toolkit";
import { FieldAppSDK } from "@contentful/app-sdk";
import client from "../client";

const CONTENT_FIELD_ID = "images";

const useImageAssets = () => {
  const sdk = useSDK<FieldAppSDK>();
  const entry = sdk.entry;
  const contentField = entry.fields[CONTENT_FIELD_ID];
  const [srcs, setSrcs] = useState<{ url: string; id: string }[]>([]);

  const getAssets = useCallback(async () => {
    const value = sdk.entry.fields.images.getValue() ?? [];

    const ids = new Set(
      value?.map((item: { sys: { id: string } }) => item.sys.id) ?? []
    );

    const assets = await client.getAssets();
    const currentAssets = assets.items
      .filter((item) => ids.has(item.sys.id))
      .map((asset) => ({
        id: asset.sys.id,
        url: `https:${asset.fields.file?.url}`,
      }));

    return currentAssets;
  }, [sdk]);

  const updateAssets = useCallback(async () => {
    getAssets().then((urls) => {
      setSrcs(urls);
    });
  }, [getAssets]);

  useEffect(() => {
    const detach = contentField.onValueChanged(async () => {
      updateAssets();
    });
    return () => detach();
  }, [contentField, sdk, updateAssets]);

  useEffect(() => {
    updateAssets();
  }, [updateAssets]);

  return [srcs, updateAssets] as const;
};

export default useImageAssets;
