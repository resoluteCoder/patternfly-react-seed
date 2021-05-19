import React, { useState } from 'react';
import { 
    OptionsMenu, OptionsMenuItem, OptionsMenuToggle 
} from '@patternfly/react-core';

const ActionMenu = ({ createContainer, getContainerData, removeContainer }) => {
    const [isOpen, toggleIsOpen] = useState(false);
    const [toggleTemplateText, setToggleTemplateText] = useState('Container Actions');
    const [selectedOption, setSelectedOption] = useState('create-container');

    const onSelect = (event, action) => {
        setSelectedOption(event.currentTarget.id)
        action();
    };
    const onToggle = () => toggleIsOpen(!isOpen);
    return (
        <OptionsMenu
            style={{background: 'white', marginBottom: '25px'}}
            id='container action menu'
            menuItems={[
                <OptionsMenuItem 
                    onSelect={e => onSelect(e, createContainer)} 
                    isSelected={selectedOption === 'create-container'} 
                    id='create-container' 
                    key='option1'>
                        Create
                </OptionsMenuItem>,
                <OptionsMenuItem 
                    onSelect={e => onSelect(e, getContainerData)} 
                    isSelected={selectedOption === 'get-container-data'} 
                    id='get-container-data' 
                    key='option2'>
                        Inspect
                </OptionsMenuItem>,
                <OptionsMenuItem 
                    //onSelect={e => onSelect(e, removeContainer)} 
                    onSelect={e => onSelect(e, null)} 
                    isSelected={selectedOption === 'remove-container'} 
                    id='remove-container' 
                    key='option3'>
                        Remove
                </OptionsMenuItem>
            ]}
            isOpen={isOpen}
            toggle={
                <OptionsMenuToggle
                    onToggle={onToggle}
                    toggleTemplate={toggleTemplateText} />
            }/>
    )
}

export default ActionMenu;
