/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormEvent, memo, useCallback, useRef } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { useTags } from '../hooks/use-tags';
import { INoteFormProps } from '../types';
import { NavigationButton } from './navigation-button';


export const NoteForm = memo(({ onSubmit, onAddTag, availableTags, markdown = '', tags: _tags = [], title = '' }: INoteFormProps) => {

    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();

    const { tags, handleChange, onCreateOption, selectOptions, selectedTags } = useTags(availableTags, onAddTag, _tags);

    const handleSubmit = useCallback((event: FormEvent) => {
        event.preventDefault();
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags
        });
        navigate('..');
    }, [navigate, onSubmit, selectedTags]);

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required ref={titleRef} defaultValue={title} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect isMulti value={tags} onChange={handleChange} onCreateOption={onCreateOption} options={selectOptions} />
                        </Form.Group>
                    </Col>
                    <Form.Group controlId="markdown">
                        <Form.Label>Body</Form.Label>
                        <Form.Control required as="textarea" rows={15} ref={markdownRef} defaultValue={markdown} />
                    </Form.Group>
                </Row>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type="submit">Save</Button>
                    <NavigationButton label="Cancel" />
                </Stack>
            </Stack>
        </Form >
    );
});
