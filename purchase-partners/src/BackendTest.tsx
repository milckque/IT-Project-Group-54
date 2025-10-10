import { useEffect, useState } from "react";
import supabase from "./supabaseClient";

function BackendTest() {
    const [testData, setTestData] = useState<any[]>([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const { data } = await supabase.from("Test").select();
        setTestData(data ?? []);
        console.log(data);
    }

    return (
        <>
            <h1>Backend Test</h1>
            <ul>
                {testData.map((item: any) => (
                    <li key={item.id}>{item.created_at}</li>
                ))}
            </ul>
        </>
    )
}

export default BackendTest;