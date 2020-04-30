const {db}=require('./../connections')



module.exports={
    allstore:(req,res)=>{
        var sql=`select * from store`
        db.query(sql,(err1,result1)=>{
            if(err1) return res.status(500).send(err1)
            return res.status(200).send(result1)
        })
    },
    addstore:(req,res)=>{
        var sql='insert into store set ?'
        db.query(sql,req.body,(err,result)=>{               
            if (err) return res.status(500).send(err)
            console.log('baby milo bala bala')
            db.query(`select * from store`, (err, result1)=>{
                if (err) return res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    },
    editstore:(req,res)=>{
        console.log('params',req.params)
        console.log('req.body')
        var sql = `update store set ? where store_id=${req.params.id}` 
        db.query(sql,req.body,(err,result)=>{
            if(err) return res.status(200).send(err)
            db.query(`select * from store`, (err, result1)=>{
                if (err) return res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    },
    deletestore:(req,res)=>{
        var sql = `delete from store where store_id=${req.params.id}` 
        db.query(sql,req.body,(err,result)=>{
            if(err) return res.status(200).send(err)
            db.query(`select * from store`, (err, result1)=>{
                if (err) return res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    }
}