const {db}=require('./../connections')
const {uploader}=require('../helper/uploader')
const fs=require('fs')      



module.exports={
    allproduct:(req,res)=>{
        var sql=`select * from product`
        db.query(sql,(err1,result1)=>{
            if(err1) return res.status(500).send(err1)
            return res.status(200).send(result1)
        })
    },
    addproduct:(req,res)=>{
        try {
            const path='/photo'              
            const upload=uploader(path,'TES').fields([{name: 'image'}]) 
            
            upload(req,res,(err)=>{
                if(err){
                    return res.status(500).json({message:'Upload picture failed!', error:err.message});
                }
                console.log('lewat')           
                const { image } =req.files
                console.log(image)             
                const imagePath = image ? path + '/' + image[0].filename : null;
                console.log(imagePath)                  
                console.log(req.body.data)             
                const data = JSON.parse(req.body.data); 
                console.log(data,'1')
                data.imagePath=imagePath             
                console.log(data,2)
                var sql=`insert into product set ?`
                db.query(sql,data,(err,result)=>{
                    if(err) {
                        fs.unlinkSync('./public' + imagePath);     
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                    }
                    console.log(result)
                    sql=`select * from product`
                    db.query(sql,(err1,result1)=>{
                        if(err1) return res.status(500).send(err1)
                        return res.status(200).send(result1)
                    })
                })
            })
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    editproduct:(req,res)=>{              
        const {id}=req.params
        var sql=`select * from product where product_id=${id}`
        db.query(sql,(err,result)=>{
            if (err) res.status(500).send(err)
            if(result.length){
                try {
                    const path='/photo'
                    const upload=uploader(path,'TES').fields([{ name: 'image'}])
                    upload(req,res,(err)=>{
                        if(err){
                            return res.status(500).json({ message: 'Upload post picture failed !', error: err.message });
                        }
                        console.log('lewat')
                        const { image } = req.files;
                        const imagePath = image ? path + '/' + image[0].filename : null;
                        const data = JSON.parse(req.body.data);
                        if(imagePath){
                            data.imagePath = imagePath;
                        }
                        sql = `Update product set ? where product_id = ${id};`
                        db.query(sql,data,(err1,result1)=>{
                            if(err1) {
                                if(imagePath) {
                                    fs.unlinkSync('./public' + imagePath);
                                }
                                return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                            }
                            if(imagePath) {                 
                                if(result[0].imagePath){
                                    fs.unlinkSync('./public' + result[0].imagePath);
                                }
                            }
                            sql=`select * from product`
                            db.query(sql,(err1,result2)=>{
                                if(err1) return res.status(500).send(err1)
                                return res.status(200).send(result2)
                            })
                        })
                    })
                } catch (error) {
                    
                }
            }else{
                return res.status(500).send({message:'nggak ada woy idnya'})
            }
        })
    },
    deleteproduct:(req,res)=>{
        const {id}=req.params
        var sql=`select * from product where product_id=${id}`
        db.query(sql,(err,result)=>{
            if (err) res.status(500).send(err)
            if(result.length){
                sql=`delete from product where product_id=${req.params.id}`
                db.query(sql,(err,result2)=>{
                    if (err) res.status(500).send(err)
                    console.log(result2)
                    if(result[0].imagePath){
                        fs.unlinkSync('./public'+result[0].imagePath)
                    }
                    sql=`select * from product`
                    db.query(sql,(err1,result1)=>{
                        if(err1) return res.status(500).send(err1)
                        return res.status(200).send(result1)
                    })
                    console.log('deleteproductlewat')
                })
            }else{
                return res.status(500).send({message:'nggak ada woy idnya'})
            }
        })
    }
}