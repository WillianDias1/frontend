// Importações
import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import { Link, useNavigate, useParams} from "react-router-dom";
import './style.css';

export default function User(){
    const [users, setUsers] = useState([]);
    useEffect(() => {
        api.get('users').then(response => {
            setUsers(response.data);
        })

    }, []);

    console.log(users);

    async function handleDelete(id){
        try{
            await api.delete(`/user/${id}`)
            setUsers(users.filter(user=> user.id != id))

        }catch(err){
            alert('Erro ao deletar!')
        }
    }

    return(
        <div id='user-container'>
            <h1>Lista de Usuários</h1>
            <link className="Button" id= "create-link " to={"/create"}>Criar</link >
            <ul className='user-list'>
                {users.map(user => (
                    <li key={user.id}>
                    <strong>Nome</strong>
                    <p>name</p>
                    <strong>E-mail</strong>
                    <p>email</p>
                    <strong>Idade</strong>
                    <p>10</p>
                    <strong>Empresa</strong>
                    <p>UESB</p>
                    
                    <div className="actions">
                        <button className="Button" onClick={()=>handleDelete(user.id)} type="button" >Deletar</button>
                        <link className="Button" to={`/update/${user.id}`}>Acessar</link >

                    </div>
                    
                </li>
                ))}
            </ul>
        </div>
    );
}