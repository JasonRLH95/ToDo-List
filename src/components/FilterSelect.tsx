import React from "react";

interface Props{
    setFilterTerm: React.Dispatch<React.SetStateAction<string>>
}
const FilterSelect : React.FC<Props> = ({setFilterTerm})=>{
    return (
        <select className="filter_select" defaultValue="Order by..." onChange={(e)=>{setFilterTerm(e.target.value)}}>
            <option disabled hidden value="Order by...">Order by...</option>
            <option value="All">All</option>
            <option value="Closed">Closed</option>
            <option value="Open">Open</option>
            <option value="History">History</option>
        </select>
    )
}

export default FilterSelect;