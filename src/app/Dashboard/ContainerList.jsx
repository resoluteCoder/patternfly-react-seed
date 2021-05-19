import React, { useEffect, useState } from 'react';
import {
    DataList,
    DataListItem,
    DataListItemRow,
    DataListItemCells,
    DataListCell
} from '@patternfly/react-core';

const ContainerList = ({ containers }) => {
    return (
        <DataList aria-label='Container list' isCompact>
            <DataListItem style={{fontWeight: 'bold'}} key={0}>
                <DataListItemRow>
                    <DataListItemCells
                        dataListCells={[
                            <DataListCell key={`item${0}-1`}>
                                <span>Id</span>
                            </DataListCell>,
                             <DataListCell key={`item${0}-2`}>
                                <span>Image</span>
                            </DataListCell>,
                             <DataListCell key={`item${0}-3`}>
                                <span>Name</span>
                             </DataListCell>]}
                    />
                </DataListItemRow>
            </DataListItem>

            {containers ? containers.map((container,index) => {
                return (
                    <DataListItem key={index}>
                        <DataListItemRow>
                            <DataListItemCells
                                dataListCells={[
                                    <DataListCell key={`item${index}-1`}>
                                        <span>{container.Id.substring(0,15)}</span>
                                    </DataListCell>,
                                     <DataListCell key={`item${index}-2`}>
                                        <span>{container.Image}</span>
                                    </DataListCell>,
                                     <DataListCell key={`item${index}-3`}>
                                        <span>{container.Names[0]}</span>
                                     </DataListCell>]}
                            />
                        </DataListItemRow>
                    </DataListItem>
                )
            }) : ''}
        </DataList>
    )
}

export default ContainerList;

