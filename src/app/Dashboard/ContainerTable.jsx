import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, headerCol } from '@patternfly/react-table';
import { 
    ButtonVariant, Checkbox, DropdownToggle, ToggleGroup, 
    ToggleGroupItem, Toolbar, ToolbarContent, ToolbarItem 
} from '@patternfly/react-core';


const ContainerTable = ({ containers, action, setContainersToRemove }) => {
    const columns = ['Id', 'Image', 'Name', 'State'];
    const defaultRows = containers.map(container => ({
        cells: [
            container.Id.substring(0,15), container.Image, container.Names[0],
            container.State
        ]
    }));

    const [rows,setRows] = useState(defaultRows);
    
    useEffect(()=> {
        console.log('test');
        setRows(defaultRows);
    },[containers])

    const onSelect = (event, isSelected, rowId) => {
        let localRows;
        if (rowId === -1) {
            localRows = rows.map(oneRow => {
                oneRow.selected = isSelected;
                return oneRow;
            })
        }
        else {
            localRows = [...rows];
            localRows[rowId].selected = isSelected;
        }
        setRows(localRows);
        setContainersToRemove(getCheckedContainers());
    }


    const getCheckedContainers = () => rows.filter(({cells, selected}) => selected)
        .map(({cells, selected}) => {
            const [id, image, name] = cells;
            return name;
        });

    return (
        <>
            <Table
                aria-label="Containers table"
                onSelect={action == 'Remove' ? onSelect : null}
                canSelectAll={true}
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

export default ContainerTable;
