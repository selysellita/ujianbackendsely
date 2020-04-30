const {db}=require('./../connections')     



module.exports={
    allinventory:(req,res)=>{
        var sql=`select * from inventory`
        db.query(sql,(err1,result1)=>{
            if(err1) return res.status(500).send(err1)
            return res.status(200).send(result1)
        })
    },
    addinventory:(req,res)=>{
        var sql=`insert into inventory set ?`
        db.query(sql,req.body,(err,result)=>{               
          if (err) return res.status(500).send(err)
            db.query('select * from inventory', (err, result1)=>{
                if (err) return res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    },
    editinventory:(req,res)=>{
        console.log('params',req.params)
        console.log('req.body')
        var sql = `update inventory set ? where inventory_id=${req.params.id}` 
        db.query(sql,req.body,(err,result)=>{
            if(err) return res.status(200).send(err)
            db.query('select * from inventory', (err, result1)=>{
                if (err) return res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    },
    deleteinventory:(req,res)=>{
        var sql = `delete from inventory where inventory_id=${req.params.id}` 
        db.query(sql,req.body,(err,result)=>{
            if(err) return res.status(200).send(err)
            db.query('select * from inventory', (err, result1)=>{
                if (err) return res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    }
}