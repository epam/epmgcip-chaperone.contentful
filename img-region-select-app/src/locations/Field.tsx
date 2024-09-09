import { useEffect, useState } from "react";
import { useSDK } from "@contentful/react-apps-toolkit";
import { FieldAppSDK } from "@contentful/app-sdk";
import { Button } from "@contentful/f36-components";
import styles from "./Field.module.css";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { Crop } from "react-image-crop";
import clsx from "clsx";
import useImageAssets from "../hooks/useImageAssets";

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [crop, setCrop] = useState<Crop>();
  const [srcs, updateAssets] = useImageAssets();
  const [activeImage, setActiveImage] = useState<string | undefined>();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const entry = sdk.entry;

  const handleImageClick = (src: string) => {
    setActiveImage(src);
    setCrop(undefined);
  };

  const handleCopyLinkClick = () => {
    window.navigator.clipboard.writeText(link);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const getLink = () => {
    if (activeImage) {
      if (crop) {
        return `${activeImage}?x=${crop.x}&y=${crop.y}&w=${crop.width}&h=${crop.height}`;
      } else {
        return activeImage;
      }
    }

    return "";
  };

  const link = getLink();

  const onReloadImages = () => {
    updateAssets();
  };

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, [sdk, entry]);

  return (
    <div className={styles.container}>
      <Button variant="primary" size="medium" onClick={onReloadImages}>
        Reload Images
      </Button>

      <div className={styles.listContainer}>
        {srcs.map((src) => (
          <div
            onClick={() => handleImageClick(src)}
            className={styles.imageContainer}
            key={src}
          >
            <img className={styles.image} src={src} alt="" />
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
      <div className={styles.linkContainer}>
        <div className={styles.link}>{link}</div>
        <button
          type="button"
          className={clsx(
            styles.copyButton,
            isCopied && styles.copyButtonSuccess
          )}
          onClick={handleCopyLinkClick}
          disabled={link.length > 0 ? false : true}
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default Field;
