import React, { FormEvent, useState, useEffect } from 'react';

import logoImg from "../../assets/logo.svg"
import { Form, Repositories, Title, Error } from './styles';

import { FiChevronRight } from "react-icons/fi";
import api from '../../services/api';
import { Link } from 'react-router-dom';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}

const Daskboard: React.FC = () => {
    const [repo, setRepo] = useState('')
    const [error, setError] = useState<string>('')
    const [repositories, setRepositories] = useState<Repository[]>([])

    useEffect(() => {
        const data = localStorage.getItem("@repositories")

        if(data){
            setRepositories(JSON.parse(data))
        }
    },[])

    useEffect(() => {
        saveRepositoriesLocal()
    },[repositories])

    function saveRepositoriesLocal(){ 
        localStorage.setItem("@repositories", JSON.stringify(repositories))
    }

    async function handleAddRepo(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if(!repo){
            return setError("Digite o autor/nome do repositório")
        }
        
        try {
            
        const { data } = await api.get(`repos/${repo}`)
        setRepositories([...repositories, data])
        setRepo('')
        setError('')

        } catch (error) {
            setError("Repositorório não encontrado")    
        }
    }

    return (
        <>
            <img src={logoImg} alt="Logo" />
            <Title>Explore repositórios no Github</Title>

            <Form onSubmit={handleAddRepo} hasError={!!error}>
                <input type="text" value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="Digite aqui o nome do repositório" />
                <button>Pesquisar</button>
            </Form>

            {error && <Error>{error}</Error>}

            <Repositories>
                {repositories.map(repository => (
                    <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
                        <img
                            src={repository.owner.avatar_url} 
                            alt={repository.owner.login} />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repositories>
        </>
    );
}

export default Daskboard;