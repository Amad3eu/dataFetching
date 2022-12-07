import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Repository } from "./Repos";


export function Repo() {
  const params = useParams();
  const currentRepository = params["*"] as string;

  const queryClient = useQueryClient();

  async function handleChangeRepoDescription() {
    // caso fosse em produção: chamada API para atualizar a descrição do repositorio

    const  previousRepos = queryClient.getQueryData<Repository[]>('repos')

   if (previousRepos) {
            const nextRepos = previousRepos.map(repo => {
                if (repo.full_name === currentRepository) {
                    return {...repo, description: 'Teu pai'}
                } else {
                    return repo;
                }
            })

            queryClient.setQueryData('repos', nextRepos)
        }
    }


  return (
    <div>
      <h1>{currentRepository}</h1>
      <button onClick={handleChangeRepoDescription}>Alterar Descrição</button>
    </div>
  );
}
