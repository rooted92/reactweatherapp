import React, { useState } from "react";

const Dashboard = () => {

    const [objVaue, setObjValue] = useState('');

    const person = {
        name: "Pedro",
        age: 31,
        city: 'Santa Rosa',
        state: 'CA',
        country: 'US'
    }

    const { name, age, city } = person;
    console.log(name, age, city);

    return (
        <>
            <button onClick={() => setObjValue(person.age)} >{objVaue}</button>
        </>
    );
}

export default Dashboard;