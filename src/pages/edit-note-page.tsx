import { memo } from 'react';
import { INewNotesProps, INoteData, IRawNote } from '../types';
import { NoteForm } from '../components';
import { useOutletContext } from 'react-router-dom';

export const EditNote = memo(({ onSubmit, onAddTag, availableTags }: INewNotesProps) => {
    const { id, markdown, tags, title } = useOutletContext<INoteData & IRawNote>();
    return (
        <>
            <h1 className="mb-4">Edit note</h1>
            <NoteForm onSubmit={(data) => onSubmit(data, id)} onAddTag={onAddTag} availableTags={availableTags} markdown={markdown} title={title} tags={tags} />
        </>
    );
});
