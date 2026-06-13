import React, { useState } from "react";

export default function UploadForm() {
    const [result, setResult] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const res = await fetch("http://localhost:8000/analyze", {
            method: "POST",
            body: formData,
        });

        setResult(await res.json());
    }

    return ( <
        div >
        <
        form onSubmit = { handleSubmit } >
        <
        textarea name = "job_description"
        placeholder = "Enter job description"
        style = {
            { width: "300px", height: "100px" }
        }
        required >
        <
        /textarea> <
        br / > < br / >
        <
        input type = "file"
        name = "resume"
        required / >
        <
        br / > < br / >
        <
        button type = "submit" > Analyze Resume < /button> < /
        form >

        {
            result && ( <
                div style = {
                    { marginTop: "20px", padding: "10px", border: "1px solid black" }
                } >
                <
                h3 > Score: { result.score } < /h3> <
                p > < b > Skills: < /b> {result.skills_found.join(", ")}</p >
                <
                p > < b > Experience: < /b> {result.experience_years} years</p >
                <
                p > < b > Preview: < /b> {result.preview}</p >
                <
                /div>
            )
        } <
        /div>
    );
}