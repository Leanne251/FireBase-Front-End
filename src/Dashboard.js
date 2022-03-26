import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import AddAHoliday from './AddAHoliday/AddAHoliday'
import HolidayDestinations from "./HolidayDestinations/HolidaysDestinations"
// import { getAuth } from 'firebase/auth'


function Dashboard() {


  const [user, loading, error] = useAuthState(auth);
  console.log("user from useAuth", user)
  const [name, setName] = useState("");
  // console.log("name", name)
  const [ destinations, setDestinations ] = useState([]);
	console.log(destinations, 'detinations');

  
  
  const navigate = useNavigate();


  // getting user name from firebase using a query search
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);


  async function getHolidays() {

    let authToken = user.accessToken
    console.log("authToken", authToken)
		const response = await fetch(`http://localhost:8000/holidays/`, {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				 Authorization: 'Bearer ' + authToken,
        'Access-Control-Allow-Origin': 'http://localhost:8000/holidays/'
			},
		
		})
   

//     const data = await response.json()
//     console.log('fetched data', data)
//     if (data.payload) {
//         setTodos(data.payload)
//         return data
//     }
// }
// const data = fetchData()
// return data
// }, [user]

    
    const data = await response.json();
    console.log("data", data.payload);

    if (data.payload) {
      let fetchedDestinations = data.payload.map((element) => element.destination);
      setDestinations(fetchedDestinations) 
    }

	}

	async function clearDestination(index) {
		setDestinations([ ...destinations.slice(0, index), ...destinations.slice(index + 1) ]);
		console.log('index', index);
	}

  return (
    <div className="dashboard">
       <div className="dashboard__container">
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
         <br/>
         <AddAHoliday user={user} />
        
         </div>
         <div>

         
			<p>Get The Holidays<br/></p>
			<button onClick={getHolidays}> Search</button></div>
      <div>

     
			{destinations.map((destination, index) => (
				<HolidayDestinations value={destination} key={index} onClick={() => clearDestination(index)} />
			))} </div>
	
		
	
       
     </div>
  );
}
export default Dashboard;