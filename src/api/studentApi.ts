import { CreateStudent, ListParams, ListResponse, Student } from 'models';
import axiosClient from './axiosClient';

const studentApi = {
  getAll(params: ListParams): Promise<ListResponse<Student>> {
    const url = '/students';
    return axiosClient.get(url, {params});
  },

  getById(id: string): Promise<ListResponse<Student>> {
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },

  add(data: CreateStudent): Promise<Student> {
    const url = '/students';
    return axiosClient.post(url, data);
  },

  remove(id: string): Promise<Student> {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  },

  update(data: Student): Promise<ListResponse<Student>> {
    const url = '/students';
    return axiosClient.patch(url, data);
  },
};

export default studentApi;
