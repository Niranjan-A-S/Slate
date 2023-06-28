import { memo, useMemo } from 'react';
import { INoteLayout } from '../types';
import { Navigate, Outlet, useParams } from 'react-router-dom';

export const NoteLayout = memo(({ notes }: INoteLayout) => {

    const { id } = useParams();

    const note = useMemo(() => notes.find(({ id: _id }) => id === _id), [id, notes]);

    return (note ? <Outlet context={note} /> : <Navigate to="/" replace />);
});
