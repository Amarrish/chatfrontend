// const handleRegister = async(e)=>{
//     e.preventDefault()
//     const {username,email,password} = userData
//     if(!username || !email || !password){
//         toast("Please fill the form completely")
//     }else{
//         // api call
//         const res = await registerAPI(userData)
//         console.log(res);
//         if(res.status===200){
//             console.log(res.data);
//             toast(`${res.data.username} has successfully registered...`)
//             // reset state
//             setUserData({
//                 username:"",email:"",password:""
//             })
//             navigate('/login')
//         }else{
//             toast(res.response.data)
//         }
//     }
// }