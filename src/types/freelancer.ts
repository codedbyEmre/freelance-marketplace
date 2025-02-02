export interface Freelancer {
  id: number;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  finishedJobCount?: number;
  city: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Job {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface HireFormData {
  name: string;
  subject: string;
  message: string;
}
