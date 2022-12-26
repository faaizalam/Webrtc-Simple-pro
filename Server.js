import express from "express"
import path from "path"
import http from "http"
import { Server } from "socket.io"
import { v4 as uuidv4 } from 'uuid';

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port =5000||process.env.PORT
const server=http.createServer(app)



const __dirname=path.resolve()
app.set('view engine', 'ejs')
app.use(express.static(path.join(path.join(path.resolve(),"./Front"))))
// app.get("*",(req,res)=>res.sendFile(path.join(path.resolve(),"./Front/Viwes/Index.html")))
// console.log("/Front/Script",path.join(__dirname,"./Front/Script"))
app.get("/",(req,res)=>{
    
    res.redirect(`/${uuidv4()}`)
})






// })
app.get("/:room",(req,res)=>{
    
 res.render("room",{rooomid:req.params.id})
    // res.render('room',{roomid:req.params.roomid})

})
const io=new Server(server,{cors:{origin:"*"}})
let user=[]
// io.on("connection",(socket)=>{
//     socket.on("Join-Room",(roomid,userid)=>{
//         socket.join(roomid)
//         io.to(roomid).emit("user-connected",877)

//     })
// })
// io.on('connection', socket => {
//   socket.on('join-room', (roomId, userId) => {
//     socket.join(roomId)
//     socket.to(roomId).broadcast.emit('user-connected', userId)

//     socket.on('disconnect', () => {
//       socket.to(roomId).broadcast.emit('user-disconnected', userId)
//     })
//   })
// })
io.on('connection', (socket) => {
  // console.log(socket.id)
  socket.on('Join-Room',(roomId, userId) => {
      console.log("connected")
      socket.join(roomId) 
      // io.socketsJoin(roomId)
      console.log(roomId,"room")
      
      socket.broadcast.to(roomId).emit('user-connected', userId)
      // io.to(roomId).compress(true).emit('user-connected', userId)
      // io.to()
      socket.on("disconnect",()=>{
         socket.broadcast.to(roomId).emit("disCon",userId)
        // io.to(roomId).emit('disCon', userId)
        //  console.log(socket.id)
       })
       
       
    
    })
  })







server.listen(port,()=>{
    console.log(`http://localhost:${port}`)

})




