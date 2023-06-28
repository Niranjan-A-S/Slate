import { Link } from 'react-router-dom';
import { INavigationButton } from '../types';
import { memo } from 'react';
import { Button } from 'react-bootstrap';

export const NavigationButton = memo(({ label, path = '..', variant = 'outline-secondary' }: INavigationButton) => (
    <Link to={path}>
        <Button variant={variant}>{label}</Button>
    </Link>
));
