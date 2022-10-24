import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

const Register = () => {


    const [errorList, setErrorList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let [error , setError] = useState('');
    let navigate = useNavigate()


    let [User , setUser] = useState({
    
        first_name: '',
        last_name: '',
        age: 0,
        email: '',
        password: ''
    })

    function getUser(e){
        
        let myUser = {...User}; //copy 
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
        

    }
    async function submitRegisterForm (e){

        e.preventDefault();
        setIsLoading(true)
        let validationResult = validateRegisterForm ()
        if(validationResult.error){
            setErrorList(validationResult.error.details);
            setIsLoading(false);
        }else{
            let {data} = await Axios.post('https://route-egypt-api.herokuapp.com/signup', User);
            setIsLoading(false);
            if(data.message ==='success'){
                navigate('./login')
                //home sign in
                setIsLoading(false);
            }else{
                setError(data.message) 
                setIsLoading(false);
            }

        }

    }

    function validateRegisterForm (){
        let scheme =Joi.object({
            first_name:Joi.string().alphanum().min(3).max(10).required(),
            last_name: Joi.string().alphanum().min(3).max(10).required(),
            age: Joi.number().min(17).max(85).required(),
            email: Joi.string().email({minDomainSegments:2, tlds:{allow:['com','net']}}).required(),
            password: Joi.string().pattern(new RegExp ('[a-zA-Z0-9]{3,30}$')).required(),
        })
        return scheme.validate(User, {abortEarly:false});
    }

    return (
        <div className='w-75 mx-auto'>

            <h2> Register Now</h2>
            {error?<div className='alert alert-danger'> {error}</div> : ''}
            {errorList.map((error, i)=> i === 4 ? <div className='alert alert-danger'>Password invalid</div>:<div className='alert alert-danger'>{error.message}</div>)}
           
            <form onSubmit={submitRegisterForm}>

                <label htmlFor='first_name'>first_name :</label>
                <input onChange={getUser} id='first_name' className='form-control mb-2' name='first_name'/>
                
                <label htmlFor='last_name'>last_name :</label>
                <input onChange={getUser} id='last_name' className='form-control mb-2' name='last_name'/>

                <label htmlFor='age'>age :</label>
                <input onChange={getUser} type='number' id='age' className='form-control mb-2' name='age'/>

                <label htmlFor='email'>email :</label>
                <input onChange={getUser} type='email' id='email' className='form-control mb-2' name='email'/>

                <label htmlFor='password'>password :</label>
                <input onChange={getUser}  type='number' id='password' className='form-control mb-2' name='password'/>


                <button type='submit' className='btn btn-outline-info py-2 '>
                    {isLoading === true ? <i class="fa fa-spin fa-2x fa-spinner"></i> :" Register" }</button>
            </form>
        </div>
    );
}

export default Register;
