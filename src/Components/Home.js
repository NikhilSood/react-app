import React, { useEffect, useState } from 'react'
import axios from 'axios';
import News from './News';
import './Home.css';

const Home = ({ user, setUser, token }) => {
  const localUser = localStorage.getItem("user")
  const [allUsers, setAllUsers] = useState([])

  const [articles, setArticles] = useState([]);

  const [search, setSearch] = useState('');

  // if (localUser) {
  //   setUser(localUser)
  // }

  // useEffect(() => {
  //   const fetchAllUsers = async () => {
  //     const response = await fetch('http://localhost:4000/api/user/all', {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     })
  //     const json = await response.json()

  //     if (!response.ok) {
  //       alert("could not fetch all users")
  //       return
  //     }
  //     console.log("All users:", json)
  //     setAllUsers(json)
  //   }

  //   if (localUser) {
  //     fetchAllUsers()
  //   }
  // }, [])


  useEffect(() => {
    fetchArticles();
  }, [])

  const fetchArticles = async () => {
    const response = await axios.get(
      "http://localhost:4000/api/news"
    );
    setArticles(response.data.response);
    // console.log(response);
    // console.log(response.data.response.articles);
    // console.log(typeof response.data.response)
  };

  const clickHandler = () => {
    // const ans = articles.filter((item) => {
    //   item.title.includes(search)
    // })

    console.log("search", search)
    setArticles(prev => prev.filter((item) => (
       item.title.toLowerCase().includes(search)
    )
    ));
  }


  console.log(articles)

  return (

    // <div className='homepage'>
    //   {user && <h1>Welcome {user}</h1>}
    //   {!user && <p>Login First</p>}
    //   {allUsers.map(({ _id, username, email, company }) => {
    //     return (
    //       <div key={_id} className="account home">
    //         <div className="user_card">
    //           <div className="username">
    //             <h1>{username}</h1>
    //             <i title="edit" class="fa-solid fa-pen-to-square"></i>
    //           </div>
    //           <div className="email">
    //             <span>{email}</span>
    //             <i class="fa-solid fa-pen-to-square"></i>
    //           </div>
    //           <div className="email">
    //             <span>{company}</span>
    //             <i class="fa-solid fa-pen-to-square"></i>
    //           </div>
    //         </div>
    //       </div>
    //     )
    //   })}
    // </div>

    <div className="maindiv">

      <input value={search} type="text" onChange={(e) => { setSearch(e.target.value) }} /><button onClick={clickHandler}>Search</button>
      <h1>Latest News</h1>

      <div className='main'>
        {articles?.map((article) => (


          <div key={article._id} className='article-div' >
            <img src={article.urlToImage} alt={article.title} height="300px" width="300px" />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url}>Read More</a>
          </div>




        ))
        }
      </div>
    </div >
  )
}

export default Home