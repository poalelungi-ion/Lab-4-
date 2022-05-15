import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {postLogin} from "../../helpers/postLogin";
import {headers} from "../../helpers/headers";

export default function LoginComponent () {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
    } = useForm({
        mode: "all"
    })
    let navigate = useNavigate();
    const onSubmit = (data) => {
        const axios = require('axios').default
        axios.post(postLogin, {
            data: {
                name: data.firstName,
                surname: data.surname
            }
        }, headers )
            .then((response) => {
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('isLogged', 'true');
            }).catch((err) => {
            console.log(err);
        })
        navigate("/quizzes");
    }
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder="Enter full name"
                    {...register('firstName', {
                        required: "This field is required",
                        minLength: {
                            value: 5,
                            message: "Your full name should have at least 5 symbols"
                        },
                        maxLength: {
                            value: 100,
                            message: "Your full name should have no more then 100 symbols"
                        }
                    })}
                />
                <div style={{height: 40}}>
                    {errors?.firstName && <p>{errors?.firstName?.message || "Error"}</p>}
                </div>
                <input
                    placeholder="Enter surname"
                    {...register('surname', {
                        required: "This field is required",
                        minLength: {
                            value: 5,
                            message: "Your surname should have at least 5 symbols"
                        },
                        maxLength: {
                        value: 100,
                        message: "Your surname should have no more then 100 symbols"
                    }
                    })}
                />
                <div style={{height: 40}}>
                    {errors?.surname && <p>{errors?.surname?.message || "Error"}</p>}
                </div>
                <input type="submit" disabled={!isValid}/>
            </form>
        </div>
    )
}