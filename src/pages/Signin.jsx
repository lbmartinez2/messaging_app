import React from 'react'

function Signin() {

    async function signInData() {
        try {
          const data = await fetch("http://206.189.91.54/api/v1/auth", {
            method: "POST",
            body: JSON.stringify({
              email: "lj2@mail.com",
              password: "testpass",
              password_confirmation: "testpass",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const response = await data.json();
          console.log(response);
          if (response.errors) {
            throw response.errors.full_messages[0];
          }
        } catch (err){
          console.error(err);
        }
      }
      
  return (
    <div>Signin</div>
  )
}

export default Signin