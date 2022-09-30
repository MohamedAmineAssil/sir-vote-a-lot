import React from 'react';

interface IProps{
    onChange:(event:React.ChangeEvent<HTMLSelectElement>) => void,
}

function DropDown({onChange}:IProps) {
  return (
    <select onChange={onChange}>
        <option value="Owner">Owner</option>
        <option value="User">User</option>
        <option value="Respondent">Respondent</option>
    </select>
  )
}

export default DropDown;