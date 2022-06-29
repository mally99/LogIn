
import React, { useEffect, useState } from 'react';
import { getFunc, postFunc } from '../services/httpService';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { PersonalDetails } from "../models/PersonalDetails"
import { useStore } from '../store';
import { observer } from 'mobx-react-lite';
import { createPersonalDetails, validateEmail, validatePassword, validateNoHebrew } from '../services/helper';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
const Styles = styled.div`
   padding: 1rem;
   .errMsg{
    color:red;
   }
   input {
    border: 1px solid black;
    margin: 5px;
    font-size:25px;
  }
   label,button{
    margin: 5px;
    font-size:25px;
  }
`;
const LogIn = () => {
    const { myStore } = useStore();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [displayPassword, setDisplayPassword] = useState(false);
    const [type, setType] = useState("password");

    const onChangeEmail = (e: any) => {
        setEmailMessage(validateEmail(email));
        setEmail(validateNoHebrew(e.target.value))
    }
    const onChangePassword = (e: any) => {
        setPasswordMessage(validatePassword(password));
        setPassword(validateNoHebrew(e.target.value));
    }
    const submit = async () => {
        setLoading(true);
        const res = await postFunc(email, password);
        setLoading(false);
        if (res.status === 201) {
            myStore.setToken(res.data[0].token);
            myStore.setPersonalDetails(createPersonalDetails(res.data[0].personalDetails));
            navigate('/Info');
        }
        else {
            alert("Something Went Wrong......   :(");
        }
    }
    const changeDisplayMode = () => {
        setDisplayPassword(!displayPassword);
        setType(type === 'password' ? 'text' : 'password');
    }
    const antIcon = (
        <LoadingOutlined spin />
    );
    return (
        <Styles>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={onChangeEmail} />
                <p className='errMsg'>{emailMessage}</p>
            </div>
            <div>
                <label>Password</label>
                <input type={type} value={password} onChange={onChangePassword} />
                <button onClick={changeDisplayMode}>{displayPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}</button>
                <p className='errMsg'>{passwordMessage}</p>
            </div>
            <button type="submit" onClick={submit} disabled={!(password !== '' && email !== '' && emailMessage === '' && passwordMessage === '')}>Submit{loading && <Spin indicator={antIcon} />}</button>
        </Styles>
    )


}
export default observer(LogIn)

