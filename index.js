const express=require('express')
const bodyparser=require('body-parser')
const app=express()
const cors=require('cors')
const bearertoken=require('express-bearer-token')


const PORT=4000
app.use(cors())
app.use(bearertoken())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('public'))


app.get('/',(req,res)=>{
    res.send('<center><h1> Selamat datang di API Ujian Backend JC 12 Sely Sellita </h1><br><img width="25%" src="https://cdn130.picsart.com/291644074018201.gif"/></center>')
})

const {ProductRouter,StoreRouter,InventoryRouter,JoinTableRouter}=require('./routers')

app.use('/product',ProductRouter)
app.use('/store',StoreRouter)
app.use('/inventory',InventoryRouter)
app.use('/list',JoinTableRouter)


app.listen(PORT, ()=>console.log('server jalan di '+PORT))

