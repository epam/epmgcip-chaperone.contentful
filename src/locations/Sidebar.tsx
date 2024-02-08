import React, { useState, useEffect, useRef } from 'react';
import { SidebarAppSDK } from '@contentful/app-sdk';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';
import { useSDK } from '@contentful/react-apps-toolkit';
import styles from './Sidebar.module.css';
import { Button, Note } from '@contentful/f36-components';

const CONTENT_FIELD_ID = 'slug';

const Sidebar = () => {
  const sdk = useSDK<SidebarAppSDK>();
  const componentRef = useRef(null);
  const entry = sdk.entry;
  const contentField = entry.fields[CONTENT_FIELD_ID];
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState<boolean>(entry.getSys().publishedBy !== undefined);

  useEffect(() => {
    const detach = contentField.onValueChanged(async (slug) => {
      const url = `${process.env.REACT_APP_DOMAIN}/${slug}`
      const qrCode = await QRCode.toDataURL(url);
      setQrCode(qrCode);
    });
    return () => detach();
  }, [contentField]);

  useEffect(() => {
    const detach = entry.onSysChanged(async (sys) => {
      setIsPublished(sys.publishedBy !== undefined)
    });
    return () => detach();
  }, [entry]);

  const handleClick = () => {
    if (qrCode) {
      saveAs(qrCode, contentField.getValue());
    }
  }

  return (
    <>
      {qrCode && isPublished && <>
        <img className={styles.qrcode} ref={componentRef} src={qrCode} onLoad={() => sdk.window.updateHeight()} alt="qr code"/>
        Test
        <Button variant="primary" size="medium" isFullWidth onClick={handleClick}>Save QR Code</Button>
      </>}

      {!isPublished &&
        <Note variant="primary">
          Please, "publish" the article first.
        </Note>
      }
    </>
  );
};

export default Sidebar;