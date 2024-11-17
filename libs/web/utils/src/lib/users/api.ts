import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  tagTypes: ['Users'],
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://reqres.in/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query<any, { limit: number }>({
      query: ({ limit }) => `/users?per_page=${limit}`,
      transformResponse: (response: any) => {
        const data = response.data;

        return data.filter((user: any) =>
          user.first_name.startsWith('G') ||
          user.last_name.startsWith('W')
        );
      },
      providesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
