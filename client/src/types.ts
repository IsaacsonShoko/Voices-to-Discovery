export type JoinPayload = {
  name: string;
  email: string;
  audience_type: string;
  country: string;
  organisation: string;
};

export type SignatoryPayload = {
  name: string;
  email: string;
  country: string;
  role: string;
};

export type RequestResult = {
  message: string;
};
