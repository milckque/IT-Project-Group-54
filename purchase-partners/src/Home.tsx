import { useState } from "react";

function Home() {
    const [a, setA] = useState(1);
    // var a = 1;
    var array = [1, 2, 3, 4];

    function handleClick() {
        setA(a + 1);
    }

    return (
        <div>
            <h1>Home Page</h1>
            <a href="/hello">Go to Hello Page</a>
            <br />
            <a href="/example">Go to Example Page</a>
            <br />
            a = {a}
            <br />
            this is my array:
            <br />
            {array.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
            <button onClick={handleClick}>Click Me</button>
        </div>
    );
}

export default Home;
