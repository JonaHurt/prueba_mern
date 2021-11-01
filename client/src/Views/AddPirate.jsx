import React, { useContext, useEffect, useState } from 'react'
import {
    Form,
    Input,
    InputNumber,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
  } from 'antd';
  import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
    BrowserRouter as Router,
    Switch,
    useLocation,
    useParams,
  } from "react-router-dom";
import { NavHeader } from '../Components/NavHeader';
import { UsuarioContext } from '../context/UsuarioContext';

export const AddPirate= () => {
    const { usuario,setUsuario } = useContext(UsuarioContext);
    let history = useHistory();
    let location = useLocation();
    const { id } = useParams();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };
    const { Option } = Select;
    const [form] = Form.useForm();
    const [isAdd, setIsAdd] = useState(true);
    const [isload, setIsload] = useState(false);
    const [iscaptain, setIscaptain] = useState(false);
    const [pirate, setPirate] = useState({
        nombre: '',
        image: '',
        type: '',
        leg: '',
        eye: '',
        hand: '',
        chest: '',
    });
     const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
          
    };

    
    useEffect(() => {
        if(!usuario){
            console.log('no hay usuario');
            history.push('/login');
            
        } 
        if(location.pathname === '/addpirate'){
            setIsAdd(true);
            setIsload(true);
            getCapitain();
            console.log('add');
        } else {
            setIsAdd(false);
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

    const getCapitain = async () => {
      try {
          const pirate = await axios.get(`http://localhost:8000/api/pirate/find`)
          console.log('hay capitan',pirate.data);
          if(pirate.data == 'ok'){
            setIscaptain(true);
          } else {
            setIscaptain(false);
          }

      } catch(err) {
          console.log('no hay capitan', err)
      }
  }


    
    const onFinishAdd = (values) => {
        console.log('Received values of form: ', values);
        //setUsuarioNew(values)
           axios.post('http://localhost:8000/api/pirate/create',values
          ).then(
            res => {
              if(res.status === 200){
                Swal.fire(
                  'Exito!',
                  'El registro se ha guardado con exito',
                  'success'
                )
                history.push('/');
              } else {
                Swal.fire(
                  'Error!',
                  'Ha ocurrido un error',
                  'error'
                )
              }
            }
            
          ).catch(err => {
         
            Swal.fire(
              'Error',
              err.response.data.message,
              'error',
            )
          });
    
    };
    const tailLayout = {
          wrapperCol: { offset: 8, span: 16 },
    };
    const {nombre, image, type, leg, eye, hand, chest} = pirate;
    const onFinishEdit = (values) => {
        console.log('Received values of form: ', values);
        //setUsuarioNew(values)
            axios.put(`http://localhost:8000/api/pirate/update/${id}`,values)
            .then(
                res => {
                    if(res.status === 200){
                        Swal.fire(
                            'Exito!',
                            'El registro se ha guardado con exito',
                            'success'
                          )
                        history.push('/');
                    } else {
                        Swal.fire(
                            'Error!',
                            'Ha ocurrido un error',
                            'error'
                          )
                    }
                }
            ).catch(err => {
              Swal.fire(
                'Error',
                err.response.data.message,
                'error',
              )
            });

    }
    console.log(pirate);
    return (
        <div>
        <NavHeader />
        <h1>Add pirate</h1>
        {
            isload && (
            <Form
            
            form={form}
            initialValues={
                    !isAdd && isload ? {
                    leg: leg,
                    type: type,
                    nombre: nombre,
                    eye: eye,
                    hand: hand,
                    chest: chest,
                    image: image

                    } : {
                        leg: true,
                        eye: true,
                        hand: true,
                    }
                
            }
            name="register"
            {...layout} 
            onFinish={ isAdd ? onFinishAdd : onFinishEdit }
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                {
                    required: true,
                    message: 'Ingresa el nombre',
                }
                
                ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
                label="Imagen"
                name="image"
                rules={[
                {
                    required: true,
                    message: 'Ingresa La URL de la imagen',
                },
                
                ]}
            >
            <Input />
            </Form.Item>
        

         <Form.Item label="chest"
          name="chest"
          rules={[
            {
                required: true,
                message: 'Ingresa la cantidad de chest',
            },
            
            ]}
         >
              <InputNumber />
            </Form.Item>

            
        <Form.Item
          name="type"
          label="type"
          rules={[
            {
              required: true,
              message: 'Selecciona el tipo',
            },
          ]}
        >
          <Select defaultValue="" >
            <Option value="">Selecciona tipo</Option>
            <Option value="First Mate">First Mate</Option>
            <Option value="Quart master">Quart Master</Option>
            <Option value="Boatwain">Boatwain</Option>
            <Option value="Powder Monkey">POwder monkey</Option>
          { !iscaptain && (
            <Option value="Capitan">Capitan</Option>
          )} 
          </Select>
        </Form.Item>
        <Form.Item name="leg" valuePropName="checked" wrapperCol={{ offset: 3, span: 8 }}>
            <Checkbox>leg</Checkbox>
        </Form.Item>
        <Form.Item name="eye" valuePropName="checked" wrapperCol={{ offset: 3, span: 8 }}>
            <Checkbox>eye</Checkbox>
        </Form.Item>
        <Form.Item name="hand" valuePropName="checked" wrapperCol={{ offset: 3, span: 8 }}>
            <Checkbox>hand</Checkbox>
        </Form.Item>

            <Form.Item
                wrapperCol={{
                offset: 8,
                span: 8,
                }}
            >
              <Button type="primary" htmlType="submit">
              Submit
              </Button>
            </Form.Item>
           
            </Form>
            )}
        </div>
        
    )
}
