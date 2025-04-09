import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import uploadimg from "../assets/image/upload.png"
import axios from "axios"

const SignUp = () => {
  const [signupbtn, setSignupbtn] = useState(true)
  const [fName, setFname] = useState('')
  const [lName, setLname] = useState('')
  const [uName, setUname] = useState('')
  const [email, setEmail] = useState('')
  const [Pass, setPass] = useState('')
  const [conPass, setConPass] = useState('')
  const [proImg, setProImg] = useState('')
  const navigate = useNavigate()
  const [imgName, setImgName] = useState('')

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("token") != undefined) {
      navigate("/dashboard/products")
    }
  }, [])

  const sData = (e) => {
    setSignupbtn(false)
    e.preventDefault()

    const data = {
      first_name: fName,
      last_name: lName,
      user_name: uName,
      email: email,
      password: Pass,
      password_confirmation: conPass,
      profile_image: proImg
    }

    axios.post("https://vica.website/api/register", data
      , {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      })
      .then(r => {
        console.log(r.data.data.token)
        localStorage.setItem("token", r.data.data.token)
        localStorage.setItem("name", r.data.data.user.first_name + " " + r.data.data.user.last_name)
        localStorage.setItem("urlimg", r.data.data.user.profile_image_url)
        navigate("/dashboard/products")
      }
      )
      .catch(err => {
        setSignupbtn(true)
        console.log(err)
      })
  }
  return (
    <div className="bg1 [@media(max-height:476px)]:h-auto">
      <div className="bg2 h-[99.5%] [@media(max-height:476px)]:static [@media(max-height:476px)]:transform-none [@media(max-height:476px)]:ml-auto [@media(max-height:476px)]:mr-auto">
        <h1 className="text-[32px] font-bold">Sign Up</h1>
        <p className="mb-3">Create a account to continue</p>
        <form className="text-left max-w-[433px] **:[&_input]:mb-2" onSubmit={sData}>
          <div className="flex gap-[18px]">
            <div>
              <label className="block" htmlFor="fName">First Name </label>
              <input
                className="input"
                type="text"
                id="fName"
                placeholder="First Name "
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div>
              <label className="block" htmlFor="lName">Last Name </label>
              <input
                className="input"
                type="text"
                id="lName"
                placeholder="Last Name"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-[18px]">
            <div>
              <label className="block" htmlFor="uName">User Name</label>
              <input
                className="input"
                type="text"
                id="uName"
                placeholder="User Name"
                onChange={(e) => setUname(e.target.value)}
              />
            </div>
            <div>
              <label className="block" htmlFor="email">Email</label>
              <input
                className="input"
                type="email"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-[18px]">
            <div>
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
              <label className="block" htmlFor="conPass">Confirm </label>
              <input
                className="input"
                type="password"
                id="conPass"
                placeholder="********"
                onChange={(e) => setConPass(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="proImg">
              <p className="block">Profile Image</p>
              <img
                className="inline-block size-[100px] p-[30px] mb-[16px] bg-praim4 border border-dashed border-praim3 cursor-pointer"
                src={uploadimg} alt=""
              />
            </label>
            <input
              className="hidden"
              type="file"
              id="proImg"
              accept="image/*"
              onChange={(e) => {
                setProImg(e.target.files[0])
                setImgName(e.target.files[0].name)
              }}
            />
            <span>{imgName}</span>
          </div>
          <div>
              <input
                className={signupbtn ? "block btn input active" : "hidden"}
                type="submit"
                value="Sign Up"
              />
              <span className={!signupbtn ? "block" : "hidden"}>
              Loading  <i className="fas fa-spinner fa-pulse"></i>
              </span>
            </div>
          <div className="text-center">
            <p className="inline">Already have an account? </p>
            <Link className="inline text-praim3 underline" to="/dashboard">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
