import React from "react";

// export default function ImgOutline({ user }) {
const Korisnik = (user) => {
  return (
    <li className="person">
      <div className="person__active" style={{ borderColor: user.color }}>
        {/* <img
            className="person__image"
            src="https://placeimg.com/40/40/people"
          ></img> */}
        <p className="person__info" style={{ color: user.color }}>
          {user.name}
        </p>
      </div>
    </li>
  );
};
export default Korisnik;
