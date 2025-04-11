import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import bg from "../assets/image/bg.png"

const SignIn = () => {
  const [signinbtn, setSigninbtn] = useState(true)
  const [email, setEmail] = useState('')
  const [Pass, setPass] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("token") != undefined) {
      navigate("/dashboard/products")
    }
  }, [])

  const sData = (e) => {
    setSigninbtn(false)
    e.preventDefault()
    const data = {
      email,
      password: Pass
    }

    axios.post("https://vica.website/api/login", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(r => {
        localStorage.setItem("token", r.data.token)
        localStorage.setItem("name", r.data.user.first_name + " " + r.data.user.last_name)
        localStorage.setItem("urlimg", r.data.user.profile_image_url)
        navigate("/dashboard/products")
      }
      )
      .catch(err => {
        setSigninbtn(true)
        console.log(err)
      })
  }
  return (
    <div className="bg1">
      <div className="bg-praim3 size-full fixed"></div>
      <img className="size-full fixed" src={bg} alt="" />
      <div className="bg2 h-[95%] [@media(min-height:790px)]:max-h-[-webkit-fill-available]">
        <h1 className="text-[32px] font-bold">Sign In</h1>
        <p className="mb-[35px] [@media(max-height:476px)]:mb-2">Please enter your email and password to continue</p>
        <form className="flex flex-col justify-between gap-1 h-[74%] max-w-[433px] max-mob:h-[70%] [@media(max-height:476px)]:h-fit [@media(max-height:480px)]:flex-row [@media(max-height:476px)]:items-center" onSubmit={sData}>
          <div className="text-left">
            <label className="block" htmlFor="email">Email</label>
            <input
              className="input"
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block" htmlFor="pass">Password</label>
            <input
              className="input"
              type="password"
              id="pass"
              placeholder="********"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <div>
            <div>
              <input
                className={signinbtn ? "block btn input active" : "hidden"}
                type="submit"
                value="Sign In"
              />
              <span className={!signinbtn ? "block" : "hidden"}>
                Loading  <i className="fas fa-spinner fa-pulse"></i>
              </span>
            </div>
            <div>
              <p className="inline">Don't have an account? </p>
              <Link className="inline text-praim3 underline" to="/dashboard/signup">Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
