import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MessageContext } from "./Root"

const EditProduct = () => {
    const [sendbtn, setSendbtn] = useState(true)
    const message = useContext(MessageContext)
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [productImg, setProductImg] = useState(null)
    const [imgName, setImgName] = useState('')

    const navigate = useNavigate()
    const params = useParams()
    const [defaultData, setDefaultData] = useState([])

    useEffect(() => {
        axios.get(`https://vica.website/api/items/${params.id}`, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(r => {
                setDefaultData(r.data)
                setProductName(r.data.name)
                setPrice(r.data.price)
            }
            )
            .catch(err => console.log(err))
    }, [])


    const sData = (e) => {
        e.preventDefault()
        setSendbtn(false)
        axios.post(`https://vica.website/api/items/${params.id}`, {
            name: productName,
            price,
            image: productImg,
            "_method": "PUT"
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(r => {
                message.setMsg(r.data.message)
                navigate("/dashboard/products")
                setTimeout(stop, 4000);
            })
            .catch(err => {
                setSendbtn(true)
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
            <h1 className="h1">Edit Product</h1>
            <form className="flex justify-between items-center flex-row-reverse gap-6 max-mob:flex-col" onSubmit={sData}>
                <div className="w-[475px] h-[218px] bg-praim4 border border-dashed border-praim3 max-tab:max-w-[385px] max-mob:w-full max-mob:max-w-none">
                    <label className="block h-full pt-[23px] cursor-pointer text-center" htmlFor="productImg">
                        <img className="w-[219px] h-[171px] m-auto" src={defaultData?.image_url} alt="" />
                        <div>{imgName}</div>
                    </label>
                    <input
                        className="hidden"
                        type="file"
                        id="productImg"
                        accept="image/*"
                        onChange={(e) => {
                            setProductImg(e.target.files[0])
                            setImgName(e.target.files[0].name)
                        }}
                    />
                </div>
                <div className="w-full">
                    <div>
                        <label className="block" htmlFor="productName">Product Name</label>
                        <input
                            className="input"
                            type="text"
                            id="productName"
                            placeholder="product Name"
                            onChange={(e) => setProductName(e.target.value)}
                            defaultValue={defaultData?.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input
                            className="input"
                            type="number"
                            id="price"
                            placeholder="Price"
                            onChange={(e) => setPrice(e.target.value)}
                            defaultValue={defaultData?.price}
                        />
                    </div>
                    <div>
                        <input
                            className={sendbtn ? "block btn active" : "hidden"}
                            type="submit"
                            value="Save"
                        />
                        <span className={!sendbtn ? "block" : "hidden"}>
                            Sending  <i className="fas fa-spinner fa-pulse"></i>
                        </span>
                    </div>
                </div>
            </form>

        </>
    )
}

export default EditProduct
