export const isClientSide = () => {
  return typeof window !== 'undefined';
};

export class ClientSideError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClientSideError';
  }
}
