export const insertSpaceBetweenChineseAndEnglish = (str: string) => {
  const pattern = /(\p{Script=Han}+)(\(?\p{Script=Latin}+\)?)/gu;
  return str.replace(pattern, (match, p1, p2) => {
    return `${p1} ${p2}`;
  });
};
