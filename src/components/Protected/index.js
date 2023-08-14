import React,{ useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const { component:Components } = props;
    const navigate = useNavigate();
    useEffect(()=> {
        let login = localStorage.getItem("googleIdToken") ;
        if(!login) {
            navigate('/signin');
        }
    },[navigate])
  return (
    <div>
      <Components />
    </div>
  )
}

export default Protected