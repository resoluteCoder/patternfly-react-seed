import React, { useState } from 'react';
import { 
    Button, Select, SelectOption, SelectVariant,
    FormGroup, TextInput, Split, SplitItem, Form,
    InputGroup
} from '@patternfly/react-core';

const ActionSelect = props => {
    const { 
        setAction, removeContainers, createContainer,
        inspectContainers 
    } = props;
    const options = ['Create', 'Inspect', 'Alter State', 'Remove'];
    const [isOpen, toggleIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [nameInput, setNameInput] = useState('');

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

    const onSubmit = (event) => {
        event.preventDefault();
        createContainer(nameInput);
        setNameInput('');
    }

    return (
        <Split hasGutter>
            <SplitItem>
                <Select
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
            </SplitItem>
            <SplitItem>
                {selected === 'Remove' && 
                <Button 
                    variant="danger"
                    onClick={removeContainers}
                >Remove</Button>}

                {selected === 'Inspect' && 
                <Button 
                    variant="secondary"
                    onClick={inspectContainers}
                >Inspect</Button>}

                {selected == 'Create' &&
                <Form
                    onSubmit={onSubmit}
                >
                    <InputGroup>
                        <TextInput
                            value={nameInput}
                            placeholder='container name'
                            onChange={e=>setNameInput(e)}
                          name="container-name"
                          id="textInput11" 
                          type="search" aria-label="search input example" 
                        />
                        {/*<Button 
                          onClick={()=>console.log('clicked')}
                          variant="primary" 
                          aria-label='create container button'>
                          Create
                      </Button>*/}
                    </InputGroup>
                </Form>}
            </SplitItem>
        </Split>
    )
}

export default ActionSelect;
