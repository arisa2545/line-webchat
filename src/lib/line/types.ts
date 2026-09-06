export type LineMessage = {
  id: string;
  type: string;
  text?: string;
};

export type LineSource = {
  type: string;   // 'user' | 'group' | 'room'
  userId?: string;
};

export type LineWebhookEvent = {
  type: string;
  timestamp: number;
  source?: LineSource;
  message?: LineMessage;
};

export type LineProfile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
};
