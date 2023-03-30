import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [usermail, setUsermail] = useState("");
  //   const clientId = process.env.GITHUB_CLIENT_ID;
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form
        className="flex flex-col gap-2 justify-center items-center m-5"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="bg-slate-200 text-black p-2 rounded-md"
        />
        <input
          type="email"
          name="usermail"
          placeholder="usermail"
          value={usermail}
          onChange={(e) => {
            setUsermail(e.target.value);
          }}
          className="bg-slate-200 text-black p-2 rounded-md"
        />
        <button type="submit">Log in</button>
        <p>
          <a
            className="bg-violet-800 text-white rounded-md p-2"
            href="http://localhost:3000/auth/github"
          >
            Login with Github
          </a>
        </p>
      </form>
    </div>
  );
}
