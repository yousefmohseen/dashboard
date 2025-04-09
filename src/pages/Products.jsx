import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MessageContext } from "./Root"

const Products = () => {
  const message = useContext(MessageContext)
  const [delbtn, setDelbtn] = useState(true)
  const [product, setProduct] = useState([])
  const [update, setUpdate] = useState(true)
  let [delId, setDelId] = useState()
  let [pophide, setPophide] = useState("hidden")
  let [nofound, setNoFound] = useState("")
  let [loading, setLoading] = useState("")

  const popDel = (x) => {
    if (x == true) {
      setPophide("hidden")
      setDelbtn(true)
    }
    else {
      setPophide("")
    }
  }

  useEffect(() => {
    axios?.get("https://vica.website/api/items", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(r => {
        setLoading("hidden")
        setProduct(r.data)
        if (r.data.length == 0) {
          setNoFound("No Product")
        }
        else {
          setNoFound("")
        }
      }
      )
      .catch(err => {
        setNoFound(err.message)
      })
  }, [update])

  const delProducct = () => {
    setDelbtn(false)
    axios.delete(`https://vica.website/api/items/${delId}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(r => {
        popDel(true)
        setUpdate(!update)
        message.setMsg(r.data.message)
        setTimeout(stop, 4000);
      })
      .catch(err => {
        message.setErr(err.message)
        setTimeout(stop, 4000);
      })
  }
  function stop() {
    message.setErr("")
    message.setMsg("")
}
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="h1">Manage Products </h1>
        <Link className="btn active p-[7px]" to="/dashboard/products/add">
          <i className="fa-solid fa-plus"></i>
          <span> Add Product</span>
        </Link>
      </div>
      <div className="w-full border border-praim5 rounded-[8px]">
        <table className="w-full bg-white text-center rounded-[8px]">
          <thead className="border-b border-praim5">
            <tr>
              <th className="pt-[16px] pb-[13px]">#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.map((p, index) => {
              return (
                <tr key={index} className="border-b border-praim5 last:border-none">
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.price + "$"}</td>
                  <td>
                    <img className="m-auto mt-[16px] mb-[16px] size-[60px]" src={p.image_url} alt="" />
                  </td>
                  <td>
                    <div className="w-max ml-auto mr-auto border border-praim5 rounded-[8px]">
                      <button className="p-[6px] pl-[12px] pr-[12px] border-r border-praim5 cursor-pointer" type="button">
                        <Link to={`/dashboard/products/edit/${p.id}`}>
                          <i className="fa-regular fa-pen-to-square"></i>
                        </Link>
                      </button>
                      <button className="p-[6px] pl-[12px] pr-[12px] text-praim9 cursor-pointer" type="button" onClick={() => popDel(setDelId(p.id), false)}>
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot className="">
            <tr>
              <td colSpan={5} className="text-center">{nofound}</td>
            </tr>
            <tr className={loading}>
              <td colSpan={5} className="pt-[10px] pb-[10px] text-center">loading <i className="fas fa-spinner fa-pulse"></i></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className={pophide + " h-screen w-screen fixed top-0 left-0 z-50 bg-black-opc text-center"}>
      <div className="rounded-[20px] absolute top-[50%] left-[50%] translate-[-50%] bg-white w-[677px] h-[321px] max-tab-min:w-[450px] max-mob:min-w-[280px] max-mob:w-[95%]">
      <h5 className="mt-[93px] mb-[53px] text-[24px] font-semibold">Are You Sure You Want To  Delete The Product?</h5>
          <div className="flex justify-center gap-[26px]">
            <button className={(delbtn ? "cursor-pointer" : "cursor-not-allowed") + " active w-[140px] h-[50px] rounded-[4px] max-mob:w-[100px]"} type="button" onClick={delProducct} disabled={!delbtn ? "disabled" : ""}>
              <span className={delbtn ? "block" : "hidden"}>Yes</span>
              <span className={!delbtn ? "block" : "hidden"}>
                delet  <i className="fas fa-spinner fa-pulse"></i>
              </span>
            </button>
            <button className="w-[140px] h-[50px] rounded-[4px] text-white bg-praim9 cursor-pointer max-mob:w-[100px]" type="button" onClick={() => popDel(true)} >No</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products

