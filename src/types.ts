import { To } from 'react-router-dom';

export interface ITag {
    id: string;
    label: string;
}
export type Tag = {
    [K in keyof ITag as K extends 'id' ? 'value' : K]: ITag[K];
}

interface IRawNoteData {
    title: string;
    markdown: string;
    tagIds: string[];
}

export interface INoteData extends Omit<IRawNoteData, 'tagIds'> {
    tags: ITag[];
}

export interface IRawNote extends IRawNoteData {
    id: string;
}

export interface INoteFormProps extends Partial<INoteData> {
    onSubmit(data: INoteData, id?: string): void;
    onAddTag(tag: ITag): void;
    availableTags: ITag[];
}

export type INewNotesProps = INoteFormProps

export interface INavigationButton {
    label: string;
    path?: To;
    variant?: string;
}

export interface INoteListProps {
    availableTags: ITag[];
    notes: INoteCard[];
    onDeleteTag(id: string): void;
    onUpdateTag(tag: ITag): void;
}


export interface INoteCard {
    title: string;
    id: string;
    tags: ITag[];
}

export interface INoteLayout {
    notes: INoteCard[];
}

export interface IEditTags extends Omit<INoteListProps, 'notes'> {
    show: boolean;
    handleClose(): void;
}

export interface ITagView extends ITag, Omit<INoteListProps, 'notes' | 'availableTags'> {
}

