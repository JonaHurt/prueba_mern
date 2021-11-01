import React from 'react'
import { Login } from '../Components/Login'
import { Register } from '../Components/Register'
import { Row, Col } from 'antd';
export const Auth = () => {
    return (
        <div>
            <Row>
            <Col span={12}>
                <Register />
            </Col>
            <Col span={12}>
                <Login />
            </Col>
            </Row>
        </div>
    )
}
