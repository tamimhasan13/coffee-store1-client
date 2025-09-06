import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext";

const SingIn = () => {
    const {singInUser} = use(AuthContext)
    const handleSingIn = e =>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)
        singInUser(email,password)
        .then(result =>{
            console.log(result.user)
            const singInIfo ={
              email,
              lastSignInTime:result.user.metadata.lastSignInTime
            }
            fetch('http://localhost:3000/users',{
              method:'PATCH',
              headers:{
                'content-type' : 'application/json'
              },
              body: JSON.stringify(singInIfo)
            })
            .then(res => res.json())
            .then(data =>{
              console.log('after update patch',data)
            })
        })
        .catch(error =>{
            console.log(error)
        })
    }
  return (
    <div className="card bg-base-100 mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSingIn}>
          <h1 className="text-5xl font-bold">Sing In now!</h1>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Sing In</button>
        </form>
      </div>
    </div>
  );
};

export default SingIn;
