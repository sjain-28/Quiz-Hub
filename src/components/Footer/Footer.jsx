import React from 'react';

const Footer = () => {
  return (
      <div
          style={{
              textAlign: "center",
              marginBottom: 10,
          }}
      >
          Made with ♥ by{" "}
          <a
              href="#"
              style={{ cursor: "pointer" ,color:"blueviolet",fontWeight:"500"}}
          >
              Shubham Jain
          </a>
      </div>
  );
}

export default Footer;
