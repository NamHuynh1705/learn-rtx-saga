export interface CreateStudent {
  name: string;
  age: number;
  mark: number;
  gender: 'male' | 'female';
  city: string;
}

export interface Student extends CreateStudent {
  id: string;
  createAt?: number;
  updateAt?: number;
}
