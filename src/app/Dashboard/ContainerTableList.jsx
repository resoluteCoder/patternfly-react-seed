import React, { useState } from 'react';
import { Table, TableHeader, TableBody, headerCol } from '@patternfly/react-table';
import { 
    ButtonVariant, Checkbox, DropdownToggle, ToggleGroup, 
    ToggleGroupItem, Toolbar, ToolbarContent, ToolbarItem 
} from '@patternfly/react-core';


const ContainerTableList = ({ containers }) => {
    console.log(containers)
    const columns = ['Id', 'Image', 'Name'];
    const rows = containers.length > 0 ? containers.map(container => ({
        cells: [container.Id.substring(0,15), container.Image, container.Names[0]]
    })) : [];

    return (
        <>
            <Table
                variant='compact'
                cells={columns}
                rows={rows}
            >
                <TableHeader />
                <TableBody />
            </Table>
        </> 
    )
}

export default ContainerTableList;
