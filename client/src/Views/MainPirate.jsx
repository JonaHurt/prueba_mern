import axios from 'axios';
import { Button, Table, Layout, Space, Card, Avatar,Image, Col, Row    } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { NavHeader } from '../Components/NavHeader';
import { UsuarioContext } from '../context/UsuarioContext';
export const MainPirate = () => {
    const [pirates, setPirates] = useState([]);
    const { usuario,setUsuario } = useContext(UsuarioContext);
    let history = useHistory();
    console.log(usuario);
    const { Content } = Layout;
    const getAllPirates = async () => {
        try {
            const pirate = await axios.get('http://localhost:8000/api/pirate/all');
            console.log(pirate.data);
            setPirates(pirate.data);
        } catch(err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if(!usuario){
            console.log('no hay usuario');
            history.push('/login');
            
        } else {
            getAllPirates();
        }     
    }, [usuario])
    console.log(pirates);
 
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/pirate/${id}`)
        .then(res => {
            console.log(res);
            getAllPirates();
        })
        .catch(err => {
            console.log(err);
        })
    }


    
    return (
        <>
        <NavHeader />
        <Content style={{ padding: '0 50px' }}>
            
            
            <h1>Pirate Crew</h1>
       
            
            <div style={{textAlign : 'right'}}>
            <Button type="primary" onClick={() => { history.push('/addpirate') }}>Add Pirate</Button>
            </div>
            { pirates?.map(pirate => (
            <Card style={{ width: '80%' }}>
                
                <Row>
                    <Col span={12}>
                    <Image
                        
                        src={pirate.image}
                        />
                    </Col>
                    <Col span={12}>
                    <h1>{pirate.nombre}</h1>
                    <Row >
                        <Col span={6}>
                            <Button type="primary" onClick={() => { history.push(`/view/${pirate._id}`) }}>View</Button>
                        </Col>
                        <Col span={6}>
                            <Button type="primary" onClick={()=> handleDelete(pirate._id)}>Eliminar</Button>
                        </Col>
                        <Col span={6}>
                            <Button type="primary"  onClick={() => { history.push(`/edit/${pirate._id}`) }}>Editar</Button>
                        </Col>
                    </Row>
                    </Col>
                    
                
                    
                </Row>

            </Card>
            ))}
        </Content>

        </>
    )
}
