import React, { useContext, useState } from 'react'
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
import axios from 'axios'; 
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { UsuarioContext } from '../context/UsuarioContext';
export const Register = () => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const history = useHistory();
    const initDates = {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
  }
  const { usuario,setUsuario } = useContext(UsuarioContext);
  const [usuarioNew, setUsuarioNew] = useState(initDates)
  const {nombre, apellido, email, password, genero} = usuarioNew;
    const onFinish = (values) => {
    console.log('Received values of form: ', values);
    setUsuarioNew(values)
        axios.post('http://localhost:8000/api/user/create',values
      ).then(
        res => {
          if(res.status === 200){
            Swal.fire({
              title: 'Registro exitoso',
              text: 'Ahora puedes iniciar sesión',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(result => { 
              console.log(result);
              if (result.isConfirmed) {
                setUsuario(res.data._id);
                localStorage.setItem('usuario',res.data._id);
                history.push('/');
              } else {
                console.log('Cancelado')
              }
            }).catch(err => {
              console.log(err);
            })
          } else {
            Swal.fire(
              'Error',
              'El correo ya esta registrado',
              'error',
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
    
    
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        
      };
      const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };
     
    return (
      <div style={{ margin: 40}}>
        <h1>Registrarse</h1>
            <Form
            
            form={form}
            name="register"
            {...layout} 
            onFinish={onFinish}
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
                label="correo"
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'Ingresa un Email',
                      },
                      {
                        required: true,
                        message: 'Ingresa un Email',
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
                    message: 'Please input your password!',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Confirmar password"
                name="confirmpassword"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('las contraseñas no coinciden'));
                    },
                  }),
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
              Crear
              </Button>
            </Form.Item>
            
            </Form>
        </div>
    );
}
