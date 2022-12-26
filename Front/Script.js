
// const n="https://github.com/faaizalam/Chat_using_socket_Admin_customer/blob/Chatwithdatabaseandrealtime/livechat/frontend/src/component/MainChat.js"

// let n="faaiz"
// let m="junaid"
// bo[n]=m
// console.log(bo)
// console.log(bo[n])

const workload=(()=>{
    const PPer={}
    const VideoGrid=document.getElementById("Video")
    const myvideo=document.createElement("video")
    myvideo.muted=true
    const Endpoints=window.location.host.indexOf("localhost")>=0?"/":window.location.host
    const socket=io(Endpoints)
    
    const myPeer=new Peer(undefined,{
    host:Endpoints,
    port:"3001"

    })

  
    navigator.mediaDevices.getUserMedia({
        video:true,
        audio:true
    }).then((stream)=>{
        
        AddvideoStream(myvideo,stream)
        
        myPeer.on("call",(call)=>{
            call.answer(stream)
            const video=document.createElement("video")
            console.log("mhh")
            call.on("stream",(userVideoStream)=>{
                AddvideoStream(video,userVideoStream)
 
             })

        })
        socket.on("user-connected",(userid)=>{
           console.log(userid,"conected")
            ConnectNEWvideo(userid,stream)
            
        })

    })

    socket.on("disCon",(userId)=>{
        if (PPer[userId]) {
            PPer[userId].close()
            
        }
        // PPer[userId].close()

    })

    myPeer.on("open",(idPeer)=>{
        const id=window.location.href
        // console.log(id)
        const spilts=id.toLocaleLowerCase().split("/")
        // console.log(spilts[3])
       const roomNo=spilts[3]
    //    console.log("jj")
        socket.emit("Join-Room",roomNo,idPeer)

    })
    
        function ConnectNEWvideo(userid,stream) {
            const call=myPeer.call(userid,stream)
            const video=document.createElement("video")
            call.on("stream",(userVideoStream)=>{
               AddvideoStream(video,userVideoStream)

            })
            call.on("close",()=>{
                video.remove()
            })

            PPer[userid]=call
            // console.log(PPer,"m")
            
        }




function AddvideoStream(video, stream) {
    console.log("mm")
    video.srcObject=stream
    video.addEventListener("loadedmetadata",()=>{
        video.play()
    })
    VideoGrid.append(video)
}







})




window.addEventListener("load",workload)