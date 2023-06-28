import { memo } from 'react';
import { INewNotesProps } from '../types';
import { NoteForm } from '../components';

export const NewNote = memo(({ onSubmit, onAddTag, availableTags }: INewNotesProps) => (<>
    <h1 className="mb-4 ">Create your New note</h1>
    <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
</>));
