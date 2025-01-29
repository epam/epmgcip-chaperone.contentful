const mockSdk: any = {
  app: {
    onConfigure: jest.fn(),
    getParameters: jest.fn().mockReturnValueOnce({}),
    setReady: jest.fn(),
    getCurrentState: jest.fn(),
  },
  ids: {
    app: 'ai-communication-app',
  },
  entry: {
    fields: {
      descriptionEn: {
        getValue: jest.fn().mockReturnValueOnce('Mock EN value'),
      },
      descriptionRu: {
        setValue: jest.fn(),
      },
    },
    save: jest.fn(),
  }
};

export { mockSdk };
