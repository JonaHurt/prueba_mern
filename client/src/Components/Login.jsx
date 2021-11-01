import React, { useContext, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Tooltip,Typography  } from 'antd';
import axios from 'axios';
import { UsuarioContext } from '../context/UsuarioContext';
import { useHistory, useLocation, Link } from "react-router-dom";
import Swal from 'sweetalert2'
export const Login = () => {
    console.log('dasd');
    const { usuario,setUsuario } = useContext(UsuarioContext);
    let history = useHistory();
    let location = useLocation();
    const onFinish = (values) => {
        console.log('Success:', values);
       
        axios.post('http://localhost:8000/api/user/login',values
        ).then(res=>{
            if(res.data._id){
                setUsuario(res.data._id);
                localStorage.setItem('usuario',res.data._id);
                history.push('/');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message,
                  })
            }
        
            
        }).catch(err => 
            console.log(err));   
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      console.log(usuario);
      useEffect(() => {

        if (usuario) {
            history.push('/');
        }

        console.log(location.pathname);

    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={{ margin: 40}}>
            <h1>Login</h1>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 8,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Ingresa tu usuario',
                    },
                    ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'ingresa tu contraseña',
                    },
                    ]}
                >
                <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                    Ingresar
                    </Button>
                    
                </Form.Item>
            </Form>
            
            
        
          
  
        </div>
    )
}