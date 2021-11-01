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

export const Add = () => {
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
    const [movie, setMovie] = useState({
        nombre: '',
        type: '',
        estado: '',
    });
     const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
          
    };

    
    useEffect(() => {
        if(!usuario){
            console.log('no hay usuario');
            history.push('/login');
            
        } 
        if(location.pathname === '/add'){
            setIsAdd(true);
            setIsload(true);
            console.log('add');
        } else {
            setIsAdd(false);
            getMovie();
            
            console.log('edit');
        }
    }, [location.pathname]);
    const getMovie = async () => {
        try {
            const movie = await axios.get(`http://localhost:8000/api/movie/${id}`)
            console.log(movie.data);
            setMovie(movie.data);
            setIsload(true);
        } catch(err) {
            console.log(err)
        }
    }
    const onFinishAdd = (values) => {
        console.log('Received values of form: ', values);
        //setUsuarioNew(values)
           axios.post('http://localhost:8000/api/movie/create',values
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
    const {nombre, estado, type} = movie;
    const onFinishEdit = (values) => {
        console.log('Received values of form: ', values);
        //setUsuarioNew(values)
            axios.put(`http://localhost:8000/api/movie/update/${id}`,values)
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
    console.log(movie);
    return (
        <div>
        <NavHeader />
        <h1>Registrarse</h1>
        {
            isload && (
            <Form
            
            form={form}
            initialValues={
                    !isAdd && isload ? {
                    estado: estado,
                    type: type,
                    nombre: nombre
                    } : {
                        estado: true,
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
                },

                {
                  min: 3,
                  message: 'MInimo de caracteres 3',
                },
                
                ]}
            >
            <Input />
            </Form.Item>            
            
        <Form.Item
          name="type"
          label="type"
          rules={[
            {
              required: true,
              message: 'Please select tipe!',
            },
          ]}
        >
          <Select defaultValue="" >
            <Option value="">Selecciona tipo</Option>
            <Option value="terror">terror</Option>
            <Option value="comedia">comedia</Option>
            <Option value="accion">accion</Option>
          </Select>
        </Form.Item>
        <Form.Item name="estado" valuePropName="checked" wrapperCol={{ offset: 3, span: 8 }}>
            <Checkbox>Activo</Checkbox>
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
