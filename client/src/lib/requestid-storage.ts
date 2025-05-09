export const saveRequestId = (requestId: string, chatId: string) => {
  localStorage.setItem(`chatRequestId-${chatId}`, requestId);
};

export const clearRequestId = (chatId: string) => {
  localStorage.removeItem(`chatRequestId-${chatId}`);
};

export const getRequestId = (chatId: string) => {
  return localStorage.getItem(`chatRequestId-${chatId}`);
};
