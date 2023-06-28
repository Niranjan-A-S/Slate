import { ChangeEventHandler, memo, useCallback, useMemo, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import ReactSelect from 'react-select';
import { EditTags, NavigationButton, NoteCard } from '../components';
import { useTags } from '../hooks/use-tags';
import { INoteListProps } from '../types';
import { useModal } from '../hooks/use-modal';

export const NoteList = memo(({ availableTags, notes, onDeleteTag, onUpdateTag }: INoteListProps) => {
    const [title, setTitle] = useState<string>('');
    const { hideModal, isVisible, showModal } = useModal();

    const handleTitleChange: ChangeEventHandler<HTMLInputElement> = useCallback(({ target: { value } }) => {
        setTitle(value);
    }, []);

    const { tags, handleChange, selectOptions, selectedTags } = useTags(availableTags);

    const filteredNotes = useMemo(() => notes.filter(note => (
        (title === '' ||
            note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
            selectedTags.every(tag =>
                note.tags.some(noteTag => noteTag.id === tag.id)
            ))
    )), [title, selectedTags, notes]);

    const renderNoteCards = useCallback(() => filteredNotes.map(({ id, title: _title, tags: _tags }) => (
        <Col key={id}>
            <NoteCard id={id} tags={_tags} title={_title} />
        </Col>
    )), [filteredNotes]);

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1 className="">View your Notes here</h1>
                </Col>
                <Col xs="auto">
                    <Stack direction="horizontal" gap={2}>
                        <NavigationButton label="Create" path="/new" variant="primary" />
                        <Button variant='outline-secondary' onClick={showModal}>Edit Tags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={handleTitleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect isMulti value={tags} onChange={handleChange} options={selectOptions} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
                {renderNoteCards()}
            </Row>
            <EditTags availableTags={availableTags} handleClose={hideModal} show={isVisible} onDeleteTag={onDeleteTag} onUpdateTag={onUpdateTag} />
        </>

    );
});
