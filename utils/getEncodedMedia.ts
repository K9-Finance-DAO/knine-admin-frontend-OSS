// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEncodedMedia = async (file: any) =>
  new Promise<string>((res) => {
    const dataForEncode = new FileReader();
    dataForEncode.readAsDataURL(file);
    dataForEncode.onload = (e) => {
      const response = e.target?.result;
      res(response as string);
    };
  });
