const ns = 'LOG_REQUEST';

const createAddAction = () => {
  const localNS = 'ADD';
  const localType = `${ns}/${localNS}`;
  return {
    add: (id: string) => ({
      type: localType,
      payload: {
        id,
        created_at: new Date(),
      },
    }),
    [localNS]: localType,
  };
};

const logRequestActions = {
  ...createAddAction(),
};

export default logRequestActions;
