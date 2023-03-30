const textareaElement = document.createElement('textarea');

export const resolveHtmlEntities = (text: string): string => {
  textareaElement.innerHTML = text;

  return textareaElement.value;
};
