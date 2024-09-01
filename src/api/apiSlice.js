import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Heroes'],
    endpoints: builder => ({
        getHeroes: builder.query({
            query: () => '/heroes',
            providesTags: ['Heroes']
        }),
        createHero: builder.mutation({
            query: hero => ({
                url: '/heroes',
                method: 'POST',
                body: hero
            }),
            invalidatesTags: ['Heroes'] // чтоб сразу все изменялось, т.е подвязываем наше добавление под запрос
        }),
        deleteHero: builder.mutation({ // mutation -озноает что будет что-то изменено
            query: id => ({
                url: `/heroes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Heroes'] // чтоб сразу ве удалялось и обновляся список
        })
    })

});

export const { useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation } = apiSlice;