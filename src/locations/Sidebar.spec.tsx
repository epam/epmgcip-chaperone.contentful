import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import Sidebar from './Sidebar';
import { saveAs } from 'file-saver';

const sys = {
  publishedBy: {
    'id': '1',
    'type': '1',
    'linkType': '1',
  }
}

const mockSdk = {
  entry: {
    onSysChanged: (callback: (v: { publishedBy : {id: string, type: string, linkType: string}} | undefined) => {}) => {
      callback(sys);
      return jest.fn();
    },
    fields: {
      slug: {
        onValueChanged: (callback: (v: string) => {}) => {
          callback('new-slug');
          return jest.fn();
        },
        getValue: () => 'slug-value'
      }
    },
    getSys: () => sys,
  },
  window: {
    updateHeight: jest.fn()
  }
};

jest.mock('QRCode', () => ({
  toDataURL: () => 'data:image/png;base64,QR_CODE_DATA'
}));

jest.mock('file-saver', () => ({
  saveAs: jest.fn()
}));

jest.mock('@contentful/react-apps-toolkit', () => ({
  useSDK: () => mockSdk,
}));

describe('Sidebar', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(<Sidebar />);
    });
  });

  it('generates a QR code when the slug value changes', async () => {
    let { container } = render(<Sidebar />);

    await waitFor(() => expect(container.querySelector('img')).toBeInTheDocument());
    await waitFor(() => expect(container.querySelector('button')).toBeInTheDocument());
    await waitFor(
      () => expect(expect(container.querySelector('img'))
        .toHaveAttribute('src', 'data:image/png;base64,QR_CODE_DATA'))
    );
  });

  it('saves the QR code when the save button is clicked', async () => {
    const { findByText } = render(<Sidebar />);
    const saveButton = await findByText('Save QR Code');

    fireEvent.click(saveButton);

    await waitFor(() => expect(saveAs).toHaveBeenCalledWith('data:image/png;base64,QR_CODE_DATA', 'slug-value'));
  });
});
