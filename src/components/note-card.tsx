import { memo, useCallback } from 'react';
import { INoteCard, ITag } from '../types';
import { Badge, Card, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export const NoteCard = memo(({ id, tags, title }: INoteCard) => {

    const renderBadge = useCallback(({ id: _id, label }: ITag) => <Badge key={_id} className="text-truncate">{label}</Badge>, []);

    return (
        <Card
            as={Link}
            to={`/${id}`}
            className={`h-100 text-reset text-decoration-none ${styles.card}`}
        >
            <Card.Body>
                <Stack gap={2} className="align-items-center justify-content-center h-100">
                    <span className="fs-5">{title}</span>
                    {tags.length
                        ? <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
                            {tags.map(renderBadge)}
                        </Stack>
                        : null}
                </Stack>
            </Card.Body>
        </Card>
    );
});
