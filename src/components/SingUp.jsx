import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const SingUp = () => {
  const { createUser } = use(AuthContext);
  console.log(createUser);

  const handleSingUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...restForm } = Object.fromEntries(
      formData.entries()
    );
    
    // const email = formData.get('email');
    // const password = formData.get('password');
    

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        const userProfile = {
        email,
        ...restForm,
        creationTime:result.user?.metadata?.creationTime,
        lastSignInTime:result.user?.metadata?.lastSignInTime,



    }
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSingUp}>
          <h1 className="text-5xl font-bold">Sing Up now!</h1>
          <label className="label">Name</label>
          <input type="text" name="name" className="input" placeholder="Name" />
          <label className="label">Address</label>
          <input
            type="text"
            name="address"
            className="input"
            placeholder="Address"
          />
          <label className="label">Phone</label>
          <input
            type="text"
            name="phone"
            className="input"
            placeholder="Phone"
          />
          <label className="label">Photo</label>
          <input
            type="text"
            name="photo"
            className="input"
            placeholder="Photo"
          />
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
          <button className="btn btn-neutral mt-4">Sing Up</button>
        </form>
      </div>
    </div>
  );
};

export default SingUp;
