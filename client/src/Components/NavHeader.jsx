import React, { useContext } from 'react'
import { Button, Menu  } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { UsuarioContext } from '../context/UsuarioContext';
import { useHistory } from 'react-router-dom';

export const NavHeader = () => {
  const { usuario,setUsuario } = useContext(UsuarioContext);
 
  const handleLogOut = () => {
    setUsuario(null);
    localStorage.clear();;
}
let history = useHistory();
  const { SubMenu } = Menu;
    return (
        <div>
          <Menu mode="horizontal" style={{backgroundColor: '#783f04'}}>
            <Menu.Item style= {{color: 'white'}}key="mail" onClick={() => history.push('/')}>
              Crew Board
            </Menu.Item>          
            <Menu.Item key="alipay" style={{ marginLeft: 'auto' }}>
            <Button type="primary" onClick={handleLogOut}>
            Cerrar Sesión
            </Button>
            </Menu.Item>
    
          </Menu>
          

        </div>
    )
}