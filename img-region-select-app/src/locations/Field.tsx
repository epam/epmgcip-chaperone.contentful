import React, { useEffect, useState } from "react";
import { useSDK } from "@contentful/react-apps-toolkit";
import { FieldAppSDK } from "@contentful/app-sdk";
import { createClient } from "contentful";
import styles from "./Field.module.css";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { Crop } from "react-image-crop";

const client = createClient({
  space: "su8nprc5ebu0",
  accessToken: "MFL9YYGkOUf3BjdCb_PQ8Hv1_lwHLBrVhWP5APW2_80",
});

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [crop, setCrop] = useState<Crop>();
  const [srcs, setSrcs] = useState<string[]>([]);
  const [activeImage, setActiveImage] = useState<string | undefined>();
  const [link, setLink] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const value = sdk.entry.fields.images.getValue() ?? [];

      const ids = new Set(
        value?.map((item: { sys: { id: string } }) => item.sys.id) ?? []
      );

      client.getAssets().then((response) => {
        const assets = response.items.filter((item) => ids.has(item.sys.id));
        const urls = assets.map((asset) => `https:${asset.fields.file?.url}`);

        setSrcs(urls);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [sdk]);

  useEffect(() => {
    sdk.window.updateHeight();
  }, [sdk]);

  const handleImageClick = (src: string) => {
    setActiveImage(src);
    setCrop(undefined);
  };

  const handleCopyLinkClick = () => {
    window.navigator.clipboard.writeText(link);
  };

  useEffect(() => {
    if (activeImage) {
      if (crop) {
        setLink(
          `${activeImage}?x=${crop.x}&y=${crop.y}&w=${crop.width}&h=${crop.height}`
        );
      } else {
        setLink(activeImage);
      }
    }
  }, [crop, activeImage]);

  return (
    <div className={styles.container}>
      <div className={styles.linkContainer}>
        <div className={styles.link}>{link}</div>
        <div className={styles.copyButton} onClick={handleCopyLinkClick}>
          Copy
        </div>
      </div>
      <div className={styles.listContainer}>
        {srcs.map((src) => (
          <div
            onClick={() => handleImageClick(src)}
            className={styles.imageContainer}
          >
            <img className={styles.image} key={src} src={src} alt="" />
          </div>
        ))}
      </div>
      <div className={styles.cropContainer}>
        {activeImage && (
          <ReactCrop crop={crop} onChange={setCrop}>
            <img src={activeImage} alt="" />
          </ReactCrop>
        )}
      </div>
    </div>
  );
};

export default Field;
