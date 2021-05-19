//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { 
    PageSection, Title, Alert,
    AlertActionCloseButton, AlertActionLink
} from '@patternfly/react-core';
import ContainerTableList from './ContainerTableList';
import ActionMenu from './ActionMenu';
import axios from 'axios';

const Dashboard = () => {
    const [containers, setContainers] = useState([]);
    const [containerData, setContainerData] = useState();
 
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const getContainers = async () => {
        await axios.get('http://localhost:3000/containers')
          .then(data => setContainers(JSON.parse(data.data)))
          .catch(err => console.log(err))
    }

    const createContainer = async () => {
        const data = await axios.post('http://localhost:3000/container');
        setIsAlertOpen(true);
        setAlertMessage(`Created container : ${data.data}`);
        getContainers();
    }

    const getContainerData = async () => {
        const data = await axios.get('http://localhost:3000/data');
        setContainerData(data.data[0]);
        console.log(data.data);
    }

    const removeContainer = async () => {
        const data = await axios.delete('http://localhost:3000/container');
        setIsAlertOpen(true);
        setAlertMessage(`Removed Container : ${data.data}`);
        getContainers();
    }

    useEffect(() => getContainers() ,[]);

    return (
      <PageSection>
          {isAlertOpen ? <Alert
              variant='success'
              title={alertMessage}
              actionClose={<AlertActionCloseButton onClose={()=> setIsAlertOpen(false)}/>}
          /> : ''}
          <Title style={{textAlign: 'center', margin: '15px'}} headingLevel="h1" size="lg">Active Containers</Title>
          <ActionMenu 
              createContainer={createContainer}
              getContainerData={getContainerData}
              removeContainer={removeContainer}
          />
        <ContainerTableList containers={containers}/>
        {containerData ? <p>{JSON.stringify(containerData)}</p> : ''}
      </PageSection>
    )
}

export { Dashboard };
