import React, { useState } from 'react';
import { Button, Select, SelectOption, SelectVariant } from '@patternfly/react-core';

const ActionSelect = ({ setAction, removeContainers }) => {
    const options = ['Create', 'Inspect', 'Alter State', 'Remove'];
    const [isOpen, toggleIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const onToggle = () => toggleIsOpen(!isOpen);

    const clearSelection = () => {
        setSelected(null);
        toggleIsOpen();
    }

    const onSelect = (event, selection, isPlaceHolder) => {
        if (isPlaceHolder) clearSelection();
        else {
            setSelected(selection);
            toggleIsOpen();
            setAction(selection);
        }
    }

    return (
        <div>
            <Select
                width='25%'
                variant={SelectVariant.single}
                placeholderText='Actions'
                aria-label='Actions'
                onToggle={onToggle}
                onSelect={onSelect}
                selections={selected}
                isOpen={isOpen}
            >
                {options.map((option, index) => (
                    <SelectOption
                        key={index}
                        value={option}
                    />
                ))}
            </Select>
            {selected === 'Remove' && 
            <Button 
                variant="danger"
                onClick={removeContainers}
            >Remove</Button>}
        </div>

    )
}

export default ActionSelect;
