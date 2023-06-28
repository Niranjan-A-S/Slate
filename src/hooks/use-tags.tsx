import { useState, useCallback, useMemo } from 'react';
import { MultiValue } from 'react-select';
import { ITag, Tag } from '../types';
import { v4 as getId } from 'uuid';


export const useTags = (availableTags: ITag[], onAddTag?: (tag: ITag) => void, initialTags: ITag[] = []) => {

    const [selectedTags, setSelectedTags] = useState<ITag[]>(initialTags);
    const handleChange = useCallback((_tags: MultiValue<Tag>) => {
        setSelectedTags(_tags.map(({ label, value }) => ({ label, id: value })));
    }, []);

    const onCreateOption = useCallback((label: string) => {
        const newTag = { label, id: getId() };
        onAddTag && onAddTag(newTag);
        setSelectedTags((prev) => [...prev, newTag]);
    }, [onAddTag]);

    const tags = useMemo(() => selectedTags.map(({ id, label }) => ({ label, value: id })), [selectedTags]);

    const selectOptions = useMemo(() => availableTags.map(({ id, label }) => ({ label, value: id })), [availableTags]);

    return { tags, handleChange, onCreateOption, selectOptions, selectedTags };

};
