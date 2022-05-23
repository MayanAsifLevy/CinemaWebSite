import {Link} from 'react-router-dom'
const Subscriptions =(sub)=>{

    
    return (
        <div>
            <h1>Subscriptions watched</h1>
            <br/>
            <ul>
             { sub.item.length>0?
             sub.item.map((item)=>{
                    
                    return <li key={item.sub_id}><Link to="../../subscriptions/allMembers">{item.member_name}</Link> , {item.watched_date.slice(0,10)} </li>
                    })
                    :''
                }

                 

            </ul>
        </div>
    )
}
export default  Subscriptions;