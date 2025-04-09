import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import man from "../assets/image/man.png"

export const MessageContext = createContext(null)

const Root = () => {
    const navigate = useNavigate()
    const [logoutbtn, setLogoutbtn] = useState(true)
    const [mobnav, setMobnav] = useState(false)
    const [msg, setMsg] = useState("")
    const [err, setErr] = useState("")
    let [clashide, setClashide] = useState("hidden")
    let path = () => {
        let x = window.location.pathname
        let c = ""
        if (x.indexOf("edit") > -1) {
            c = "products / edit"
        }
        else {
            c = x.substring(11).replace("/", " / ")
        }
        return c
    }

    const poplog = (x) => {

        if (x == true) {
            setClashide("hidden")
            setLogoutbtn(true)
        }
        else {
            setClashide("")
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("token") || localStorage.getItem("token") == undefined) {
            navigate("/dashboard")
        }
    }, [])

    const logOut = () => {
        setLogoutbtn(false)
        axios.post("https://vica.website/api/logout", {}, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(r => {
                poplog(true)
                localStorage.removeItem("token")
                localStorage.removeItem("name")
                localStorage.removeItem("urlimg")
                navigate("/dashboard")
            }
            )
            .catch(err => {
                setLogoutbtn(true)
                setErr(err.message)
                setTimeout(stop, 4000)
            })
    }
    function stop() {
        setErr("")
        setMsg("")
    }

    return (
        <MessageContext.Provider value={{ setMsg, setErr }}>
            <div className="relative font-NunitoSans text-praim1">
                <div className={(mobnav ? "max-tab-min:flex" : "max-tab-min:hidden") + " side-nav"}>
                    <ul className="w-full text-center">
                        <li className="m-0 p-0 h-auto">
                            <h1 className="mb-[50px] text-[20px] text-black font-extrabold"><div className="inline text-praim3">Dash</div>Stack</h1>
                        </li>
                        <li className="mb-[20px]">
                            <NavLink className={({ isActive }) => isActive ? "active *:last:block navitem" : " "} to="/dashboard/home">
                                <i className="fa-solid fa-gauge-high"></i>
                                <span className="ml-[9px]">Dashboard</span>
                                <span className="hidden absolute h-full w-[8px] top-0 left-0 rounded-r-[6px] bg-praim3 max-tab-min:w-0"></span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => isActive ? "active *:last:block navitem" : " "} to="/dashboard/products">
                                <i className="fa-solid fa-border-all"></i>
                                <span className="ml-[9px]">Products</span>
                                <span className="hidden absolute h-full w-[8px] top-0 left-0 rounded-r-[6px] bg-praim3 max-tab-min:w-0"></span>
                            </NavLink>
                        </li>
                    </ul>
                    <h4 className="hidden justify-end items-center gap-1 max-mob:flex">
                            <img className="size-[40px] rounded-full" src={localStorage.getItem('urlimg') ? localStorage.getItem('urlimg') : man} alt="" />
                            <div>
                                <div className="text-praim6 text-[14px] font-bold">{localStorage.getItem("name") ? localStorage.getItem("name") : "Moni Roy"}</div>
                                <div className="text-praim7 text-[12px]">admin</div>
                            </div>
                        </h4>
                    <button className="cursor-pointer" onClick={() => poplog(false)}>
                        <span className="mr-[9px]">
                            <i className="fa-solid fa-power-off"></i>
                        </span>
                        Log Out
                    </button>
                </div>
                <section className="absolute top-0 left-[24%] min-h-screen w-[76%] bg-praim8 max-tab-min:w-full max-tab-min:left-0">
                    <nav className="flex justify-between items-center bg-white p-[32px] pt-1 pb-1 text-[16px] font-semibold max-mob:pl-3 max-mob:pr-3">
                        <h4 className="text-black capitalize">{path()}</h4>
                        <h4 className="flex justify-end items-center gap-[16px] max-mob:hidden">
                            <img className="size-[40px] rounded-full" src={localStorage.getItem('urlimg') ? localStorage.getItem('urlimg') : man} alt="" />
                            <div>
                                <div className="text-praim6 text-[14px] font-bold">{localStorage.getItem("name") ? localStorage.getItem("name") : "Moni Roy"}</div>
                                <div className="text-praim7 text-[12px]">admin</div>
                            </div>
                        </h4>
                        <button onClick={() => setMobnav(!mobnav)} className="hidden max-tab-min:block" type="button">
                            <span className={!mobnav ? "block" : "hidden"}>
                                <i className="fa-solid fa-bars"></i>
                            </span>
                            <span className={mobnav ? "block" : "hidden"}>
                                <i className="fa-solid fa-times"></i>
                            </span>
                        </button>
                    </nav>
                    <div className="p-[32px] pt-[36px] pb-[24px] w-full  max-mob:pl-3 max-mob:pr-3">
                        <Outlet />
                    </div>
                    <div className={clashide + " h-screen w-screen fixed top-0 left-0 z-50 bg-black-opc text-center"}>
                        <div className="rounded-[20px] absolute top-[50%] left-[50%] translate-[-50%] bg-white w-[677px] h-[321px] max-tab-min:w-[450px] max-mob:min-w-[280px] max-mob:w-[95%]">
                            <h5 className="mt-[93px] mb-[53px] text-[24px] font-semibold">Are You Sure You Want To Logout?</h5>
                            <div className="flex justify-center gap-[26px]">
                                <button className={(logoutbtn ? "cursor-pointer" : "cursor-not-allowed") + " active w-[140px] h-[50px] rounded-[4px] max-mob:w-[100px]"} type="button" onClick={logOut}  disabled={!logoutbtn ? "disabled" : ""}>
                                    <span className={logoutbtn ? "block" : "hidden"}>Yes</span>
                                    <span className={!logoutbtn ? "block" : "hidden"}>
                                        Logout  <i className="fas fa-spinner fa-pulse"></i>
                                    </span>
                                </button>
                                <button className="w-[140px] h-[50px] rounded-[4px] text-white bg-praim9 cursor-pointer max-mob:w-[100px]" type="button" onClick={() => poplog(true)}>No</button>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="fixed top-6 left-[50%] translate-x-[-50%] w-fit font-black *:p-4 *:pt-2 *:pb-2 *:rounded-2xl">
                    <div className={msg != "" ? "block bg-green-200 text-green-950" : "hidden"}>{msg}</div>
                    <div className={err != "" ? "block bg-red-200 text-red-950" : "hidden"}>{err}</div>
                </div>
            </div>
        </MessageContext.Provider>
    )
}

export default Root
