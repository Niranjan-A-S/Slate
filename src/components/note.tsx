import { memo, useCallback } from 'react';
import { Badge, Button, Col, Modal, Row, Stack } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { NavigationButton } from '.';
import { INoteData, IRawNote, ITag } from '../types';
import { useModal } from '../hooks/use-modal';

export interface INoteProps {
    onDeleteAction(id: string): void;
}

export const Note = memo(({ onDeleteAction }: INoteProps) => {
    const { tags, title, id, markdown } = useOutletContext<INoteData & IRawNote>();
    const renderBadge = useCallback(({ id: _id, label }: ITag) => <Badge key={_id} className="text-truncate">{label}</Badge>, []);
    const navigate = useNavigate();
    const { hideModal, isVisible, showModal } = useModal();

    const onClick = useCallback(() => {
        onDeleteAction(id);
        navigate('..');
    }, [id, navigate, onDeleteAction]);

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col >
                    <h1>{title}</h1>
                    {tags.length
                        ? <Stack gap={1} direction="horizontal" className=" flex-wrap">
                            {tags.map(renderBadge)}
                        </Stack>
                        : null}
                </Col>
                <Col xs="auto">
                    <Stack direction="horizontal" gap={2}>
                        <NavigationButton label="Edit" path={`/${id}/edit`} variant="primary" />
                        <Button variant="outline-danger" onClick={showModal}>Delete</Button>
                        <NavigationButton label="Back" />
                    </Stack>
                </Col>
            </Row >
            <ReactMarkdown>{markdown}</ReactMarkdown>
            <Modal show={isVisible} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to delete this note?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>No</Button>
                    <Button variant="danger" onClick={onClick}>Yes, Proceed</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});
