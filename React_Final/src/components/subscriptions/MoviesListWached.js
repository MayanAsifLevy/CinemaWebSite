import { useState } from "react";
import AddSub from "./AddSub"
import { Link  } from "react-router-dom";
import {useSelector } from "react-redux";

const MoviesListWached = (item)=>
{
    const [isOpenNew, setIsOpenNew]= useState(false)
    
    const signed_user= useSelector((state) => state.users.SignedUser);


    const ButtonHandler = ()=>{
       setIsOpenNew(!isOpenNew)

    }
    
    return (
        <div className="movieWatched">
            <h3 className= "movieWatched_title" >Movies Watched</h3>
          {   (('Admin') in signed_user["permissions"] || ('Create Subscriptions') in signed_user["permissions"]) ?<input type="button" value="subscribe to new movie" onClick={ButtonHandler}/>: ''}
            <br/><br/>
            { isOpenNew && <AddSub toComp={item} /> }

            <br/>
            <ul>
             { item.toCompWatched.length>0?
             item.toCompWatched.map((movie)=>{
                   
                    return <li key={movie.movie_id} > <Link  to= "../../movies" state= {{ movieName: movie.name }} > {movie.name}</Link> , {movie.date} </li>
                    })
                    :''
                }

                 

            </ul>
        </div>
    )
}

export default MoviesListWached