import React, {useContext} from "react";
import {ListContext} from "./list.context";

export const FilterInput: React.FC = () => {
    const {filter, setFilter} = useContext(ListContext);
    return (
        <div>
            <input value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
    );
}