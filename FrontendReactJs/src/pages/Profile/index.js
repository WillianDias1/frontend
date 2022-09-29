import React, {useState, userEffect} from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import api from '../../services/api'
import './style.css'

export default function Profile(){
    const {id} = userParams();
    const navigate = useNavigate();
    const initUser={
        name:'',
        email:'',
        idade: 0,
        empresa:''
    }
    const[user, setUser] = useState(initUser);
    
    userEffect(()=>{
        if(id){
            api.get(`/users/${id}`).then(response=>{
                console.log(response.data)
                setUser(...response.data)
            })
        } 

    }, []);

    function onSubmit(ev){
        ev.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id
        ? `/users/${id}`
        : '/users'
        api[method](url,user).then((Response)=>{
            navigate('/')
        })
    }

    function onChange(ev){
        const {name, value} = ev.target;
        setUsers({...user, [name]:value})
        console.log(user)


    }
    return(
        <div id="profile-container">
            <h1> Cadastro</h1>
            <from onSubmit={onSubmit}>
                <strong>Nome:</strong>
                <input name="name" onChange={onChange} value={user.name}/>
                
                <strong>Email:</strong>
                <input tupe="email" name="email" onChange={onChange} value={user.email} />
                
                <strong>Idade:</strong>
                <input name="idade" onChange={onChange} value={user.idade}/>
                
                <strong>Empresa:</strong>
                <input name="empresa" onChange={onChange} value={user.empresa}/>

                <div className="actions">
                    <Link className="Button" onClick={()=>history.pushState('/')}>Voltar</Link >
                    <button className="Button" type="submit">Salvar</button>
                </div>
              
            </from>

        </div>
    )
}