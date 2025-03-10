import React from 'react';
import Field from './Field';
import { render } from '@testing-library/react';
import { mockCma, mockSdk } from '../../test/mocks';

jest.mock('@contentful/react-apps-toolkit', () => ({
  useSDK: () => mockSdk,
  useCMA: () => mockCma,
}));

describe('Field component', () => {
  it('Component text exists', () => {
    const { getByText } = render(<Field />);

    // TODO: do we need a more complicated test?
    expect(getByText('Translate')).toBeInTheDocument();
  });
});
