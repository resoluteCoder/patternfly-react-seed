import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, headerCol } from '@patternfly/react-table';
import { 
    ButtonVariant, Checkbox, DropdownToggle, ToggleGroup, 
    ToggleGroupItem, Toolbar, ToolbarContent, ToolbarItem 
} from '@patternfly/react-core';


const ContainerTable = props => {
    const { 
        containers, action, setCheckedContainers,
        toggleContainerStatus
    } = props;
    const columns = ['Id', 'Image', 'Name', 'State'];
    const defaultRows = containers.map(container => ({
        cells: [
            container.Id.substring(0,15), container.Image, container.Names[0],
            container.State
        ]
    }));

    useEffect(()=> {
        console.log('hey');
        const updatedRows = rows.map(row => {
            row.selected = false;
            return row;
        });
        setRows(updatedRows);
        setCheckedContainers(getCheckedContainers());
    },[action])

    const [rows,setRows] = useState(defaultRows);
    
    useEffect(()=> {
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
        setCheckedContainers(getCheckedContainers());
    }


    const getCheckedContainers = () => rows.filter(({cells, selected}) => selected)
        .map(({cells, selected}) => {
            const [id, image, name] = cells;
            return name;
        });

    const actions = (rowData) => {
        return [{
            title: 'Toggle State',
            onClick: (e, rowId, rowData)=> 
            toggleContainerStatus(rowData.name.title, rowData.state.title)
        }]
    }

    return (
        <>
            <Table
                aria-label="Containers table"
                onSelect={action == 'Remove' | action == 'Inspect' 
                    ? onSelect : null}
                canSelectAll={true}
                actions={action == 'Alter State' ? actions() : null}
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
