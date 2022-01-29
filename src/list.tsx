import React, {useState} from 'react';
import {Link, generatePath} from 'react-router-dom';
import {FilterInput} from './filter';
import {ListContext, MemberEntity} from './list.context';

const sanitizeResponse = async (response: Response): Promise<unknown> | never => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(await response.text());
    }
};

const pageSize = 10;

const retrieveData = (filter: string,
                      page: number,
                      setMembers: (newValue: MemberEntity[]) => void,
                      members: MemberEntity[],
                      setDisabled: (value: (((prevState: boolean) => boolean) | boolean)) => void,
                      setPage: (newValue: number) => void) =>
    fetch(`https://api.github.com/orgs/${filter}/members?per_page=${pageSize + 1}&page=${page}`)
        .then(sanitizeResponse)
        .then((json: MemberEntity[]) => {
            if (!json.length || json.length <= pageSize) {
                setDisabled(true);
            }
            setMembers([...members, ...json.slice(0, Math.min(json.length, pageSize))]);
            setPage(page);
        })
        .catch(reason => {
            console.error(reason);
            setMembers([]);
            setPage(1);
        });

export const ListPage: React.FC = () => {
    const {filter, members, setMembers, page, setPage} = React.useContext(ListContext);
    const [disabled, setDisabled] = useState(false);
    const [isMount, setIsMount] = useState(false);

    React.useEffect(() => {
        if (!isMount && members.length) {
            return;
        }

        setDisabled(false);
        const timeout = setTimeout(() => retrieveData(filter, page, setMembers, [], setDisabled, setPage), 500);
        return () => clearTimeout(timeout);
    }, [filter]);

    React.useEffect(() => setIsMount(true), []);

    return (
        <>
            <h2>Hello from List page</h2>
            <FilterInput/>
            <table className="table">
                <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Id</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {members.map((member) => (
                    <tr key={member.id}>
                        <td>
                            <img alt="" src={member.avatar_url} style={{width: '5rem'}}/>
                        </td>
                        <td>
                            <span>{member.id}</span>
                        </td>
                        <td>
                            <Link to={generatePath('/detail/:id', {id: member.login})}>
                                {member.login}
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button disabled={disabled}
                    onClick={() => retrieveData(filter, page + 1, setMembers, members, setDisabled, setPage)}
            >
                Show more
            </button>
        </>
    );
};
