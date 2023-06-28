import { FC, memo } from 'react';
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';
import { IEditTags, ITagView } from '../types';


const TagView: FC<ITagView> = memo(({ label, onDeleteTag, id, onUpdateTag }) => (
    <Row>
        <Col>
            <Form.Control value={label} type="text" onChange={({ target: { value } }) => onUpdateTag({ label: value, id })} />
        </Col>
        <Col xs="auto">
            <Button variant="outline-danger" onClick={() => onDeleteTag(id)}>&times;</Button>
        </Col>
    </Row>
));

export const EditTags: FC<IEditTags> = memo(({ availableTags, handleClose, show, onUpdateTag, onDeleteTag }) => (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton >
            <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Stack gap={2}>
                    {availableTags.map(({ id, label }) => <TagView key={id} onDeleteTag={() => onDeleteTag(id)} id={id} label={label} onUpdateTag={onUpdateTag} />)}
                </Stack>
            </Form>
        </Modal.Body>
    </Modal>));
