import React, { useContext, useEffect, useState } from 'react'
import { Button, Table, Layout, Space, Card, Avatar,Image, Col, Row    } from 'antd';
import axios from 'axios';
import {
    BrowserRouter as Router,
    useLocation,
    useParams,
    useHistory,
  } from "react-router-dom";
import { UsuarioContext } from '../context/UsuarioContext';
import { NavHeader } from './NavHeader';
export const View = () => {
    let location = useLocation();
    const { usuario,setUsuario } = useContext(UsuarioContext);
    const [isload, setIsload] = useState(false);
    const [pirate, setPirate] = useState({        
    });
    const { id } = useParams();
    let history = useHistory();
    useEffect(() => {
        if(!usuario){
            console.log('no hay usuario');
            history.push('/login');
            
        } 
        if(location.pathname === '/addPirate'){
           
            setIsload(true);
            console.log('add');
        } else {
            
            getPirate();
            
            console.log('edit');
        }
    }, [location.pathname, usuario]);
    
    const getPirate = async () => {
        try {
            const pirate = await axios.get(`http://localhost:8000/api/pirate/${id}`)
            console.log(pirate.data);
            setPirate(pirate.data);
            setIsload(true);
        } catch(err) {
            console.log(err)
        }
    }
    const handleChange = (name, estatus) => {
        console.log(name, estatus);
        const newPirate = {
            [name]: !estatus
        }
        axios.put(`http://localhost:8000/api/pirate/updateestatus/${id}`, 
        newPirate )
        .then(res => {
            console.log(res);
        })
        
        setPirate({...pirate, [name]: !estatus});
        
    }


    const gridStyle = {
        width: '40%',
        textAlign: 'left',
      };
    console.log(pirate)
    return (
        <>
            <NavHeader />
            <Row>
                <Col span={24}>
                    <h1>{pirate.nombre}</h1>
                </Col>
                    <Col span={12}>
                       
                        <Image
                        width={400}
                        src={pirate.image}
                        />
                    </Col>
                    <Col span={12}>
                    <Card title="About" bordered={false} style={gridStyle} >
                        <p>Position: {pirate.type}</p>
                        <p>Chest: {pirate.chest}</p>
                        <div mar><p style={{display: 'inline'}} >Peg leg: {pirate.leg ? 'yes' : 'no'} </p> <Button type="primary" onClick={()=> handleChange('leg', pirate.leg)}> { pirate.leg ? 'Yes' : 'No'} </Button></div>
                        
                       
                        <div><p style={{display: 'inline'}}>Eye Patch: {pirate.eye ? 'yes' : 'no'}</p> <Button type="primary" onClick={()=> handleChange('eye', pirate.eye)}>{ pirate.eye ? 'Yes' : 'No'} </Button></div>
                        <div style={{display: 'inline'}}>
                        <p style={{display: 'inline'}}>Hook Hand {pirate.hand ? 'yes' : 'no'}</p>
                        <Button type="primary" onClick={()=> handleChange('hand', pirate.hand)}>{ pirate.hand ? 'Yes' : 'No'} </Button>
                        </div>
                    </Card>
                    
                        
                    </Col>

            </Row>
        </>
    )
}
