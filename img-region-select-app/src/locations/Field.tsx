import { useEffect, useState } from "react";
import { useSDK } from "@contentful/react-apps-toolkit";
import { FieldAppSDK } from "@contentful/app-sdk";
import { Button } from "@contentful/f36-components";
import styles from "./Field.module.css";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { Crop } from "react-image-crop";
import clsx from "clsx";
import useImageAssets from "../hooks/useImageAssets";

const calculateZoom = (crop: Crop) => {
  const highestPercent = Math.max(crop.height, crop.width);
  return Math.round(100 / highestPercent);
};

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [crop, setCrop] = useState<Crop>();
  const [srcs, updateAssets] = useImageAssets();
  const [activeImageIndex, setActiveImageIndex] = useState<
    number | undefined
  >();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const entry = sdk.entry;

  const zoom = crop ? calculateZoom(crop) : 1;

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
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
    if (activeImageIndex !== undefined && crop) {
      const centerZoomX = crop.x + crop.width / 2;
      const centerZoomY = crop.y + crop.height / 2;
      return `/?imageId=${srcs[activeImageIndex].id}&x=${centerZoomX}&y=${centerZoomY}&zoom=${zoom}`;
    }

    return "";
  };

  const link = getLink();

  const onReloadImages = () => {
    updateAssets();
  };

  const onCropChange = (crop: Crop, percentCrop: Crop) => {
    setCrop(percentCrop);
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
        {srcs.map((src, index) => (
          <div
            onClick={() => handleImageClick(index)}
            className={styles.imageContainer}
            key={src.id}
          >
            <img className={styles.image} src={src.url} alt="" />
          </div>
        ))}
      </div>
      <div className={styles.cropContainer}>
        {activeImageIndex !== undefined && (
          <ReactCrop crop={crop} onChange={onCropChange}>
            <img src={srcs[activeImageIndex].url} alt="" />
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
