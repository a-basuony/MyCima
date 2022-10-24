import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {


    const [errorList, setErrorList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let [error , setError] = useState('');
    let navigate = useNavigate()


    let [User , setUser] = useState({
    
        email: '',
        password: ''
    })

    function getUser(e){
        
        let myUser = {...User}; //copy 
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
        

    }
    async function submitLoginForm (e){

        e.preventDefault();
        setIsLoading(true)
        let validationResult = validateLoginForm ()
        if(validationResult.error){
            setErrorList(validationResult.error.details);
            setIsLoading(false);
        }else{
            let {data} = await Axios.post('https://route-egypt-api.herokuapp.com/signin', User);
            setIsLoading(false);
            if(data.message ==='success'){
                localStorage.setItem('userToken', data.token);
                props.saveUserData();
                navigate('./home')
                //home sign in
                setIsLoading(false);
            }else{
                setError(data.message) 
                setIsLoading(false);
            }

        }

    }
    useEffect(()=>{
        if(localStorage.getItem('userToken')){
            navigate('/home');
        }
    },[])

    function validateLoginForm (){
        let scheme =Joi.object({
            email: Joi.string().email({minDomainSegments:2, tlds:{allow:['com','net']}}).required(),
            password: Joi.string().pattern(new RegExp ('[a-zA-Z0-9]{3,30}$')).required(),
        })
        return scheme.validate(User, {abortEarly:false});
    }

    return (
        <div className='w-75 mx-auto'>

            <h2> Login Now</h2>
            {error?<div className='alert alert-danger'> {error}</div> : ''}
            {errorList.map((error, i)=> i === 1 ? <div className='alert alert-danger'>Password invalid</div>:<div className='alert alert-danger'>{error.message}</div>)}

            <form onSubmit={submitLoginForm}>

                

                <label htmlFor='email'>email :</label>
                <input onChange={getUser} type='email' id='email' className='form-control mb-2' name='email'/>

                <label  htmlFor='password'>password :</label>
                <input onChange={getUser}  type='password' id='password' className='form-control mb-2' name='password'/>


                <button type='submit' className='btn btn-outline-info py-2 '>
                    {isLoading === true ? <i class="fa fa-spin fa-2x fa-spinner"></i> :" Login" }</button>
            </form>
        </div>
    );
}

export default Login;
