import React, { useState, useEffect}  from 'react';
import logo from './logo.svg';
import './App.css';
import { IUser, IRepo } from './react-app-env'
import axios from 'axios'
import openNewAuthWindow from './openWindow'
import RepoDetail from './RepoDetail'
// Functional components are type React.FC
const App: React.FC = () => {
  //useState is used as a generic, put the type in the brackets.
  const [user, setUser] = useState<IUser>({} as IUser)
  const [repos, setRepos] = useState<IRepo[]>([])
  const [repoId, setRepoID] = useState<number>(0)

    useEffect( () => {
      console.log('Firing data fetch')
      if ( Object.keys(user).length) {
        axios.get(`/api/${user.githubId}/repos`)
          .then((response) => {
            setRepos(response.data)
          })
      }
    },[user])
    
    function handleLogin(e: React.MouseEvent): void {
      e.preventDefault()
      var message: Promise<IUser> = openNewAuthWindow('/auth/github')
      message.then( ghUser => {
        setUser( ghUser )
      }).catch( err => console.log(err))


}

  const userData = Object.keys(user).length === 0 ? <p>No user</p> : <p>{user.githubId}</p>
  const repoData = repos.map((repo, id) => (
  
  <p onClick={ () => setRepoID(id) } key={id}>{repo.name}</p>))

  let repoDetail: IRepo;
  if(repos.length) {
    repoDetail = repos[repoId]
  }else {
    repoDetail = {} as IRepo
  }


  return (
    <div className="App">
      <a href="/auth/github" onClick={handleLogin}>Login to Github</a>
      {userData}
      {repoData}

      <RepoDetail repo={repoDetail} />
    </div>
  );
}

export default App;
