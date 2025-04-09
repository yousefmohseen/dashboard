import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import uploadimg from "../assets/image/upload.png"
import { MessageContext } from "./Root"


const AddProduct = () => {
    const navigate = useNavigate()
    const [sendbtn, setSendbtn] = useState(true)
    const message = useContext(MessageContext)
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [productImg, setProductImg] = useState(null)
    const [imgName, setImgName] = useState('')

    const sData = (e) => {
        e.preventDefault()
        setSendbtn(false)
        axios.post("https://vica.website/api/items", {
            name: productName,
            price,
            image: productImg
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
            <h1 className="h1">Add Product</h1>
            <form className="flex justify-between items-center flex-row-reverse gap-6 max-mob:flex-col" onSubmit={sData}>
                <div className="relative w-[475px] h-[218px] bg-praim4 border border-dashed border-praim3 max-tab:max-w-[385px] max-mob:w-full max-mob:max-w-none">
                    <label className="block h-full pt-[53px] cursor-pointer text-center" htmlFor="productImg">
                        <img className="w-[123px] h-[112px] m-auto" src={uploadimg} alt="" />
                        <div>{imgName}</div>
                    </label>
                    <input
                        className="absolute top-[50%] left-[50%] translate-[-50%] w-1 opacity-0"
                        type="file"
                        id="productImg"
                        accept="image/*"
                        onChange={(e) => {
                            setProductImg(e.target.files[0])
                            setImgName(e.target.files[0].name)
                        }}
                        required
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
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input className="input"
                            type="number"
                            id="price"
                            placeholder="Price"
                            onChange={(e) => setPrice(e.target.value)}
                            required
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

export default AddProduct
