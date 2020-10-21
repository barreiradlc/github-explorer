import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

interface RepositoryData {
  name: string;
  description: string;
  stargazers_count: string;
  open_issues: string;
  forks: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

interface IssueInterface {
  title: string;
  body: string;
  html_url: string;
  user:{
    login: string;
  }
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  
  const [ issues, setIssues ] = useState<IssueInterface[]>([])
  const [ value, setValue ] = useState<RepositoryData>()

  useEffect(() => {
    getIssues()
  },[params.repository])
  
  async function getIssues(){
    
    console.log(params)

   const { data:repositoryData } = await api.get(`repos/${params.repository}`)
   const { data } = await api.get(`repos/${params.repository}/issues`)
   
    console.log(data)
    console.log(repositoryData)

   setIssues(data)
   setValue(repositoryData)
  }

  console.log(value)

  if(!value) return null ;

  return (
    <>
      <Header>
        <img src={logoImg} alt="GitHub Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img
            src={value.owner.avatar_url}
            alt={value.owner.login}
          />
          <div>
            <strong>{value.name}</strong>
            <p>{value.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{value.stargazers_count}</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>{value.forks}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>{value.open_issues}</strong>
            <span>Issues</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>

        {issues.map(( issue ) => 
          <a key={issue.html_url} href={issue.html_url} target="_blank">
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        )}
        
      </Issues>
    </>
  );
};

export default Repository;