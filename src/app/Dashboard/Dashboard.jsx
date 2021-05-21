//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { 
    PageSection, Title, Alert,
    AlertActionCloseButton, AlertActionLink
} from '@patternfly/react-core';
import ContainerTable from './ContainerTable';
//import ActionMenu from './ActionMenu';
import ActionSelect from './ActionSelect';
import axios from 'axios';

const Dashboard = () => {
    const [containers, setContainers] = useState([]);
    const [containerData, setContainerData] = useState();
    const [checkedContainers, setCheckedContainers] = useState([]);

    const [action, setAction] = useState();

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const getContainers = async () => {
        await axios.get('http://localhost:3000/containers')
          .then(data => setContainers(JSON.parse(data.data)))
          .catch(err => console.log(err))
    }

    const createContainer = async (container) => {
        const data = await axios.post('http://localhost:3000/container', 
            { name: container });
        setIsAlertOpen(true);
        setAlertMessage(`Created container : ${data.data}`);
        getContainers();
    }

    const inspectContainers = async () => {
        const data = await axios.get('http://localhost:3000/data',
            { params : { containers: checkedContainers }});
        setContainerData(data.data);
    }

    const removeContainers = async () => {
        const data = await axios.delete('http://localhost:3000/containers', 
            { data: checkedContainers });
        setIsAlertOpen(true);
        setAlertMessage(`Removed Containers : ${data.data}`);
        getContainers();
    }

    const toggleContainerStatus = async (name, status) => {
        const state = status === 'running' ? 'Stopped ' : 'Started '; 
        const data = await axios.put('http://localhost:3000/containers', 
            { name, status });
        setIsAlertOpen(true);
        setAlertMessage(`${state} Container : ${data.data}`);
        getContainers();
    }

    useEffect(() => getContainers() ,[]);

    return (
      <PageSection>
          {isAlertOpen ? <Alert
              variant='success'
              title={alertMessage}
              actionClose={<AlertActionCloseButton 
              onClose={()=> setIsAlertOpen(false)}/>}
          /> : ''}
          <Title 
              style={{textAlign: 'center', margin: '15px'}} 
              headingLevel="h1" 
              size="lg"
          >
            Container Dashboard
          </Title>
          <ActionSelect 
              setAction={setAction}
              createContainer={createContainer}
              inspectContainers={inspectContainers}
              removeContainers={removeContainers}
          />
          <br/>
          {containers.length > 0 ? 
            <ContainerTable 
                containers={containers} 
                action={action}
                setCheckedContainers={setCheckedContainers}
                toggleContainerStatus={toggleContainerStatus}
            /> : <h1 style={{textAlign: 'center'}}>No Containers available</h1>}
          {containerData ? <p>{JSON.stringify(containerData)}</p> : ''}
      </PageSection>
    )
}

export { Dashboard };
