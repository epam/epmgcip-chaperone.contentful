import React, { useState, useEffect, useRef } from 'react';
import { SidebarAppSDK } from '@contentful/app-sdk';
import QRCodeStyling from "qr-code-styling";
import { useSDK } from "@contentful/react-apps-toolkit";
import styles from "./Sidebar.module.css";
import { Button, Note } from "@contentful/f36-components";
import logo from "../assets/logo.png";

const CONTENT_FIELD_ID = "slug";
const QR_CODE_WIDTH = 2000;
const QR_CODE_HEIGHT = 2000;

const qrCode = new QRCodeStyling({
  width: QR_CODE_WIDTH,
  height: QR_CODE_HEIGHT,
});

const qrCodeWithImage = new QRCodeStyling({
  width: QR_CODE_WIDTH,
  height: QR_CODE_HEIGHT,
  image: logo,
  imageOptions: {
    margin: 8,
  },
});

const Sidebar = () => {
  const sdk = useSDK<SidebarAppSDK>();
  const qrCodeRef = useRef<any>(null);
  const qrCodeWithImageRef = useRef<any>(null);
  const entry = sdk.entry;
  const contentField = entry.fields[CONTENT_FIELD_ID];
  const [pageUrl, setPageUrl] = useState("");
  const [isPublished, setIsPublished] = useState<boolean>(
    entry.getSys().publishedBy !== undefined
  );

  useEffect(() => {
    qrCode.append(qrCodeRef.current);
    qrCodeWithImage.append(qrCodeWithImageRef.current);

    sdk.window.updateHeight();
  }, [isPublished, sdk.window]);

  useEffect(() => {
    const detach = contentField.onValueChanged(async (slug) => {
      const url = `${process.env.REACT_APP_DOMAIN}/${slug}`;
      setPageUrl(url);

      qrCode.update({
        data: url,
      });

      qrCodeWithImage.update({
        data: url,
      });

      sdk.window.updateHeight();
    });
    return () => detach();
  }, [contentField, sdk.window]);

  useEffect(() => {
    const detach = entry.onSysChanged(async (sys) => {
      setIsPublished(sys.publishedBy !== undefined);
    });
    return () => detach();
  }, [entry]);

  useEffect(() => {
    sdk.window.updateHeight();
  }, [sdk.window, pageUrl]);

  const handleSaveQrCodeClick = () => {
    qrCode.download({
      name: contentField.getValue(),
      extension: "png",
    });
  };

  const handleSaveQrCodeWithImageClick = () => {
    qrCodeWithImage.download({
      name: contentField.getValue(),
      extension: "png",
    });
  };

  return (
    <>
      {isPublished && pageUrl.length > 0 && (
        <a href={pageUrl} target="_blank" className={styles.link}>
          {pageUrl}
        </a>
      )}
      {qrCode && isPublished && (
        <>
          <div className={styles.qrcode} ref={qrCodeRef} />
          <Button
            variant="primary"
            size="medium"
            isFullWidth
            onClick={handleSaveQrCodeClick}
          >
            Save QR Code
          </Button>
        </>
      )}

      {qrCodeWithImage && isPublished && (
        <div className={styles.qrCodeWithImageSectionWrapper}>
          <div className={styles.qrcode} ref={qrCodeWithImageRef} />
          <Button
            variant="primary"
            size="medium"
            isFullWidth
            onClick={handleSaveQrCodeWithImageClick}
          >
            Save QR Code
          </Button>
        </div>
      )}

      {!isPublished && (
        <Note variant="primary">Please, "publish" the article first.</Note>
      )}
    </>
  );
};

export default Sidebar;