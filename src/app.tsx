import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { useLocalStorage } from './hooks';
import { INoteData, IRawNote, ITag } from './types';
import { useCallback, useMemo } from 'react';
import { v4 as getId } from 'uuid';
import { EditNote, NewNote, NotFound, NoteLayout, NoteList } from './pages';
import { Note } from './components';

export const App = () => {

  const [notes, setNotes] = useLocalStorage<IRawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<ITag[]>('TAGS', []);

  const notesWithTags = useMemo(() => notes.map((note) => ({ ...note, tags: tags.filter(({ id }) => note.tagIds.includes(id)) })), [notes, tags]);

  const onCreateNotes = useCallback(({ tags: temp, ...data }: INoteData) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...data, id: getId(), tagIds: temp.map(({ id }) => id) }
    ]);
  }, [setNotes]);

  const addTag = useCallback(({ id, label }: ITag) => {
    setTags((prev) => [...prev, { id, label }]);
  }, [setTags]);

  const updateNote = useCallback(({ tags: temp, ...data }: INoteData, id: string) => {
    setNotes((prevNotes) => prevNotes.map(note => (note.id === id ? { ...note, ...data, tagIds: temp.map(tag => tag.id) } : note)));
  }, [setNotes]);

  const deleteNote = useCallback((id: string) => {
    setNotes((prevNotes) => prevNotes.filter(({ id: _id }) => id !== _id));
  }, [setNotes]);

  const updateTag = useCallback(({ id, label }: ITag) => {
    setTags(prevTags => prevTags.map(tag =>
      (tag.id === id ? ({ ...tag, label }) : tag)));
  }, [setTags]);

  const deleteTag = useCallback((id: string) => {
    setTags(prevTags => prevTags.filter(tag => tag.id !== id));
  }, [setTags]);

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList availableTags={tags} notes={notesWithTags} onUpdateTag={updateTag} onDeleteTag={deleteTag} />}></Route>
        <Route path="/new" element={
          <NewNote
            onSubmit={onCreateNotes}
            onAddTag={addTag}
            availableTags={tags}
          />}
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />} >
          <Route index element={<Note onDeleteAction={deleteNote} />} />
          <Route path="edit" element={<EditNote onSubmit={updateNote} onAddTag={addTag} availableTags={tags} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
};
