import { use, useState, type ChangeEvent, type ChangeEventHandler } from "react";
import { Link } from "react-router-dom";

export const Auth = ({type}:{type:"signup"|"signin"}) => {

    const [postInput,setpostInput]=useState({
        name: "",
        username: "",
        password: "",
    })
    return (
        <div className="h-screen flex justify-center flex-col">
<div className="flex justify-center">

    <div>
        <div className="p-8">
                <div className="text-3xl font-extrabold" >
                    Create an account
                </div>
                <div className="text-slate-500">
                   {type==="signin" ? "Don't have an account?" : "Already have an account?"}
                    <Link to={type==="signin" ? "/signup" : "/signin"} className="pl-2 underline hover:text-blue-700">
                    {type==="signin" ? "Sign up" : "Sign in"}
                    </Link>
                </div>
                </div>
                

{type==="signup" && (
        <LabelledInput label="Name" placeholder="Enter your name" onChange={(e)=> {
            setpostInput({
                ...postInput,
                name: e.target.value
            })
        }} />)}

        <LabelledInput label="Username" placeholder="Enter your username" onChange={(e)=> {
            setpostInput({
                ...postInput,
                username: e.target.value
            })
        }} />

        <LabelledInput label="Password" type="password" placeholder="Enter your password" onChange={(e)=> {
            setpostInput({
                ...postInput,
                password: e.target.value
            })
        }} />

        <button type="button" className=" mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signin" ? "Sign in" : "Sign up"}</button>
        </div>
        </div>
        </div>
    );
}

interface LabelledInputProps {
    label: string;
    placeholder: string;
    onChange:(e:ChangeEvent<HTMLInputElement>) => void;
    type?: string; // Optional, can be used to specify input type like "text", "password", etc
}
function LabelledInput({label, placeholder, onChange ,type}: LabelledInputProps) {
    return(
<div className="">

     <label className="block mb-2 text-sm  text-gray-900 font-semibold pt-4">{label}</label>
            <input onChange={onChange} type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />


</div>
    );
}