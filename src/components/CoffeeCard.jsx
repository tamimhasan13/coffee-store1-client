import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
  const { _id, photo, name, price, supplier } = coffee;
  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      console.log(result.isConfirmed);
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/coffees/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const remainingCofees = coffees.filter(cof => cof._id !== _id);
              setCoffees(remainingCofees)
            }
          });
      }
    });
  };
  return (
    <div className="card card-side bg-base-100 shadow-sm">
      <figure>
        <img src={photo} alt="Movie" />
      </figure>
      <div className="w-full flex justify-around items-center">
        <div className="">
          <h2 className="card-title">Name: {name}</h2>
          <p>Suppler:{supplier}</p>
          <p>Price: {price}</p>
        </div>
        <div className="card-actions ">
          <div className="join join-vertical space-y-4">
            <Link to={`/coffeeDetails/${_id}`}>
              <button className="btn join-item">View</button>
            </Link>
            <Link to={`/updateCoffee/${_id}`}>
              <button className="btn join-item">Edit</button>
            </Link>
            <button onClick={() => handleDelete(_id)} className="btn join-item">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
