import React, { useState } from "react";

export default function UploadForm() {
    const [result, setResult] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const res = await fetch("http://localhost:8000/screen", {
            method: "POST",
            body: formData,
        });

        const data = await res.json(); // ✅ FIXED

        setResult(data); // store backend result
    }

    return ( <
        div >
        <
        form onSubmit = { handleSubmit } >
        <
        textarea name = "job_description"
        placeholder = "Enter job description"
        required >
        <
        /textarea> <
        br / >

        <
        input type = "file"
        name = "resume"
        required / >
        <
        br / >

        <
        button type = "submit" > Analyze Resume < /button> < /
        form >

        {
            result && ( <
                div style = {
                    {
                        marginTop: "20px",
                        padding: "20px",
                        border: "1px solid #402a2aff",
                        borderRadius: "8px",
                        background: "#d8a8a8ff"
                    }
                } >
                <
                h2 > Analysis Result < /h2>

                <
                p > < b > Score: < /b> {result.score}</p >
                <
                p > < b > Skills Found: < /b> {result.skills_found?.join(", ")}</p >
                <
                p > < b > Experience: < /b> {result.experience_years} years</p >

                <
                h3 > Resume Preview: < /h3> <
                pre style = {
                    { whiteSpace: "pre-wrap" }
                } > { result.preview } <
                /pre> < /
                div >
            )
        } <
        /div>
    );
}